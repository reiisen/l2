import { Context, Next } from "koa";
import { routes } from "./routes";

export const router = async (ctx: Context, _: Next): Promise<void> => {

  const path = ctx.request.path;

  console.log("Processing request for " + path + " METHOD: " + ctx.request.method);

  for (const route of routes) {
    if (route.method === ctx.request.method && route.matcher.test(ctx.request.path)) {
      console.log("Found match for route " + route.matcher)
      await route.callback(ctx);
      break;
    }
  }
}
