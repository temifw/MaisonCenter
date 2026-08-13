# Maison Center

Hotel booking platform: a public customer site, a staff admin dashboard,
and an Express API backed by Supabase (Postgres + Auth + RLS).

Guests book without an account. Each reservation gets a short booking
code (`MC-7K4PQ9RD`) which, paired with the email address on the
booking, is the only thing needed to retrieve it later.

---

## Structure

```
MaisonCenter/
├── api/                 Vercel serverless entry point (wraps server/)
├── server/              Express API
│   ├── index.js           app setup, CORS, error handling
│   ├── routes/            /auth /rooms /bookings /guests /reports
│   ├── middleware/        auth.js — attaches req.db and req.user
│   ├── lib/               supabase.js, email.js, emailTemplate.js
│   └── scripts/           test-email.js
├── client/              Customer site (React 19 + Vite + Tailwind)
├── admin/               Staff dashboard (React 19 + Vite)
├── supabase/migrations/ Numbered SQL — the schema source of truth
└── docs/                Deeper guides (see below)
```

Three deployables, three Vercel projects: `server/` via `api/`,
`client/`, and `admin/`. See [DEPLOY.md](DEPLOY.md).

---

## How it fits together

Both front ends are static SPAs that talk to one Express API over
`VITE_API_URL`. The API never holds business logic that must be atomic —
that lives in Postgres functions:

| Concern | Where it lives | Why |
| --- | --- | --- |
| Booking creation | `create_booking` RPC | Room selection and insert must be one transaction, or two guests get the same room. Uses `FOR UPDATE ... SKIP LOCKED` plus an exclusion constraint. |
| Booking lookup | `get_booking_by_code` RPC | `SECURITY DEFINER` so it can read past RLS, but returns only safe fields, and only when code **and** email match. |
| Access control | Row-level security | Staff see everything, customers see their own. The API forwards the user's JWT so `auth.uid()` resolves correctly. |

`server/middleware/auth.js` gives every request a `req.db` Supabase
client scoped to the caller — the user's token if present, anon
otherwise — so RLS does the authorisation rather than route code.

---

## Local setup

Requires **Node 22.12+** (see `.nvmrc`).

```bash
# 1. Install everything
npm run install:all

# 2. Configure the API
cp server/.env.example server/.env     # fill in Supabase keys

# 3. Configure the front ends
cp client/.env.example client/.env
cp admin/.env.example admin/.env

# 4. Run (three terminals)
npm run dev            # API      -> http://localhost:3000
npm run client:dev     # customer -> http://localhost:5173
npm run admin:dev      # admin    -> http://localhost:5174
```

Check the API is up: <http://localhost:3000/health> should return
`{"ok":true}`.

### Database

Apply `supabase/migrations/*.sql` in numerical order in the Supabase SQL
editor. They're ordered deliberately — `003` adds the concurrency
constraints that `004`'s booking function relies on.

---

## Email

Booking confirmations send over SMTP via Nodemailer. **This is optional**
— with no `SMTP_*` variables set, the email module logs one warning and
no-ops, and bookings work normally.

```bash
npm run email:verify              # test credentials, send nothing
npm run email:preview             # render the email to email-preview.html
node server/scripts/test-email.js you@example.com   # send a real test
```

Setup walkthrough: [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md).

---

## Docs

| Document | What's in it |
| --- | --- |
| [DEPLOY.md](DEPLOY.md) | Deploying all three projects to Vercel |
| [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md) | SMTP provider setup and troubleshooting |
| [docs/BACKEND_GUIDE.md](docs/BACKEND_GUIDE.md) | Schema and API design walkthrough |
| [docs/MYBOOKING_CHANGES.md](docs/MYBOOKING_CHANGES.md) | Historical: the move from customer logins to booking codes |

---

## Notes for future work

- `client/index.html` loads Tailwind from `cdn.tailwindcss.com`, which
  prints a production warning in the console. Fine for now; move to a
  real Tailwind build before launch.
- The admin dashboard has no access restriction beyond Supabase auth.
  If it's publicly deployed, consider Vercel Password Protection.
- Cancellation emails aren't implemented — `POST /api/bookings/:id/cancel`
  sends nothing.
