import {
  IPredefinedWordOption,
  IRegexListOption,
} from "codefend/build/src/core/options";

export type IWebpackCodefendPluginOptions = {
  stats: boolean;
  prefix: string;
  predefinedWords: IPredefinedWordOption[];
  ignoredWords: string[];
  regexList: IRegexListOption[];
};
