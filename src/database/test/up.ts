import { db } from "../..";
import { up } from "../migrate";
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

  await connection.query('CREATE DATABASE IF NOT EXISTS l2')
  await connection.end()
  up(db.instance)
}

run()
