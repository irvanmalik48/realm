"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toastManager,
  useToastManager,
} from "@/components/ui/toast"

export function Toaster() {
  return (
    <ToastProvider toastManager={toastManager}>
      <ToasterList />
    </ToastProvider>
  )
}

function ToasterList() {
  const { toasts } = useToastManager()

  return (
    <ToastViewport>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          toast={t}
          variant={(t.data?.variant as any) || (t.type as any) || "default"}
        >
          <div className="grid gap-1">
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && (
              <ToastDescription>{t.description}</ToastDescription>
            )}
          </div>
          {t.data?.action}
          <ToastClose />
        </Toast>
      ))}
    </ToastViewport>
  )
}
