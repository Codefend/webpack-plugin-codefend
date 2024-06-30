const WebpackPluginCodefend = require("webpack-plugin-codefend");

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
      transformation: {
        prefix: "Ox",
        static: [
          {
            from: "predefined_secret",
            to: "123456",
          },
        ],
        ignore: ["node_modules"],
      },

      debug: {
        stats: true,
      },
    }),
  ],
};
