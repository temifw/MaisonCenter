import rateLimit from "express-rate-limit";

export const publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 120,          // 120 req/min per IP
  standardHeaders: "draft-7",
  legacyHeaders: false
});

export const bookingLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,           // 20 booking attempts/min per IP
  standardHeaders: "draft-7",
  legacyHeaders: false
});