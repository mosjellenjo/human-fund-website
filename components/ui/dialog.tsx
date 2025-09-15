"use client"

import React, { createContext, useContext, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

type DialogCtx = { onOpenChange?: (open: boolean) => void }
const Ctx = createContext<DialogCtx>({})

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  return <Ctx.Provider value={{ onOpenChange }}>{open ? <>{children}</> : null}</Ctx.Provider>
}

export function DialogContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { onOpenChange } = useContext(Ctx)
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/70" onClick={() => onOpenChange?.(false)} />
      <div className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-brand-accent/30 bg-brand-bg-elevated p-6 shadow-xl hf-glass-strong", className)}>
        <button aria-label="Close" className="absolute right-4 top-3 text-gray-300 hover:text-white" onClick={() => onOpenChange?.(false)}>×</button>
        {children}
      </div>
    </>,
    document.body
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <p className={cn("text-sm text-gray-300", className)} {...props} />
}

// Placeholders for API compatibility (not used now)
export const DialogTrigger = (props: any) => <button {...props} />
export const DialogOverlay = (props: any) => <div {...props} />
export const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const DialogClose = (props: any) => <button {...props} />
