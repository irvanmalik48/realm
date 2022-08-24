/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

import "$std/dotenv/load.ts";

import twind from "@utils/plugin-twind/mod.ts";
import { config } from "@utils/twind.ts";

await start(manifest, { plugins: [twind(config)] });
