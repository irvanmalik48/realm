"use client";

import * as React from "react";
import {
  Camera,
  ExternalLink,
  Copy,
  Globe,
  Image as ImageIcon,
  FileText,
  Maximize2,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type MarkdownImageProps = React.ComponentPropsWithoutRef<"img">;

export interface ImageAttribution {
  creator: string;
  source: string;
  sourceUrl: string;
  creatorUrl?: string;
  isUnsplash: boolean;
}

function UnsplashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
    </svg>
  );
}

const KNOWN_IMAGE_REGISTRY: Record<
  string,
  { creator: string; source: string; sourceUrl: string; creatorUrl?: string }
> = {
  "1523381210434": {
    creator: "Keagan Henman",
    source: "Unsplash",
    sourceUrl:
      "https://unsplash.com/photos/a-row-of-green-t-shirts-hanging-on-wooden-hangers-against-a-grey-background-8d3cead13475",
    creatorUrl: "https://unsplash.com/@henmankk",
  },
  "1529720317453": {
    creator: "No Revisions",
    source: "Unsplash",
    sourceUrl:
      "https://unsplash.com/photos/black-clothes-hanged-in-rack-kWVImL5QxJI",
    creatorUrl: "https://unsplash.com/@norevisions",
  },
  "1551028719": {
    creator: "Lea Øchel",
    source: "Unsplash",
    sourceUrl:
      "https://unsplash.com/photos/black-leather-zip-up-jacket-on-white-textile-nsRBbE6-YLs",
    creatorUrl: "https://unsplash.com/@lealea_leaa",
  },
};

export function parseImageAttribution(
  src?: string,
  title?: string,
  alt?: string,
): ImageAttribution {
  void alt;
  if (!src) {
    return {
      creator: "Unknown",
      source: "Unknown",
      sourceUrl: "#",
      isUnsplash: false,
    };
  }

  const isUnsplash = src.includes("unsplash.com");
  let source = isUnsplash ? "Unsplash" : "Web";
  let sourceUrl = src;
  let creator = isUnsplash ? "Unsplash Contributor" : "Unknown Creator";
  let creatorUrl: string | undefined = undefined;

  // Clean canonical source URL for Unsplash images
  if (isUnsplash) {
    try {
      const urlObj = new URL(src);
      sourceUrl = `${urlObj.origin}${urlObj.pathname}`;
    } catch {
      sourceUrl = src;
    }
  } else {
    try {
      const urlObj = new URL(src);
      source = urlObj.hostname.replace(/^www\./, "");
      sourceUrl = src;
    } catch {
      if (src.startsWith("/")) {
        source = "Local Media";
        creator = "Site Author";
      }
    }
  }

  // Check known registry
  for (const [key, entry] of Object.entries(KNOWN_IMAGE_REGISTRY)) {
    if (src.includes(key)) {
      creator = entry.creator;
      source = entry.source;
      if (entry.sourceUrl) sourceUrl = entry.sourceUrl;
      if (entry.creatorUrl) creatorUrl = entry.creatorUrl;
      break;
    }
  }

  // Parse title attribute if provided
  if (title) {
    const trimmed = title.trim();

    const photoByMatch = trimmed.match(
      /^Photo by ([^|]+?)(?:\s+on\s+([^|]+))?(?:\s*\|\s*(https?:\/\/\S+))?$/i,
    );
    if (photoByMatch) {
      if (photoByMatch[1]) creator = photoByMatch[1].trim();
      if (photoByMatch[2]) source = photoByMatch[2].trim();
      if (photoByMatch[3]) sourceUrl = photoByMatch[3].trim();
    } else if (trimmed.includes("|")) {
      const parts = trimmed.split("|").map((p) => p.trim());
      if (parts.length >= 3) {
        creator = parts[0];
        source = parts[1];
        sourceUrl = parts[2];
      } else if (parts.length === 2) {
        creator = parts[0];
        if (parts[1].startsWith("http://") || parts[1].startsWith("https://")) {
          sourceUrl = parts[1];
        } else {
          source = parts[1];
        }
      }
    } else if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      sourceUrl = trimmed;
    } else if (trimmed.length > 0) {
      creator = trimmed;
    }
  }

  // Parse URL search parameters if any (e.g. ?creator=...&source=...)
  try {
    const urlObj = new URL(src);
    const qCreator =
      urlObj.searchParams.get("creator") || urlObj.searchParams.get("author");
    const qSource =
      urlObj.searchParams.get("source") || urlObj.searchParams.get("platform");
    const qUrl =
      urlObj.searchParams.get("source_url") ||
      urlObj.searchParams.get("credit_url");

    if (qCreator) creator = qCreator;
    if (qSource) source = qSource;
    if (qUrl) sourceUrl = qUrl;
  } catch {
    // ignore
  }

  return {
    creator,
    source,
    sourceUrl,
    creatorUrl,
    isUnsplash,
  };
}

