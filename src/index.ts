import { IObfuscationOptions } from 'codefend/build/src/core/options';
import { WEBPACK_IGNORED_WORDS } from "./constants";
import { OptionsBuilder } from "./options/builder";
import { obfuscate, buildRuntimeOptions } from "codefend";
import { Compilation, Compiler } from "webpack";
import { IRuntimeOptions } from 'codefend/build/src/core/runtime';

class WebpackPluginCodefend {
  _name: string;
  _options: IObfuscationOptions;
  _runtimeOptions: IRuntimeOptions;

  constructor(options: IObfuscationOptions) {
    this._name = "WebpackPluginCodefend";
    this._options = new OptionsBuilder(this._name).setOptions(options).setAdditionalIgnoredWords(WEBPACK_IGNORED_WORDS).build();
    this._runtimeOptions = buildRuntimeOptions();
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this._name, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this._name,
        },
        (assets) => {
          Object.entries(assets).forEach(([fileName, source]) => {
            let outputContent = obfuscate(source.source() as string, this._options, this._runtimeOptions);
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
