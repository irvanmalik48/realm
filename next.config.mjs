import MillionLint from "@million/lint";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default MillionLint.next({
  optimizeDOM: true,
})(nextConfig);
