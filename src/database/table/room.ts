import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Room {

  /* mysql: id | int | NO | PRI | NULL | auto_increment */
  id: Generated<number>

  /* mysql: name | varchar(191) | NO | - | NULL | - */
  name: string;

  /* mysql: rate | double | NO | - | 0 | - */
  rate: number;

  /* mysql: inactive | tinyint(1) | NO | - | 0 | - */
  inactive: boolean;

  /* mysql: createdAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  createdAt: Date;

  /* mysql: updatedAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  updatedAt: Date;
}

/* Extra types for queries */
export type RoomS = Selectable<Room> // for select
export type RoomI = Insertable<Room> // for insert
export type RoomU = Updateable<Room> // for update
