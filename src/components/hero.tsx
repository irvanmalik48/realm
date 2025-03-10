"use client";

import { Github, Linkedin, Mail, Send } from "lucide-react";
import {
  StaticImageData,
  type StaticImport,
} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export interface HeroProps {
  img: StaticImport;
  profile: StaticImport;
}

export function Hero({ img, profile }: HeroProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const image = img as StaticImageData;
  const profileImg = profile as StaticImageData;

  return (
    <div className="relative">
      <div className="relative overflow-clip w-full max-h-72 rounded-lg">
        <Image
          src={image}
          alt="Hero Image"
          height={1080}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          onLoad={() => setIsImageLoading(false)}
          className={`${
            isImageLoading ? "blur scale-150" : "remove-blur scale-100"
          } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
      </div>
      <div className="relative rounded-full aspect-square size-28 md:size-36 mx-auto md:mx-0 md:ml-5 -mt-18 border-6 border-background overflow-clip">
        <Image
          src={profileImg}
          alt="Profile Picture"
          height={500}
          placeholder="blur"
          blurDataURL={profileImg.blurDataURL}
          onLoad={() => setIsProfileLoading(false)}
          className={`${
            isProfileLoading ? "blur scale-150" : "remove-blur scale-100"
          } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
        />
      </div>
      <div className="relative w-full py-3 md:-mt-18 justify-center flex-col md:flex-row md:justify-between flex gap-3 md:gap-5 items-center">
        <p className="w-full md:pl-46 truncate text-center md:text-start text-2xl text-foreground font-bold dark:font-semibold">
          Irvan Malik Azantha
        </p>
        <div className="w-fit flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/irvanmalik48">
              <Github className="size-5" />
              <span className="sr-only">GitHub Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com/in/irvanmalik48">
              <Linkedin className="size-5" />
              <span className="sr-only">LinkedIn Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://t.me/irvanmalik48">
              <Send className="size-5" />
              <span className="sr-only">Telegram Account</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:irvanma@gnuweeb.org">
              <Mail className="size-5" />
              <span className="sr-only">Send a Mail</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
