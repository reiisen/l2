import Koa from "koa";

declare module "koa" {
  interface DefaultContext {
    param: Record<string, string>;
  }
}
