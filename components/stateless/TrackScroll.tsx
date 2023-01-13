"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function TrackScroll() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="h-1 w-full fixed top-0 left-0 bg-teal-300 z-[999]"
        style={{ scaleX }}
      />
      <div className="h-[40px] w-full fixed top-0 left-0 z-[5] bg-gradient-to-b from-neutral-900 to-transparent" />
      <div className="h-[40px] w-full fixed bottom-0 left-0 z-[5] bg-gradient-to-t from-neutral-900 to-transparent" />
    </>
  );
}
