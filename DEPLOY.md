# Deploying to Vercel — client demo setup

Everything runs on Vercel as **three separate projects** from this one
repo. Email is *not* required — the app works fine without SMTP, so you
can deploy today and finish `EMAIL_SETUP.md` later.

| Project | Root directory | What it is | Example URL |
| --- | --- | --- | --- |
| `maisoncenter-api` | `.` (repo root) | Express API as a serverless function | `maisoncenter-api.vercel.app` |
| `maisoncenter-client` | `client` | Customer site (Vite SPA) | `maisoncenter.vercel.app` |
| `maisoncenter-admin` | `admin` | Staff dashboard (Vite SPA) | `maisoncenter-admin.vercel.app` |

**Deploy the API first.** Both front ends need its URL baked in at build
time, so deploying them first means an immediate redeploy.

---

## What already changed in the repo

| File | Why |
| --- | --- |
| `api/index.js` | New. Vercel's entry point — hands the Express app to the serverless runtime. |
| `server/index.js` | `app.listen()` now only runs when `process.env.VERCEL` is unset. CORS accepts an allow-list plus optional `*.vercel.app` previews. |
| `vercel.json` | New. Rewrites every path to the API function. |
| `.vercelignore` | New. Keeps `client/`, `admin/` and `supabase/` out of the API deploy. |
| `admin/vercel.json` | New. SPA rewrites — without this, refreshing `/rooms` in the admin 404s. |
| `client/.env.example`, `admin/.env.example` | New. Documents `VITE_API_URL`. |
| `server/routes/bookings.js` | Awaits the confirmation email on serverless (see "Email on serverless" below). |
| `server/lib/email.js` | Disables SMTP connection pooling on serverless. |

Nothing here changes local development: `npm run dev` still binds port 3000.

---

## Step 1 — Deploy the API

1. Push your work to GitHub.
2. **vercel.com → Add New → Project → import `404Temi/MaisonCenter`.**
3. Configure:
   - **Project Name**: `maisoncenter-api`
   - **Root Directory**: leave as `./` (the repo root)
   - **Framework Preset**: **Other**
   - **Build Command**: leave empty
   - **Output Directory**: leave empty
4. Add **Environment Variables** (copy the values from your local
   `server/.env`):

   | Name | Value |
   | --- | --- |
   | `SUPABASE_URL` | `https://your-project.supabase.co` |
   | `SUPABASE_ANON_KEY` | your anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service role key — **needed for staff login** |
   | `CORS_ORIGINS` | leave blank for now; you'll fill it in at Step 4 |
   | `ALLOW_VERCEL_PREVIEWS` | `true` |

5. **Deploy**, then confirm it's alive:

   ```
   https://maisoncenter-api.vercel.app/health
   ```

   You want `{"ok":true}`. Note the domain — you need it twice below.

> **`SUPABASE_SERVICE_ROLE_KEY` is currently missing from your local
> `server/.env`.** Staff login and the staff checks in
> `middleware/auth.js` fall back to the anon client without it. If the
> admin dashboard is part of the demo, grab the key from Supabase →
> Project Settings → API and add it here. It bypasses RLS, so it belongs
> only in the API project's env vars — never in a `VITE_` variable.

---

## Step 2 — Deploy the customer site

1. **Add New → Project → import the same repo again.**
2. Configure:
   - **Project Name**: `maisoncenter-client`
   - **Root Directory**: **`client`** ← click Edit and select the folder
   - **Framework Preset**: Vite (auto-detected)
3. Environment Variables:

   | Name | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://maisoncenter-api.vercel.app/api` |
   | `VITE_APP_NAME` | `Hotel Booking` |

   Mind the `/api` suffix — the code appends paths like `/rooms/types`
   directly to this value.

4. **Deploy.**

---

## Step 3 — Deploy the admin dashboard

Same again, with:

- **Project Name**: `maisoncenter-admin`
- **Root Directory**: **`admin`**
- `VITE_API_URL` = `https://maisoncenter-api.vercel.app/api`
- `VITE_APP_NAME` = `Hotel Admin`

`admin/vercel.json` (added for you) handles client-side routing.

---

## Step 4 — Point CORS back at the front ends

The API now needs to know who's allowed to call it.

1. Go to the **`maisoncenter-api`** project → Settings → Environment
   Variables → edit `CORS_ORIGINS`:

   ```
   https://maisoncenter-client.vercel.app,https://maisoncenter-admin.vercel.app
   ```

   Comma-separated, **no trailing slashes**, and use your real domains.
2. **Redeploy the API** — env var changes don't apply to a running
   deployment. Deployments → ⋯ → Redeploy.

Leaving `CORS_ORIGINS` empty allows every origin. Fine for an afternoon
demo, but don't ship it that way.

