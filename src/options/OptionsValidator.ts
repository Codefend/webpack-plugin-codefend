import { validate } from "schema-utils";
import schema from "./schema.json";
import { JSONSchema7 } from "schema-utils/declarations/ValidationError";
import { IWebpackCodefendOptions } from "../data/Types";

class OptionsValidator {
  validateOptions(name: string, pluginOptions: IWebpackCodefendOptions): void {
    validate(schema as JSONSchema7, pluginOptions, {
      name: name,
    });
  }
}
export default new OptionsValidator();
