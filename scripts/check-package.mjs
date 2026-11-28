import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import webpack from "webpack";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const commonjs = require(resolve(root, manifest.main));
const esm = await import(pathToFileURL(resolve(root, manifest.module)).href);

assert.deepEqual(Object.keys(commonjs), ["WebpackPluginCodefend"]);
assert.deepEqual(Object.keys(esm), ["WebpackPluginCodefend"]);
for (const entry of [manifest.main, manifest.module, manifest.types, "dist/index.d.mts"]) {
  assert.ok(readFileSync(resolve(root, entry)).length, "Missing package entry: " + entry);
}
for (const entry of [manifest.main, manifest.module]) {
  assert.ok(readFileSync(resolve(root, entry), "utf8").includes("sourceMappingURL="));
  const map = JSON.parse(readFileSync(resolve(root, entry + ".map"), "utf8"));
  assert.ok(map.sources.length > 0 && map.sourcesContent.length > 0);
}

for (const api of [commonjs, esm]) {
  for (const parserName of ["codeOnly", "startWithMAndUnderscore"]) {
    const fixture = mkdtempSync(join(tmpdir(), "codefend-package-test-"));
    writeFileSync(
      join(fixture, "entry.js"),
      "const m_value = 3; const l_external = 2; module.exports = m_value + l_external;",
    );
    const compiler = webpack({
      mode: "development",
      target: "node",
      devtool: false,
      context: fixture,
      entry: "./entry.js",
      output: { path: join(fixture, "dist"), filename: "bundle.cjs", library: { type: "commonjs2" } },
      plugins: [new api.WebpackPluginCodefend({ parser: { name: parserName }, debug: { stats: false } })],
    });
    try {
      await new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
          if (error) reject(error);
          else if (!stats || stats.hasErrors()) reject(new Error(stats?.toString() ?? "Missing compilation stats"));
          else resolve();
        });
      });
      const output = join(fixture, "dist", "bundle.cjs");
      assert.equal(require(output), 5);
      assert.doesNotMatch(readFileSync(output, "utf8"), /\bm_value\b/);
      if (parserName === "startWithMAndUnderscore") assert.match(readFileSync(output, "utf8"), /\bl_external\b/);
      else assert.doesNotMatch(readFileSync(output, "utf8"), /\bl_external\b/);
    } finally {
      await new Promise((resolve, reject) => compiler.close((error) => (error ? reject(error) : resolve())));
      if (dirname(resolve(fixture)) !== resolve(tmpdir()) || !basename(fixture).startsWith("codefend-package-test-")) {
        throw new Error("Refusing to remove a directory outside the test fixtures.");
      }
      rmSync(fixture, { recursive: true, force: true });
    }
  }
}

const core = JSON.parse(readFileSync(resolve(dirname(require.resolve("codefend")), "../package.json"), "utf8"));
console.log(
  JSON.stringify({
    node: process.version,
    plugin: manifest.version,
    codefend: core.version,
    parsers: ["codeOnly", "startWithMAndUnderscore"],
    checks: ["CommonJS", "ESM", "declarations", "source maps", "Webpack compilation/execution"],
  }),
);
