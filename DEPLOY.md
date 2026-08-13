# Deploying Maison Center to Vercel

Three Vercel projects from one repo. Email is **not** required — with no
`SMTP_*` variables set the app logs one warning and works normally, so
you can deploy today and finish [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md)
later.

| Project | Root Directory | What it is |
| --- | --- | --- |
| `maisoncenter-api` | `.` (repo root) | Express API as a serverless function |
| `maisoncenter-client` | `client` | Customer site (Vite SPA) |
| `maisoncenter-admin` | `admin` | Staff dashboard (Vite SPA) |

**Order matters: deploy the API first.** Both front ends bake its URL in
at build time, so doing them first means an immediate rebuild.

---

## Part 1 — Pre-flight (do this before touching Vercel)

### 1.1 Untrack `client/node_modules` — this is mandatory

`client/node_modules` is committed: **3,865 files, 39 MB in git**,
installed on Windows. Vercel clones it, npm fails to reconcile the
Linux-native build tooling on top of it, and the build dies with:

```
Command "npm run build" exited with 254
```

`.gitignore` already lists `node_modules`, but **ignore rules don't
apply to files Git already tracks**. You have to untrack it explicitly:

```bash
git rm -r --cached client/node_modules
git rm --cached client/.env admin/.env
git rm -r --cached supabase/.temp
git commit -m "Stop tracking node_modules, env files and Supabase CLI state"
git push
```

`--cached` only updates the index — **your local files are untouched**,
and `npm run dev` keeps working.

This was verified, not guessed: a clean checkout of `client/` with the
same `package-lock.json` on Node 22 builds successfully in under a
second. The lockfile correctly lists `@rolldown/binding-linux-x64-gnu`.
The only difference between that and the failing Vercel build is the
committed `node_modules`.

### 1.2 Confirm secrets aren't tracked

```bash
git ls-files | grep -E "node_modules/|/\.env$|supabase/\.temp/"
```

Should print **nothing** after 1.1. `server/.env` — which holds the
Supabase service role key and, later, your SMTP password — has never
been tracked; keep it that way.

The `client/.env` and `admin/.env` files hold no secrets (`VITE_` values
ship in the browser bundle by design), but they point at `localhost` and
will confuse you later. `.env.example` files are committed in their place.

### 1.3 Check the builds pass locally

```bash
npm --prefix client run build     # expect dist/ with index.html + assets
npm --prefix admin  run build
```

Both currently pass on Node 22.12+. If they fail locally they'll fail on
Vercel — fix them here, where the feedback loop is seconds not minutes.

### 1.4 Have your Supabase keys ready

From Supabase → Project Settings → API:

- Project URL
- `anon` / publishable key — safe to expose, protected by RLS
- `service_role` key — **bypasses RLS**, server-only, never in a `VITE_` var

> `SUPABASE_SERVICE_ROLE_KEY` is currently missing from your local
> `server/.env`. Staff login and the staff checks in
> `middleware/auth.js` fall back to the anon client without it, so the
> **admin dashboard needs this** to work.

---

## Part 2 — Deploy the API

1. Push to GitHub.
2. **vercel.com → Add New → Project → import `404Temi/MaisonCenter`.**
3. Settings:

   | Setting | Value |
   | --- | --- |
   | Project Name | `maisoncenter-api` |
   | Root Directory | `./` (leave as the repo root) |
   | Framework Preset | **Other** |
   | Build Command | *leave empty* |
   | Output Directory | *leave empty* |
   | Node.js Version | 22.x |

4. Environment Variables:

   | Name | Value | Notes |
   | --- | --- | --- |
   | `SUPABASE_URL` | `https://xxxx.supabase.co` | |
   | `SUPABASE_ANON_KEY` | your anon key | |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service role key | needed for staff login |
   | `ALLOW_VERCEL_PREVIEWS` | `true` | lets preview deploys pass CORS |
   | `CORS_ORIGINS` | *leave blank for now* | filled in at Part 5 |

