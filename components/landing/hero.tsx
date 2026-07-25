"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="container py-24 md:py-32 lg:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>AI-Powered Operations Dashboard</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          Automate Your Business
          <span className="block text-primary">Operations with AI</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl">
          Streamline document processing, email classification, and workflow management with our intelligent AI-powered dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="pt-8 grid grid-cols-3 gap-8 md:gap-16 text-center">
          <div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1M+</div>
            <div className="text-sm text-muted-foreground">Documents Processed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
