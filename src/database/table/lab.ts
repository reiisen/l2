import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Lab {

  /* mysql: id | int | NO | PRI | NULL | auto_increment */
  id: Generated<number>

  /* mysql: name | varchar(191) | NO | - | NULL | - */
  name: string;

  /* mysql: rate | double | NO | - | 0 | - */
  rate: number;

  /* mysql: inactive | tinyint(1) | NO | - | 0 | - */
  inactive: boolean;

  /* mysql: createdAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  createdAt: Generated<Date>;

  /* mysql: updatedAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  updatedAt: Generated<Date>;
}

/* Extra types for queries */
export type LabS = Selectable<Lab> // for select
export type LabI = Insertable<Lab> // for insert
export type LabU = Updateable<Lab> // for update
