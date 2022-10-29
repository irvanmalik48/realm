/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains: ["github.com", "www.github.com"],
  },
};

module.exports = nextConfig;
