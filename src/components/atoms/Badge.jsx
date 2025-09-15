import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
  
  const variants = {
    default: "bg-gray-100 text-secondary-600",
    high: "bg-red-100 text-red-700 border border-red-200",
    medium: "bg-amber-100 text-amber-700 border border-amber-200", 
    low: "bg-green-100 text-green-700 border border-green-200",
    completed: "bg-green-100 text-green-700",
    pending: "bg-blue-100 text-blue-700",
    overdue: "bg-red-100 text-red-700"
  }
  
  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge