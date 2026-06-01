import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { CreateBookingSchema } from "../utils/validators";

export async function listRoomTypes(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("room_types")
    .select("*")
    .order("name");

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ room_types: data });
}

export async function createBooking(req: Request, res: Response) {
  const parsed = CreateBookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const payload = parsed.data;

  // NOTE: pricing logic is simplified. You’ll likely compute nights * room_type price.
  const price_total_cents = 0;

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      room_id: payload.room_id ?? null,
      check_in: payload.check_in,
      check_out: payload.check_out,
      guests_count: payload.guests_count,
      customer_email: payload.customer_email,
      customer_name: payload.customer_name ?? null,
      price_total_cents,
      status: "pending"
    })
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ booking: data });
}