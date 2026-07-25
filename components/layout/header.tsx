"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/constants"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">O</span>
          </div>
          <span className="font-bold text-xl">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Testimonials
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4">
          <Link href="#features" className="block text-sm font-medium">
            Features
          </Link>
          <Link href="#pricing" className="block text-sm font-medium">
            Pricing
          </Link>
          <Link href="#testimonials" className="block text-sm font-medium">
            Testimonials
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/auth/login">
              <Button variant="ghost" className="w-full">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
