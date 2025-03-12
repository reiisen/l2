import lab from "./lab";
import { app } from "..";

export default function initRouter() {
  app.get("/", (_, res) => { res.send("this is the root lol"); })
  app.use("/lab", lab);
}
