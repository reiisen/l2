import { Response } from "express";

export const resolveError = (res: Response, message: string, error?: unknown, statusCode = 400) => {
  console.log(statusCode >= 500 ? "Server Error:" : "Client Error:");
  console.log(message);
  if (error) console.error(error);
  res.status(statusCode).send(message);
};
