import { useState, useEffect } from "react"
import Select from "@/components/atoms/Select"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import Modal from "@/components/molecules/Modal"
import TaskForm from "@/components/molecules/TaskForm"
import TaskRow from "@/components/molecules/TaskRow"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { taskService } from "@/services/api/taskService"
import { projectService } from "@/services/api/projectService"
const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const loadTasks = async () => {
    try {
      setIsLoading(true)
      setError("")
      const data = await taskService.getAll()
      setTasks(data)
      setFilteredTasks(data)
    } catch (err) {
      setError(err.message || "Failed to load tasks")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])
const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
          aValue = priorityOrder[a.priority] || 0
          bValue = priorityOrder[b.priority] || 0
          break
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0
          bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }
      
      if (sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const sorted = sortTasks(filtered)
    setFilteredTasks(sorted)
  }, [tasks, searchQuery, sortBy, sortOrder])

const handleCreateTask = async (formData) => {
    try {
      const newTask = await taskService.create(formData)
      // Reload all tasks to get parent-child relationships properly
      await loadTasks()
      setIsModalOpen(false)
      
      if (formData.isSubTask) {
        toast.success("Subtask and parent task created successfully!")
      } else {
        toast.success("Task created successfully!")
      }
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        status: task.status === "completed" ? "pending" : "completed",
        completedAt: task.status === "completed" ? null : new Date().toISOString()
      })
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      toast.success(
        updatedTask.status === "completed" ? "Task completed!" : "Task marked as pending"
      )
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === "completed").length
    const pending = tasks.filter(t => t.status === "pending").length
    const overdue = tasks.filter(t => {
      const dueDate = new Date(t.dueDate)
      const today = new Date()
      return t.status !== "completed" && dueDate < today
    }).length

    return { total: tasks.length, completed, pending, overdue }
  }

const handleSortChange = (value) => {
    const [field, order] = value.split('-')
    setSortBy(field)
    setSortOrder(order)
  }

  const stats = getTaskStats()

  if (isLoading) {
    return <Loading type="tasks" />
  }

  if (error) {
    return <Error title="Failed to load tasks" message={error} onRetry={loadTasks} />
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertCircle" size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-secondary-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions Bar */}
<div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tasks..."
            className="w-full sm:w-96"
          />
          <Select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full sm:w-64"
>
<option value="createdAt-desc">Newest</option>
            <option value="createdAt-asc">Oldest</option>
            <option value="priority-desc">High</option>
            <option value="priority-medium-desc">Medium</option>
            <option value="priority-medium-asc">Medium (Low to High)</option>
            <option value="priority-asc">Low</option>
            <option value="dueDate-desc">Latest(Due Date)</option>
          </Select>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <ApperIcon name="Plus" size={16} />
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Tasks {searchQuery && `(${filteredTasks.length} found)`}
          </h2>
        </div>
        
        <div className="p-4">
          {filteredTasks.length === 0 ? (
            searchQuery ? (
              <Empty
                icon="Search"
                title="No tasks found"
                message={`No tasks match your search "${searchQuery}". Try a different search term.`}
                actionLabel="Clear Search"
                onAction={() => setSearchQuery("")}
              />
            ) : (
              <Empty
                title="No tasks yet"
                message="Create your first task to get started with organizing your work."
                actionLabel="Create Task"
                onAction={() => setIsModalOpen(true)}
              />
            )
          ) : (
            <div className="space-y-3">
{filteredTasks.map((task) => (
                <TaskRow
                  key={task.Id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
{/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
        size="default"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Tasks