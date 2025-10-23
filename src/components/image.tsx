"use client";

import { useState } from "react";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";

import Image from "next/image";
import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";
import { Lens } from "./ui/lens";
import { cn } from "@/lib/utils";

export interface ImageProps {
  img: StaticImport;
  alt: string;
  className?: string;
  innerClassName?: string;
  height?: number;
}

export function ImageComponent({
  img,
  alt,
  height,
  className,
  innerClassName,
}: ImageProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [performanceMode] = useAtom(performanceModeAtom);
  const [hovering, setHovering] = useState(false);

  const image = img as StaticImageData;

  return (
    <div className={cn("relative overflow-clip", className)}>
      {performanceMode ? (
        <Image
          src={image}
          alt={alt}
          height={height ?? image.height}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          onLoad={() => setIsImageLoading(false)}
          className={cn(
            isImageLoading && !performanceMode ? "blur" : "remove-blur",
            "transition-all",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "duration-500",
            innerClassName,
          )}
        />
      ) : (
        <Lens hovering={hovering} setHovering={setHovering}>
          <Image
            src={image}
            alt={alt}
            height={height ?? image.height}
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            onLoad={() => setIsImageLoading(false)}
            className={cn(
              isImageLoading && !performanceMode ? "blur" : "remove-blur",
              "transition-all",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",
              "duration-500",
              innerClassName,
            )}
          />
        </Lens>
      )}
    </div>
  );
}
