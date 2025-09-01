"use client";

import darkModeToggleAnimation from "@/lib/atoms/fade";
import { useAtom } from "jotai/react";
import { Switch } from "./ui/switch";

export function DarkModeAnimationToggle() {
  const [darkModeAnim, setDarkModeAnim] = useAtom(darkModeToggleAnimation);

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-3">
      <div className="flex gap-5 md:items-center items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-base font-semibold flex items-center gap-2">
            Fade for Dark Mode Toggle
          </p>
          <p>
            Use normal fading animation when toggling between light and dark
            mode.
          </p>
        </div>
        <Switch
          checked={darkModeAnim.includes("fade")}
          onCheckedChange={(checked) =>
            setDarkModeAnim(checked ? "fade" : "circle-blur")
          }
          aria-label="Toggle fade animation for dark mode toggle"
          disabled={false}
        />
      </div>
    </div>
  );
}
