import { Context } from "koa";

export async function readBody(ctx: Context) {
  let body = '';

  body = await new Promise((resolve, reject) => {
    ctx.req.on('data', (chunk) => {
      body += chunk;
    });

    ctx.req.on('end', () => {
      resolve(body);
    })

    ctx.req.on('error', () => {
      reject('An error occured when streaming request body');
    })
  })

  return body;
}

export async function readJson(ctx: Context): Promise<any> {
  let body = '';

  try {
    body = await readBody(ctx);
  } catch {
    throw new Error('Failed to read');
  }

  let json: any;

  try {
    json = JSON.parse(body);
  } catch {
    throw new Error('Failed to parse body into JSON, check structure again.');
  }

  return json;
}
