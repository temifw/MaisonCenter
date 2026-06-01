import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { cancelMyBooking, createMyBooking, listMyBookings } from "../controllers/customerController";

export const customerRoutes = Router();

customerRoutes.use(requireAuth);

customerRoutes.get("/bookings", listMyBookings);
customerRoutes.post("/bookings", createMyBooking);
customerRoutes.post("/bookings/:id/cancel", cancelMyBooking);