const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const withPlaiceholder = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  withPlaiceholder({
    reactStrictMode: true,
    compiler: {
      removeConsole: true,
    },
    experimental: {
      appDir: true,
    },
    productionBrowserSourceMaps: true,
  })
);
