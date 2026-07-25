import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface IconProps {
  icon: LucideIcon | string
  className?: string
  size?: number
}

export function Icon({ icon, className, size = 20 }: IconProps) {
  if (typeof icon === "string") {
    const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon
    if (!IconComponent) return null
    return <IconComponent className={cn(className)} size={size} />
  }
  
  const IconComponent = icon
  return <IconComponent className={cn(className)} size={size} />
}
