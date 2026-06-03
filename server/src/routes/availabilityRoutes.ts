import { Router } from "express";
import { listAvailableRooms } from "../controllers/availabilityController";
import { asyncHandler } from "../utils/asyncHandler";

export const availabilityRoutes = Router();

availabilityRoutes.get("/rooms", asyncHandler(listAvailableRooms));