import { describe, it, expect } from "vitest";
import { WebpackPluginCodefend } from "..";
import { IWebpackCodefendOptions } from "../data/Types";

describe("Plugin: General Behavior", () => {
  it("has correct name", () => {
    const plugin = new WebpackPluginCodefend();
    expect(plugin._name).toBe("WebpackPluginCodefend");
  });

  it("preserves caller options while adding required Webpack ignores", () => {
    const ignore = ["l_public"];

    const plugin = new WebpackPluginCodefend({ transformation: { ignore } });

    expect(ignore).toEqual(["l_public"]);
    expect(plugin.___options.transformation.ignore).toContain("l_public");
    expect(plugin.___options.transformation.ignore).toContain("webpack_require");
  });

  it("rejects invalid options with an actionable schema error", () => {
    expect(() => new WebpackPluginCodefend({ debug: { stats: "yes" } } as unknown as IWebpackCodefendOptions)).toThrow(
      /stats/,
    );
  });
});
