import { Generated, Insertable, Selectable, Updateable } from "kysely";

interface Space {

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
export type SpaceS = Selectable<Space> // for select
export type SpaceI = Insertable<Space> // for insert
export type SpaceU = Updateable<Space> // for update

export default Space;
