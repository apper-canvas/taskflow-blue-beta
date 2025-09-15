import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md",
    secondary: "bg-white text-secondary-600 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm",
    ghost: "text-secondary-600 hover:bg-gray-100 hover:text-secondary-700",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md"
  }
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button