5. **Deploy**, then check:

   ```
   https://maisoncenter-api.vercel.app/health   ->  {"ok":true}
   ```

   Note the domain — you need it twice below.

**How this works:** `api/index.js` exports the Express app (an Express
app *is* a `(req, res)` handler, so no adapter is needed).
`server/index.js` skips `app.listen()` when `process.env.VERCEL` is set,
so the same file still runs as a normal server locally. The root
`vercel.json` rewrites every path to that function, and `req.url` keeps
the original path — so `/api/rooms` still matches `app.use("/api", ...)`.

---

## Part 3 — Deploy the customer site

**Add New → Project → import the same repo again.** Set all five fields
explicitly; do not rely on auto-detection.

| Setting | Value |
| --- | --- |
| Project Name | `maisoncenter-client` |
| Root Directory | **`client`** ← click Edit and pick the folder |
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 22.x |

Environment Variables:

| Name | Value |
| --- | --- |
| `VITE_API_URL` | `https://maisoncenter-api.vercel.app/api` |
| `VITE_APP_NAME` | `Hotel Booking` |

Mind the `/api` suffix — the code appends paths like `/rooms/types`
straight onto this value.

> **The Framework Preset trap.** Left as **Other**, Vercel skips the
> build entirely and serves `client/public/` — which has no
> `index.html`, so every route returns `404: NOT_FOUND`. The giveaway is
> a suspiciously fast (<15s) deploy plus the log warning *"Build output
> contains no functions or static directory."*
>
> Use `npm run build`, not Vite's default `vite build` — your script is
> `tsc -b && vite build` and you want the type check running too.

---

## Part 4 — Deploy the admin dashboard

Identical to Part 3, including the Framework Preset trap.

| Setting | Value |
| --- | --- |
| Project Name | `maisoncenter-admin` |
| Root Directory | **`admin`** |
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |

| Name | Value |
| --- | --- |
| `VITE_API_URL` | `https://maisoncenter-api.vercel.app/api` |
| `VITE_APP_NAME` | `Hotel Admin` |

`client/vercel.json` and `admin/vercel.json` handle SPA routing — without
them, refreshing on `/rooms` returns 404.

---

## Part 5 — Point CORS back at the front ends

1. **`maisoncenter-api`** → Settings → Environment Variables → set
   `CORS_ORIGINS`:

   ```
   https://maisoncenter-client.vercel.app,https://maisoncenter-admin.vercel.app
   ```

   Comma-separated, **no trailing slashes**, your real domains.

2. **Redeploy the API.** Env changes don't apply to a running
   deployment — Deployments → ⋯ → Redeploy.

Leaving `CORS_ORIGINS` blank allows every origin. Fine for an afternoon
demo, not for production.

---

## Part 6 — Environment variable reference

