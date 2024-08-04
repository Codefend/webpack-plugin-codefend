import { obfuscate, buildRuntimeOptions, stats } from "codefend";
import { Compilation, Compiler } from "webpack";
import { WEBPACK_IGNORED_WORDS } from "./data/Constants";
import { OptionsBuilder } from "./options/OptionsBuilder";
import { ICodefendRuntimeOptions, IWebpackCodefendInternalOptions, IWebpackCodefendOptions } from "./data/Types";
import { ConcatSource } from "webpack-sources";

export class WebpackPluginCodefend {
  _name: string;
  ___options: IWebpackCodefendInternalOptions;
  _runtimeOptions: ICodefendRuntimeOptions;

  constructor(options?: IWebpackCodefendOptions) {
    this._name = "WebpackPluginCodefend";
    this.___options = new OptionsBuilder(this._name)
      .setOptions(options ?? {})
      .setAdditionalIgnoredWords(WEBPACK_IGNORED_WORDS)
      .build();
    this._runtimeOptions = buildRuntimeOptions();
  }

  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(this._name, (compilation: Compilation) => {
      compilation.hooks.optimizeChunkAssets.tap(this._name, (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            const source = this._getFileSource(compilation, fileName);
            const obfuscatedSource = this._obfuscateSource(source);
            this._overrideFileSource(compilation, fileName, obfuscatedSource);
          });
        });
      });
    });

    compiler.hooks.done.tap(this._name, () => {
      stats({ stats: this.___options.debug.stats }, this._runtimeOptions);
    });
  }

  private _getFileSource(compilation: Compilation, fileName: string): string {
    return compilation.assets[fileName].source() as string;
  }

  private _obfuscateSource(source: string): string {
    return obfuscate(source, this.___options.transformation, this.___options.parser, this._runtimeOptions);
  }
  private _overrideFileSource(compilation: Compilation, fileName: string, source: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    compilation.assets[fileName] = new ConcatSource(source) as any;
  }
}
