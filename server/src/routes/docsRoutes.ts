import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

export const docsRoutes = Router();

const specPath = path.join(process.cwd(), "openapi.json");
const raw = fs.readFileSync(specPath, "utf-8");
const openApiSpec = JSON.parse(raw);

docsRoutes.use("/", swaggerUi.serve);
docsRoutes.get("/", swaggerUi.setup(openApiSpec));