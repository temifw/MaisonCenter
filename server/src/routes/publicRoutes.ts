import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { listRoomTypes } from "../controllers/publicController";

export const publicRoutes = Router();

// Public read-only endpoints
publicRoutes.get("/room-types", asyncHandler(listRoomTypes));