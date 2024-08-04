import type {
  ICodefendDebugOptions,
  ICodefendTransformationOptions,
  ICodefendInternalDebugOptions,
  ICodefendInternalParserOptions,
  ICodefendInternalTransformationOptions,
  buildRuntimeOptions,
} from "codefend";

export type IWebpackCodefendOptions = {
  transformation?: ICodefendTransformationOptions;
  debug?: IWebpackCodefendDebugOptions;
};

export type IWebpackCodefendInternalOptions = {
  transformation: ICodefendInternalTransformationOptions;
  debug: ICodefendInternalDebugOptions;
  parser: ICodefendInternalParserOptions;
};

type IWebpackCodefendDebugOptions = Omit<ICodefendDebugOptions, "ignoredWarnings">;

export type ICodefendRuntimeOptions = ReturnType<typeof buildRuntimeOptions>;
