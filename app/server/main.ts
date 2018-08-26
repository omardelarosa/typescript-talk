import * as API from "../shared/api";

import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 3000;

// Serve static
app.use("/dist", express.static("dist"));
app.use("/lib", express.static("lib"));
app.use("/docs", express.static("docs"));
app.use("/node_modules", express.static("node_modules"));

app.get("/app", (req: Request, res: Response) => {
  res.send(API.render());
});

app.listen(PORT, () =>
  console.log(`Server started at: http://localhost:${PORT}/app`),
);
