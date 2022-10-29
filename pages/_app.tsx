import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.irvanma.me/",
          site_name: "The Realm",
        }}
        twitter={{
          handle: "@irvanmalik48",
          site: "@irvanmalik48",
          cardType: "summary_large_image",
        }}
        canonical="https://www.irvanma.me/"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            href: "/icons/android-chrome-192x192.png",
          },
          {
            rel: "icon",
            href: "/icons/android-chrome-512x512.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/icons/apple-touch-icon.png",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
