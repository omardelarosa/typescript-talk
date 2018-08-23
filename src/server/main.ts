import "module-alias/register";

import { API } from "@app/shared/api";
import * as path from "path";

import { default as express, Request, Response, Express } from "express";

const app: Express = express();
const PORT = 3000;

const ROOT_DIR = path.join(__dirname, "../..");
app.use(express.static(ROOT_DIR));

app.get("/api", (req: Request, res: Response) => {
  const api = new API();
  res.send(api.render());
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
