SystemJS.config({
  map: {
    // Resolves alias
    "@app": "/dist"
  }
});

SystemJS.import("/dist/browser/main.js").then(m => {
  console.log("M", m.default());
});
