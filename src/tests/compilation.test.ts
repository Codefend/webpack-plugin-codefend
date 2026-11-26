import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import webpack from "webpack";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { WebpackPluginCodefend } from "..";
import { IWebpackCodefendOptions } from "../data/Types";

describe("Webpack compilation", () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "codefend-webpack-test-"));
    fs.writeFileSync(
      path.join(root, "entry.js"),
      'const { l_add } = require("./math.js"); module.exports = l_add(2, 3);',
    );
    fs.writeFileSync(path.join(root, "math.js"), "exports.l_add = (l_left, l_right) => l_left + l_right;");
  });

  afterEach(() => {
    if (
      path.dirname(path.resolve(root)) !== path.resolve(os.tmpdir()) ||
      !path.basename(root).startsWith("codefend-webpack-test-")
    ) {
      throw new Error("Refusing to remove a directory outside the test fixtures.");
    }
    fs.rmSync(root, { recursive: true, force: true });
  });

  async function compile(options: IWebpackCodefendOptions): Promise<string> {
    const compiler = webpack({
      mode: "development",
      target: "node",
      devtool: false,
      context: root,
      entry: "./entry.js",
      output: { path: path.join(root, "dist"), filename: "bundle.cjs", library: { type: "commonjs2" } },
      plugins: [new WebpackPluginCodefend({ ...options, debug: { stats: false } })],
    });
    try {
      const stats = await new Promise<webpack.Stats>((resolve, reject) => {
        compiler.run((error, stats) => {
          if (error) reject(error);
          else if (!stats || stats.hasErrors()) reject(new Error(stats?.toString() ?? "Missing compilation stats"));
          else resolve(stats);
        });
      });
      expect(stats.hasWarnings()).toBe(false);
      const bundlePath = path.join(root, "dist", "bundle.cjs");
      expect(createRequire(import.meta.url)(bundlePath)).toBe(5);
      return fs.readFileSync(bundlePath, "utf8");
    } finally {
      await new Promise<void>((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve())));
    }
  }

  it.each([
    { name: "default options", transformation: {}, expected: /\bOx\d+\b/ },
    { name: "a custom prefix", transformation: { prefix: "Zx" }, expected: /\bZx\d+\b/ },
    { name: "an ignored name", transformation: { ignore: ["l_add"] }, expected: /\bl_add\b/ },
    { name: "a static replacement", transformation: { static: [{ from: "l_add", to: "sum" }] }, expected: /\bsum\b/ },
    {
      name: "pool replacements",
      transformation: { pool: ["alpha", "bravo", "charlie"] },
      expected: /alpha|bravo|charlie/,
    },
  ])("executes a multi-module bundle with $name", async ({ transformation, expected }) => {
    const code = await compile({ transformation });

    expect(code).toMatch(expected);
    expect(code).not.toMatch(/\bl_left\b|\bl_right\b/);
    if (!transformation.ignore) expect(code).not.toMatch(/\bl_add\b/);
  });
});
