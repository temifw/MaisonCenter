import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { publicRoutes } from "./routes/publicRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { customerRoutes } from "./routes/customerRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", publicRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);

app.listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});