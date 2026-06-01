import { Router } from "express";
import { createBooking, listRoomTypes } from "../controllers/publicController";

export const publicRoutes = Router();

publicRoutes.get("/room-types", listRoomTypes);
publicRoutes.post("/bookings", createBooking);