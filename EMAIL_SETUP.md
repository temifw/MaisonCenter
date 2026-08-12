# Booking Confirmation Emails — Setup Guide

This guide takes you from nothing to a working confirmation email in about
20 minutes. The code is already written and wired in; what's left is the
part only you can do — creating the provider account and pasting the
credentials into `server/.env`.

---

## What was built

| File | Role |
| --- | --- |
| `server/lib/email.js` | Creates the SMTP connection and sends the mail. Rewritten to use Nodemailer instead of the old Supabase Edge Function. |
| `server/lib/emailTemplate.js` | Builds the HTML and plain-text bodies. |
| `server/routes/bookings.js` | Fires the email after `create_booking` succeeds. |
| `server/scripts/test-email.js` | Tests SMTP without making a real booking. |
| `server/.env.example` | Every variable you need, documented. |

**What the guest receives:** booking code, room type and number, check-in
and check-out (formatted with times), number of nights, guest count,
status, price per night, total, their special requests, a "Manage your
booking" link, and your hotel's contact details.

---

## Part 1 — Why SMTP, and what it actually is

SMTP (Simple Mail Transfer Protocol) is the language mail servers speak.
Your Express server doesn't *become* a mail server — it logs into
someone else's and asks them to deliver on your behalf. That relay
provider owns the reputation, the IP warm-up, and the DKIM signing that
decide whether your mail lands in the inbox or the spam folder.

You need four things from any provider:

| Setting | What it is |
| --- | --- |
| **Host** | The server address, e.g. `smtp-relay.brevo.com` |
| **Port** | `587` (STARTTLS), `465` (implicit TLS), or `2525` (fallback) |
| **Username** | A login string the provider generates |
| **Password** | An **SMTP key**, not your account password |

> **Do not try to send mail directly from your own server.** Residential
> and most cloud IPs are on blocklists by default, port 25 is usually
> blocked by the host, and without SPF/DKIM/DMARC your mail is spam.
> A relay is not a shortcut; it's the correct architecture.

### On ports and TLS — the single most common mistake

- **Port 587** starts as plain text then upgrades to encrypted via the
  `STARTTLS` command. Nodemailer does this automatically when
  `secure: false`.
- **Port 465** is encrypted from the first byte ("implicit TLS"), which
  needs `secure: true`.

Set these backwards and the connection **hangs until timeout** with no
useful error. The code auto-derives it — `SMTP_SECURE` defaults to true
only when the port is 465 — so just leave `SMTP_SECURE` unset unless you
have a reason.

---

## Part 2 — Create the Brevo account

Brevo's free tier is 300 emails/day with no card required, which is
comfortably more than a hotel of this size sends in confirmations.

1. Go to **https://www.brevo.com** and sign up. Use your real hotel
   details — relay providers manually review new accounts and reject
   ones that look like throwaways.
2. Confirm your email address and complete the onboarding questions.
   When asked what you'll send, choose **transactional** (not
   marketing). This matters: transactional mail is reviewed differently
   and Brevo may otherwise gate the SMTP relay behind extra approval.
3. Your account may sit in review for a few hours on first signup. This
   is normal. SMTP credentials appear once it's active.

### Get the SMTP credentials

1. Click your account name (top right) → **SMTP & API**.
2. Open the **SMTP** tab.
3. You'll see:
   - **Server**: `smtp-relay.brevo.com`
   - **Port**: `587`
   - **Login**: something like `9a1b2c001@smtp-brevo.com`
   - **Password / SMTP key**: click **Generate a new SMTP key**, name it
     `maisoncenter-server`, and copy the value — it starts with
     `xsmtpsib-` and is shown **only once**.

> The **Login is not your account email address.** Pasting
> `you@gmail.com` into `SMTP_USER` is the number one cause of the
> `535 authentication failed` error. Copy the `@smtp-brevo.com` string.

---

## Part 3 — Verify a sender address

A provider won't let you claim to be an address you haven't proven you
control. You have two options.

### Option A — Single sender (fast, fine to start)

1. **Senders, Domains & Dedicated IPs** → **Senders** → **Add a sender**.
2. Enter the name and an address you can read (e.g. your Gmail).
3. Click the confirmation link Brevo emails you.
4. Set `FROM_EMAIL` in `.env` to exactly that address.

