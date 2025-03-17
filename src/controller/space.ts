import { db } from ".."
import { SpaceI } from "../database/table/space"

export async function findSpaceUnique(id: number) {
  return await db.instance.selectFrom('Space')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function createSpace(space: SpaceI) {
  const { insertId } = await db.instance.insertInto('Space')
    .values(space)
    .executeTakeFirstOrThrow();

  return await findSpaceUnique(Number(insertId!))
}
