import express from "express";
import glob from 'glob';
import { readFileSync } from 'fs';
import * as path from 'path';
import { Express, Request, Response } from "express";
import API from '../shared/api';
import { POSTS_PUBLIC_PATH, MARKDOWN_DIR_NAME, SERVER_PORT } from '../shared/constants';

const app: Express = express();

// Serve static
app.use("/dist", express.static("dist"));
app.use("/lib", express.static("lib"));
app.use("/docs", express.static("docs"));
app.use("/node_modules", express.static("node_modules"));

app.get("/app", (req: Request, res: Response) => {
  res.send(API.renderer.layoutRenderer());
});

// Root path
app.get(`${POSTS_PUBLIC_PATH}`, (req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    glob(`${MARKDOWN_DIR_NAME}/**/*.md`, (err, files) => {
      if (err) {
        console.error(err);
        reject(new Error('Server error'));
        return;
      }
      res.send({ files });
      resolve();
    });
  });
});

// Full path
app.get(`${POSTS_PUBLIC_PATH}/*`, (req: Request, res: Response) => {
  const mdPath = API.strings.getFilePathFromReqPath(req.path);
  res.send({ filename: mdPath });
});

app.listen(SERVER_PORT, () =>
  console.log(`Server started at: http://localhost:${SERVER_PORT}/app`),
);
