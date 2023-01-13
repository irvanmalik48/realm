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
      images: [
        {
          url: "https://www.irvanma.me/api/og?title=" + encodeURIComponent(props.title!),
          width: 1200,
          height: 630,
          alt: "Realm | " + props.title,
        },
      ],
    },
    twitter: {
      handle: "@irvanmalik48",
      site: "@irvanmalik48",
      cardType: "summary_large_image",
    },
  };
}

export function noIndexNoFollow(): NextSeoProps {
  return {
    additionalMetaTags: [
      {
        name: "robots",
        content: "noindex,nofollow",
      },
      {
        name: "googlebot",
        content: "noindex,nofollow",
      },
    ],
  };
}

export function indexFollow(): NextSeoProps {
  return {
    additionalMetaTags: [
      {
        name: "robots",
        content: "index,follow",
      },
      {
        name: "googlebot",
        content: "index,follow",
      },
    ],
  };
}
