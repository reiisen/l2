import { Request, Response } from "express";
import { LabI } from "../database/table/lab";
import { createLab } from "../controller/lab";
import { resolveError } from "../util/error";

type LabRequest = {
  name: string;
};

export const create = async (req: Request, res: Response) => {
  let body: LabRequest = req.body;

  const data: LabI = {
    name: body.name,
    rate: 0,
    inactive: false
  };

  let result: Awaited<ReturnType<typeof createLab>>;

  try {
    result = await createLab(data);
  } catch (e) {
    return resolveError(res, "An error occured during [Lab] creation", e, 500);
  }

  return res.status(200).send(result);
};
