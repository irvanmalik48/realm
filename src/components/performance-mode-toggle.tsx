"use client";

import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai/react";
import { Switch } from "./ui/switch";

export function PerformanceModeToggle() {
  const [performanceMode, setPerformanceMode] = useAtom(performanceModeAtom);

  return (
    <div className="w-full text-sm text-muted-foreground px-5 py-3">
      <div className="flex gap-5 md:items-center items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-foreground text-base font-semibold flex items-center gap-2">
            Performance Mode
          </p>
          <p>
            Turn off unneccessary effects to improve performance on lower-end
            devices.
          </p>
        </div>
        <Switch
          checked={performanceMode}
          onCheckedChange={(checked) => setPerformanceMode(checked as boolean)}
          aria-label="Toggle performance mode"
          disabled={false}
        />
      </div>
    </div>
  );
}
