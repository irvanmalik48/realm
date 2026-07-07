"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useAtom } from "jotai";
import { cursorEnabledAtom, cursorSpeedAtom, cursorHoverScaleAtom, cursorSizeAtom, cursorPointerSizeAtom } from "@/lib/atoms/cursor";
import { Switch } from "./ui/switch";

const pointerStore = {
  subscribe(callback: () => void) {
    if (typeof window === "undefined") return () => {};
    const mediaQuery = window.matchMedia("(any-pointer: fine)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  },
  getSnapshot() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(any-pointer: fine)").matches;
  },
  getServerSnapshot() {
    return false;
  }
};

export function CursorSettingsToggle({ searchQuery }: { searchQuery?: string }) {
  const [cursorEnabled, setCursorEnabled] = useAtom(cursorEnabledAtom);
  const [cursorSpeed, setCursorSpeed] = useAtom(cursorSpeedAtom);
  const [cursorHoverScale, setCursorHoverScale] = useAtom(cursorHoverScaleAtom);
  const [cursorSize, setCursorSize] = useAtom(cursorSizeAtom);
  const [cursorPointerSize, setCursorPointerSize] = useAtom(cursorPointerSizeAtom);

  const hasPointer = useSyncExternalStore(
    pointerStore.subscribe,
    pointerStore.getSnapshot,
    pointerStore.getServerSnapshot
  );

  const matchQuery = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const cursorMatches = matchQuery("Custom Cursor (Orb)") || matchQuery("Enable a fluid custom orb following the mouse.") || matchQuery("custom cursor cursor orb mouse pointer");
  const speedMatches = matchQuery("Follow-up Speed") || matchQuery("Controls how fast the orb follows the pointer.") || matchQuery("follow-up speed cursor speed latency");
  const scaleMatches = matchQuery("Hover Scale") || matchQuery("Scale multiplier when hovering links") || matchQuery("hover scale cursor hover hover size");
  const pointerMatches = matchQuery("Pointer Orb Size") || matchQuery("The baseline diameter of the leading pointer orb.") || matchQuery("pointer size leading orb");
  const trailMatches = matchQuery("Trail Orb Size (Delayed)") || matchQuery("The baseline diameter of the trailing delayed orb.") || matchQuery("trail size trailing orb");

  const anyMatches = cursorMatches || speedMatches || scaleMatches || pointerMatches || trailMatches;
  if (!anyMatches) return null;

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-5 flex flex-col gap-4">
      {cursorMatches && (
        <div className={`flex gap-5 md:items-center items-start justify-between ${!hasPointer ? "opacity-50" : ""}`}>
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
            disabled={!hasPointer}
          />
        </div>
      )}

      {cursorEnabled && (speedMatches || scaleMatches || pointerMatches || trailMatches) && (
        <div className={`mt-2 flex flex-col gap-4 pl-4 border-l-2 border-border/60 ${!hasPointer ? "opacity-40 pointer-events-none select-none" : ""}`}>
          {speedMatches && (
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
                disabled={!hasPointer}
                aria-label="Follow-up Speed"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden disabled:cursor-not-allowed"
              />
            </div>
          )}

          {scaleMatches && (
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
                disabled={!hasPointer}
                aria-label="Hover Scale"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden disabled:cursor-not-allowed"
              />
            </div>
          )}

          {pointerMatches && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-foreground">Pointer Orb Size</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                  {cursorPointerSize}px
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                The baseline diameter of the leading pointer orb.
              </p>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={cursorPointerSize}
                onChange={(e) => setCursorPointerSize(parseInt(e.target.value, 10))}
                disabled={!hasPointer}
                aria-label="Pointer Orb Size"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden disabled:cursor-not-allowed"
              />
            </div>
          )}

          {trailMatches && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-foreground">Trail Orb Size (Delayed)</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-primary">
                  {cursorSize}px
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                The baseline diameter of the trailing delayed orb.
              </p>
              <input
                type="range"
                min="8"
                max="80"
                step="1"
                value={cursorSize}
                onChange={(e) => setCursorSize(parseInt(e.target.value, 10))}
                disabled={!hasPointer}
                aria-label="Trail Orb Size (Delayed)"
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden disabled:cursor-not-allowed"
              />
            </div>
          )}
        </div>
      )}

      {!hasPointer && (
        <div className="mt-1 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-md font-medium">
          Custom cursor settings are disabled on this device because it does not support cursor (mouse/pointer) input.
        </div>
      )}
    </div>
  );
}
