"use client";

import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils";

const HoverCardContext = React.createContext<{
  delay?: number;
  closeDelay?: number;
}>({});

function HoverCard({
  openDelay,
  closeDelay,
  ...props
}: PreviewCardPrimitive.Root.Props & {
  openDelay?: number;
  closeDelay?: number;
}) {
  return (
    <HoverCardContext.Provider value={{ delay: openDelay, closeDelay }}>
      <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
    </HoverCardContext.Provider>
  );
}

function HoverCardTrigger({
  asChild,
  render,
  children,
  delay,
  closeDelay,
  ...props
}: PreviewCardPrimitive.Trigger.Props & { asChild?: boolean }) {
  const context = React.useContext(HoverCardContext);
  const effectiveDelay = delay ?? context.delay;
  const effectiveCloseDelay = closeDelay ?? context.closeDelay;

  const effectiveRender =
    render ??
    (asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined);

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      delay={effectiveDelay}
      closeDelay={effectiveCloseDelay}
      render={effectiveRender}
      {...props}
    >
      {asChild ? undefined : children}
    </PreviewCardPrimitive.Trigger>
  );
}

function HoverCardContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  alignOffset = 0,
  children,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "bg-popover text-popover-foreground z-50 w-64 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
