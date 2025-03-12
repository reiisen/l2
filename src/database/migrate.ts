import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('Lab')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement().notNull())
    .addColumn('name', 'varchar(191)', col => col.notNull())
    .addColumn('rate', 'double precision', col => col.notNull().defaultTo(0))
    .addColumn('inactive', 'boolean', col => col.notNull().defaultTo(0))
    .addColumn('createdAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .addColumn('updatedAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema
    .dropTable('Lab')
    .execute();
}
