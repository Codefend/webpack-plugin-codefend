import { IObfuscationOptions } from "codefend/build/src/core/options";
import { buildObfuscationOptions } from "codefend";
import { validate } from "schema-utils";
import schema from "./schema.json";
import { JSONSchema7 } from "schema-utils/declarations/validate";
import { IWebpackCodefendPluginOptions } from "../models/Types";

export class OptionsBuilder {
  name: string;
  options!: IWebpackCodefendPluginOptions;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(options: IWebpackCodefendPluginOptions): this {
    this.options = buildObfuscationOptions(options);
    return this;
  }

  setAdditionalIgnoredWords(additionalIgnoredWords: string[]): this {
    this.additionalIgnoredWords = additionalIgnoredWords;
    return this;
  }

  #validateOptions(): this {
    validate(schema as JSONSchema7, this.options, {
      name: this.name,
    });
    return this;
  }

  build(): IObfuscationOptions {
    this.#validateOptions();

    this.additionalIgnoredWords.forEach((word) => {
      this.options.ignoredWords.push(word);
    });
    return this.options;
  }
}
