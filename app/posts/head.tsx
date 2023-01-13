import { NextSeo } from "next-seo";
import { getProps, indexFollow } from "next-seo.config";

export default function Head() {
  return (
    <NextSeo
      useAppDir={true}
      {...indexFollow()}
      {...getProps({
        title: "Posts",
        desc: "Posts I made.",
        path: "/posts",
      })}
    />
  );
}
