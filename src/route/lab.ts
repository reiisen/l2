import express from "express";
import { create } from "../serve/lab";
import { validator } from "../middleware/validate";
import { z } from "zod";

const lab = express.Router()

const createSchema = z.object({
  name: z.string(),
})

lab
  .get('/', (_, res) => { res.send("ok") })
  .post('/create', validator(createSchema), (req, res) => { create(req, res) })

export default lab;
