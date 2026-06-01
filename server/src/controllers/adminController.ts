import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { UpdateBookingStatusSchema } from "../utils/validators";

export async function listBookings(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ bookings: data });
}

export async function updateBookingStatus(req: Request, res: Response) {
  const bookingId = req.params.id;
  const parsed = UpdateBookingStatusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status: parsed.data.status })
    .eq("id", bookingId)
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ booking: data });
}