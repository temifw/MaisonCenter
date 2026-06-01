import { z } from "zod";

export const CreateBookingSchema = z.object({
  room_id: z.string().uuid().optional(), // optional if you want “auto-assign room later”
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests_count: z.number().int().min(1).max(20),
  customer_email: z.string().email(),
  customer_name: z.string().min(1).optional()
});

export const UpdateBookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "checked_in", "checked_out"])
});