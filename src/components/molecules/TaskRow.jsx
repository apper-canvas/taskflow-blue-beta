import { format, isPast, isToday } from "date-fns"
import { motion } from "framer-motion"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import { cn } from "@/utils/cn"

const TaskRow = ({ task, onToggleComplete }) => {
const isOverdue = task.dueDate && !isNaN(new Date(task.dueDate)) 
    ? isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== "completed"
    : false
  
  const getPriorityVariant = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": return "high"
      case "medium": return "medium"
      case "low": return "low"
      default: return "default"
    }
  }

  const getStatusVariant = () => {
    if (task.status === "completed") return "completed"
    if (isOverdue) return "overdue"
    return "pending"
  }

  const handleToggle = () => {
    onToggleComplete(task.Id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer",
        task.status === "completed" && "bg-gray-50 opacity-75",
        isOverdue && task.status !== "completed" && "border-red-200 bg-red-50"
      )}
      onClick={handleToggle}
    >
      <Checkbox
        checked={task.status === "completed"}
        onChange={handleToggle}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn(
            "font-medium text-gray-900",
            task.status === "completed" && "line-through text-secondary-500"
          )}>
            {task.title}
          </h3>
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>
        </div>
        {task.description && (
          <p className={cn(
            "text-sm text-secondary-600 mb-2",
            task.status === "completed" && "text-secondary-400"
          )}>
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-secondary-500">
<span>Due: {task.dueDate && !isNaN(new Date(task.dueDate)) 
            ? format(new Date(task.dueDate), "MMM dd, yyyy")
            : "No due date"
          }</span>
          <Badge variant={getStatusVariant()}>
            {task.status === "completed" ? "Completed" : isOverdue ? "Overdue" : "Pending"}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskRow