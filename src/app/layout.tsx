import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/navbar";
import Providers from "@/lib/provider/react-query";

import "./globals.css";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    description: "Stuffs I put.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: new URL(
          "/og-image.png",
          process.env.NODE_ENV === "production"
            ? "https://irvanma.eu.org"
            : "http://localhost:3000",
        ).toString(),
        width: 1200,
        height: 630,
        alt: "realm. | Stuffs I put.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@irvanmalik48",
    creator: "@irvanmalik48",
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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
