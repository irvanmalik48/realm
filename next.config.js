const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  productionBrowserSourceMaps: true,
});
