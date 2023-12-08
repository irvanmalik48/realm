import { Inter } from "next/font/google";
import Head from "next/head";
import Footer from "../custom/footer";
import { motion } from "framer-motion";

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
      <motion.main
        className={`w-full flex flex-col min-h-screen bg-background text-foreground ${inter.className}`}
        initial={{ opacity: 0, y: 20, scaleY: 1.02, originY: 0 }}
        animate={{ opacity: 1, y: 0, scaleY: 1, originY: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", duration: 0.5, ease: "easeOut" }}
      >
        {children}
        <Footer />
      </motion.main>
    </>
  );
}
