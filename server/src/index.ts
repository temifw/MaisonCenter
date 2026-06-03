import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env";
import { httpLogger } from "./middleware/httpLogger";
import { errorHandler } from "./middleware/errorHandler";
import { publicLimiter } from "./middleware/rateLimiters";
import { corsOptions } from "./config/cors";
import { publicRoutes } from "./routes/publicRoutes";
import { availabilityRoutes } from "./routes/availabilityRoutes";
import { customerRoutes } from "./routes/customerRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { adminInventoryRoutes } from "./routes/adminInventoryRoutes";
import { docsRoutes } from "./routes/docsRoutes";

const app = express();

// Logging first
app.use(httpLogger);

// Basic hardening
app.use(helmet());

// CORS (tighten origins later)
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());

// Rate limit public endpoints
app.use("/api", publicLimiter);

app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/api", publicRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/inventory", adminInventoryRoutes);
app.use("/docs", docsRoutes);


// Error handler last
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});