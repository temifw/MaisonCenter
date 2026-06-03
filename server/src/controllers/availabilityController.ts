import type { Request, Response } from "express";
import { AvailabilityQuerySchema } from "../utils/queryValidators";
import { findAvailableRooms } from "../services/availabilityService";
import { computeNights, computeTotalCents } from "../utils/pricing";

export async function listAvailableRooms(req: Request, res: Response) {
  const parsed = AvailabilityQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { check_in, check_out, guests } = parsed.data;

  if (check_out <= check_in) {
    return res.status(400).json({ error: "check_out must be after check_in" });
  }

  const nights = computeNights(check_in, check_out);
  if (nights <= 0) return res.status(400).json({ error: "Invalid date range" });

  try {
    const rooms = await findAvailableRooms({
      checkIn: check_in,
      checkOut: check_out,
      guests
    });

    const pricedRooms = rooms.map((r: any) => {
      const base = r.room_type?.base_price_cents ?? 0;
      return {
        ...r,
        pricing: {
          nights,
          base_price_cents: base,
          total_cents: computeTotalCents(nights, base)
        }
      };
    });

    return res.json({
      query: { check_in, check_out, guests },
      pricing: { nights },
      rooms: pricedRooms
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? "Server error" });
  }
}