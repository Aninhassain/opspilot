"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FEATURES } from "@/constants"
import { Icon } from "@/components/common/icon"
import { motion } from "framer-motion"

export function Features() {
  return (
    <section id="features" className="container py-24 md:py-32">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to streamline your business operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow glass">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon icon={feature.icon} className="text-primary" size={24} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
