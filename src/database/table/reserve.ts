import { Generated, Insertable, Selectable, Updateable } from "kysely";

interface Reservation {

  /* mysql: id | int | NO | PRI | NULL | auto_increment */
  id: Generated<number>

  /* mysql: id | int | NO | MUL | NULL |  */
  spaceId: number

  /* mysql: computerId | int | NO | - | NULL |  */
  computerId: number

  /* mysql: pid | varchar(191) | NO | - | NULL |  */
  pid: string

  /* mysql: reason | varchar(191) | NO | - | NULL |  */
  reason: string

  /* mysql: status | enum('PENDING','ACTIVE','CONCLUDED','CANCELED') | NO | MUL | NULL |  */
  status: 'PENDING' | 'ACTIVE' | 'CONCLUDED' | 'CANCELED'

  /* mysql: length | tinyint | NO | - | NULL |  */
  length: number

  /* mysql: createdAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  createdAt: Generated<Date>;

  /* mysql: updatedAt | datetime(3) | NO | - | CURRENT_TIMESTAMP(3) | DEFAULT_GENERATED */
  updatedAt: Generated<Date>;
}

export type ReservationS = Selectable<Reservation> // for select
export type ReservationI = Insertable<Reservation> // for insert
export type ReservationU = Updateable<Reservation> // for update

export default Reservation;
