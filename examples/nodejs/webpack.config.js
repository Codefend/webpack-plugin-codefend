import { WebpackPluginCodefend } from "webpack-plugin-codefend";
import { resolve, dirname } from "path";

export default {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: resolve(dirname, "dist"),
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
