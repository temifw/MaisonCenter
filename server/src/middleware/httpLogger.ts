import pinoHttp from "pino-http";
import { logger } from "../lib/logger";

export const httpLogger = pinoHttp({
  logger,
  redact: ["req.headers.authorization"]
});