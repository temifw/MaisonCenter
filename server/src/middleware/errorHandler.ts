import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Default
  let statusCode = 500;
  let message = "Internal Server Error";
  let code: string | undefined;
  let details: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    details = err.details;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Don’t leak details in production (later you can check env)
  return res.status(statusCode).json({
    error: {
      message,
      code,
      details
    }
  });
}