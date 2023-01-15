import { ICodefendWebpackPluginOptions } from "./models";
import { obfuscate, codefendDefaultOptions } from "codefend";
import { Compilation, Compiler } from "webpack";
import { WEBPACK_IGNORED_WORDS } from "./Constants";

class WebpackPluginCodefend {
  _name: string;
  _options;
  _map: Record<string, string> = {};

  constructor(options: ICodefendWebpackPluginOptions) {
    this._name = "WebpackPluginCodefend";
    this._options = this.getOptions(options);
    this._map = {};
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this._name, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this._name,
        },
        (assets) => {
          Object.entries(assets).forEach(([fileName, source]) => {
            let outputContent = obfuscate(source.source() as string, this._map, this._options);
            //@ts-ignore
            compilation.assets[fileName] = {
              ...compilation.assets[fileName],
              source: () => {
                return outputContent;
              },
              size: () => {
                return outputContent.length;
              },
            };
          });
        }
      );
    });
  }

  getOptions(options: ICodefendWebpackPluginOptions) {
    options = options ?? {};
    const debug = options.debug ?? codefendDefaultOptions.debug;

    const obfuscationOptions = { ...codefendDefaultOptions.obfuscationOptions, ...(options as ICodefendWebpackPluginOptions) };
    delete obfuscationOptions["debug"];

    WEBPACK_IGNORED_WORDS.forEach((word) => {
      obfuscationOptions.ignoredWords.push(word);
    });

    return {
      debug,
      obfuscationOptions,
    };
  }
}

module.exports = WebpackPluginCodefend;
