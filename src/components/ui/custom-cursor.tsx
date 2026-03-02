import { createSignal, onCleanup, onMount } from "solid-js";
import { cn } from "@/libs/helpers/cn";

export default function CustomCursor() {
  let innerCursorRef!: HTMLDivElement;
  let outerCursorRef!: HTMLDivElement;

  const [isHidden, setIsHidden] = createSignal(true);
  const [isPointer, setIsPointer] = createSignal(false);
  const [isClicking, setIsClicking] = createSignal(false);

  let cursorX = 0;
  let cursorY = 0;
  let targetX = 0;
  let targetY = 0;
  let animationFrameId: number;

  onMount(() => {
    // Check if device supports hover
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (innerCursorRef) {
        innerCursorRef.style.transform = `translate3d(calc(${targetX}px - 50%), calc(${targetY}px - 50%), 0)`;
      }

      if (isHidden()) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkPointer = () => {
      const el = document.elementFromPoint(targetX, targetY);
      if (el) {
        const style = window.getComputedStyle(el);
        const cursor = style.getPropertyValue("cursor");
        setIsPointer(
          cursor === "pointer" ||
            el.tagName.toLowerCase() === "a" ||
            el.tagName.toLowerCase() === "button" ||
            el.closest("a") !== null ||
            el.closest("button") !== null
        );
      }
    };

    const animate = () => {
      cursorX += (targetX - cursorX) * 0.15;
      cursorY += (targetY - cursorY) * 0.15;

      if (outerCursorRef) {
        outerCursorRef.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }

      checkPointer();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", updatePosition, {
      passive: true
    });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const style = document.createElement("style");
    style.innerHTML = "* { cursor: none !important; }";
    document.head.appendChild(style);

    onCleanup(() => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    });

    setTimeout(() => {
      setIsHidden(false);
    }, 100);
  });

  return (
    <>
      <div
        ref={(el) => {
          outerCursorRef = el;
        }}
        class={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary mix-blend-difference",
          "transition-[width,height,opacity,background-color] duration-300 ease-out",
          isHidden() ? "opacity-0" : "opacity-100",
          isPointer()
            ? "w-12 h-12 bg-primary/20 backdrop-blur-sm"
            : "w-8 h-8",
          isClicking() ? "scale-90 bg-primary/40" : "scale-100",
          "will-change-transform"
        )}
      />
      <div
        ref={(el) => {
          innerCursorRef = el;
        }}
        class={cn(
          "fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-primary mix-blend-difference",
          "transition-[width,height,opacity] duration-200 ease-out",
          isHidden() ? "opacity-0" : "opacity-100",
          isPointer() ? "w-0 h-0 opacity-0" : "w-2 h-2",
          "will-change-transform"
        )}
      />
    </>
  );
}
