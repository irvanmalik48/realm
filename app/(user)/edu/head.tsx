import { NextSeo } from "next-seo";
import { getProps, noIndexNoFollow } from "next-seo.config";

export default function Head() {
  return (
    <NextSeo
      useAppDir={true}
      {...noIndexNoFollow()}
      {...getProps({
        title: "Jadwal Kuliah",
        desc: "Jadwal Kuliah.",
      })}
    />
  );
}
