import express from 'express'
import initRouter from './route/router';
import { DB } from './database/db';
import pino from 'pino-http';

export const app = express();

app
  .use(pino())
  .use(express.json());

export const db = new DB();

initRouter();

app.listen('7272', () => {
  console.log("Server running at port: " + process.env.SERVER_PORT);
});