### API project (`maisoncenter-api`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | **yes** | Throws at import if missing |
| `SUPABASE_ANON_KEY` | **yes** | Throws at import if missing |
| `SUPABASE_SERVICE_ROLE_KEY` | for admin | Staff login and staff checks |
| `CORS_ORIGINS` | recommended | Blank = allow all |
| `ALLOW_VERCEL_PREVIEWS` | optional | Trust `*.vercel.app` preview URLs |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` | later | Absent = email disabled |
| `FROM_EMAIL` `FROM_NAME` `REPLY_TO` `BCC_EMAIL` | later | Sender identity |
| `HOTEL_NAME` `HOTEL_ADDRESS` `HOTEL_PHONE` `HOTEL_EMAIL` | later | Shown in the email |
| `SITE_URL` | later | Builds the "Manage your booking" link |
| `EMAIL_TIMEOUT_MS` | optional | Default 8000 (serverless only) |

Do **not** set `PORT` on Vercel — serverless doesn't bind a port.

### Front-end projects

| Variable | Notes |
| --- | --- |
| `VITE_API_URL` | Must end in `/api` |
| `VITE_APP_NAME` | Display only |

Only `VITE_`-prefixed variables reach the browser, and they're **inlined
at build time**. Changing one requires a redeploy, not a restart. Never
put a secret in one.

---

## Part 7 — Smoke test

Walk the flow your client will:

- [ ] **Home** loads with images
- [ ] **Rooms** lists room types *(proves API + Supabase RLS)*
- [ ] **Book** — pick dates, submit, get an `MC-XXXXXXXX` code back
- [ ] **My Booking** — retrieve it with that code + the email used
- [ ] Refresh directly on `/rooms` — loads, doesn't 404 *(proves SPA rewrites)*
- [ ] Admin — sign in, see the booking you just made
- [ ] `/health` on the API returns `{"ok":true}`

---

## Part 8 — Troubleshooting

Every row below is a failure actually seen on this project.

| Symptom | Cause and fix |
| --- | --- |
| `npm run build` exits **254** | Committed `client/node_modules`. Part 1.1. |
| `404: NOT_FOUND` everywhere, deploy <15s, *"Build output contains no functions or static directory"* | Framework Preset is **Other**, so the build never ran. Set it to **Vite** + `npm run build` + `dist`, then redeploy. |
| Site loads but Rooms is empty; DevTools shows calls to `localhost:3000` | `VITE_API_URL` unset, or set *after* the build. Set it, then **redeploy**. |
| `blocked by CORS policy` | `CORS_ORIGINS` missing that exact origin, or the API wasn't redeployed after editing it. Check for trailing slashes. |
| Preview deploys fail CORS, production works | Preview URLs are randomly generated. Set `ALLOW_VERCEL_PREVIEWS=true`. |
| API 500s instantly on every route | `SUPABASE_URL` / `SUPABASE_ANON_KEY` missing — `lib/supabase.js` throws at import. Check Runtime Logs. |
| Admin login fails, customer site fine | `SUPABASE_SERVICE_ROLE_KEY` missing on the API project. |
| Refreshing `/rooms` 404s | SPA rewrites missing — confirm `client/vercel.json` / `admin/vercel.json` were committed. |
| `404` JSON like `{"error":"Not found: GET /"}` | You hit the **API** project, not a front end. That's the Express 404 — it means the API is alive. |
| First request after idle is slow | Serverless cold start. Normal. |

**Reading errors:** project → **Logs** → Runtime Logs (for API errors),
or the failed deployment → **Build Logs** (for build errors).
`console.warn` / `console.error` from the API land in Runtime Logs.

---

## Part 9 — Email once you're ready

Add the `SMTP_*`, `FROM_*`, `HOTEL_*` and `SITE_URL` variables to the
**API** project, then redeploy. Full walkthrough in
[docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md).

One serverless difference is already handled in code but worth knowing.
On a normal server the confirmation email is fired without `await` so
the guest gets their code instantly. On serverless that's unsafe —
Vercel can freeze the instance the moment you respond, so a detached
promise silently never runs. `routes/bookings.js` therefore detects
`process.env.VERCEL` and awaits the send, capped at 8 seconds
(`EMAIL_TIMEOUT_MS`) so a hanging mail server can't stall the booking.
SMTP connection pooling is disabled on serverless for the same reason.

---

## Part 10 — Before this is production

- [ ] Custom domain on the client project
- [ ] `ALLOW_VERCEL_PREVIEWS=false`; `CORS_ORIGINS` set to real domains
- [ ] SMTP configured, `SITE_URL` pointing at the real domain
- [ ] **Admin dashboard access-restricted** — it's publicly reachable and
      Supabase auth is the only thing in front of it. Consider Vercel
      Password Protection.
- [ ] Supabase RLS policies reviewed against the live anon key
- [ ] Tailwind moved off the CDN (`client/index.html` currently loads
      `cdn.tailwindcss.com`, which warns in production)
- [ ] Cancellation emails implemented if you need them
- [ ] `git ls-files | grep -E "node_modules/|/\.env$"` returns nothing
