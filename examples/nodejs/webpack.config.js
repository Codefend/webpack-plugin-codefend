const WebpackPluginCodefend = require("../../lib/cjs/index");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new WebpackPluginCodefend({
      stats: true,
      prefix: "Ox",
      predefinedWords: [
        {
          originalWord: "predefined_secretword",
          targetWord: "123456",
        },
      ],
      ignoredWords: ["node_modules"],
      regexList: [
        {
          name: "main",
          value: "([a-zA-Z]+(_[a-zA-Z0-9]+)+)",
          flag: "g",
        },
      ],
    }),
  ],
};
