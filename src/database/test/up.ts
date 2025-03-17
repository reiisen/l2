import { DB } from "../db";
import { up } from "../migrate";
import mysql from 'mysql2/promise'

async function run() {
  const db = new DB();

  const connection = await mysql.createConnection({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
      rejectUnauthorized: false
    },
  })

  let target = process.env.DATABASE;
  target ? target = target : target = 'l2';

  await connection.query('CREATE DATABASE IF NOT EXISTS ' + target);
  await connection.end();
  console.log('Generating Tables...')
  await up(db.instance);
  process.exit(0);
}

run();
