import { IObfuscationOptions } from "codefend/build/src/core/options";
import { WEBPACK_IGNORED_WORDS } from "./constants";
import { OptionsBuilder } from "./options/builder";
import { obfuscate, buildRuntimeOptions, stats } from "codefend";
import { Compilation, Compiler } from "webpack";
import { IRuntimeOptions } from "codefend/build/src/core/runtime";

export default class WebpackPluginCodefend {
  _name: string;
  _options: IObfuscationOptions;
  _runtimeOptions: IRuntimeOptions;

  constructor(options: IObfuscationOptions) {
    this._name = "WebpackPluginCodefend";
    this._options = new OptionsBuilder(this._name)
      .setOptions(options)
      .setAdditionalIgnoredWords(WEBPACK_IGNORED_WORDS)
      .build();
    this._runtimeOptions = buildRuntimeOptions();
  }

  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(this._name, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this._name,
        },
        (assets) => {
          Object.entries(assets).forEach(([fileName, source]) => {
            const outputContent = obfuscate(
              source.source() as string,
              this._options,
              this._runtimeOptions
            );
            compilation.assets[fileName].source = (): string | Buffer => {
              return outputContent;
            };
            compilation.assets[fileName].size = (): number => {
              return outputContent.length;
            };
          });
        }
      );
    });

    compiler.hooks.done.tap(this._name, () => {
      stats({ stats: this._options.stats }, this._runtimeOptions);
    });
  }
}
