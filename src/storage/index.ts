import Datastore from "nedb";
import path from "path";

import { DB_NAME } from "../data";

let Storage = new Datastore({
  filename: path.join(__dirname, "db", `${DB_NAME}.db`),
  autoload: true,
});

export default Storage;
