import type { Request, Response } from "express";
import { AvailabilityQuerySchema } from "../utils/queryValidators";
import { findAvailableRooms } from "../services/availabilityService";
import { computeNights, computeTotalCents } from "../utils/pricing";
import { validateQuery } from "../utils/validate";
import { AppError } from "../utils/AppError";
import { ok } from "../utils/respond";

export async function listAvailableRooms(req: Request, res: Response) {
  const { check_in, check_out, guests } = validateQuery(AvailabilityQuerySchema, req);

  if (check_out <= check_in) {
    throw new AppError("check_out must be after check_in", { statusCode: 400, code: "INVALID_DATE_RANGE" });
  }

  const nights = computeNights(check_in, check_out);
  if (nights <= 0) {
    throw new AppError("Invalid date range", { statusCode: 400, code: "INVALID_DATE_RANGE" });
  }

  const rooms = await findAvailableRooms({ checkIn: check_in, checkOut: check_out, guests });

  const results = rooms.map((r: any) => ({
    id: r.room_id,
    room_number: r.room_number,
    room_type: {
      id: r.room_type_id,
      name: r.room_type_name,
      base_price_cents: r.base_price_cents,
      max_guests: r.max_guests
    },
    pricing: {
      nights,
      base_price_cents: r.base_price_cents,
      total_cents: computeTotalCents(nights, r.base_price_cents)
    }
  }));

  return ok(res, {
    query: { check_in, check_out, guests },
    pricing: { nights },
    rooms: results
  });
}