import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked,
  disabled,
  ...props 
}, ref) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "flex items-center justify-center w-4 h-4 border-2 rounded transition-all duration-200 cursor-pointer",
          checked 
            ? "bg-primary-500 border-primary-500 text-white" 
            : "bg-white border-gray-300 hover:border-primary-400",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && props.onChange && props.onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon name="Check" size={12} className="text-white" />
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox