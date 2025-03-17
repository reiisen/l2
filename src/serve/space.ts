import { Request, Response } from "express";
import { SpaceI } from "../database/table/space";
import { createSpace } from "../controller/space";
import { resolveError } from "../util/error";

type SpaceRequest = {
  name: string;
};

export const create = async (req: Request, res: Response) => {
  let body: SpaceRequest = req.body;

  const data: SpaceI = {
    name: body.name,
    rate: 0,
    inactive: false
  };

  let result: Awaited<ReturnType<typeof createSpace>>;

  try {
    result = await createSpace(data);
  } catch (e) {
    return resolveError(res, "An error occured during [Space] creation", e, 500);
  }

  return res.status(200).send(result);
};
