import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";
import { createRoom, createRoomType, updateRoom } from "../controllers/adminInventoryController";

export const adminInventoryRoutes = Router();

adminInventoryRoutes.use(requireAuth, requireAdmin);

adminInventoryRoutes.post("/room-types", createRoomType);
adminInventoryRoutes.post("/rooms", createRoom);
adminInventoryRoutes.patch("/rooms/:id", updateRoom);