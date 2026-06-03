import { Router } from "express";
import { listAvailableRooms } from "../controllers/availabilityController";

export const availabilityRoutes = Router();

availabilityRoutes.get("/rooms", listAvailableRooms);