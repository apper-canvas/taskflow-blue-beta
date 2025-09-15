import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Modal from "@/components/molecules/Modal"
import TaskForm from "@/components/molecules/TaskForm"
import TaskRow from "@/components/molecules/TaskRow"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { projectService } from "@/services/api/projectService"
import { taskService } from "@/services/api/taskService"

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError("")
      const [projectData, tasksData] = await Promise.all([
        projectService.getById(parseInt(id)),
        taskService.getByProject(parseInt(id))
      ])
      setProject(projectData)
      setTasks(tasksData)
    } catch (err) {
      setError(err.message || "Failed to load project details")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  const handleCreateTask = async (formData) => {
    try {
      const newTask = await taskService.create({
        ...formData,
        projectId: parseInt(id)
      })
      setTasks(prev => [newTask, ...prev])
      setIsTaskModalOpen(false)
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        status: task.status === "completed" ? "pending" : "completed",
        completedAt: task.status === "completed" ? null : new Date().toISOString()
      })
      
      setTasks(prev => prev.map(t => t.Id === taskId ? updatedTask : t))
      toast.success(`Task ${updatedTask.status === "completed" ? "completed" : "reopened"}!`)
    } catch (err) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.Id !== taskId))
      toast.success("Task deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete task")
    }
  }

  const getProjectStats = () => {
    const completedTasks = tasks.filter(task => task.status === "completed")
    const completionPercentage = tasks.length > 0 
      ? Math.round((completedTasks.length / tasks.length) * 100) 
      : 0
    
    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: tasks.length - completedTasks.length,
      completionPercentage
    }
  }

  if (isLoading) {
    return <Loading type="default" />
  }

  if (error) {
    return <Error title="Failed to load project" message={error} onRetry={loadData} />
  }

  if (!project) {
    return <Error title="Project not found" message="The project you're looking for doesn't exist." />
  }

  const stats = getProjectStats()

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              Back to Projects
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <ApperIcon name="Folder" size={32} style={{ color: project.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-secondary-600 text-lg mb-6">{project.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalTasks}</div>
                <div className="text-sm text-secondary-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
                <div className="text-sm text-secondary-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</div>
                <div className="text-sm text-secondary-600">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: project.color }}>{stats.completionPercentage}%</div>
                <div className="text-sm text-secondary-600">Progress</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${stats.completionPercentage}%`,
                    backgroundColor: project.color 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Project Tasks</h2>
              <p className="text-secondary-600">Manage tasks for this project</p>
            </div>
            <Button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2">
              <ApperIcon name="Plus" size={16} />
              Add Task
            </Button>
          </div>
        </div>

        <div className="p-6">
          {tasks.length === 0 ? (
            <Empty
              icon="CheckSquare"
              title="No tasks yet"
              message="Add your first task to get started with this project."
              actionLabel="Add Task"
              onAction={() => setIsTaskModalOpen(true)}
            />
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskRow
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Add Task to Project"
        size="default"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsTaskModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default ProjectDetail