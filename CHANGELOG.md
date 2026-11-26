# Changelog

## 3.2.2

- Raise the Codefend dependency minimum from 3.2.0 to 3.2.1 and update schema-utils to 4.8.5.
- Refresh the dependency lockfile and development tooling, including Vitest 5, ESLint 10, and cspell 10. Replace tsup with tsdown, matching the core build setup.
- Retain the Node.js 18 runtime minimum, existing options, peer bundler ranges, CommonJS/ESM entry points, declarations, and source maps. Development uses Node.js 24.
- Fix loading the ESM entry by using APIs from the active Webpack compiler. Use the supported asset update API and remove the bundled webpack-sources copy.
- Add package consumption checks, coverage reporting, Windows/Linux checks, supported Node.js runtime checks, and non-interactive CI test runs.
- Refresh the local example dependencies, fix output path resolution in its ESM Webpack configuration, and use an explicit file extension in its ESM import.
