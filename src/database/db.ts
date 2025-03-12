import { Lab } from "./table/lab";
import { Room } from "./table/room";
import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";

export interface Database {
  Lab: Lab,
  Room: Room
}

export class DB {
  private _instance: Kysely<Database> | null
  public dialect: MysqlDialect
  public update: (dialect: MysqlDialect) => void
  public refresh: () => void

  get instance() {
    if (!this._instance) {
      this._instance = new Kysely<Database>({ dialect: this.dialect });
    }
    return this._instance;
  }

  constructor() {
    const opts = {
      db: process.env.DATABASE,
      user: process.env.USER,
      host: process.env.HOST,
      port: Number(process.env.PORT),
      password: process.env.PASSWORD,
      ssl: process.env.SSL,
    }

    for (let [k, v] of Object.entries(opts)) {
      if (typeof v === 'undefined') {
        throw new Error(`Missing ${k}, check .env`)
      }
    }

    this.dialect = new MysqlDialect({
      pool: createPool({
        database: opts.db,
        host: opts.host,
        user: opts.user,
        password: opts.password,
        port: opts.port,
        connectionLimit: 10,
      })
    })

    this._instance = null;

    this.update = (dialect: MysqlDialect) => {
      this.dialect = dialect;
      this.refresh();
    }

    this.refresh = () => {
      // do we need to wait here?
      this._instance?.destroy();

      this._instance = new Kysely<Database>({ dialect: this.dialect });
    }
  }
}
