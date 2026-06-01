import type { Response, NextFunction } from "express";
import { supabaseAdmin } from "../lib/supabaseAdmin";
import type { AuthedRequest } from "./requireAuth";

export async function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!req.userId) return res.status(401).json({ error: "Not authenticated" });

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", req.userId)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.role !== "admin") return res.status(403).json({ error: "Admin only" });

  next();
}