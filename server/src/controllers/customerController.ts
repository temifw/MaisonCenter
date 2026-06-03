import type { Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { CreateBookingSchema, CancelMyBookingSchema } from "../utils/validators";
import type { AuthedRequest } from "../middleware/requireAuth";

/**
 * POST /api/customer/bookings
 * Requires Authorization: Bearer <supabase_access_token>
 *
 * Creates a booking for the authenticated user (1 booking = 1 room).
 * Enforces: room must be available for the selected date range.
 */
export async function createMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const parsed = CreateBookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const payload = parsed.data;

  // Basic date sanity check (DB also enforces check_out > check_in)
  if (payload.check_out <= payload.check_in) {
    return res.status(400).json({ error: "check_out must be after check_in" });
  }

  // 1) Ensure the room exists and is active, and get room_type for capacity/pricing
  const roomResp = await supabaseAdmin
    .from("rooms")
    .select(
      `
      id,
      is_active,
      room_type:room_types (
        id,
        name,
        base_price_cents,
        max_guests
      )
    `
    )
    .eq("id", payload.room_id)
    .maybeSingle();

  if (roomResp.error) return res.status(500).json({ error: roomResp.error.message });
  if (!roomResp.data) return res.status(404).json({ error: "Room not found" });
  if (!roomResp.data.is_active) return res.status(409).json({ error: "Room is not active" });

  const roomType = (roomResp.data as any).room_type;
  if (!roomType) return res.status(500).json({ error: "Room type not found for room" });

  if (payload.guests_count > roomType.max_guests) {
    return res.status(400).json({ error: `Max guests for this room type is ${roomType.max_guests}` });
  }

  // 2) Availability check (application-level)
  // overlap if: existing.check_in < new.check_out AND existing.check_out > new.check_in
  const overlapResp = await supabaseAdmin
    .from("bookings")
    .select("id")
    .eq("room_id", payload.room_id)
    .neq("status", "cancelled")
    .lt("check_in", payload.check_out)
    .gt("check_out", payload.check_in)
    .limit(1);

  if (overlapResp.error) return res.status(500).json({ error: overlapResp.error.message });

  if ((overlapResp.data ?? []).length > 0) {
    return res.status(409).json({ error: "Room is not available for the selected dates" });
  }

  // 3) Calculate price (simple version: nights * base_price)
  // Note: payload.check_in/check_out are YYYY-MM-DD; Date parsing is safe enough for this simple case.
  const checkIn = new Date(payload.check_in + "T00:00:00Z");
  const checkOut = new Date(payload.check_out + "T00:00:00Z");
  const msPerNight = 24 * 60 * 60 * 1000;
  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / msPerNight);

  if (nights <= 0) return res.status(400).json({ error: "Invalid date range" });

  const price_total_cents = nights * roomType.base_price_cents;

  // 4) Snapshot customer info from Supabase Auth user (optional but recommended)
  const { data: userResp, error: userErr } = await supabaseAdmin.auth.admin.getUserById(req.userId);
  if (userErr) return res.status(500).json({ error: userErr.message });

  const email = userResp?.user?.email ?? null;
  const fullName = (userResp?.user?.user_metadata as any)?.full_name ?? null;

  // 5) Insert booking
  // NOTE: if you added the exclusion constraint, it will also protect against race conditions.
    const insertResp = await supabaseAdmin
    .from("bookings")
    .insert({
      user_id: req.userId,
      room_id: payload.room_id,
      check_in: payload.check_in,
      check_out: payload.check_out,
      guests_count: payload.guests_count,
      customer_email: email ?? "unknown@example.com",
      customer_name: fullName,
      price_total_cents,
      status: "confirmed"
    })
    .select("*")
    .single();

  if (insertResp.error) {
    // If you enabled the exclusion constraint, overlap violations can bubble up here.
    // Treat it as a conflict.
    const msg = insertResp.error.message ?? "Insert failed";
    if (msg.toLowerCase().includes("overlap") || msg.toLowerCase().includes("exclude")) {
      return res.status(409).json({ error: "Room is not available for the selected dates" });
    }
    return res.status(500).json({ error: msg });
  }

  return res.status(201).json({
  booking: insertResp.data,
  pricing: { nights, total_cents: price_total_cents }
});
}

/**
 * GET /api/customer/bookings
 * Requires Authorization: Bearer <supabase_access_token>
 */
export async function listMyBookings(req: AuthedRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("user_id", req.userId)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ bookings: data });
}

/**
 * POST /api/customer/bookings/:id/cancel
 * Requires Authorization: Bearer <supabase_access_token>
 *
 * Cancels a booking owned by the authenticated user.
 */
export async function cancelMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const bookingId = req.params.id;

  const parsed = CancelMyBookingSchema.safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // Optional: only allow cancelling pending/confirmed (not checked_in/checked_out)
  const existingResp = await supabaseAdmin
    .from("bookings")
    .select("id,status")
    .eq("id", bookingId)
    .eq("user_id", req.userId)
    .maybeSingle();

  if (existingResp.error) return res.status(500).json({ error: existingResp.error.message });
  if (!existingResp.data) return res.status(404).json({ error: "Booking not found" });

  if (existingResp.data.status === "checked_in" || existingResp.data.status === "checked_out") {
    return res.status(409).json({ error: "Cannot cancel a booking that is checked in/out" });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("user_id", req.userId)
    .select("*")
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Booking not found" });

  return res.json({ booking: data });
}