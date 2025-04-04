import { Route } from "./route";
import { route } from "../util/routing";
import { create, getUnique } from "../serve/space";
import { facade, sendFile } from "../serve/file";

export const routes: Route[] = [];

route('/', facade, "GET", "^/$");
route('/pub/:file', sendFile, "GET");
route('/space/create', create, "POST");
route('/space/:id', getUnique, "GET");
