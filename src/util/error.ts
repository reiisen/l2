import { Context } from "koa";

export const error = (ctx: Context, message: string, error?: unknown, statusCode = 400) => {
  console.log(statusCode >= 500 ? "Server Error:" : "Client Error:");
  console.log(message);
  if (error) console.error(error);
  ctx.response.status = statusCode;
  ctx.response.body = message
};
