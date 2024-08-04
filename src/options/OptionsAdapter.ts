import { buildDebugOptions, buildParserOptions, buildTransformationOptions } from "codefend";
import { IWebpackCodefendInternalOptions, IWebpackCodefendOptions } from "../data/Types";
import { DEFAULT_PARSER_NAME } from "../data/Constants";

class OptionsAdapter {
  transform(pluginOptions: IWebpackCodefendOptions): IWebpackCodefendInternalOptions {
    return {
      parser: buildParserOptions({ name: DEFAULT_PARSER_NAME }).data!,
      transformation: buildTransformationOptions(pluginOptions.transformation),
      debug: buildDebugOptions(pluginOptions.debug),
    };
  }
}
export default new OptionsAdapter();
