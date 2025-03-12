import { db } from ".."
import { LabI } from "../database/table/lab"

export async function findLabUnique(id: number) {
  return await db.instance.selectFrom('Lab')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function createLab(lab: LabI) {
  const { insertId } = await db.instance.insertInto('Lab')
    .values(lab)
    .executeTakeFirstOrThrow();

  return await findLabUnique(Number(insertId!))
}
