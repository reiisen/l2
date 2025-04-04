import { Context } from "koa";
import { Route } from "../route/route";
import { routes } from "../route/routes";

// this shit is a stupid macro that increases startup time but
// its a hassle to type "new" every fucking time
export const route = (matcher: string, callback: (ctx: Context) => Promise<void>, method?: string, override?: string) => {
  const r = new Route(matcher, callback, method);

  if (override) {
    r.matcher = new RegExp(override);
  }

  routes.push(r);
}
