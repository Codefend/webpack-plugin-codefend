export const DEFAULT_TRANSFORMATION_PREFIX = "Ox";
export const DEFAULT_PARSER_REGEX_LIST = [
  {
    name: "main",
    regex: new RegExp("([a-zA-Z]+(_[a-zA-Z0-9]+)+)", "g"),
  },
];

export const WEBPACK_IGNORED_WORDS = [
  "webpack_modules",
  "unused_webpack_module",
  "webpack_exports",
  "webpack_require",
  "WEBPACK_IMPORTED_MODULE_0",
  "webpack_module_cache",
  "unused_webpack",
  "webpack_module",
];
export const DEFAULT_PARSER_NAME = "codeOnly";
