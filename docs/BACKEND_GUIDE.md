# Maison Center — Backend & Database (React + Express + Supabase)

A step-by-step guide to the backend for a hotel platform with a
**customer site** (`client/`) and an **admin/staff site** (`admin/`).

This repo is a **monorepo** with three parts that talk in a straight line:

```text
React apps  ──HTTP/REST──▶  Express API  ──supabase-js──▶  Supabase (Postgres)
(admin, client)            (server/)                       (tables, RPCs, RLS)
```

The two React apps never touch the database directly. They call the
Express API at `http://localhost:3000/api`, sending a Supabase access
token as a `Bearer` header. The Express server verifies that token and
runs queries **as that user**, so the database's Row Level Security and
the booking RPCs do the real enforcement.

The hard part of any booking system is **concurrency**: two people must
never book the same room for overlapping dates. That guarantee lives all
the way down in PostgreSQL as an *exclusion constraint*, so it cannot be
bypassed by a bug in the API or the UI.

---

## Repo layout

```text
MaisonCenter/
├─ server/                         ← Express REST API (the backend)
│  ├─ index.js                     app entry; serves /api on port 3000
│  ├─ lib/
│  │  ├─ supabase.js               admin / anon / per-user clients
│  │  └─ email.js                  invokes the confirmation-email function
│  ├─ middleware/
│  │  └─ auth.js                   attachAuth, requireAuth, requireStaff
│  └─ routes/
│     ├─ index.js                  mounts everything under /api
│     ├─ auth.js                   /auth/login /register /logout /me
│     ├─ rooms.js                  /rooms (+ /types, /availability)
│     ├─ bookings.js               /bookings (+ /calendar, /:id/cancel)
│     ├─ guests.js                 /guests (directory)
│     └─ reports.js                /reports/dashboard
├─ supabase/
│  ├─ migrations/                  001→006 SQL (schema, concurrency, RPCs, RLS)
│  └─ functions/send-booking-email Edge Function (Resend)
├─ admin/                          existing React + TS admin app
├─ client/                         existing React + TS customer app
├─ package.json                    backend deps + scripts (start, dev)
└─ .env.example                    copy to .env and fill in
```

---

## The data model in plain English

- **room_types** — a *category* you sell (e.g. "Deluxe King") with a price.
- **rooms** — *physical* rooms (e.g. "204"), each belonging to one type and
  carrying a live `status`: available / occupied / cleaning / maintenance.
- **profiles** — extra info for *registered* customers; one row per login,
  created automatically on signup.
- **staff** — which logins are hotel employees (this is what grants admin powers).
- **guests** — the *guest directory*: one row per real person who books,
  covering both online customers and walk-ins.
- **bookings** — one room reserved for one date range, with a lifecycle
  status (pending → confirmed → checked_in → checked_out, or cancelled).

We model a stay as the half-open range `[check_in, check_out)`. A guest
leaving on the 5th frees the room for someone arriving on the 5th — exactly
how hotels work.

---

## Step 1 — Create the Supabase project

1. Go to supabase.com, create a project, and note your **Project URL**,
   **anon public key**, and **service_role key** (Project Settings → API).
2. (Optional) Install the CLI to run migrations from your machine:

   ```bash
   npm install -g supabase
   supabase login
   supabase link --project-ref <your-project-ref>
   ```

## Step 2 — Run the migrations (the database)

Open the Supabase dashboard → **SQL Editor**, then paste and run each file
in `supabase/migrations/` **in order, 001 → 006**. (Or, with the CLI:
`supabase db push`.)

Order matters: 003 depends on the tables in 002, and 005 depends on the
`is_staff()` helper defined in 004. After running them you'll have all
tables, the concurrency constraint, the RPCs, and RLS turned on.

## Step 3 — Understand the concurrency guarantee (important)

This is the line that does the heavy lifting (in `003_concurrency.sql`):

```sql
alter table public.bookings
  add constraint no_double_booking
  exclude using gist (room_id with =, stay with &&)
  where (status in ('pending','confirmed','checked_in'));
```

Read it as: *"reject any booking row whose `room_id` equals another active
booking's room_id **and** whose date range overlaps it."* PostgreSQL
enforces this with a GiST index while holding locks, so:

- There is **no check-then-insert race**. Even if two requests pass their
  availability check at the same instant, only one `INSERT` can commit; the
  other fails with error code `23P01`.
- Cancelled / checked-out bookings are excluded by the `WHERE`, so their
  dates free up automatically.

On top of that, the `create_booking` RPC locks the candidate room row with
`SELECT ... FOR UPDATE` (and `SKIP LOCKED` when auto-assigning) so competing
transactions serialize cleanly and the API returns a friendly
`409 Conflict` instead of a raw database error.

> Why not just check availability in JavaScript? Because between the check
> and the insert, another request can slip in. The only race-proof place to
> enforce this is the database, in one transaction. That's what the RPCs do.

## Step 4 — Configure and run the Express API

1. Install backend dependencies (from the repo root):

   ```bash
   npm install
   ```

2. Copy the env template and fill it in:

   ```bash
   cp .env.example .env
   ```

   ```text
   PORT=3000
   SUPABASE_URL=https://<ref>.supabase.co
   SUPABASE_ANON_KEY=<anon key>
   SUPABASE_SERVICE_ROLE_KEY=<service role key>   # backend only, never in a browser
   CORS_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

3. Start it:

   ```bash
   npm run dev      # nodemon, auto-restart
   # or
   npm start
   ```

   You should see `API running on http://localhost:3000`. Quick check:
   `curl http://localhost:3000/health` → `{"ok":true}`.

