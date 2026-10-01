"use client"

import * as React from "react"
import { toastManager, useToastManager } from "@/components/ui/toast"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

export type ToastVariant = "default" | "destructive" | "success"

export interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  action?: ToastActionElement
  duration?: number
  [key: string]: any
}

function toast({
  title,
  description,
  variant = "default",
  action,
  duration,
  ...props
}: ToastOptions) {
  const id = toastManager.add({
    title,
    description,
    type: variant,
    timeout: duration ?? 5000,
    data: {
      variant,
      action,
      ...props,
    },
  })

  return {
    id,
    dismiss: () => toastManager.close(id),
    update: (updates: ToastOptions) =>
      toastManager.update(id, {
        title: updates.title,
        description: updates.description,
        type: updates.variant,
        data: {
          variant: updates.variant,
          action: updates.action,
        },
      }),
  }
}

function useToast() {
  const manager = useToastManager()

  return {
    toasts: manager.toasts,
    toast,
    dismiss: (toastId?: string) => manager.close(toastId),
  }
}

export { useToast, toast }
