import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import { AppError } from "../utils/AppError";
import { ok } from "../utils/respond";

/**
 * GET /api/room-types
 * Response: { data: { room_types: RoomType[] } }
 */
export async function listRoomTypes(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("room_types").select("*").order("name");

  if (error) throw new AppError(error.message, { statusCode: 500, code: "DB_ERROR" });

  return ok(res, { room_types: data ?? [] });
}