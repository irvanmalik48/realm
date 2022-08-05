import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup, strict } from "twind";
import { colorScheme } from "@utils/colors.ts";

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
        ...colorScheme["everblush"],
      },
      gridTemplateColumns: {
        root: "min-content min-content auto",
        tablet: "min-content auto",
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
      `url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap')`,
    ],
  },
};
if (IS_BROWSER) setup(config);
