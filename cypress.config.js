const { defineConfig } = require("cypress");
module.exports = defineConfig({
  projectId: "swn36g",
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
