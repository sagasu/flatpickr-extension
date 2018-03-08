SystemJS.config({
  transpiler: "plugin-babel",
  packages: {
    "app": {
      "main": "app.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "flatpickr": "npm:flatpickr@4.3.2",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
  },
  packages: {}
});
