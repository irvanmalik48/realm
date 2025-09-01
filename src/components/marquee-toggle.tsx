"use client";

import marqueeEnable from "@/lib/atoms/marquee";
import { useAtom } from "jotai/react";
import { Switch } from "./ui/switch";

export function MarqueeToggle() {
  const [marquee, setMarquee] = useAtom(marqueeEnable);

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-3">
      <div className="flex gap-5 md:items-center items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-base font-semibold flex items-center gap-2">
            Toggle Marquee
          </p>
          <p>
            Enable or disable the scrolling marquee effect on the
            homepage&apos;s footer top.
          </p>
        </div>
        <Switch
          checked={marquee}
          onCheckedChange={(checked) => setMarquee(checked as boolean)}
          aria-label="Toggle marquee"
          disabled={false}
        />
      </div>
    </div>
  );
}
