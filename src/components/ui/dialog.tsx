"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const DialogContext = React.createContext<{ open: boolean }>({ open: false })
const useDialog = () => React.useContext(DialogContext)

function Dialog({
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [open, setOpen] = React.useState(props.defaultOpen || false)
  const isControlled = props.open !== undefined
  const activeOpen = isControlled ? (props.open ?? false) : open

  const handleOpenChange = React.useCallback((val: boolean) => {
    if (!isControlled) {
      setOpen(val)
    }
    props.onOpenChange?.(val)
  }, [isControlled, props.onOpenChange])

  return (
    <DialogContext.Provider value={{ open: activeOpen }}>
      <DialogPrimitive.Root
        {...props}
        open={activeOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {children}
      </div>
    </DialogPrimitive.Portal>
  )
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  const { open } = useDialog()

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal data-slot="dialog-portal" forceMount>
          <DialogOverlay forceMount asChild>
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </DialogOverlay>
          <DialogPrimitive.Content
            asChild
            forceMount
            data-slot="dialog-content"
            className={cn(
              "relative z-50 grid w-full max-w-lg gap-4 rounded-lg border bg-background p-6 shadow-lg outline-none",
              className
            )}
            {...props}
          >
            <motion.div
              initial={{ y: "100vh", opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ 
                y: "30px", 
                opacity: 0, 
                scale: 0.92, 
                filter: "blur(16px)",
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
              }}
              transition={{ duration: 0.8, ease: [0.08, 0.82, 0.17, 1] }}
            >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close
                  data-slot="dialog-close"
                  className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      )}
    </AnimatePresence>
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
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
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
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
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
