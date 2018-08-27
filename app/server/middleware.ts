import { Request, Response } from "express";
import API from "../shared/api";
import fileLoader from "./file-loader";
import * as path from "path";
import glob from "glob";
import { MARKDOWN_DIR_NAME } from "../shared/constants";

export const respondWithRenderedMarkdown = async (
  req: Request,
  res: Response
) => {
  let mdPath = API.strings.getFilePathFromReqPath(req.path);
  const extension = API.strings.getFileExtension(mdPath);
  const filePathify = (s: string) => `${path.join(process.cwd(), s)}`;
  let contents;

  if (extension === '.json') {
    contents = await fileLoader.loadFile(
      filePathify(mdPath.replace(".json", ".md")),
      { silent: true }
    );
    if (!contents) {
      return res.json({ error: 'File not found! ' });
    } else {
      return res.json({ filename: mdPath, markdown: contents });
    }
  }

  // Look for HTML
  if (extension === ".html" || !extension) {
    // Assume html is the default
    if (!extension) {
      mdPath = `${mdPath}.html`;
    }
    contents = await fileLoader.loadFile(filePathify(mdPath), { silent: true });
    if (contents) {
      // HTML found
      res.set({
        "Content-Type": "text/html",
        "Content-Length": contents.length
      });
      return res.send(contents);
    }
    // Otherwise, HTML will need to be compiled
  }

  // Get markdown
  if (extension === ".md" || !contents) {
    contents = await fileLoader.loadFile(
      filePathify(mdPath.replace(".html", ".md")),
      { silent: true }
    );
    if (!contents) {
      // No such file... error
      return res
        .status(404)
        .send({ error: { message: `File ${req.path} not found.` } });
    } else if (extension === ".md") {
      // Respond with plaintext
      res.set({
        "Content-Type": "text/plain",
        "Content-Length": contents.length
      });
      return res.send(contents);
    } else {
      // Render to HTML
      const html = API.renderer.layoutRenderer(
        {},
        () => API.components.AppComponent(
          { contents: API.renderer.markdownRenderer({ markdown: contents }) }
        )
      );
      res.set({ "Content-Type": "text/html", "Content-Length": html.length });
      return res.send(html);
    }
  }

  // Not found...
  return res
    .status(404)
    .send({ error: { message: `File ${req.path} not found.` } });
};

export const respondWithMarkdownJSONList = async (
  req: Request,
  res: Response
) => {
  return new Promise((resolve, reject) => {
    glob(`${MARKDOWN_DIR_NAME}/**/*.md`, (err, files) => {
      if (err) {
        console.error(err);
        reject(new Error("Server error"));
        return;
      }
      res.send({ files });
      resolve();
    });
  });
};