---

## Step 5 — Smoke test

Open the customer site and walk the flow your client will:

- [ ] **Home** loads with images
- [ ] **Rooms** lists room types *(proves the API and Supabase RLS work)*
- [ ] **Book** — pick dates, submit, get a `MC-XXXXXXXX` code back
- [ ] **My Booking** — retrieve that booking with the code + email
- [ ] Refresh the page on `/rooms` — should load, not 404 *(proves SPA rewrites)*
- [ ] Admin — sign in, see the booking you just made

If Rooms is empty, open DevTools → Network. A red CORS error means
Step 4; a call to `localhost:3000` means `VITE_API_URL` didn't take —
see the table below.

---

## Email on serverless

You don't need SMTP for the demo. With no `SMTP_*` variables set, the
email module logs one warning and no-ops; bookings succeed normally.

When you do finish `EMAIL_SETUP.md`, add `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `FROM_NAME`, plus the `HOTEL_*`
values and `SITE_URL` to the **API** project.

One behavioural difference is already handled in code, but worth
understanding. On a normal server the confirmation email is fired
without `await` so the guest gets their booking code instantly. On
serverless that's unsafe — Vercel can freeze the instance the moment you
respond, and a detached promise silently never runs. So
`routes/bookings.js` detects `process.env.VERCEL` and awaits the send,
capped at 8 seconds (`EMAIL_TIMEOUT_MS`) so a hanging mail server can't
stall the booking response. Connection pooling is disabled on serverless
for the same reason: sockets can't survive between invocations.

---

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Site loads, but Rooms is empty and DevTools shows calls to `localhost:3000` | `VITE_API_URL` wasn't set, or was set *after* the build. Vite inlines env vars at build time — set it, then **redeploy**. A restart isn't enough. |
| `blocked by CORS policy` in the console | `CORS_ORIGINS` doesn't include that exact origin, or you didn't redeploy the API after editing it. Check for a trailing slash. |
| Preview deploy fails CORS but production works | Preview URLs get random subdomains. Set `ALLOW_VERCEL_PREVIEWS=true` on the API project. |
| `404: NOT_FOUND` on every API route | The API project's Root Directory isn't the repo root, or `vercel.json` wasn't committed. |
| API returns 500 immediately | `SUPABASE_URL` / `SUPABASE_ANON_KEY` missing — `lib/supabase.js` throws at import. Check the Runtime Logs. |
| Refreshing `/rooms` gives 404 | Missing SPA rewrites. `client/vercel.json` and `admin/vercel.json` both exist now; confirm they were committed. |
| Admin login fails but the customer site works | `SUPABASE_SERVICE_ROLE_KEY` missing on the API project. |
| Build fails in `client` with a rolldown/native binding error | Stale committed `node_modules` — see below. |
| First request after idle is slow | Serverless cold start. Normal; usually a second or two. |

To read errors: Vercel project → **Logs** → Runtime Logs, then trigger
the request. `console.warn` and `console.error` from the API land there.

---

## Recommended cleanup

Neither blocks the demo, but both will bite you later.

**1. `client/node_modules` is committed** — 3,865 files, ~39 MB, which
is why `.git` is 142 MB. `.gitignore` lists `node_modules`, but ignore
rules don't apply to files Git already tracks. Every Vercel build clones
all of it. No native binaries are tracked, so builds should still
succeed — but if the client build ever fails with a rolldown or esbuild
binding error, this is the cause.

```bash
git rm -r --cached client/node_modules
git commit -m "Stop tracking client/node_modules"
```

Your local files are untouched — `--cached` only updates the index.

**2. `client/.env` and `admin/.env` are committed** with
`VITE_API_URL=http://localhost:3000/api`. They hold no secrets (`VITE_`
values ship in the bundle by design), and Vercel's dashboard variables
take precedence over `.env` files, so your deploy works regardless. It's
still a confusing trap:

```bash
git rm --cached client/.env admin/.env
printf '\n.env\n' >> client/.gitignore
printf '\n.env\n' >> admin/.gitignore
git commit -m "Stop tracking front-end .env files"
```

The `.env.example` files are committed in their place.

---

## Before this becomes production

- [ ] Custom domain on the client project
- [ ] `ALLOW_VERCEL_PREVIEWS=false`, `CORS_ORIGINS` set to real domains
- [ ] SMTP finished (`EMAIL_SETUP.md`) and `SITE_URL` set to the real domain
- [ ] Admin dashboard access-restricted — it's publicly reachable, and
      Supabase auth is the only thing in front of it. Consider Vercel
      Password Protection or a Vercel Authentication rule.
- [ ] Supabase RLS policies reviewed against the live anon key
- [ ] `server/.env` still untracked (`git ls-files | grep server/.env` returns nothing)
