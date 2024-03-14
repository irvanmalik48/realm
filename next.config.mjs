import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "rmd", "ts", "tsx"],
  reactStrictMode: true,
};

const withSerwist = withSerwistInit({
  swSrc: "sw/index.ts",
  swDest: "public/sw.js",
});

export default withSerwist(nextConfig);
