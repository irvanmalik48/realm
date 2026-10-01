"use client"

import * as React from "react"
import { Toast as ToastPrimitives } from "@base-ui/react/toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const toastManager = ToastPrimitives.createToastManager()
const useToastManager = ToastPrimitives.useToastManager
const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  ToastPrimitives.Viewport.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Portal>
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed top-0 z-10000 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-105 gap-2.5",
        className
      )}
      {...props}
    />
  </ToastPrimitives.Portal>
))
ToastViewport.displayName = "ToastViewport"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--toast-swipe-movement-x) data-[swipe=move]:translate-x-(--toast-swipe-movement-x) data-[swipe=move]:transition-none data-open:animate-in data-closed:animate-out data-closed:fade-out-80 data-closed:slide-out-to-right-full data-open:slide-in-from-top-full data-open:sm:slide-in-from-bottom-full backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-border/80 bg-background/90 text-foreground shadow-2xl backdrop-blur-md",
        destructive:
          "destructive group border-destructive/30 bg-destructive/10 text-destructive dark:bg-destructive/20 shadow-2xl backdrop-blur-md",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-2xl backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastCustomProps {
  variant?: "default" | "destructive" | "success"
  toast: ToastPrimitives.Root.ToastObject<any>
}

const Toast = React.forwardRef<
  HTMLDivElement,
  Omit<ToastPrimitives.Root.Props, "toast"> & ToastCustomProps
>(({ className, variant = "default", toast, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      toast={toast}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  ToastPrimitives.Action.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-secondary focus:outline-hidden focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  ToastPrimitives.Close.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  ToastPrimitives.Title.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-xs font-semibold tracking-tight", className)}
    {...props}
  />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  ToastPrimitives.Description.Props
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-xs opacity-90 leading-relaxed", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  toastManager,
  useToastManager,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
