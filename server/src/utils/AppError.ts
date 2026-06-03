export class AppError extends Error {
  statusCode: number;
  code?: string;
  details?: unknown;

  constructor(message: string, opts?: { statusCode?: number; code?: string; details?: unknown }) {
    super(message);
    this.name = "AppError";
    this.statusCode = opts?.statusCode ?? 500;
    this.code = opts?.code;
    this.details = opts?.details;
  }
}