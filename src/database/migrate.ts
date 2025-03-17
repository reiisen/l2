import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {

  await db.schema
    .createTable('Space')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement().notNull())
    .addColumn('name', 'varchar(191)', col => col.notNull())
    .addColumn('rate', 'double precision', col => col.notNull().defaultTo(0))
    .addColumn('inactive', 'boolean', col => col.notNull().defaultTo(0))
    .addColumn('createdAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .addColumn('updatedAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .execute();

  await db.schema
    .createTable('Computer')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement().notNull())
    .addColumn('spaceId', 'integer', col => col.references('Space.id').onDelete('cascade').notNull())
    .addColumn('name', 'varchar(191)', col => col.notNull())
    .addColumn('rate', 'double precision', col => col.notNull().defaultTo(0))
    .addColumn('inactive', 'boolean', col => col.notNull().defaultTo(0))
    .addColumn('createdAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .addColumn('updatedAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .execute();

  await db.schema
    .createTable('Reservation')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement().notNull())
    .addColumn('spaceId', 'integer', col => col.references('Space.id').onDelete('cascade').notNull())
    .addColumn('computerId', 'integer', col => col.references('Computer.id').onDelete('restrict').onUpdate('cascade').notNull())
    .addColumn('pid', 'varchar(191)', col => col.notNull())
    .addColumn('reason', 'varchar(191)', col => col.notNull())
    .addColumn('status', sql`enum('PENDING','ACTIVE','CONCLUDED','CANCELED')`, col => col.notNull())
    .addColumn('length', sql`tinyint`, col => col.notNull())
    .addColumn('createdAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .addColumn('updatedAt', 'datetime(3)', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP(3)`))
    .execute();

  await db.schema
    .createIndex('index_computer_spaceId')
    .on('Computer')
    .column('spaceId')
    .execute();

  await db.schema
    .createIndex('index_reservation_status')
    .on('Reservation')
    .column('status')
    .execute();

  await db.schema
    .createIndex('index_reservation_composite')
    .on('Reservation')
    .columns(['spaceId', 'computerId'])
    .execute();
}

export async function down(db: Kysely<any>) {

  await db.schema
    .dropTable('Reservation')
    .execute();

  await db.schema
    .dropTable('Computer')
    .execute();

  await db.schema
    .dropTable('Space')
    .execute();
}
