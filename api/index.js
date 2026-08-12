// =====================================================================
// api/index.js — Vercel serverless entry point for the Express API.
//
// Vercel treats every file under /api as a function. This one simply
// hands it the Express app: an Express app IS a (req, res) handler, so
// no adapter is needed.
//
// server/index.js skips app.listen() when process.env.VERCEL is set, so
// the same file still runs as a normal server locally.
//
// Routing: the root vercel.json rewrites every path to this function,
// and req.url keeps the ORIGINAL path — so /api/rooms arrives here as
// /api/rooms and matches app.use("/api", routes) unchanged.
// =====================================================================

module.exports = require("../server/index.js");