This works immediately. The downside is guests see a generic address, and
deliverability is weaker because you're borrowing Brevo's domain
reputation rather than building your own.

### Option B — Your own domain (do this before going live)

1. **Senders, Domains & Dedicated IPs** → **Domains** → **Add a domain**.
2. Enter `yourdomain.com`.
3. Brevo gives you DNS records to add at your registrar (Namecheap,
   Cloudflare, GoDaddy, wherever the domain lives):
   - a **TXT** record to prove ownership (`brevo-code:...`)
   - a **DKIM** record — cryptographically signs your mail
   - a **DMARC** record — tells receivers what to do with mail that
     fails checks
   - Brevo may also ask you to include their **SPF** record
4. Add each record exactly as shown. Watch the host/name field: many
   registrars want just `mail._domainkey`, not the full
   `mail._domainkey.yourdomain.com`. Appending the domain twice is the
   usual reason verification fails.
5. DNS propagation takes 15 minutes to a few hours. Click **Verify** in
   Brevo once it's live.
6. Now set `FROM_EMAIL=bookings@yourdomain.com`.

**Why bother:** without DKIM/SPF on your own domain, Gmail and Outlook
treat your confirmations as unauthenticated. Guests miss check-in
details, then call the front desk. It's worth the hour.

---

## Part 4 — Configure the project

Copy the example file and fill it in:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env`:

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=9a1b2c001@smtp-brevo.com        # from Brevo > SMTP & API > SMTP
SMTP_PASS=xsmtpsib-xxxxxxxxxxxxxxxxxxxx    # the generated SMTP key

FROM_EMAIL=bookings@yourdomain.com         # a VERIFIED sender
FROM_NAME=Maison Center
REPLY_TO=frontdesk@yourdomain.com          # where guest replies go
BCC_EMAIL=frontdesk@yourdomain.com         # optional: copy the front desk

HOTEL_NAME=Maison Center
HOTEL_ADDRESS=12 Example Street, City
HOTEL_PHONE=+1 555 000 0000
HOTEL_EMAIL=hello@yourdomain.com
SITE_URL=https://yourdomain.com            # builds the /my-booking link
CURRENCY_SYMBOL=$
```

Install the dependency (already added to `package.json`):

```bash
npm install
```

`server/.env` is already covered by `.gitignore`. Confirm with
`git status` that it isn't staged before you commit — an SMTP key in a
public repo gets scraped and used for spam within hours.

---

## Part 5 — Test before touching the booking flow

Three commands, in increasing order of commitment:

```bash
# 1. Credentials only — connects, authenticates, sends nothing.
npm run email:verify

# 2. Render the design to email-preview.html and open it in a browser.
npm run email:preview

# 3. Send a real test confirmation to yourself.
node server/scripts/test-email.js you@example.com
```

The script prints your config (masking the password length), tells you
exactly which step failed, and suggests likely causes. On success you'll
get a fully populated sample booking — code `MC-TESTCODE`, a Deluxe King
Suite, three nights — in your inbox.

**Check the spam folder.** The first email from a new sender very often
lands there. Marking it "not spam" once helps, but the real fix is
Option B in Part 3.

Then run the real thing:

```bash
npm run dev                 # backend
cd client && npm run dev    # customer site
```

Make a booking at `/book` with a real email address. The server logs
`[email] Confirmation MC-XXXXXXXX -> guest@example.com`.

Optionally set `VERIFY_SMTP_ON_BOOT=true` so the server checks the
credentials at startup rather than at the first booking.

---

## Part 6 — How it behaves

**Email never breaks a booking.** In `server/routes/bookings.js` the send
is fired without `await`:

```js
sendBookingEmail(req.db, data, b.guestName, b.guestEmail).catch((e) =>
  console.warn(`[bookings] Confirmation email failed for ${data?.booking_code}:`, e?.message)
);
```

The guest sees their confirmation screen and booking code immediately.
If the mail provider is down, the booking is still in the database and
the failure is logged. This is deliberate: a reservation is worth far
more than a receipt, and the guest can always retrieve it at
`/my-booking` with their code.

