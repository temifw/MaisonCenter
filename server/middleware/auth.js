// =====================================================================
// auth.js — request authentication.
//
// attachAuth runs on EVERY request: it reads the Bearer token (if any),
// attaches a Supabase client scoped to that user (req.db), and looks up
// the user (req.user). Anonymous requests still get an anon req.db so
// public endpoints work.
//
// requireAuth / requireStaff are guards you add to protected routes.
// =====================================================================

const { supabaseAdmin, supabaseAnon, userClient } = require("../lib/supabase");

function getToken(req) {
  const h = req.headers.authorization || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
}

async function attachAuth(req, _res, next) {
  try {
    const token = getToken(req);
    req.token = token;
    req.db = userClient(token); // user-scoped if token present, else anon

    if (token) {
      // Validate the JWT and load the user. getUser verifies the token
      // against Supabase Auth. The anon client can do this too, so the
      // backend works even when no service_role key is configured.
      const validator = supabaseAdmin || supabaseAnon;
      const { data, error } = await validator.auth.getUser(token);
      if (!error && data?.user) req.user = data.user;
    }
    next();
  } catch (e) {
    next(e);
  }
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "Authentication required" });
  next();
}

async function requireStaff(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: "Authentication required" });
    // RLS lets a user read their own staff row; null => not staff.
    const { data } = await req.db
      .from("staff")
      .select("id, role")
      .eq("id", req.user.id)
      .maybeSingle();
    if (!data) return res.status(403).json({ error: "Staff access required" });
    req.staff = data;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { attachAuth, requireAuth, requireStaff, getToken };
