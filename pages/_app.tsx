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
      />
      <Component {...pageProps} />
    </>
  );
}
