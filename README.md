<p align="center">
 <img src="./public/img/logo.png">
</p>

# webpack-plugin-codefend

![NPM](https://img.shields.io/npm/dt/webpack-plugin-codefend)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Codefend/webpack-plugin-codefend/ci.yaml?branch=main)
![Bundlephobia](https://img.shields.io/bundlephobia/min/webpack-plugin-codefend)
![Node version](https://img.shields.io/node/v/webpack-plugin-codefend)
![NPM](https://img.shields.io/npm/l/webpack-plugin-codefend)

Webpack plugin for code obfuscation based on [Codefend](https://www.npmjs.com/package/codefend)

## Installation

```bash
npm install -D webpack-plugin-codefend
```

## Usage

### `Step 1`: Configuration

Add to your `webpack.config.js`:

#### Default options

```js
import WebpackPluginCodefend from "webpack-plugin-codefend";

export default {
  entry: ...
  output: ...,
  plugins: [new WebpackPluginCodefend()],
};
```

#### Custom options

```js
import WebpackPluginCodefend from "webpack-plugin-codefend";

export default {
  entry: ...
  output: ...,
  plugins: [
    new WebpackPluginCodefend({
      transformation:{
            // the prefix to use for each obfuscated variable
            prefix: "Ox",

            // control how a specific variable should be obfuscated
            static: [
              {
                from: "predefined_secret",
                to: "123456",
              },
            ],

            //will skip obfuscation for the following words
            ignore: ["node_modules"],
      },
      debug: {
            // to display detailed stats about the words that have been obfuscated
            stats: true,
      },
    }),
  ],
};
```

For a more detailed explanation, refer to the [configuration](https://codefend.github.io/docs/references/configuration) section of the `codefend` docs.

### `Step 2`: Naming convention

In your code, `add prefixes to the words that you want Codefend to encrypt.`

`Make sure to read the `[`Philosophy`](https://github.com/Codefend/core#philosophy)` behind Codefend obfuscation First to understand why Codefend can work with any code written in any language.`

```js
//node js example
//as a starting point:  prefix the words that should be encrypted with l_

class l_Calculator {
  l_sum(l_a, l_b) {
    const l_results = l_a + l_b;
    console.log("node_modules");
    console.log("predefined_secret");
    return l_results;
  }
}

//>>>>>>==== Will Become ======<<<<<<

class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    console.log("node_modules"); // has not been obfuscated
    console.log("123456"); // has transformed from "predefined_secret" to "123456"
    return Ox4;
  }
}
```

```html
<!-- Html example, can work also with Angular,React,Vue,Svelte... in the same way -->

<html>
  <head>
    <style>
      .l_red {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="l_red">l_secret</div>
    <div class="l_red">Hello World</div>
  </body>
</html>

<!-- Will Become -->

<html>
  <head>
    <style>
      .Ox1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="Ox1">Ox0</div>
    <div class="Ox1">Hello World</div>
  </body>
</html>
```

## Examples

1. ### [`Node js`](./example)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.md)
