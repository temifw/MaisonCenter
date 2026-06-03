import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { CreateRoomTypeSchema, CreateRoomSchema, UpdateRoomSchema } from "../utils/adminValidators";

export async function createRoomType(req: Request, res: Response) {
  const parsed = CreateRoomTypeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { data, error } = await supabaseAdmin
    .from("room_types")
    .insert({
      name: parsed.data.name,
      description: parsed.data.description ?? null,
      base_price_cents: parsed.data.base_price_cents,
      max_guests: parsed.data.max_guests
    })
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ room_type: data });
}

export async function createRoom(req: Request, res: Response) {
  const parsed = CreateRoomSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { data, error } = await supabaseAdmin
    .from("rooms")
    .insert({
      room_number: parsed.data.room_number,
      room_type_id: parsed.data.room_type_id,
      is_active: parsed.data.is_active ?? true
    })
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ room: data });
}

export async function updateRoom(req: Request, res: Response) {
  const roomId = req.params.id;
  const parsed = UpdateRoomSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { data, error } = await supabaseAdmin
    .from("rooms")
    .update(parsed.data)
    .eq("id", roomId)
    .select("*")
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Room not found" });

  return res.json({ room: data });
}