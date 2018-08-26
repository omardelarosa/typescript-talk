const ENTRY_LIB_PATH = "/lib/entry.js";
const STYLE_TAGS = [
  /*html*/ `<link rel="stylesheet" type="text/css" media="screen" href="/docs/main.css" />`
];
const HEAD_SCRIPT_TAGS = [
  /*html*/ `<script src="https://cdn.jsdelivr.net/npm/require1k@2.0.0/require1k.min.js"></script>`,
  /*html*/ `<script src="/node_modules/systemjs/dist/system-production.js"></script>`
];

const BODY_SCRIPT_TAGS = [/*html*/ `<script src="${ENTRY_LIB_PATH}"></script>`];

export default function renderer(locals = {}): string {
  const title = "demo app";
  return /*html*/ `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${STYLE_TAGS.join("\n")}
            ${HEAD_SCRIPT_TAGS.join("\n")}
        </head>

        <body>
            ${BODY_SCRIPT_TAGS.join("\n")}
        </body>
    </html>
    `;
}
