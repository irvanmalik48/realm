import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, strict } from "twind";

export * from "twind";
export const config: Configuration = {
  theme: {
    fontFamily: {
      sans: ["Roboto Flex", "sans-serif"],
      mono: ["Source Code Pro", "ui-monospace"],
    },
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      },
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
          footertext: "#D8DEE9AA",
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
  important: true,
  preflight: {
    "@import": [
      `url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,600;8..144,700&display=swap')`,
      `url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap')`,
      `url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap')`
    ],
  },
};
if (IS_BROWSER) setup(config);
