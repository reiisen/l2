import { Context } from "koa";
import { SpaceI } from "../database/table/space";
import { createSpace, findSpaceUnique } from "../controller/space";
import { readJson } from "../util/parser";
import { error } from "../util/error";

export const create = async (ctx: Context) => {
  const data = await readJson(ctx);

  let space: SpaceI;

  try {
    space = {
      name: data.name,
      rate: 0,
      inactive: false
    };
  } catch {
    return error(ctx, "Failed to parse request body");
  }

  if (ctx.response.headerSent) {
    console.warn("Something wrong. Response already sent!");
    return;
  }

  try {
    const res = await createSpace(space);
    ctx.response.status = 200;
    ctx.response.body = res;
  } catch (e) {
    return error(ctx, 'Failed to create new space', e, 500);
  }
};

export const getUnique = async (ctx: Context) => {
  let id: number;

  try {
    id = Number(ctx.param.id)
  } catch (e) {
    return error(ctx, 'Failed to parse request params', e, 400);
  }

  try {
    const res = await findSpaceUnique(id);

    if (res) {
      ctx.response.status = 200;
      ctx.response.body = res;
    } else {
      ctx.response.status = 400;
      ctx.response.body = {};
    }
  } catch (e) {
    return error(ctx, 'Failed retrieving space', e, 500);
  }
}
