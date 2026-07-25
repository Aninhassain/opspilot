"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"

export function ToastProvider() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        className: "glass",
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
    />
  )
}
