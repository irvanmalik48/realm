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
try {
  const eslintPkg = require.resolve("eslint/package.json");
  const { FileContext } = require(join(dirname(eslintPkg), "lib/linter/file-context.js"));
  if (FileContext && !FileContext.prototype.getFilename) {
    FileContext.prototype.getFilename = function () {
      return this.filename;
    };
    FileContext.prototype.getSourceCode = function () {
      return this.sourceCode;
    };
    FileContext.prototype.getCwd = function () {
      return this.cwd;
    };
    FileContext.prototype.getPhysicalFilename = function () {
      return this.physicalFilename;
    };
  }
} catch {}

const { default: nextVitals } = await import("eslint-config-next/core-web-vitals");
const { default: nextTs } = await import("eslint-config-next/typescript");

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
