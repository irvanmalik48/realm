import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import { ClientThemeProvider as ThemeProvider } from "@wrksz/themes/client";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/provider/react-query";
import { AuthProvider } from "@/lib/auth/auth-context";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { CustomScrollbar } from "@/components/custom-scrollbar";

import "./globals.css";
import { Footer } from "@/components/footer";
import { FAB } from "@/components/fab";
import { Toaster } from "@/components/ui/toaster";

import OgImage from "./opengraph-image.png";
import Script from "next/script";

import { env } from "@/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "realm.",
    template: "%s | realm.",
  },
  description: "Stuffs I put.",
  metadataBase: new URL(
    env.NODE_ENV === "production"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <AuthProvider>
              <LenisProvider>
                <CustomScrollbar />
                <CustomCursor />
                <FAB />
                <Navbar />
                {children}
                <Footer />
                <Toaster />
              </LenisProvider>
            </AuthProvider>
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
