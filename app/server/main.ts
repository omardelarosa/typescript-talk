import express from "express";
import { Express, Request, Response } from "express";
import API from '../shared/api';
import { POSTS_PUBLIC_PATH, SERVER_PORT } from '../shared/constants';
import { layoutRenderer, markdownRenderer } from '../shared/renderer';
import { respondWithRenderedMarkdown, respondWithMarkdownJSONList } from './middleware';

const app: Express = express();

// Serve static
app.use("/dist", express.static("dist"));
app.use("/lib", express.static("lib"));
app.use("/docs", express.static("docs"));
app.use("/node_modules", express.static("node_modules"));

app.get("/app", (req: Request, res: Response) => {
  // Render some default landing page.
  res.send(API.renderer.layoutRenderer({}, () => /*html*/ `<h1>Welcome!</h1>`));
});

// Root path
app.get(`${POSTS_PUBLIC_PATH}`, respondWithMarkdownJSONList);

// Full path
app.get(`${POSTS_PUBLIC_PATH}/*`, respondWithRenderedMarkdown);

app.listen(SERVER_PORT, () =>
  console.log(`Server started at: http://localhost:${SERVER_PORT}/app`),
);
