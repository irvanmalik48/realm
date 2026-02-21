export interface Config {
  siteName: string;
  version: string;
  versionTag: string;
  siteDescription: string;
  siteImage: string;
  siteLocale: string;
  defaultThemeMode: "dark" | "light";
  social: {
    github: string;
    telegram: string;
    email: string;
  };
}
