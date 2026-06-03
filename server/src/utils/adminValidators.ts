import { z } from "zod";

export const CreateRoomTypeSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  base_price_cents: z.number().int().min(0),
  max_guests: z.number().int().min(1).max(20)
});

export const CreateRoomSchema = z.object({
  room_number: z.string().min(1),
  room_type_id: z.string().uuid(),
  is_active: z.boolean().optional()
});

export const UpdateRoomSchema = z.object({
  is_active: z.boolean().optional(),
  room_type_id: z.string().uuid().optional()
});