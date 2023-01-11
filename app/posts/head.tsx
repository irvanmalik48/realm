import { NextSeo } from "next-seo";
import { getProps } from "next-seo.config";

export default function Head() {
  return (
    <NextSeo
      useAppDir={true}
      {...getProps({
        title: "Posts",
        desc: "Posts I made.",
        path: "/posts",
      })}
    />
  );
}
