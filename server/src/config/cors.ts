import type { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",  // backend
  "http://localhost:5173",  // admin frontend (Vite dev server)
  "http://localhost:5174",  // client frontend (Vite dev server)
  // Add production later, e.g. "https://maisoncenter.com"
];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools like curl/Postman (no Origin header)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};