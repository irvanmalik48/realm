import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, strict } from "twind";

export * from "twind";
export const config: Configuration = {
  theme: {
    extend: {
      colors: {
        dark: {
          nav: "#2E3440",
          bg: "#242933",
          side: "#292E39",
          accent: {
            solid: "#88C0D0",
            semitrans: "#88C0D040",
            quartertrans: "#88C0D020",
          },
          text: "#D8DEE9",
        },
      },
      gridTemplateColumns: {
        root: "min-content min-content auto",
      },
    },
  },
  mode: strict,
  darkMode: "class",
  hash: true,
};
if (IS_BROWSER) setup(config);
