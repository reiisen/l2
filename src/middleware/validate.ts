//import { NextFunction, Request, Response } from "express";
//import { ZodSchema } from "zod";
//import { resolveError } from "../util/error";
//
//export const validator = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
//
//  const validation = schema.safeParse(req.body);
//
//  if (validation.success) {
//    next();
//    return;
//  }
//
//  return resolveError(res, "Failed to parse the request body", validation.error, 400);
//}
