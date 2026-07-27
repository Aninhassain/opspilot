"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, Sparkles } from "lucide-react"

interface GuestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GuestModal({ open, onOpenChange }: GuestModalProps) {
  const handleSignIn = () => {
    window.location.href = "/auth/login"
    onOpenChange(false)
  }

  const handleContinueAsGuest = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to OpsPilot AI</DialogTitle>
          <DialogDescription className="text-base">
            Choose how you&apos;d like to experience the platform
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Card className="border-2 border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors cursor-pointer" onClick={handleContinueAsGuest}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Continue as Guest</CardTitle>
                  <CardDescription className="text-sm">
                    Try all features instantly - no account needed
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="border-2 border-muted hover:border-primary/40 transition-colors cursor-pointer" onClick={handleSignIn}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Sign In</CardTitle>
                  <CardDescription className="text-sm">
                    Save your work, access history from any device
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="text-center text-xs text-muted-foreground pt-2">
            <p>Guest data is stored locally in your browser</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
