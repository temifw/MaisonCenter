import type { Request } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "./AppError";

export function validateBody<T>(schema: ZodSchema<T>, req: Request): T {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Validation error", {
      statusCode: 400,
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten()
    });
  }
  return parsed.data;
}

export function validateQuery<T>(schema: ZodSchema<T>, req: Request): T {
  const parsed = schema.safeParse(req.query);
  if (!parsed.success) {
    throw new AppError("Validation error", {
      statusCode: 400,
      code: "VALIDATION_ERROR",
      details: parsed.error.flatten()
    });
  }
  return parsed.data;
}