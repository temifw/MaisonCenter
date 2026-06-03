import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { cancelMyBooking, createMyBooking, listMyBookings } from "../controllers/customerController";
import { asyncHandler } from "../utils/asyncHandler";

export const customerRoutes = Router();

customerRoutes.use(requireAuth);

customerRoutes.get("/bookings", asyncHandler(listMyBookings));
customerRoutes.post("/bookings", asyncHandler(createMyBooking));
customerRoutes.post("/bookings/:id/cancel", asyncHandler(cancelMyBooking));