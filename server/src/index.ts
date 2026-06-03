import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { publicRoutes } from "./routes/publicRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { customerRoutes } from "./routes/customerRoutes";
import { availabilityRoutes } from "./routes/availabilityRoutes";
import { adminInventoryRoutes } from "./routes/adminInventoryRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", publicRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/inventory", adminInventoryRoutes);

app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});