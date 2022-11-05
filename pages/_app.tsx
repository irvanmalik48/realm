import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import Navbar from "@csf/Navbar";
import { useEffect, useState } from "react";

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

  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      setShow(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sw = "/sw.js";
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register(sw).then((reg) => {
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === "installed") {
                    if (navigator.serviceWorker.controller) {
                      setShow(true);
                    }
                  }
                };
              }
            };
          });
        });
      }
    }
  }, []);

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
        additionalMetaTags={[
          {
            name: "viewport",
            content:
              "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
          },
          {
            name: "theme-color",
            content: "#000000",
          },
          {
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
          },
          {
            name: "apple-mobile-web-app-title",
            content: "The Realm",
          },
          {
            name: "application-name",
            content: "The Realm",
          },
          {
            name: "msapplication-TileColor",
            content: "#000000",
          },
          {
            name: "msapplication-config",
            content: "/site.webmanifest",
          },
        ]}
      />
      <Navbar />
      <div
        className="fixed py-2 top-0 w-full bg-red-400 flex items-center justify-center z-[99] transition"
        style={{ opacity: show ? 1 : 0, pointerEvents: show ? "all" : "none" }}
      >
        <div className="flex items-center justify-center gap-4">
          <p className="text-gray-900 font-helvetica text-sm">
            There&apos;s a new version available. Do you want to refresh?
          </p>
          <button
            className="bg-gray-900 text-gray-200 px-3 py-1 uppercase font-mono font-bold text-xs rounded-md"
            onClick={handleClick}
          >
            Refresh
          </button>
        </div>
      </div>
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
