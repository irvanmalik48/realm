import { newSafeObject } from "./libs/helpers/new-safe-object";
import type { Config } from "./libs/types/config";

const config: Config = {
  siteName: "realm.",
  version: "9.0",
  versionTag: "alpha1",

  siteDescription: "Irvan Malik Azantha's personal blog.",
  siteImage: "/og-image.png",

  siteLocale: "en_US",

  defaultThemeMode: "dark",

  social: {
    github: "https://github.com/irvanmalik48",
    telegram: "https://t.me/lappv",
    email: "irvanma@gnuweeb.org"
  }
};

export default newSafeObject<Config>(config);
