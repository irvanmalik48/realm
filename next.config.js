/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
        "react-ssr-prepass": "preact-ssr-prepass",
        "react-render-to-string": "preact-render-to-string",
      });
    }
    return config;
  },
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains: [
      "github.com",
      "www.github.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
});

module.exports = nextConfig;
