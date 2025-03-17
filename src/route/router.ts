import space from "./space";
import { app } from "..";

export default function initRouter() {
  app.get("/", (_, res) => { res.send("this is the root lol"); })
  app.use("/space", space);
}
