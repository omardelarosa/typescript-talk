import express from "express";
import { Express, Request, Response } from "express";
import API from "../shared/api";
import { POSTS_PUBLIC_PATH, SERVER_PORT } from "../shared/constants";
import { fileListContainerRenderer, Renderer } from "../shared/renderer";
import {
  respondWithRenderedMarkdown,
  respondWithMarkdownJSONList
} from "./middleware";

const app: Express = express();

// Serve static
app.use("/dist", express.static("dist"));
app.use("/lib", express.static("lib"));
app.use("/docs", express.static("docs"));
app.use("/node_modules", express.static("node_modules"));

app.get("/app", (req: Request, res: Response) => {
  const landingPageRenderer: Renderer = () => /*html*/ `
    <h1>Welcome</h1>
    ${API.renderer.fileListContainerRenderer()}
  `;
  const html = API.renderer.layoutRenderer({}, landingPageRenderer);
  // Render some default landing page.
  res.send(html);
});

app.get(`${POSTS_PUBLIC_PATH}`, respondWithMarkdownJSONList);

app.get(`${POSTS_PUBLIC_PATH}/*`, respondWithRenderedMarkdown);

app.listen(SERVER_PORT, () => {
  const SERVER_ROOT_PATH = `http://localhost:${SERVER_PORT}`;
  console.log(`Server started at: ${SERVER_ROOT_PATH}`);
  console.log(`DemoApp at: ${SERVER_ROOT_PATH}/app`);
});

// Serve slides when server is on
app.get("/", express.static("."));
