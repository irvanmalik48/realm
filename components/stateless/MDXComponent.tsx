"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import Image from "next/image";

const Components = {
  img: (props: any) => <Image {...props} loading="lazy" />,
};

export function MDXComponent({ source }: { source: MDXRemoteProps }) {
  return <MDXRemote {...source} components={Components} />;
}