## Step 5 — Make yourself a staff user

1. Sign up once (through the app or the dashboard).
2. In **Authentication → Users**, copy your user UUID.
3. In SQL Editor:

   ```sql
   insert into public.staff (id, role) values ('<your-user-uuid>', 'admin');
   ```

   Now your login passes the API's `requireStaff` guard and can use all the
   admin endpoints.

## Step 6 — Deploy the confirmation-email function

1. Create a free **Resend** account, verify a sending domain (or use their
   `onboarding@resend.dev` for testing), and grab an API key.
2. Set secrets and deploy:

   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx FROM_EMAIL="Maison Center <bookings@yourdomain.com>"
   supabase functions deploy send-booking-email
   ```

   The API invokes this function after a booking is created; if it fails the
   booking still succeeds (email is best-effort).

## Step 7 — Point the frontends at the API

Both apps already read `VITE_API_URL` (see `admin/.env` and `client/.env`)
and send the token via `src/services/http.ts`. They're set to
`http://localhost:3000/api`, which matches the server — no change needed.
Run each app with `npm install && npm run dev` inside `admin/` and `client/`.

---

## The REST API (contract the frontends use)

All paths are prefixed with `/api`. Send `Authorization: Bearer <token>`
when logged in.

```text
AUTH
POST   /auth/register     {email,password,fullName,phone}  -> {token,user}
POST   /auth/login        {email,password}                 -> {token,user}  (user.isStaff)
POST   /auth/logout                                         -> {ok}
GET    /auth/me                                             -> {user,profile,isStaff,role}

ROOMS
GET    /rooms/types                                         public  -> room categories
GET    /rooms/availability?roomTypeId&checkIn&checkOut      public  -> free rooms
GET    /rooms                                               -> rooms (+type)
POST   /rooms             {roomNumber,roomTypeId,floor}     staff   -> created room
PUT    /rooms/:id         {status?|roomNumber?|...}         staff   -> updated room
DELETE /rooms/:id                                           staff   -> soft delete

BOOKINGS
POST   /bookings          {roomTypeId,checkIn,checkOut,guestName,guestEmail,...}
                          public (guest or logged-in) / staff walk-in -> booking
GET    /bookings                                           auth    -> own (or all, if staff)
GET    /bookings/calendar?from&to                          staff   -> calendar events
POST   /bookings/:id/cancel                                auth    -> {ok}

GUESTS (staff)
GET    /guests?search                                       -> directory
GET    /guests/:id/bookings                                 -> one guest's history

REPORTS (staff)
GET    /reports/dashboard                                   -> room status counts, arrivals…
```

### Example calls

Check availability (customer site):

```js
import apiClient from "./services/http";
const { data: free } = await apiClient.get("/rooms/availability", {
  params: { roomTypeId, checkIn: "2026-07-01", checkOut: "2026-07-04" },
});
// free.length === 0  -> sold out for those dates
```

Book as a guest (no account) — token simply absent:

```js
const { data: booking } = await apiClient.post("/bookings", {
  roomTypeId,
  checkIn: "2026-07-01", checkOut: "2026-07-04",
  guestName: "Ada Lovelace",
  guestEmail: "ada@example.com",
  guestPhone: "+1 555 0100",
});
// 409 if the room was just taken; confirmation email sent automatically
```

Walk-in booking (admin assigns a specific room):

```js
await apiClient.post("/bookings", {
  roomId, roomTypeId, checkIn, checkOut,
  guestName: "Walk-in Guest", guestPhone: "+1 555 0199",
  source: "walk_in",
});
```

Change a room's status (admin):

```js
await apiClient.put(`/rooms/${roomId}`, { status: "cleaning" });
// available | occupied | cleaning | maintenance
```

---

## Security model (defense in depth)

- The browser only ever holds the **anon key** and a user's access token.
  The **service_role key stays on the server** (in `.env`).
- The API verifies every token with Supabase Auth, then queries **as that
  user** so Row Level Security applies:
  - public can read active room types/rooms (to show availability);
  - a registered customer reads **only their own** bookings/profile;
  - the guest directory and all bookings are **staff-only**.
- Sensitive writes go through `SECURITY DEFINER` RPCs that re-check
  `is_staff()` — so even a bug in the API can't let a customer change room
  status or remove a room.
- `requireAuth` / `requireStaff` middleware reject unauthorized calls early
  with 401/403.

---

## Testing the concurrency guarantee

To prove double-booking is impossible, open two SQL Editor tabs and, in
each, run a transaction that books the same room for the same dates without
committing, then commit both. One commits; the other raises
`exclusion_violation (23P01)`. Through the API this surfaces as a
`409 Conflict` with *"That room was just booked by someone else."*

Simpler smoke test: `POST /bookings` for 1–4 July, then
`GET /rooms/availability` for 2–3 July — that room drops out of the list.
Cancel the booking and it reappears.

---

## Next steps / extensions

- **Expire stale pending bookings**: a scheduled SQL job that flips
  `pending` rows older than N minutes to `cancelled`, freeing the dates.
- **Payments**: add Stripe — create the booking as `pending`, take payment,
  then a webhook flips it to `confirmed`.
- **Auto room-status**: a daily job sets rooms to `occupied` on check-in
  date and `cleaning` on check-out.
- **Rate limiting / validation**: add `express-rate-limit` and a schema
  validator (e.g. `zod`) on the booking endpoints.
```
