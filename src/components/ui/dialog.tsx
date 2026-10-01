"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog({
  ...props
}: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  asChild,
  render,
  children,
  ...props
}: DialogPrimitive.Trigger.Props & { asChild?: boolean }) {
  const effectiveRender =
    render ??
    (asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined)

  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      render={effectiveRender}
      {...props}
    >
      {asChild ? undefined : children}
    </DialogPrimitive.Trigger>
  )
}

function DialogPortal({
  ...props
}: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  asChild,
  render,
  children,
  ...props
}: DialogPrimitive.Close.Props & { asChild?: boolean }) {
  const effectiveRender =
    render ??
    (asChild && React.isValidElement(children)
      ? (children as React.ReactElement)
      : undefined)

  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      render={effectiveRender}
      {...props}
    >
      {asChild ? undefined : children}
    </DialogPrimitive.Close>
  )
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-999 bg-black/60 backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="fixed inset-0 z-999 flex items-center justify-center p-3 sm:p-4 overflow-hidden pointer-events-none">
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "pointer-events-auto relative z-999 grid w-full max-w-lg gap-4 rounded-xl border bg-background p-4 sm:p-6 shadow-2xl outline-none max-h-[min(calc(100dvh-2rem),calc(100vh-2rem))] overflow-y-auto overscroll-contain my-auto data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 duration-200",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-open:bg-accent data-open:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </div>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose render={<Button variant="outline">Close</Button>} />
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
