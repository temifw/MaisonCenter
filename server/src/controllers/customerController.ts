import type { Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { CreateBookingSchema, CancelMyBookingSchema } from "../utils/validators";
import type { AuthedRequest } from "../middleware/requireAuth";

export async function createMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const parsed = CreateBookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const payload = parsed.data;

  // TODO next step: implement availability check + compute pricing
  const price_total_cents = 0;

  // Look up email/name from auth user (good for snapshotting)
  const { data: userResp } = await supabaseAdmin.auth.admin.getUserById(req.userId);
  const email = userResp?.user?.email ?? null;

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      user_id: req.userId,
      room_id: payload.room_id,
      check_in: payload.check_in,
      check_out: payload.check_out,
      guests_count: payload.guests_count,
      customer_email: email ?? "unknown@example.com",
      customer_name: userResp?.user?.user_metadata?.full_name ?? null,
      price_total_cents,
      status: "pending"
    })
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ booking: data });
}

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

export async function cancelMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const bookingId = req.params.id;

  const parsed = CancelMyBookingSchema.safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // Only allow cancel if it belongs to the user
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