**Missing config degrades gracefully.** With no SMTP variables set, the
module logs one warning at startup and no-ops. A fresh clone runs fine
without credentials.

**Both HTML and plain text are sent.** Spam filters penalise HTML-only
mail, and some corporate clients strip HTML entirely.

**Guest input is escaped.** Names and special requests pass through an
HTML escaper, so a guest typing `<script>` can't break the layout or
inject markup.

---

## Part 7 — Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| `535 Authentication failed` (`EAUTH`) | `SMTP_USER` is your account email instead of the `xxx@smtp-brevo.com` login, or the key was regenerated. Re-copy both from **SMTP & API → SMTP**. |
| Connection hangs, then `ETIMEDOUT` | Port/TLS mismatch — using 465 with `SMTP_SECURE=false`, or 587 with `true`. Unset `SMTP_SECURE` and let the code derive it. If it persists, your host blocks 587: try `SMTP_PORT=2525`. |
| `Unauthorized sender` / `sender not valid` | `FROM_EMAIL` isn't a verified sender. Part 3. |
| Email sends but lands in spam | You're on a shared IP with an unverified domain. Do Part 3 Option B — DKIM and SPF are what fix this. |
| Nothing sends, no error at all | SMTP vars missing, so the module no-ops. Check the startup log for the `[email] SMTP is not configured` warning. |
| `ENOTFOUND smtp-relay.brevo.com` | Typo in `SMTP_HOST`, or the server has no outbound DNS. |
| Works locally, fails when deployed | Environment variables weren't set on the host. Render/Railway/Fly each need them added in their own dashboard — `.env` is not deployed. |
| Dates appear one day early | Already handled: `date` columns are parsed with an explicit `T00:00:00` to stop timezone shifting. Don't remove it. |

---

## Part 8 — Before going live

- [ ] Domain verified with DKIM, SPF and DMARC (Part 3 Option B)
- [ ] `FROM_EMAIL` on your own domain
- [ ] `SITE_URL` set to the production URL, not `localhost`
- [ ] `REPLY_TO` monitored by an actual person
- [ ] Test send to a Gmail **and** an Outlook address — they filter differently
- [ ] `server/.env` confirmed absent from git history
- [ ] SMTP key rotated if it was ever pasted into chat, a screenshot, or a commit
- [ ] Env vars configured on the production host
- [ ] Decide on cancellation emails (see below)

---

## Part 9 — Natural next steps

**Cancellation emails.** `POST /api/bookings/:id/cancel` currently sends
nothing. The pattern is identical — add a `buildCancellationHtml` to
`emailTemplate.js` and call it from the cancel route.

**Pre-arrival reminders.** A Supabase scheduled function or a cron job
querying bookings with `check_in = tomorrow` covers this.

**Retry on failure.** Right now a failed send is logged and forgotten. If
that becomes a problem, add an `email_log` table and retry the failures
on a schedule rather than adding retry loops inline.

**Retire the old edge function.** `supabase/functions/send-booking-email/`
is now dead code — it used Resend's HTTP API and was never reachable
because `SUPABASE_SERVICE_ROLE_KEY` was absent from `server/.env`. Delete
it once the SMTP path is confirmed working in production.

---

## Appendix — Using a different provider

Only the four SMTP values change; the code is provider-agnostic.

| Provider | Host | Port | Username |
| --- | --- | --- | --- |
| Brevo | `smtp-relay.brevo.com` | 587 | `xxxxx@smtp-brevo.com` |
| Resend | `smtp.resend.com` | 587 | `resend` |
| Mailgun | `smtp.mailgun.org` | 587 | `postmaster@mg.yourdomain.com` |
| SendGrid | `smtp.sendgrid.net` | 587 | `apikey` (literally) |
| Postmark | `smtp.postmarkapp.com` | 587 | your server token |
| Gmail | `smtp.gmail.com` | 587 | your Gmail address |

Gmail additionally requires 2-Step Verification enabled and an **App
Password** (Google Account → Security → App passwords) — your normal
password will not work. It's capped around 500/day and sends from your
personal address, so treat it as a development convenience rather than
something to run a hotel on.
