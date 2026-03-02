import { createSignal, Index, onMount } from "solid-js";
import { cn } from "@/libs/helpers/cn";

export interface TextSlideUpProps {
  text: string;
  class?: string;
  duration?: number;
  delay?: number;
}

export default function TextSlideUp(props: TextSlideUpProps) {
  const originalChars = props.text.split("");
  const [isRevealed, setIsRevealed] = createSignal(false);

  onMount(() => {
    const delay = props.delay ?? 0;

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsRevealed(true));
      });
    }, delay + 50);
  });

  return (
    <span class={cn("inline-flex overflow-hidden", props.class)}>
      <Index each={originalChars}>
        {(char, i) => {
          const isSpace = originalChars[i] === " ";
          return (
            <span
              class={cn(
                "relative inline-block transition-all ease-[cubic-bezier(0.85,0,0.15,1)]",
                isRevealed()
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              )}
              style={{
                "transition-delay": `${i * 30}ms`,
                "transition-duration": `${props.duration ?? 700}ms`
              }}
            >
              <span class="whitespace-pre">
                {isSpace ? " " : char()}
              </span>
            </span>
          );
        }}
      </Index>
    </span>
  );
}
