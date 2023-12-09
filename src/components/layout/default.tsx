import { Inter } from "next/font/google";
import Head from "next/head";
import Footer from "../custom/footer";
import { motion } from "framer-motion";
import { ScrollerMotion } from "scroller-motion";
import ScrollProgress from "../custom/scroll-progress";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export type DefaultLayoutProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function DefaultLayout({
  children,
  title,
  description,
}: DefaultLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `realm. | ${title}` : "realm."}</title>
        <meta
          name="description"
          content={description || "Irvan Malik's personal site."}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
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
          duration: 0.25,
          ease: "easeOut",
        }}
      ></motion.div>
      <motion.main
        className={`w-full flex flex-col min-h-screen bg-background text-foreground ${inter.className}`}
        initial={{ opacity: 0, y: 20, scaleY: 1.02, originY: 0 }}
        animate={{ opacity: 1, y: 0, scaleY: 1, originY: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ScrollerMotion>
          {mounted && createPortal(<ScrollProgress />, document.body)}
          {children}
          <Footer />
        </ScrollerMotion>
      </motion.main>
    </>
  );
}
