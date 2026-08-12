// =====================================================================
// /api/bookings — create (guest or logged-in or walk-in), list, cancel,
// and the admin calendar. The atomic, race-proof work happens in the
// create_booking / cancel_booking RPCs; this layer just routes and maps
// errors to sensible HTTP status codes.
// =====================================================================

const express = require("express");
const router = express.Router();
const { requireAuth, requireStaff } = require("../middleware/auth");
const { sendBookingEmail } = require("../lib/email");

// On serverless the function may be frozen the moment we respond, so a
// detached email promise would never finish. See the note in POST /.
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const EMAIL_TIMEOUT_MS = Number(process.env.EMAIL_TIMEOUT_MS || 8000);

// Wait for `promise`, but give up after `ms` so a hanging mail server
// can't hold the booking response open. The send may still complete;
// we simply stop waiting for it.
function withTimeout(promise, ms, ref) {
  let timer;
  return Promise.race([
    promise,
    new Promise((resolve) => {
      timer = setTimeout(() => {
        console.warn(`[bookings] Confirmation email for ${ref} exceeded ${ms}ms — not waiting.`);
        resolve();
      }, ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

// Turn a Postgres RPC error message into an HTTP status. Conflicts
// (room taken / sold out) are 409 so the UI can prompt "pick again".
function sendRpcError(res, error) {
  const msg = error.message || "Request failed";
  if (/already booked|just booked|no rooms|not available/i.test(msg)) {
    return res.status(409).json({ error: msg });
  }
  return res.status(400).json({ error: msg });
}

// POST /api/bookings  -> create a booking
// Works for guest checkout (no token), logged-in customers (token ->
// profile linked), and staff walk-ins (source: 'walk_in', roomId set).
router.post("/", async (req, res, next) => {
  try {
    const b = req.body;
    const { data, error } = await req.db.rpc("create_booking", {
      p_room_type_id: b.roomTypeId,
      p_check_in: b.checkIn,
      p_check_out: b.checkOut,
      p_guest_name: b.guestName,
      p_guest_email: b.guestEmail ?? null,
      p_guest_phone: b.guestPhone ?? null,
      p_guests_count: b.guestsCount ?? 1,
      p_special_requests: b.specialRequests ?? null,
      p_source: b.source ?? "online",
      p_room_id: b.roomId ?? null,
      p_profile_id: req.user ? req.user.id : null,
    });
    if (error) return sendRpcError(res, error);

    // Best-effort confirmation email. Either way the booking is already
    // committed, so a mail failure is logged and never surfaced.
    //
    // The dispatch strategy differs by environment:
    //   Long-lived server -> fire and forget. The guest gets their code
    //     instantly and the send finishes in the background.
    //   Serverless (Vercel) -> we must await. Once the response is sent
    //     the platform may freeze or kill the instance, so a detached
    //     promise would silently never run. deliverBookingEmail caps the
    //     wait so a hanging SMTP server can't stall the booking response.
    if (b.guestEmail) {
      const ref = data?.booking_code || data?.id;
      const send = sendBookingEmail(req.db, data, b.guestName, b.guestEmail).catch((e) =>
        console.warn(`[bookings] Confirmation email failed for ${ref}:`, e?.message || e)
      );
      if (isServerless) await withTimeout(send, EMAIL_TIMEOUT_MS, ref);
    }

    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

// POST /api/bookings/lookup  -> retrieve one booking by code + email (PUBLIC)
// Replaces customer login: a guest finds their reservation using the
// booking code we gave them plus the email on the booking. The database
// RPC only returns a row when BOTH match, and only exposes safe fields.
router.post("/lookup", async (req, res, next) => {
  try {
    const { code, email } = req.body || {};
    if (!code || !email) {
      return res.status(400).json({ error: "Booking code and email are required." });
    }
    const { data, error } = await req.db.rpc("get_booking_by_code", {
      p_code: code,
      p_email: email,
    });
    if (error) return res.status(400).json({ error: error.message });
    if (!data) {
      // Same message whether the code is wrong or the email doesn't match,
      // so we don't reveal which codes exist.
      return res.status(404).json({ error: "No booking found for that code and email." });
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/bookings/calendar?from=&to=  (staff)
// Active bookings overlapping the window, for the admin calendar.
// Declared BEFORE "/" semantics don't clash, but kept explicit.
router.get("/calendar", requireStaff, async (req, res, next) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ error: "from and to are required" });
    }
    const { data, error } = await req.db
      .from("bookings")
      .select(
        "id, check_in, check_out, status, source, rooms(room_number), guests(full_name, phone)"
      )
      .in("status", ["pending", "confirmed", "checked_in"])
      .lte("check_in", to)
      .gte("check_out", from)
      .order("check_in");
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/bookings  -> list bookings
// RLS does the scoping automatically: staff see everything, a regular
// customer sees only their own.
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await req.db
      .from("bookings")
      .select(
        "*, rooms(room_number, room_types(name)), guests(full_name, email, phone)"
      )
      .order("check_in", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// POST /api/bookings/:id/cancel  -> cancel (owner or staff; enforced in RPC)
router.post("/:id/cancel", requireAuth, async (req, res, next) => {
  try {
    const { error } = await req.db.rpc("cancel_booking", {
      p_booking_id: req.params.id,
    });
    if (error) return sendRpcError(res, error);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
