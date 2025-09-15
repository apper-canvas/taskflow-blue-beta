import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Modal from "@/components/molecules/Modal"
import ProjectForm from "@/components/molecules/ProjectForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { projectService } from "@/services/api/projectService"
import { taskService } from "@/services/api/taskService"
const Projects = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError("")
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ])
      setProjects(projectsData)
      setTasks(tasksData)
    } catch (err) {
      setError(err.message || "Failed to load projects")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getProjectStats = (projectId) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId)
    const completedTasks = projectTasks.filter(task => task.status === "completed")
    const completionPercentage = projectTasks.length > 0 
      ? Math.round((completedTasks.length / projectTasks.length) * 100) 
      : 0
    
    return {
      totalTasks: projectTasks.length,
      completedTasks: completedTasks.length,
      completionPercentage
    }
  }

  const handleCreateProject = async (formData) => {
    try {
      const newProject = await projectService.create(formData)
      setProjects(prev => [newProject, ...prev])
      setIsModalOpen(false)
      toast.success("Project created successfully!")
    } catch (err) {
      toast.error("Failed to create project")
    }
  }

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  if (isLoading) {
    return <Loading type="cards" />
  }

  if (error) {
    return <Error title="Failed to load projects" message={error} onRetry={loadData} />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ApperIcon name="Folder" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-blue-100">Organize your tasks by project for better workflow management</p>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
          <p className="text-secondary-600">Manage and track your project progress</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Empty
          icon="Folder"
          title="No projects yet"
          message="Create your first project to organize your tasks and track progress effectively."
          actionLabel="Create Project"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const stats = getProjectStats(project.Id)
            return (
              <motion.div
                key={project.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleProjectClick(project.Id)}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center`}
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <ApperIcon name="Folder" size={24} style={{ color: project.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{project.title}</h3>
                    <p className="text-sm text-secondary-600 line-clamp-2">{project.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary-600">Progress</span>
                    <span className="font-medium text-gray-900">{stats.completionPercentage}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${stats.completionPercentage}%`,
                        backgroundColor: project.color 
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm text-secondary-600">
                    <span>{stats.totalTasks} tasks</span>
                    <span>{stats.completedTasks} completed</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        size="default"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Projects