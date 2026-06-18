// =====================================================================
// /api/auth — authentication endpoints backed by Supabase Auth.
// Login returns { token, user } to match the frontend's AuthContext,
// which stores `token` in localStorage and sends it as a Bearer header.
// =====================================================================

const express = require("express");
const router = express.Router();
const { supabaseAnon, supabaseAdmin, userClient } = require("../lib/supabase");
const { requireAuth } = require("../middleware/auth");

// Look up a user's staff row. Prefer the service-role client (bypasses
// RLS), but fall back to reading as the user with their fresh token —
// the staff_self_read RLS policy allows a user to see their own row, so
// this works with only the anon key configured.
async function lookupStaff(userId, accessToken) {
  const db = supabaseAdmin || userClient(accessToken);
  const { data } = await db
    .from("staff")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();
  return data; // null if not staff
}

// POST /api/auth/register  -> create a customer account
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, fullName, phone } = req.body;
    const { data, error } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });
    if (error) return res.status(400).json({ error: error.message });
    // token is null if the project requires email confirmation first.
    res.status(201).json({
      token: data.session?.access_token ?? null,
      user: data.user,
    });
  } catch (e) {
    next(e);
  }
});

// POST /api/auth/login  -> { token, user }
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return res.status(401).json({ error: error.message });

    const staff = await lookupStaff(data.user.id, data.session.access_token);
    res.json({
      token: data.session.access_token,
      user: { ...data.user, isStaff: !!staff, role: staff?.role ?? null },
    });
  } catch (e) {
    next(e);
  }
});

// POST /api/auth/logout
// JWTs are stateless: the client deletes its token. We respond OK (and
// could revoke the refresh token here if desired).
router.post("/logout", requireAuth, (_req, res) => {
  res.json({ ok: true });
});

// GET /api/auth/me  -> current user + profile + staff flag
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { data: profile } = await req.db
      .from("profiles")
      .select("*")
      .eq("id", req.user.id)
      .maybeSingle();
    const { data: staff } = await req.db
      .from("staff")
      .select("id, role")
      .eq("id", req.user.id)
      .maybeSingle();
    res.json({
      user: req.user,
      profile,
      isStaff: !!staff,
      role: staff?.role ?? null,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
