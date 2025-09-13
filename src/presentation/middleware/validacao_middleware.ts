import {Request, Response, NextFunction} from 'express'
import  {z, ZodObject} from 'zod'

export const validationMiddleware =
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // ✅ valida e substitui
      next();
    } catch (err) {
      next(err);
    }
  };