import { usePBToggle } from "@/hooks/atoms";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { useScrollerMotion } from "scroller-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScrollerMotion();
  const { progressBar } = usePBToggle();

  const scaleX = useSpring(
    scrollYProgress as unknown as number | MotionValue<any>,
    {
      stiffness: 50,
      damping: 30,
      restDelta: 1,
    }
  );

  const maxWidth = useMotionTemplate`calc(${scaleX} * 100%)`;

  return (
    <motion.div
      className="fixed inset-x-0 transition-all p-1 h-auto bg-background/80 backdrop-blur"
      style={{
        top: progressBar ? 0 : -100,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <div className="w-full h-auto rounded-full overflow-hidden">
        <motion.div
          className="w-full rounded-full h-1 bg-primary z-[997] mx-auto"
          style={{
            maxWidth,
          }}
        />
      </div>
    </motion.div>
  );
}
