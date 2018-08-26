SystemJS.config({
  map: {
    // Resolves alias
    "@app": "/dist/app",
    marked: "/node_modules/marked/marked.min.js" // Declare library for markdown
  },
  packages: {
    "": {
      defaultExtension: "js"
    }
  }
});

SystemJS.import("/dist/app/browser/main.js").then(m => {
  console.log("M", m.default());
});
