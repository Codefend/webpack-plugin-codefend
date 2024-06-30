import {
  IObfuscationOptions,
  IPredefinedWordOption,
  IRegexListOption,
} from "codefend/build/src/core/options";
import { IWebpackCodefendOptions } from "../data/Types";
import {
  DEFAULT_TRANSFORMATION_PREFIX,
  DEFAULT_PARSER_REGEX_LIST,
} from "../data/Constants";

class OptionsAdapter {
  transform(pluginOptions: IWebpackCodefendOptions): IObfuscationOptions {
    return {
      stats: this.stats(pluginOptions),
      prefix: this.prefix(pluginOptions),
      ignoredWords: this.ignoredWords(pluginOptions),
      predefinedWords: this.predefinedWords(pluginOptions),
      regexList: this.regexList(pluginOptions),
    };
  }

  private stats(pluginOptions: IWebpackCodefendOptions): boolean {
    return pluginOptions?.debug?.stats ?? true;
  }

  private prefix(pluginOptions: IWebpackCodefendOptions): string {
    return (
      pluginOptions?.transformation?.prefix ?? DEFAULT_TRANSFORMATION_PREFIX
    );
  }

  private ignoredWords(pluginOptions: IWebpackCodefendOptions): string[] {
    return pluginOptions?.transformation?.ignore ?? [];
  }
  private predefinedWords(
    pluginOptions: IWebpackCodefendOptions
  ): IPredefinedWordOption[] {
    return (
      pluginOptions?.transformation?.static?.map(({ from, to }) => {
        return {
          originalWord: from,
          targetWord: to,
        };
      }) ?? []
    );
  }
  private regexList(
    pluginOptions: IWebpackCodefendOptions
  ): IRegexListOption[] {
    return (
      pluginOptions?.parser?.regexList?.map((e) => {
        return {
          flag: "g",
          name: e.name,
          value: e.value,
        };
      }) ?? DEFAULT_PARSER_REGEX_LIST
    );
  }
}
export default new OptionsAdapter();
