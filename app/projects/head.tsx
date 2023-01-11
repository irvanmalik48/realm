import { NextSeo } from "next-seo";
import { getProps } from "next-seo.config";
import path from "path";

export default function Head() {
  return <NextSeo useAppDir={true} {...getProps({
    title: "Projects",
    desc: "Projects I made.",
    path: "/projects"
  })} />;
}
