<p align="center">
 <img src="./public/img/logo.png">
</p>

# webpack-plugin-codefend

[![Latest CI workflow status](https://img.shields.io/github/actions/workflow/status/Codefend/webpack-plugin-codefend/ci.yaml)](https://github.com/Codefend/webpack-plugin-codefend/actions/workflows/ci.yaml)
![NPM](https://img.shields.io/npm/dt/webpack-plugin-codefend)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/webpack-plugin-codefend)](https://www.npmjs.com/package/webpack-plugin-codefend)
![NPM](https://img.shields.io/node/v/webpack-plugin-codefend)
![NPM](https://img.shields.io/npm/l/webpack-plugin-codefend)

Webpack plugin for code obfuscation based on [Codefend](https://www.npmjs.com/package/codefend).

Supports Webpack 5.

## Installation

Install the plugin in your existing Webpack project:

```bash
npm install -D webpack-plugin-codefend
```

## Usage

### Default options

Add the plugin to your `webpack.config.mjs`. Keep any other plugins and build settings your project needs.

```js
import { fileURLToPath } from "node:url";
import { WebpackPluginCodefend } from "webpack-plugin-codefend";

export default {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: fileURLToPath(new URL("./dist", import.meta.url)),
  },
  plugins: [new WebpackPluginCodefend()],
};
```

### Custom options

Customize obfuscation and statistics with the `transformation` and `debug` options:

```js
import { fileURLToPath } from "node:url";
import { WebpackPluginCodefend } from "webpack-plugin-codefend";

export default {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: fileURLToPath(new URL("./dist", import.meta.url)),
  },
  plugins: [
    new WebpackPluginCodefend({
      transformation: {
        // Prefix for generated names.
        prefix: "Ox",

        // Explicit replacements for selected words.
        static: [{ from: "predefined_secret", to: "123456" }],

        // Words that should retain their original spelling.
        ignore: ["node_modules"],

        // Optional names to use before generating prefixed names.
        pool: ["QueenOfHeart"],
      },
      debug: {
        // Display statistics for transformed words.
        stats: true,
      },
    }),
  ],
};
```

`transformation.ignore` contains words to preserve, not file paths or module filters. Statistics are enabled by default; use `debug: { stats: false }` to disable them.

The plugin uses Codefend's `codeOnly` parser. CLI options for copying source files, renaming files and folders, and selecting custom parsers are not exposed. See the [configuration reference](https://codefend.github.io/docs/references/configuration) for transformation details.

### Naming convention

Add a prefix such as `l_` to names you want Codefend to obfuscate:

```js
function l_add(l_left, l_right) {
  return l_left + l_right;
}

console.log(l_add(2, 3));
```

With default options, Codefend transforms those names:

```js
function Ox0(Ox1, Ox2) {
  return Ox1 + Ox2;
}

console.log(Ox0(2, 3));
```

Both versions print `5`. Generated names can vary with the input and build order. See the [code naming conventions](https://codefend.github.io/docs/basic-usage/naming-conventions/code-naming-convention) for other supported prefixes.

Codefend matches source text, so replacements can also affect strings and property names. Keep public exports, framework APIs, and external data contracts stable with `transformation.ignore`, and test the built application. Test custom pools across all modules before adopting them.

## Migrate an existing project with AI

Use the [AI migration prompt](https://codefend.github.io/docs/basic-usage/naming-conventions/ai-assisted-migration) to adapt an existing project's internal variables, functions, classes, parameters, and members to Codefend's naming conventions. The guide provides a copyable prompt that asks your coding assistant to update references, preserve external interfaces and data keys, and test both the renamed source and the Codefend output.

## Build behavior

The plugin transforms emitted assets during Webpack's asset-processing stage and prints statistics when compilation finishes. It runs whenever included in the configuration; the examples above configure a production build.

For development builds, include the plugin conditionally in your existing configuration if you want to leave development output unchanged. Verify emitted CSS, binary assets, multiple chunks, and interactions with other asset plugins in your application.

Build with your usual project command, or run:

```bash
npx webpack --config webpack.config.mjs
```

## Examples

Follow the [Webpack example](https://codefend.github.io/docs/examples/webpack) in the Codefend documentation for complete source code, configuration, build commands, and expected output.

## Documentation

- [Codefend documentation](https://codefend.github.io/docs/)
- [All language and build examples](https://codefend.github.io/docs/examples/list)
- [Vite plugin](https://www.npmjs.com/package/vite-plugin-codefend), [esbuild plugin](https://www.npmjs.com/package/esbuild-plugin-codefend), [Rollup plugin](https://www.npmjs.com/package/rollup-plugin-codefend), and [Webpack plugin](https://www.npmjs.com/package/webpack-plugin-codefend)

## Contributing

Pull requests and bug reports are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for development commands and contribution guidelines.

## License

[MIT](./LICENSE.md)
