# webpack-plugin-codefend-example

## Usage

### 1. install dependencies and build

```bash
npm install
npm run build
```

<p align="center">
 <img src="/public/img/nodejs/build.PNG">
</p>

### 2. Run bundle

```bash
node dist/bundle.js
```

<p align="center">
 <img src="/public/img/nodejs/run.PNG">
</p>

### 3. check dist/bundle.js

You'll notice that "c_Calculator" and all the variables are replaced with Ox\*\* words.

To check the encrypted variables in the output: <kbd>Ctrl</kbd> + <kbd>f</kbd> **Ox**

```javascript
/*
 *...
 */
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/calculator.js":
      /*!***************************!*\
  !*** ./src/calculator.js ***!
  \***************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "Ox4": () => (/* binding */ Ox4)\n/* harmony export */ });\nclass Ox4 {\r\n  Ox5(Ox6, Ox7) {\r\n    const Ox8 = Ox6 + Ox7;\r\n    return Ox8;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://webpack-plugin-codefend-example/./src/calculator.js?'
        );

        /***/
      },

    /***/ "./src/main.js":
      /*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ "./src/calculator.js");\n\r\n\r\nconst secret = "123456";\r\nconst node_modules = "node_modules";\r\n\r\nfunction main() {\r\n  const Ox12 = new _calculator__WEBPACK_IMPORTED_MODULE_0__.Ox4();\r\n  const Ox8 = Ox12.Ox5(2, 3);\r\n\r\n  /* 123456 -> 123456 : defined in predefinedWords inside webpack.config.js */\r\n  console.log("secret: ", secret);\r\n\r\n  /* node_modules -> node_modules : defined in ignoredWords inside webpack.config.js */\r\n  console.log("node_modules:", node_modules);\r\n\r\n  /* Ox8 -> Ox4: with prefix l_ will be obfuscated */\r\n  console.log("results: ", Ox8);\r\n}\r\n\r\nmain();\r\n\n\n//# sourceURL=webpack://webpack-plugin-codefend-example/./src/main.js?'
        );

        /***/
      },

    /******/
  };
  /*
   *...
   */
})();
```
