import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";
import { qwikReact } from "@builder.io/qwik-react/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(() => {
  return {
    plugins: [
      wasm(),
      topLevelAwait(),
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
      qwikReact(),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: {
      include: ["@auth/core"],
    },
  };
});
