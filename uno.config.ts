import {
  defineConfig,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import type { Theme } from "unocss/preset-wind4";

export default defineConfig<Theme>({
  presets: [presetWind4(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    font: {
      header: "Besley, serif",
      monospace: "Geist Mono, monospace",
      sans: 'Geist, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    }
  }
});
