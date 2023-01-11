import type { NextSeoProps } from "next-seo";
import { RealmPageProps } from "t/types";

export function getProps(props: RealmPageProps): NextSeoProps {
  return {
    titleTemplate: "Realm | %s",
    title: props.title,
    description: props.desc,
    canonical: "https://www.irvanma.me",
    openGraph: {
      siteName: "Realm",
      type: "website",
      locale: "en",
      url: "https://www.irvanma.me" + (props.path || "/"),
      title: "Realm | " + props.title,
      description: props.desc,
    },
    twitter: {
      handle: "@irvanmalik48",
      site: "@irvanmalik48",
      cardType: "summary_large_image",
    },
  }
}