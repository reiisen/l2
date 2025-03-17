import { DB } from "../db";
import { down } from "../migrate";
import mysql from 'mysql2/promise'

async function run() {
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

  try {
    const [rows]: any = await connection.query("SHOW DATABASES LIKE '" + target + "'");
    if (rows.length === 0) {
      console.log("Database 'l2' does not exist. Skipping...");
      await connection.end();
      process.exit(0);
    }
  } catch (e) {

  }

  try {
    const [rows]: any = await connection.query("SHOW TABLES IN " + target);
    if (rows.length === 0) {
      console.log("No tables in " + target + ". Skipping..");
      await connection.end();
      process.exit(0);
    }
  } catch {

  }

  const db = new DB();
  await down(db.instance);
  process.exit(0);
}

run();
