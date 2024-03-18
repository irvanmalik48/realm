import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "rmd", "ts", "tsx"],
  reactStrictMode: true,
};

export default async (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "sw/index.ts",
      swDest: "public/sw.js",
    });
    return withSerwist(nextConfig);
  }
  return nextConfig;
};
