import { useState, useEffect } from "react"
import { format } from "date-fns"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import { projectService } from "@/services/api/projectService"
import { taskService } from "@/services/api/taskService"
const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate ? format(new Date(initialData.dueDate), "yyyy-MM-dd") : "",
    priority: initialData?.priority || "Medium",
    projectId: initialData?.projectId || "",
    parentTaskId: initialData?.parentTaskId || "",
    isSubTask: initialData?.isSubTask || false,
    subtaskTitle: initialData?.subtaskTitle || "",
    subtaskDescription: initialData?.subtaskDescription || "",
    subtaskStatus: initialData?.subtaskStatus || "pending",
    subtaskDueDate: initialData?.subtaskDueDate ? format(new Date(initialData.subtaskDueDate), "yyyy-MM-dd") : ""
  })
  
  const [projects, setProjects] = useState([])
  const [parentTasks, setParentTasks] = useState([])
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isLoadingParentTasks, setIsLoadingParentTasks] = useState(false)

  const [errors, setErrors] = useState({})

useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (formData.isSubTask) {
      loadParentTasks()
    } else {
      setParentTasks([])
      setFormData(prev => ({ ...prev, parentTaskId: "" }))
    }
  }, [formData.isSubTask])

  const loadProjects = async () => {
    try {
      const projectsData = await projectService.getAll()
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to load projects:', error)
    } finally {
      setIsLoadingProjects(false)
    }
  }

  const loadParentTasks = async () => {
    setIsLoadingParentTasks(true)
    try {
      const tasksData = await taskService.getAll()
      // Filter out sub-tasks to show only main tasks as potential parents
      const mainTasks = tasksData.filter(task => !task.parentTaskId)
      setParentTasks(mainTasks)
    } catch (error) {
      console.error('Failed to load parent tasks:', error)
    } finally {
      setIsLoadingParentTasks(false)
    }
  }

const handleChange = (field) => (e) => {
    const value = field === 'isSubTask' ? e.target.checked : e.target.value
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }
    
    if (formData.isSubTask && !formData.parentTaskId) {
      newErrors.parentTaskId = "Parent task is required for sub-tasks"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    onSubmit(formData)
  }

  return (
<form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        placeholder="Enter task title"
        value={formData.title}
        onChange={handleChange("title")}
        error={errors.title}
        required
      />
      
      <Textarea
        label="Description"
        placeholder="Enter task description (optional)"
        value={formData.description}
        onChange={handleChange("description")}
        rows={3}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange("dueDate")}
          error={errors.dueDate}
          required
        />
        
        <Select
          label="Priority"
          value={formData.priority}
          onChange={handleChange("priority")}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </div>
      
      <Select
        label="Project"
        value={formData.projectId}
        onChange={handleChange("projectId")}
        disabled={isLoadingProjects}
      >
        <option value="">Select a project (optional)</option>
        {projects.map(project => (
          <option key={project.Id} value={project.Id}>
            {project.title}
          </option>
        ))}
      </Select>
      
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="isSubTask"
          checked={formData.isSubTask}
          onChange={handleChange("isSubTask")}
          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="isSubTask" className="text-sm font-medium text-gray-700">
          Create as Subtask
        </label>
      </div>
      
      {formData.isSubTask && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-3">Subtask Details</h4>
          
          <Input
            label="Subtask Title"
            placeholder="Enter subtask title"
            value={formData.subtaskTitle}
            onChange={handleChange("subtaskTitle")}
            error={errors.subtaskTitle}
            required={formData.isSubTask}
          />
          
          <Textarea
            label="Subtask Description"
            placeholder="Enter subtask description (optional)"
            value={formData.subtaskDescription}
            onChange={handleChange("subtaskDescription")}
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Subtask Status"
              value={formData.subtaskStatus}
              onChange={handleChange("subtaskStatus")}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
            
            <Input
              label="Subtask Due Date"
              type="date"
              value={formData.subtaskDueDate}
              onChange={handleChange("subtaskDueDate")}
              error={errors.subtaskDueDate}
            />
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isSubTask"
            checked={formData.isSubTask}
            onChange={handleChange("isSubTask")}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
          />
          <label htmlFor="isSubTask" className="text-sm font-medium text-gray-700">
            This is a sub-task
          </label>
        </div>
        
        {formData.isSubTask && (
          <Select
            label="Parent Task"
            value={formData.parentTaskId}
            onChange={handleChange("parentTaskId")}
            error={errors.parentTaskId}
            disabled={isLoadingParentTasks}
            required
          >
            <option value="">Select parent task</option>
            {parentTasks.map(task => (
              <option key={task.Id} value={task.Id}>
                {task.title}
              </option>
            ))}
          </Select>
        )}
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm