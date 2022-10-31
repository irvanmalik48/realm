import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import Navbar from "../components/stateful/Navbar";

export default function App({ Component, pageProps, router }: AppProps) {
  const turnOpacity = {
    name: "turnOpacity",
    variants: {
      initial: {
        opacity: 0,
        y: 10,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: -10,
      },
    },
    transition: {
      duration: 0.2,
    },
  };

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
      <Navbar />
      <LazyMotion
        features={() => import("../utils/domAnim").then((res) => res.default)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={router.route.concat(turnOpacity.name)}
            variants={turnOpacity.variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={turnOpacity.transition}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full h-24 md:h-16 lg:h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </>
  );
}
