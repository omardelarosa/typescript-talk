SystemJS.config({
  map: {
    // Resolves alias
    "@app": "/dist/app"
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
