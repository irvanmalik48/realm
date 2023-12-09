import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  extension: /\.r?mdx?$/,
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "rmd", "ts", "tsx"],
  reactStrictMode: true,
};

export default withMDX(nextConfig);
