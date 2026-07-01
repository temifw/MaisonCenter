# Switching from customer login to "My Booking" (booking code + email)

This guide covers everything needed to move the customer site off logins and
onto a booking-code lookup: what changed in the code, how to apply the
database change to your Supabase project, and how to verify the new logic
works end to end.

The staff/admin app is **unchanged** — staff still log in with Supabase Auth.
Only the *customer* login was removed.

---

## 1. What changed (already done in this repo)

**Database — new migration `supabase/migrations/007_booking_code.sql`**
- Adds a `booking_code` column to `bookings` (e.g. `MC-7K4PQ9RD`), unique and
  not null.
- `gen_booking_code()` generates a short, unambiguous code (no `0/O/1/I/L`).
- A `before insert` trigger auto-assigns the code, so every new booking —
  online or walk-in — gets one automatically (including the one returned to
  the customer at checkout).
- Backfills a code onto every existing booking.
- Adds `get_booking_by_code(p_code, p_email)`, a `SECURITY DEFINER` function
  that returns a booking **only when the code AND the email match**, exposing
  just a handful of safe fields. `EXECUTE` is granted to `anon` and
  `authenticated`, so the lookup works with no login.

**Backend — `server/routes/bookings.js`**
- New public route `POST /api/bookings/lookup` taking `{ code, email }` and
  calling the `get_booking_by_code` RPC. Returns `404` (with a generic
  message) when nothing matches, so codes can't be enumerated.
- Everything else (create, calendar, cancel, staff auth) is untouched.

**Frontend — `client/`**
- Deleted: `pages/SignIn.tsx`, `pages/SignUp.tsx`, `context/AuthContext.tsx`,
  `services/authService.ts`.
- New: `pages/MyBooking.tsx` — a code + email form that shows the reservation.
- Updated: `NavBar` (Sign In/Out → **My Booking**), `App` (route `/my-booking`
  replaces `/sign-in` and `/sign-up`), `main.tsx` (no `AuthProvider`),
  `Book.tsx` (shows the **booking code** on confirmation and points to My
  Booking), `hotelService.ts` (`lookupBooking`), `http.ts` (no token/redirect),
  `config/api.ts`.

> Note: a booking is retrievable through My Booking only if it has an **email**
> on file (email is the second factor). Walk-ins entered without an email
> won't be retrievable by the customer — that's by design.

---

## 2. Apply the database change to Supabase (online)

Pick **one** of the two options.

### Option A — Supabase dashboard (no CLI)

1. Open your project at supabase.com → **SQL Editor** → **New query**.
2. Open `supabase/migrations/007_booking_code.sql` from this repo, copy its
   entire contents, and paste it into the editor.
3. Click **Run**. It should complete with no errors. (It's safe to run more
   than once — the column, index, trigger, and functions all use
   `if not exists` / `create or replace`.)
4. Confirm the objects were created (see step 4 below).

### Option B — Supabase CLI

From the repo root, with the CLI already linked (see `BACKEND_GUIDE.md` step 1):

```bash
supabase db push
```

This applies any migrations not yet on the remote, including `007`.

---

## 3. Deploy the backend and frontend

**Backend** (from repo root):

```bash
npm install
npm run dev      # or: npm start
# API on http://localhost:3000
```

No new environment variables are needed — the lookup uses the same anon
client the public routes already use.

**Customer site** (from `client/`):

```bash
cd client
npm install
npm run build    # tsc -b && vite build  — this is your compile/type check
npm run dev      # local preview on http://localhost:5173
```

A clean `npm run build` is the authoritative check that the frontend changes
type-check and compile.

---

## 4. Verify the logic changed and works

Work top-down: database first, then API, then UI.

### 4a. Database checks (Supabase → SQL Editor)

Every booking now has a code:

```sql
-- Expect: total = with_code, missing = 0
select count(*) as total,
       count(booking_code) as with_code,
       count(*) - count(booking_code) as missing
from public.bookings;
```

Grab a real code + its email to test the lookup:

```sql
select b.booking_code, g.email
from public.bookings b
join public.guests g on g.id = b.guest_id
where g.email is not null
limit 5;
```

Correct code + correct email returns a JSON row; wrong email returns NULL:

```sql
-- returns the booking as json
select public.get_booking_by_code('MC-XXXXXXXX', 'guest@example.com');

-- returns NULL (email doesn't match) -> proves the second factor works
select public.get_booking_by_code('MC-XXXXXXXX', 'wrong@example.com');

-- returns NULL (unknown code)
select public.get_booking_by_code('MC-NOPE0000', 'guest@example.com');
```

Confirm anon is allowed to execute the function:

```sql
select has_function_privilege('anon',
  'public.get_booking_by_code(text, text)', 'execute');   -- expect: true
```

### 4b. API checks (with the server running)

Create a booking (this returns the new `booking_code`):

```bash
curl -s -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"roomTypeId":"<A_REAL_ROOM_TYPE_ID>","checkIn":"2026-08-01","checkOut":"2026-08-03","guestName":"Test Guest","guestEmail":"test@example.com","guestPhone":"+1 555 0100"}'
# -> JSON including "booking_code":"MC-........"
```

Look it up with code + email (should return the booking):

```bash
curl -s -X POST http://localhost:3000/api/bookings/lookup \
  -H "Content-Type: application/json" \
  -d '{"code":"MC-XXXXXXXX","email":"test@example.com"}'
# -> 200 with booking details
```

Wrong email and missing fields should fail cleanly:

```bash
# wrong email -> 404 "No booking found for that code and email."
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/bookings/lookup \
  -H "Content-Type: application/json" \
  -d '{"code":"MC-XXXXXXXX","email":"nope@example.com"}'

# missing email -> 400 "Booking code and email are required."
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/bookings/lookup \
  -H "Content-Type: application/json" \
  -d '{"code":"MC-XXXXXXXX"}'
```

### 4c. Confirm the login is really gone (regression)

```bash
# The customer login endpoints are no longer used by the site.
# The nav should show "My Booking", not "Sign In".
```

- Visit `/` — the top nav shows **My Booking** (no Sign In / Sign Out).
- Visit `/sign-in` or `/sign-up` — these now fall through to the Home page
  (routes removed).
- Make a booking on `/book` — the confirmation screen shows a **booking code**
  and a link to **My Booking**.
- Go to `/my-booking`, enter that code + the booking email → the reservation
  appears. Enter a wrong email → a "not found" message.

### 4d. Quick source sanity check

```bash
# From client/ — should print nothing (no leftover auth code):
grep -rn "useAuth\|AuthContext\|authService\|/sign-in\|SignIn\|SignUp" src
```

---

## 5. Notes & optional follow-ups

- **Existing customers** got backfilled codes they don't know. If you want to
  notify them, you can pull `booking_code` + email from the `bookings`/`guests`
  tables and email it out; new bookings surface the code automatically.
- **Cancellations:** customers can no longer self-cancel (that required a
  login). Cancels now go through staff. If you want guest self-cancel later,
  add a `cancel_by_code(code, email)` RPC mirroring the lookup.
- **Rate limiting:** since lookup is public, consider adding
  `express-rate-limit` to `POST /bookings/lookup` to slow brute-force attempts
  on the code space (the email second factor already makes this impractical).
