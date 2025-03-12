import { db } from "../..";
import { down } from "../migrate";

async function run() {
  down(db.instance)
}

run()