export function MarkdownImage({
  src,
  alt,
  title,
  className,
  ...props
}: MarkdownImageProps) {
  if (!src || typeof src !== "string") {
    return (
      <span className="not-prose my-6 block w-fit max-w-full mx-auto overflow-hidden rounded-xl border border-border/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn("block max-w-full h-auto m-0 rounded-xl", className)}
          loading="lazy"
          {...props}
        />
      </span>
    );
  }

  const attribution = parseImageAttribution(src, title, alt);

  const handleOpenSource = () => {
    window.open(attribution.sourceUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopySourceLink = async () => {
    try {
      await navigator.clipboard.writeText(attribution.sourceUrl);
      toast({
        title: "Link copied",
        description: "Image source link copied to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy image source link.",
      });
    }
  };

  const handleCopyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(src);
      toast({
        title: "Image URL copied",
        description: "Direct image URL copied to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy image URL.",
      });
    }
  };

  const handleCopyAttribution = async () => {
    try {
      const text = `Photo by ${attribution.creator} on ${attribution.source} (${attribution.sourceUrl})`;
      await navigator.clipboard.writeText(text);
      toast({
        title: "Attribution copied",
        description: `"${text}" copied to clipboard.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy attribution text.",
      });
    }
  };

  const handleOpenImageDirect = () => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <span className="not-prose relative block my-6 w-fit max-w-full mx-auto overflow-hidden rounded-xl border border-border/50 group/img transition-colors duration-300 hover:border-border/90 hover:shadow-xl select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={cn(
              "block max-w-full h-auto m-0 rounded-xl object-contain transition-transform duration-500 ease-out group-hover/img:scale-105",
              className,
            )}
            loading="lazy"
            {...props}
          />

          {/* Floating pill badge on image hover */}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-2xs font-medium rounded-full bg-background/80 hover:bg-background/95 text-foreground/90 backdrop-blur-md border border-border/60 shadow-md opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
            {attribution.isUnsplash ? (
              <UnsplashIcon className="size-3 text-muted-foreground" />
            ) : (
              <Camera className="size-3 text-muted-foreground" />
            )}
            <span>{attribution.creator}</span>
            <span className="text-muted-foreground/60">&bull;</span>
            <span className="text-muted-foreground">{attribution.source}</span>
          </span>
        </span>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64 border border-border/80 bg-popover/95 backdrop-blur-md shadow-2xl rounded-xl p-1 z-50">
        <ContextMenuLabel className="flex items-center gap-2 text-xs font-semibold text-foreground px-2.5 py-1.5">
          {attribution.isUnsplash ? (
            <>
              <UnsplashIcon className="size-3.5 text-foreground" />
              <span>Unsplash Photo</span>
            </>
          ) : (
            <>
              <Globe className="size-3.5 text-muted-foreground" />
              <span>{attribution.source}</span>
            </>
          )}
        </ContextMenuLabel>

        <div className="px-2.5 py-1 text-xs text-muted-foreground">
          Photo by{" "}
          <span className="font-medium text-foreground">
            {attribution.creator}
          </span>
        </div>

        {alt && (
          <div className="px-2.5 py-1 text-2xs text-muted-foreground/80 italic line-clamp-2 max-w-xs">
            &ldquo;{alt}&rdquo;
          </div>
        )}

        <ContextMenuSeparator />

        <ContextMenuItem
          className="cursor-pointer gap-2 text-xs"
          onClick={handleOpenSource}
        >
          <ExternalLink className="size-3.5" />
          <span>
            {attribution.isUnsplash
              ? "Open on Unsplash"
              : "Open Original Source"}
          </span>
        </ContextMenuItem>

        <ContextMenuItem
          className="cursor-pointer gap-2 text-xs"
          onClick={handleCopySourceLink}
        >
          <Copy className="size-3.5" />
          <span>Copy Source Link</span>
        </ContextMenuItem>

        <ContextMenuItem
          className="cursor-pointer gap-2 text-xs"
          onClick={handleCopyImageUrl}
        >
          <ImageIcon className="size-3.5" />
          <span>Copy Image URL</span>
        </ContextMenuItem>

        <ContextMenuItem
          className="cursor-pointer gap-2 text-xs"
          onClick={handleCopyAttribution}
        >
          <FileText className="size-3.5" />
          <span>Copy Attribution</span>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          className="cursor-pointer gap-2 text-xs"
          onClick={handleOpenImageDirect}
        >
          <Maximize2 className="size-3.5" />
          <span>View Full Size Image</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
