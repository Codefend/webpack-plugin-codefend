<p align="center">
 <img src="./public/img/logo.png">
</p>

# webpack-plugin-codefend

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
      /** stats: boolean
      * Displays detailed stats about the obfuscated words:
      * e.g:
      * Ignored node_modules (5 times)
      * Predefined l_Hello -> l_Hi (2 times)
      * Encrypted l_a -> Ox0 (15 times)
      */
      stats: true,


      /** prefix: string
      * the prefix of each variable generated.
      * note: the first letter of the prefix must be either an alphabet or "_" so that the variable generated be valid.
      */
      prefix: "Ox",

      /** predefinedWords: Array<{originalWord:string, targetWord:string}>
      * words that you want to obfuscate them in a static way (determined output)
      * {"originalWord":"l_secretVar" , "targetWord": "123456"}
      * note: the original word must have a prefix 'l_' to be detected in the first place so that it gets replaced.
      */
      predefinedWords: [
        {
          originalWord: "predefined_secret",
          targetWord: "123456",
        },
      ],

      /** ignoredWords: Array<string>
      * Words that matches the pattern to be obfuscated but should be kept as is without being obfuscated.
      * useful for words that are being obfuscated and causing errors when running or building the code
      */
      ignoredWords: ["node_modules"],

      /** regexList: Array<{name:string,value:string,flag:string}>
       * Regex for detecting the words to be obfuscated
       */
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
```

### `Step 2`: Naming convention

In your code, `add prefixes to the words that you want Codefend to encrypt.`

`Make sure to read the `[`Philosophy`](https://github.com/Codefend/core#philosophy)` behind Codefend obfuscation First to understand why Codefend can work with any code written in any language.`

```js
//node js example
//as a starting point:  prefix the words that should be encrypted with l_

class l_Calculator {
  l_sum(l_a, l_b) {
    const l_results = l_a + l_b;
    return l_results;
  }
}

//>>>>>>==== Will Become ======<<<<<<

class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
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
