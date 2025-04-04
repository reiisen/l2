import { Context } from "koa";
import fs from 'fs'

export const facade = async (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.set('Content-Type', 'text/html');

  await writeFiletoBody(ctx, 'home.html')
}

export const sendFile = async (ctx: Context) => {
  // for now lets hope that Koa sets the correct Content-Type header
  const path = ctx.request.path;

  let file: string = '';

  for (let c = path.length - 1; c >= 0; c--) {
    if (path[c] === '/') {
      file = path.slice(c);
      break;
    }
  }
  console.log('Sending ' + file);

  await writeFiletoBody(ctx, file);
}

export async function writeFiletoBody(ctx: Context, file: string) {
  if (file === '') {
    ctx.response.body = '';
    return;
  }

  console.log('Writing ' + file);

  ctx.response.body = await new Promise<any>((resolve, _) => {
    fs.readFile(process.cwd() + '/pub/' + file, (err, data) => {
      if (err) {
        console.log(err);
        ctx.response.status = 500;
        resolve('');
      }

      if (data) {
        ctx.response.status = 200;
        resolve(data)
      }
    })
  });
}
