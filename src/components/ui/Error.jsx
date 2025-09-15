import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your data. Please try again.",
  onRetry
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-secondary-600 mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error