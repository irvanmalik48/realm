import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, getTheme } from "@wrksz/themes/next";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/provider/react-query";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { CustomScrollbar } from "@/components/custom-scrollbar";

import "./globals.css";
import { Footer } from "@/components/footer";
import { FAB } from "@/components/fab";

import OgImage from "./opengraph-image.png";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "realm.",
    template: "%s | realm.",
  },
  description: "Stuffs I put.",
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://irvanma.eu.org"
      : "http://localhost:3000",
  ),
  openGraph: {
    title: {
      default: "realm.",
      template: "%s | realm.",
    },
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
    description: "Stuffs I put.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@irvanmalik48",
    creator: "@irvanmalik48",
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height,
      },
    ],
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storage="cookie">
          <Providers>
            <LenisProvider>
              <CustomScrollbar />
              <CustomCursor />
              <FAB />
              <Navbar />
              {children}
              <Footer />
            </LenisProvider>
          </Providers>
        </ThemeProvider>
        <Script
          strategy="afterInteractive"
          src="https://cloud.umami.is/script.js"
          data-website-id="4de66c4c-8a3c-4304-819c-18e1ac1cf209"
          defer
        />
      </body>
    </html>
  );
}
