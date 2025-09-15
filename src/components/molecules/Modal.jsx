import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = "default" 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const sizes = {
    sm: "max-w-md",
    default: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative bg-white rounded-lg shadow-xl w-full ${sizes[size]}`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ApperIcon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6">
              {children}
            </div>
            {footer && (
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal