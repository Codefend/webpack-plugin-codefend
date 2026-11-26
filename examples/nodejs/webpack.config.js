import { WebpackPluginCodefend } from "webpack-plugin-codefend";
import { fileURLToPath } from "node:url";

export default {
  context: fileURLToPath(new URL(".", import.meta.url)),
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: fileURLToPath(new URL("./dist", import.meta.url)),
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
