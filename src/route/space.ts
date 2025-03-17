import express from "express";
import { create } from "../serve/space";
import { validator } from "../middleware/validate";
import { z } from "zod";

const space = express.Router()

const createSchema = z.object({
  name: z.string(),
})

space
  .get('/', (_, res) => { res.send("ok") })
  .post('/create', validator(createSchema), (req, res) => { create(req, res) })

export default space;
