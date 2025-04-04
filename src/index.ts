import Koa from 'koa'
import { DB } from './database/db';
import { router } from './route/router';

export const app = new Koa();
export const db = new DB();

const port = process.env.SERVER_PORT;

app.use(router);
app.listen(port);

console.log("Server running at http://127.0.0.1:" + port);
