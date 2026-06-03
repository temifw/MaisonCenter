import type { Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import type { AuthedRequest } from "../middleware/requireAuth";
import { AppError } from "../utils/AppError";
import { validateBody } from "../utils/validate";
import { created, ok } from "../utils/respond";
import { CreateBookingSchema } from "../utils/validators";
import { computeNights, computeTotalCents } from "../utils/pricing";

/**
 * POST /api/customer/bookings
 * Creates a booking for authenticated user (confirmed immediately).
 * Response: { data: Booking }
 */
export async function createMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) throw new AppError("Not authenticated", { statusCode: 401, code: "UNAUTHORIZED" });

  const payload = validateBody(CreateBookingSchema, req);

  if (payload.check_out <= payload.check_in) {
    throw new AppError("check_out must be after check_in", { statusCode: 400, code: "INVALID_DATE_RANGE" });
  }

  // 1) Load room + type (active/capacity/pricing)
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

  if (roomResp.error) throw new AppError(roomResp.error.message, { statusCode: 500, code: "DB_ERROR" });
  if (!roomResp.data) throw new AppError("Room not found", { statusCode: 404, code: "ROOM_NOT_FOUND" });
  if (!roomResp.data.is_active) throw new AppError("Room is not active", { statusCode: 409, code: "ROOM_INACTIVE" });

  const roomType = (roomResp.data as any).room_type;
  if (!roomType) throw new AppError("Room type not found for room", { statusCode: 500, code: "DB_ERROR" });

  if (payload.guests_count > roomType.max_guests) {
    throw new AppError(`Max guests for this room type is ${roomType.max_guests}`, {
      statusCode: 400,
      code: "MAX_GUESTS_EXCEEDED"
    });
  }

  // 2) Availability check (application-level)
  const overlapResp = await supabaseAdmin
    .from("bookings")
    .select("id")
    .eq("room_id", payload.room_id)
    .neq("status", "cancelled")
    .lt("check_in", payload.check_out)
    .gt("check_out", payload.check_in)
    .limit(1);

  if (overlapResp.error) throw new AppError(overlapResp.error.message, { statusCode: 500, code: "DB_ERROR" });
  if ((overlapResp.data ?? []).length > 0) {
    throw new AppError("Room is not available for the selected dates", {
      statusCode: 409,
      code: "ROOM_UNAVAILABLE"
    });
  }

  // 3) Pricing (simple)
  const nights = computeNights(payload.check_in, payload.check_out);
  if (nights <= 0) throw new AppError("Invalid date range", { statusCode: 400, code: "INVALID_DATE_RANGE" });

  const price_total_cents = computeTotalCents(nights, roomType.base_price_cents);

  // 4) Snapshot customer email/name from auth user
  const { data: userResp, error: userErr } = await supabaseAdmin.auth.admin.getUserById(req.userId);
  if (userErr) throw new AppError(userErr.message, { statusCode: 500, code: "AUTH_ERROR" });

  const email = userResp?.user?.email;
  const fullName = (userResp?.user?.user_metadata as any)?.full_name ?? null;

  if (!email) {
    throw new AppError("Authenticated user has no email", { statusCode: 500, code: "AUTH_ERROR" });
  }

  // 5) Insert booking (confirmed immediately)
  const insertResp = await supabaseAdmin
    .from("bookings")
    .insert({
      user_id: req.userId,
      room_id: payload.room_id,
      check_in: payload.check_in,
      check_out: payload.check_out,
      guests_count: payload.guests_count,
      customer_email: email,
      customer_name: fullName,
      price_total_cents,
      status: "confirmed"
    })
    .select("*")
    .single();

  if (insertResp.error) {
    const msg = insertResp.error.message ?? "Insert failed";
    // If your exclusion constraint triggers on overlap
    if (msg.toLowerCase().includes("exclude") || msg.toLowerCase().includes("overlap")) {
      throw new AppError("Room is not available for the selected dates", {
        statusCode: 409,
        code: "ROOM_UNAVAILABLE"
      });
    }
    throw new AppError(msg, { statusCode: 500, code: "DB_ERROR" });
  }

  return created(res, insertResp.data);
}

/**
 * GET /api/customer/bookings
 * Response: { data: { bookings: Booking[] } }
 */
export async function listMyBookings(req: AuthedRequest, res: Response) {
  if (!req.userId) throw new AppError("Not authenticated", { statusCode: 401, code: "UNAUTHORIZED" });

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .eq("user_id", req.userId)
    .order("created_at", { ascending: false });

  if (error) throw new AppError(error.message, { statusCode: 500, code: "DB_ERROR" });

  return ok(res, { bookings: data ?? [] });
}

/**
 * POST /api/customer/bookings/:id/cancel
 * Response: { data: Booking }
 */
export async function cancelMyBooking(req: AuthedRequest, res: Response) {
  if (!req.userId) throw new AppError("Not authenticated", { statusCode: 401, code: "UNAUTHORIZED" });

  const bookingId = req.params.id;

  const existingResp = await supabaseAdmin
    .from("bookings")
    .select("id,status")
    .eq("id", bookingId)
    .eq("user_id", req.userId)
    .maybeSingle();

  if (existingResp.error) throw new AppError(existingResp.error.message, { statusCode: 500, code: "DB_ERROR" });
  if (!existingResp.data) throw new AppError("Booking not found", { statusCode: 404, code: "BOOKING_NOT_FOUND" });

  if (existingResp.data.status === "checked_in" || existingResp.data.status === "checked_out") {
    throw new AppError("Cannot cancel a booking that is checked in/out", {
      statusCode: 409,
      code: "CANNOT_CANCEL"
    });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .eq("user_id", req.userId)
    .select("*")
    .maybeSingle();

  if (error) throw new AppError(error.message, { statusCode: 500, code: "DB_ERROR" });
  if (!data) throw new AppError("Booking not found", { statusCode: 404, code: "BOOKING_NOT_FOUND" });

  return ok(res, data);
}