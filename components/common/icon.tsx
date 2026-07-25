import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconProps {
  icon: LucideIcon | string
  className?: string
  size?: number
}

export function Icon({ icon, className, size = 20 }: IconProps) {
  if (typeof icon === "string") {
    const IconComponent = require("lucide-react")[icon]
    if (!IconComponent) return null
    return <IconComponent className={cn(className)} size={size} />
  }
  
  const IconComponent = icon
  return <IconComponent className={cn(className)} size={size} />
}
