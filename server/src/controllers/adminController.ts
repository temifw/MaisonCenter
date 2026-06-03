import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { AppError } from "../utils/AppError";
import { validateBody } from "../utils/validate";
import { ok } from "../utils/respond";
import { UpdateBookingStatusSchema } from "../utils/validators";

/**
 * GET /api/admin/bookings
 * Admin only
 * Response: { data: { bookings: Booking[] } }
 */
export async function listBookings(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new AppError(error.message, { statusCode: 500, code: "DB_ERROR" });

  return ok(res, { bookings: data ?? [] });
}

/**
 * PATCH /api/admin/bookings/:id/status
 * Body: { status }
 * Response: { data: Booking }
 */
export async function updateBookingStatus(req: Request, res: Response) {
  const bookingId = req.params.id;
  const { status } = validateBody(UpdateBookingStatusSchema, req);

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select("*")
    .maybeSingle();

  if (error) throw new AppError(error.message, { statusCode: 500, code: "DB_ERROR" });
  if (!data) throw new AppError("Booking not found", { statusCode: 404, code: "BOOKING_NOT_FOUND" });

  return ok(res, data);
}