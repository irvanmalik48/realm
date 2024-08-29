import PostBar from "@/components/PostBar";
import RootContainer from "@/components/RootContainer";
import SideNavigation from "@/components/SideNavigation";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { DefaultLayoutProps } from "@/types/layouts";
import { Inter, JetBrains_Mono } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function DefaultLayout({
  currentPath,
  children,
  className,
  title,
  description,
  url,
  image,
  keywords,
  ...rest
}: DefaultLayoutProps) {
  let meta = {
    title,
    description,
    url,
    image,
    keywords,
  };

  if (!meta.image) {
    meta.image = "/og-image.png";
  }

  if (!meta.keywords) {
    meta.keywords = ["website", "blog", "nextjs", "tailwindcss"];
  }

  return (
    <>
      <Head>
        <title>{`Realm | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
        <meta name="author" content="Realm" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={meta.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={meta.image} />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />
        <link rel="canonical" href={url} />
        <link rel="alternate" href={url} hrefLang="en" />
        <link rel="alternate" href={url} hrefLang="x-default" />
      </Head>
      <main
        className={cn(
          "min-h-screen w-full flex",
          "dark bg-background text-primary",
          "divide-x divide-border",
          inter.variable,
          jetBrainsMono.variable,
          className
        )}
        {...rest}
      >
        <SideNavigation />
        <ResizablePanelGroup direction="horizontal">
          <PostBar />
          <ResizableHandle withHandle />
          <RootContainer>{children}</RootContainer>
        </ResizablePanelGroup>
      </main>
    </>
  );
}
