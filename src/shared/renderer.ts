export function renderer(locals = {}): string {
  const browserLibPath = "/dist/browser/bundle.js";
  const stylesheetPath = "/docs/main.css";
  const title = "demo app";
  return `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>${title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" media="screen" href="${stylesheetPath}" />
        </head>

        <body>
            <script src="${browserLibPath}">
            </script>
        </body>
    </html>
    `;
}
