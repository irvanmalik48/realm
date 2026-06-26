"use client";

import { useAtom } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom } from "@/lib/atoms/cursor";
import { Switch } from "./ui/switch";

export function CursorSettingsToggle() {
  const [cursorEnabled, setCursorEnabled] = useAtom(cursorEnabledAtom);
  const [cursorSpeed, setCursorSpeed] = useAtom(cursorSpeedAtom);
  const [cursorHoverScale, setCursorHoverScale] = useAtom(cursorHoverScaleAtom);
  const [cursorSize, setCursorSize] = useAtom(cursorSizeAtom);

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-5 flex flex-col gap-4">
      <div className="flex gap-5 md:items-center items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-base font-semibold flex items-center gap-2">
            Custom Cursor (Orb)
          </p>
          <p>
            Enable a fluid custom orb following the mouse.
          </p>
        </div>
        <Switch
          checked={cursorEnabled}
          onCheckedChange={(checked) => setCursorEnabled(checked as boolean)}
          aria-label="Toggle custom cursor"
        />
      </div>

      {cursorEnabled && (
        <div className="mt-2 flex flex-col gap-4 pl-4 border-l-2 border-border/60">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-foreground">Follow-up Speed</span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                {cursorSpeed.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Controls how fast the orb follows the pointer. Lower values mean higher latency/delay.
            </p>
            <input
              type="range"
              min="0.05"
              max="0.4"
              step="0.01"
              value={cursorSpeed}
              onChange={(e) => setCursorSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-foreground">Hover Scale</span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                {cursorHoverScale.toFixed(2)}x
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Scale multiplier when hovering links, buttons, and input fields.
            </p>
            <input
              type="range"
              min="0.75"
              max="2.0"
              step="0.05"
              value={cursorHoverScale}
              onChange={(e) => setCursorHoverScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-foreground">Base Orb Size</span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                {cursorSize}px
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              The baseline diameter of the cursor orb.
            </p>
            <input
              type="range"
              min="8"
              max="50"
              step="1"
              value={cursorSize}
              onChange={(e) => setCursorSize(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}
