import { describe, it, expect } from "vitest";
import WebpackPluginCodefend from "..";

describe("Plugin: General Behavior", () => {
  it("has correct name", () => {
    const plugin = new WebpackPluginCodefend();
    expect(plugin._name).toBe("WebpackPluginCodefend");
  });
});
