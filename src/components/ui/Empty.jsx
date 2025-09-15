import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  icon = "CheckSquare",
  title = "No tasks yet", 
  message = "Create your first task to get started with organizing your work.",
  actionLabel = "Create Task",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-primary-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-secondary-600 mb-8 max-w-md">{message}</p>
      
      {onAction && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty