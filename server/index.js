// =====================================================================
// Express API entry point.
// Run with:  npm run dev   (nodemon)  or  npm start
// Serves on http://localhost:3000/api to match the frontends' VITE_API_URL.
// =====================================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { attachAuth } = require("./middleware/auth");
const routes = require("./routes");

const app = express();

// Allow the two Vite dev servers (and anything in CORS_ORIGINS) to call us.
const origins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(cors(origins.length ? { origin: origins } : {})); // {} = allow all (dev)

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));

module.exports = app;
