"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import marqueeEnable from "@/lib/atoms/marquee";
import { useAtom } from "jotai/react";

import { cn } from "@/lib/utils";

interface TextScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
  textClassName?: string;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const TextScroll: React.FC<TextScrollProps> = ({
  text,
  default_velocity = 5,
  className,
  textClassName,
}) => {
  const [marquee] = useAtom(marqueeEnable);

  if (!marquee) {
    return (
      <section className={cn("relative z-20 w-full", className)}>
        <div className={cn("text-center", textClassName)}>{text}</div>
      </section>
    );
  }

  const ParallaxText: React.FC<ParallaxProps> = ({
    children,
    baseVelocity = 100,
    className,
  }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const calculateRepetitions = () => {
        if (containerRef.current && textRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        ref={containerRef}
      >
        <motion.div className={cn("inline-block", className)} style={{ x }}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <span key={i} ref={i === 0 ? textRef : null}>
              {children}{" "}
            </span>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className={cn("relative z-20 w-full", className)}>
      <div className="w-1/10 top-0 left-0 h-full absolute z-50 bg-gradient-to-r from-background to-transparent" />
      <div className="w-1/10 top-0 right-0 h-full absolute z-50 bg-gradient-to-l from-background to-transparent" />
      <ParallaxText baseVelocity={default_velocity} className={textClassName}>
        {text}
      </ParallaxText>
      <ParallaxText baseVelocity={-default_velocity} className={textClassName}>
        {text}
      </ParallaxText>
    </section>
  );
};
