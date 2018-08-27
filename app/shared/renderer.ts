import { ENTRY_LIB_PATH, DEFAULT_PAGE_TITLE } from "./constants";
import marked from "marked";

// TODO: add options here
const markdownOptions = {};

const STYLE_TAGS = [
  /*html*/ `<link rel="stylesheet" type="text/css" media="screen" href="/docs/main.css" />`
];
const HEAD_SCRIPT_TAGS = [
  /*html*/ `<script src="https://cdn.jsdelivr.net/npm/require1k@2.0.0/require1k.min.js"></script>`,
  /*html*/ `<script src="/node_modules/systemjs/dist/system.js"></script>`
];

const BODY_SCRIPT_TAGS = [/*html*/ `<script src="${ENTRY_LIB_PATH}"></script>`];

interface ITemplateLocals extends Partial<Record<string, string>> {
  title?: string;
}

export type Renderer = (
  locals?: ITemplateLocals,
  subrenderer?: Renderer,
  ...rest: string[][] // Enhanced tuple types!
) => string;

export const nullRenderer: Renderer = () => "";

export const markdownRenderer: Renderer = (
  locals: { markdown: string } & ITemplateLocals // Composable interfaces
): string => {
  return marked(locals.markdown, markdownOptions);
};

export const fileListContainerRenderer: Renderer = (locals = {}) =>
  /*html*/ `<div class="file-list-container"></div>`;

export const layoutRenderer: Renderer = (
  locals: ITemplateLocals = {},
  subrenderer = nullRenderer,
  headTags = [...STYLE_TAGS, ...HEAD_SCRIPT_TAGS],
  bodyTags = BODY_SCRIPT_TAGS
): string => {
  return /*html*/ `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${locals.title || DEFAULT_PAGE_TITLE}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${headTags.join("\n")}
        </head>
        <body>
            <!-- Main content -->
            ${subrenderer ? subrenderer(locals) : ""}
            <!-- Body tags -->
            ${bodyTags.join("\n")}
        </body>
    </html>
    `;
};

export default {
  layoutRenderer,
  markdownRenderer,
  nullRenderer,
  fileListContainerRenderer
};
