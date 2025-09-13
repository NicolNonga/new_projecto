import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export function zodErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    console.log('teste')
    const firstIssue = err.issues[0];
    return res.status(400).json({
      status: "error",
      field: firstIssue.path.join("."),
      message: firstIssue.message,
    });
  }

  next(err); // se não for ZodError, passa pro próximo handler
}
