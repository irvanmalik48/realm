import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

// 1. Shim TypeScript version for typescript-eslint (which checks versionMajor < 7)
try {
  const tsPath = require.resolve("typescript");
  const ts = require(tsPath);
  if (require.cache[tsPath]) {
    require.cache[tsPath].exports = new Proxy(ts, {
      get(target, prop) {
        if (prop === "versionMajorMinor") return "6.9";
        return target[prop];
      },
    });
  }
} catch {}

// 2. Polyfill legacy RuleContext methods removed in ESLint 10 that eslint-plugin-react still expects
function patchFileContext(fc) {
  if (fc && !fc.prototype.getFilename) {
    fc.prototype.getFilename = function () { return this.filename; };
    fc.prototype.getSourceCode = function () { return this.sourceCode; };
    fc.prototype.getCwd = function () { return this.cwd; };
    fc.prototype.getPhysicalFilename = function () { return this.physicalFilename; };
  }
}

try {
  for (const key of Object.keys(require.cache)) {
    if (key.includes("file-context.js")) {
      patchFileContext(require.cache[key]?.exports?.FileContext);
    }
  }
  const candidateDirs = [process.argv[1] ? dirname(process.argv[1]) : null, import.meta.url].filter(Boolean);
  for (const base of candidateDirs) {
    try {
      const req = createRequire(base);
      const eslintPkg = req.resolve("eslint/package.json");
      const { FileContext } = req(join(dirname(eslintPkg), "lib/linter/file-context.js"));
      patchFileContext(FileContext);
    } catch {}
  }
} catch {}

const { default: nextVitals } = await import("eslint-config-next/core-web-vitals");
const { default: nextTs } = await import("eslint-config-next/typescript");

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
