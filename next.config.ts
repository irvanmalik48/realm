import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cloud.umami.is; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; connect-src 'self' https://api.irvanma.eu.org http://localhost:8080 https://cloud.umami.is https://ws.audioscrobbler.com;",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
    turbopackRustReactCompiler: true,
  },
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    const backendUrl =
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://api.irvanma.eu.org");
    return [
      {
        source: "/v1/storage/:path*",
        destination: `${backendUrl}/v1/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
