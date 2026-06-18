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

    // Best-effort confirmation email; never fail the booking over it.
    if (b.guestEmail) {
      sendBookingEmail(req.db, data, b.guestName, b.guestEmail).catch((e) =>
        console.warn("Confirmation email failed:", e?.message || e)
      );
    }

    res.status(201).json(data);
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
