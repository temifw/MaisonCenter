import { Router } from "express";
import { listBookings, updateBookingStatus } from "../controllers/adminController";
import { requireAuth } from "../middleware/requireAuth";
import { requireAdmin } from "../middleware/requireAdmin";

export const adminRoutes = Router();

adminRoutes.use(requireAuth, requireAdmin);

adminRoutes.get("/bookings", listBookings);
adminRoutes.patch("/bookings/:id/status", updateBookingStatus);