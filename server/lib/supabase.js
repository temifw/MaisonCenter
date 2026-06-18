// =====================================================================
// Supabase clients for the Express backend.
//
// THREE clients, for three trust levels:
//   supabaseAdmin  - service_role key, BYPASSES RLS. Only for trusted
//                    server tasks: validating tokens, reading the staff
//                    list, invoking Edge Functions. NEVER sent to a browser.
//   supabaseAnon   - anon key, behaves as the "anon" Postgres role under
//                    RLS. Used for public reads and guest-checkout bookings.
//   userClient(t)  - acts AS the logged-in user by forwarding their JWT,
//                    so auth.uid() and RLS resolve exactly as designed.
// =====================================================================

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY. Copy .env.example to .env and fill them in."
  );
}

// Service-role client (optional but required for login/staff checks).
const supabaseAdmin = SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

// Anonymous client (public reads, guest bookings).
const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Build a request-scoped client carrying the user's access token.
// Falls back to the anon client when there's no token (guest checkout).
function userClient(token) {
  if (!token) return supabaseAnon;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

module.exports = { supabaseAdmin, supabaseAnon, userClient };
