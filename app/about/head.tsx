import { NextSeo } from "next-seo";
import { getProps } from "next-seo.config";

export default function Head() {
  return (
    <NextSeo
      useAppDir={true}
      {...getProps({
        title: "About",
        desc: "About me.",
        path: "/about",
      })}
    />
  );
}
