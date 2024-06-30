import { describe, test, expect } from "vitest";
import WebpackPluginCodefend from "..";

describe("Plugin: General Behavior", () => {
  test("has correct name", () => {
    const plugin = new WebpackPluginCodefend({
      stats: true,
      ignoredWords: [],
      predefinedWords: [],
      prefix: "Ox",
      regexList: [],
    });
    expect(plugin._name).toBe("WebpackPluginCodefend");
  });
});
