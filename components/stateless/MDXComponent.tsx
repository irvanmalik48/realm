"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

export function MDXComponent({ source }: { source: MDXRemoteProps }) {
  return <MDXRemote {...source} />;
}
