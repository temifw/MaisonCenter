// =====================================================================
// Express API entry point.
//
// Local:  npm run dev  (nodemon)  or  npm start  -> listens on :3000
// Vercel: api/index.js imports this module and hands `app` to the
//         serverless runtime. See DEPLOY.md.
//
// The app is built and exported unconditionally; only the app.listen()
// call at the bottom is guarded, because a serverless function must not
// bind a port.
// =====================================================================

// On Vercel there is no .env file — config comes from the dashboard.
// dotenv silently no-ops when the file is missing, so this is safe.
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { attachAuth } = require("./middleware/auth");
const routes = require("./routes");

const app = express();

// Vercel terminates TLS at its edge and forwards X-Forwarded-* headers.
// Without this, req.protocol and req.ip report the proxy, not the client.
app.set("trust proxy", 1);

// ----- CORS ----------------------------------------------------------
// CORS_ORIGINS is a comma-separated allow-list of front-end origins.
// Empty (local dev) = allow everything.
//
// Vercel gives every preview deploy a NEW random subdomain
// (maisoncenter-client-abc123-you.vercel.app), so an exact-match list
// would break previews. Setting ALLOW_VERCEL_PREVIEWS=true additionally
// trusts any *.vercel.app origin — convenient while demoing, but turn it
// off once you're on a real domain.
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === "true";

function isOriginAllowed(origin) {
  // Same-origin, curl, and server-to-server requests send no Origin header.
  if (!origin) return true;
  if (!allowedOrigins.length) return true; // dev: allow all
  if (allowedOrigins.includes(origin.replace(/\/+$/, ""))) return true;
  if (allowVercelPreviews && /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  return false;
}

app.use(
  cors({
    origin(origin, cb) {
      if (isOriginAllowed(origin)) return cb(null, true);
      // Deliberately NOT an error. Throwing here produces a 500 with a
      // stack trace for what is a routine, expected event. Returning
      // false just omits Access-Control-Allow-Origin, which is what
      // actually blocks the browser — CORS is enforced client-side, so
      // this is the correct signal. Real authorisation is Supabase JWT
      // plus row-level security, not this list.
      console.warn(`[cors] Blocked origin: ${origin}`);
      cb(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

// Every request gets req.db (+ req.user when a valid token is present).
app.use(attachAuth);

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", routes);

// 404 for unknown API routes.
app.use((req, res) => res.status(404).json({ error: `Not found: ${req.method} ${req.path}` }));

// Central error handler — keeps route code tidy (they just call next(e)).
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("[API error]", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// ----- Listen (local only) -------------------------------------------
// A serverless function is handed each request by the platform; it must
// never bind a port. process.env.VERCEL is set automatically by Vercel.
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);

    // Optional: prove the SMTP credentials work at boot instead of
    // discovering they're wrong when the first guest books.
    if (process.env.VERIFY_SMTP_ON_BOOT === "true") {
      require("./lib/email")
        .verifyTransport()
        .then(() => console.log("[email] SMTP connection verified."))
        .catch((e) => console.warn("[email] SMTP verification FAILED:", e?.message || e));
    }
  });
}

module.exports = app;
module.exports.isOriginAllowed = isOriginAllowed;
