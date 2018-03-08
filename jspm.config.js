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
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "flatpickr": "npm:flatpickr@2.6.1",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.25"
  },
  packages: {
    "npm:flatpickr@2.6.1": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.37"
      }
    }
  }
});
