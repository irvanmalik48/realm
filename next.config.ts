import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
    viewTransition: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
