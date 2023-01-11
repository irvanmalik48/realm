import { FAB } from "c/FAB";
import { Footer } from "c/Footer";
import { NextSeo } from "next-seo";
import "s/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth scrollbars">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index,follow" />
      </head>
      <body className="bg-neutral-900">
        <FAB />
        {children}
        <Footer />
      </body>
    </html>
  );
}
