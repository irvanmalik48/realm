"use client";

import { useAtom } from "jotai";
import { smoothScrollAtom, scrollLerpAtom, scrollDurationAtom, customScrollbarEnabledAtom } from "@/lib/atoms/scroll";
import { Switch } from "./ui/switch";

export function ScrollSettingsToggle({ searchQuery }: { searchQuery?: string }) {
  const [smoothScroll, setSmoothScroll] = useAtom(smoothScrollAtom);
  const [scrollLerp, setScrollLerp] = useAtom(scrollLerpAtom);
  const [scrollDuration, setScrollDuration] = useAtom(scrollDurationAtom);
  const [customScrollbar, setCustomScrollbar] = useAtom(customScrollbarEnabledAtom);

  const matchQuery = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const smoothScrollMatches = matchQuery("Smooth Scrolling") || matchQuery("Enable smooth inertia-based scrolling using Lenis.") || matchQuery("smooth scrolling scroll inertia lenis");
  const lerpMatches = matchQuery("Scroll Velocity (Lerp)") || matchQuery("Controls how fast the scroll catches up to user input.") || matchQuery("lerp scroll velocity speed scroll speed");
  const durationMatches = matchQuery("Scroll Duration (Acceleration)") || matchQuery("Adjusts the easing duration of the scroll animation.") || matchQuery("scroll duration easing acceleration");
  const scrollbarMatches = matchQuery("Custom Scrollbar") || matchQuery("Enable custom stylized React scrollbar instead of the browser native one.") || matchQuery("custom scrollbar scrollbar styling");

  const anyMatches = smoothScrollMatches || lerpMatches || durationMatches || scrollbarMatches;
  if (!anyMatches) return null;

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-5 flex flex-col gap-4">
      {smoothScrollMatches && (
        <div className="flex gap-5 md:items-center items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-base font-semibold flex items-center gap-2">
              Smooth Scrolling
            </p>
            <p>
              Enable smooth inertia-based scrolling using Lenis.
            </p>
          </div>
          <Switch
            checked={smoothScroll}
            onCheckedChange={(checked) => setSmoothScroll(checked as boolean)}
            aria-label="Toggle smooth scrolling"
          />
        </div>
      )}

      {smoothScroll && (lerpMatches || durationMatches) && (
        <div className="mt-2 flex flex-col gap-4 pl-4 border-l-2 border-border/60">
          {lerpMatches && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-foreground">Scroll Velocity (Lerp)</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                  {scrollLerp.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Controls how fast the scroll catches up to user input. Lower values feel smoother and slower.
              </p>
              <input
                type="range"
                min="0.01"
                max="0.4"
                step="0.01"
                value={scrollLerp}
                onChange={(e) => setScrollLerp(parseFloat(e.target.value))}
                aria-label="Scroll Velocity (Lerp)"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
              />
            </div>
          )}

          {durationMatches && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-foreground">Scroll Duration (Acceleration)</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                  {scrollDuration.toFixed(1)}s
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Adjusts the easing duration of the scroll animation. Higher values feel floaty.
              </p>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={scrollDuration}
                onChange={(e) => setScrollDuration(parseFloat(e.target.value))}
                aria-label="Scroll Duration (Acceleration)"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
              />
            </div>
          )}
        </div>
      )}

      {scrollbarMatches && (
        <>
          {(smoothScrollMatches || lerpMatches || durationMatches) && (
            <div className="border-t border-border/40 my-2" />
          )}
          <div className="flex gap-5 md:items-center items-start justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-base font-semibold flex items-center gap-2">
                Custom Scrollbar
              </p>
              <p>
                Enable custom stylized React scrollbar instead of the browser native one.
              </p>
            </div>
            <Switch
              checked={customScrollbar}
              onCheckedChange={(checked) => setCustomScrollbar(checked as boolean)}
              aria-label="Toggle custom scrollbar"
            />
          </div>
        </>
      )}
    </div>
  );
}
