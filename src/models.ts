export interface ICodefendWebpackPluginOptions {
  debug?: boolean;
  prefix: string;
  predefinedWords: Array<ICodefendWebpackPluginPredefinedWordOption>;
  ignoredWords: string[];
  regexList: Array<ICodefendWebpackPluginRegexListOption>;
}

export interface ICodefendWebpackPluginPredefinedWordOption {
  originalWord: string;
  targetWord: string;
}

export interface ICodefendWebpackPluginRegexListOption {
  value: string;
  name: string;
  flag: string;
}
