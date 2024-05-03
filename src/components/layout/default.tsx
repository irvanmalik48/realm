import { motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

import Footer from "../custom/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export type DefaultLayoutProps = {
  templateTitle?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

declare global {
  interface Window {
    goatcounter?: any;
  }
}

export default function DefaultLayout({
  children,
  title,
  description,
  templateTitle = true,
}: DefaultLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: unknown) => {
      window?.goatcounter?.count?.({
        path,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>
          {title ? `${templateTitle ? "realm. | " : ""}${title}` : "realm."}
        </title>
        <meta
          name="description"
          content={description || "Irvan Malik's personal site."}
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        <meta property="twitter:image" content="/social-image-uwu.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://irvanma.eu.org" />
        <meta
          name="twitter:title"
          content={
            title ? `${templateTitle ? "realm. | " : ""}${title}` : "realm."
          }
        />
        <meta
          name="twitter:description"
          content={description || "Irvan Malik's personal site."}
        />
        <meta name="twitter:creator" content="@irvanmalik48" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            title ? `${templateTitle ? "realm. | " : ""}${title}` : "realm."
          }
        />
        <meta
          property="og:description"
          content={description || "Irvan Malik's personal site."}
        />
        <meta property="og:site_name" content="realm" />
        <meta property="og:url" content="https://irvanma.eu.org" />
        <meta property="og:image" content="/social-image-uwu.png" />
      </Head>
      <motion.div
        className="fixed bg-background inset-0 z-[998] pointer-events-none"
        animate={{
          y: "-100%",
          opacity: 0,
        }}
        exit={{
          y: "0",
          opacity: 1,
        }}
        transition={{
          duration: 0.125,
          ease: "easeOut",
        }}
      ></motion.div>
      <motion.main
        className={`w-full flex flex-col min-h-screen bg-background text-foreground ${inter.variable} ${jetbrainsMono.variable}`}
        initial={{ opacity: 0, y: 20, scaleY: 1.02, originY: 0 }}
        animate={{ opacity: 1, y: 0, scaleY: 1, originY: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
        <Footer />
        <Script
          async
          data-goatcounter="https://www.irvanma.eu.org/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </motion.main>
    </>
  );
}
