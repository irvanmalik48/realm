import { Options } from "@utils/plugin-twind/mod.ts"
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export * from "twind";
export { css } from "twind/css";

export const config: Options = {
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
        ...colorScheme[currentColorScheme],
      },
      gridTemplateColumns: {
        root: "min-content min-content auto",
        tablet: "min-content auto",
      },
    },
  },
  darkMode: "class",
  hash: true,
  preflight: {
    "@import": [
      `url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,600;8..144,700&display=swap')`,
      `url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap')`,
      `url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap')`,
    ],
  },
};