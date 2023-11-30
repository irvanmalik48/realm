import { Inter } from "next/font/google";
import Head from "next/head";
import FAB from "../custom/fab";
import { Toaster } from "../ui/toaster";
import Footer from "../custom/footer";

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
      <Toaster />
      <FAB />
      <main
        className={`w-full flex flex-col min-h-screen bg-background text-foreground ${inter.className}`}
      >
        {children}
        <Footer />
      </main>
    </>
  );
}
