"use client";

import { useState } from "react";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";

import Image from "next/image";
import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";

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

  const image = img as StaticImageData;

  return (
    <div className={`relative overflow-clip ${className}`}>
      <Image
        src={image}
        alt={alt}
        height={height ?? image.height}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        onLoad={() => setIsImageLoading(false)}
        className={`${
          isImageLoading && !performanceMode ? "blur" : "remove-blur"
        } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500 ${innerClassName}`}
      />
    </div>
  );
}
