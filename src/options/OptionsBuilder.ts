import { IWebpackCodefendInternalOptions, IWebpackCodefendOptions } from "../data/Types";
import OptionsAdapter from "./OptionsAdapter";
import OptionsValidator from "./OptionsValidator";

export class OptionsBuilder {
  name: string;
  libraryOptions!: IWebpackCodefendInternalOptions;
  pluginOptions!: IWebpackCodefendOptions;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(pluginOptions: IWebpackCodefendOptions): this {
    this.pluginOptions = pluginOptions;
    this.libraryOptions = OptionsAdapter.transform(pluginOptions);
    return this;
  }

  setAdditionalIgnoredWords(additionalIgnoredWords: string[]): this {
    this.additionalIgnoredWords = additionalIgnoredWords;
    return this;
  }

  private _fillAdditionalIgnoreWords(): void {
    const ignoreSet = new Set(this.libraryOptions.transformation.ignore);

    this.additionalIgnoredWords.forEach((word) => {
      ignoreSet.add(word);
    });

    this.libraryOptions.transformation.ignore = Array.from(ignoreSet);
  }

  build(): IWebpackCodefendInternalOptions {
    OptionsValidator.validateOptions(this.name, this.pluginOptions);

    this._fillAdditionalIgnoreWords();
    return this.libraryOptions;
  }
}
