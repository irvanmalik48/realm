/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { config as loadEnv } from "$std/dotenv/mod.ts";

if (!IS_BROWSER) {
  await loadEnv({
    export: true,
    allowEmptyValues: true,
  });
}

import twind from "@utils/plugin-twind/mod.ts";
import { config } from "@utils/twind.ts";

await start(manifest, { plugins: [twind(config)] });
