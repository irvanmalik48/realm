import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useScrollerMotion } from "scroller-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScrollerMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const maxWidth = useMotionTemplate`calc(${scaleX} * 100%)`;

  return (
    <div className="fixed inset-x-0 top-0 p-1 h-auto bg-background/80 backdrop-blur">
      <div className="w-full h-auto rounded-full overflow-hidden">
        <motion.div
          className="w-full rounded-full h-1 bg-primary z-[997] mx-auto"
          style={{
            maxWidth,
          }}
        />
      </div>
    </div>
  );
}
