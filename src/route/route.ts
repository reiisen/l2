import { Context } from "koa";

export class Route {
  public matcher: RegExp;
  public callback: (ctx: Context) => Promise<void>;
  public method: string;

  constructor(path: string, callback: (ctx: Context) => Promise<void>, method?: string) {
    this.callback = callback;
    this.method = method ? method : "GET";

    if (!path.startsWith("/")) {
      throw new Error('Not a valid path');
    }

    this.matcher = new RegExp(
      path
        .split('/')
        .map((segment) => (segment.startsWith(":") ? "([^/]+)" : segment))
        .join('\\/')
    )


    this.callback = async (ctx: Context) => {

      let indices = [];
      let keys: Array<string> = [];
      let values: Array<string> = [];

      // example when the endpoint is /user/:id/artworks/:page
      // and request path received is /user/12/artworks/2
      //
      // below loop will indicate where to parse
      // indices should be [1,3]
      //
      // keys will take the endpoint's strings
      // its values should be ["id", "page"]
      //
      // values will take the request path strings
      // its values should be [12, 2]
      let count = 0;
      for (let i = 0; i < path.length; i++) {
        if (path[i] && path[i] === "/") {
          count++;
          if (path[i + 1] === ":")
            indices.push(count);
        }
      }

      // tokenize the request and endpoint
      const pathTokens = path.split('/');
      const requestTokens = ctx.request.path.split('/');

      for (let i of indices) {
        keys.push(
          pathTokens[i].slice(1)
        );
        values.push(
          requestTokens[i]
        )
      }

      // now we inject the params as object
      ctx.param = Object.fromEntries(
        keys.map(
          (key, index) => [key, values[index]])
      ) as Record<typeof keys[number], typeof values[number]>;

      await callback(ctx);
    }
  }
}
