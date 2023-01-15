import { WEBPACK_IGNORED_WORDS } from "./constants";
import { OptionsBuilder } from "./options/builder";
import { obfuscate } from "codefend";
import { Compilation, Compiler } from "webpack";
import { ICodefendOptions, ICodefendPluginOptions } from "./options/models";

class WebpackPluginCodefend {
  _name: string;
  _options: ICodefendOptions;
  _map: Record<string, string> = {};

  constructor(options: ICodefendPluginOptions) {
    this._name = "WebpackPluginCodefend";
    this._options = new OptionsBuilder(this._name).setOptions(options).setAdditionalIgnoredWords(WEBPACK_IGNORED_WORDS).build();
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
}

module.exports = WebpackPluginCodefend;
