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
    // Parent task fields (used when creating parent task automatically)
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate ? format(new Date(initialData.dueDate), "yyyy-MM-dd") : "",
    priority: initialData?.priority || "Medium",
    projectId: initialData?.projectId || "",
    // Subtask specific fields
    subtask: {
      title: initialData?.isSubTask ? initialData?.title || "" : "",
      description: initialData?.isSubTask ? initialData?.description || "" : "",
      dueDate: initialData?.isSubTask && initialData?.dueDate ? format(new Date(initialData.dueDate), "yyyy-MM-dd") : "",
      priority: initialData?.isSubTask ? initialData?.priority || "Medium" : "Medium"
    },
    parentTaskId: initialData?.parentTaskId || "",
    isSubTask: initialData?.isSubTask || false
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

// Auto-save parent task when Create as Subtask is checked
  const handleSubtaskToggle = (checked) => {
    // Immediate state update for UI reactivity
    setFormData(prev => ({ ...prev, isSubTask: checked }))
    
    // Handle async auto-save logic after state update
    if (checked && formData.title.trim()) {
      // Use setTimeout to ensure state update completes first
      setTimeout(async () => {
        try {
          // Auto-save current form data as parent task
          const parentTaskData = {
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate,
            priority: formData.priority,
            projectId: formData.projectId,
            isSubTask: false
          }
          
          const result = await taskService.create(parentTaskData)
          
          // Update parent tasks list and select the newly created parent
          await loadParentTasks()
          setFormData(prev => ({ 
            ...prev, 
            parentTaskId: result.parentTask?.Id?.toString() ?? "",
            // Keep parent task data for display, initialize subtask fields
            subtask: {
              title: "",
              description: "",
              dueDate: "",
              priority: "Medium"
            }
          }))
          
          // Show success message
          if (window.toast) {
            window.toast.success("Parent task auto-saved successfully!")
          }
        } catch (error) {
          console.error('Failed to auto-save parent task:', error)
          if (window.toast) {
            window.toast.error("Failed to auto-save parent task")
          }
          // Revert checkbox if auto-save failed
          setFormData(prev => ({ ...prev, isSubTask: false }))
        }
      }, 0)
    }
  }

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
    const value = e.target.value
    
    // Handle nested subtask fields
    if (field.startsWith('subtask.')) {
      const subtaskField = field.replace('subtask.', '')
      setFormData(prev => ({
        ...prev,
        subtask: {
          ...prev.subtask,
          [subtaskField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
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
        label={formData.isSubTask ? "Parent Task Title" : "Task Title"}
        placeholder={formData.isSubTask ? "Enter parent task title" : "Enter task title"}
        value={formData.title}
        onChange={handleChange("title")}
        error={errors.title}
        disabled={formData.isSubTask}
        required
      />
      
      <Textarea
        label={formData.isSubTask ? "Parent Task Description" : "Description"}
        placeholder={formData.isSubTask ? "Enter parent task description (optional)" : "Enter task description (optional)"}
        value={formData.description}
        onChange={handleChange("description")}
        disabled={formData.isSubTask}
        rows={3}
      />
      
<div className="grid grid-cols-2 gap-4">
        <Input
          label={formData.isSubTask ? "Parent Task Due Date" : "Due Date"}
          type="date"
          value={formData.dueDate}
          onChange={handleChange("dueDate")}
          error={errors.dueDate}
          disabled={formData.isSubTask}
          required
        />
        
        <Select
          label={formData.isSubTask ? "Parent Task Priority" : "Priority"}
          value={formData.priority}
          onChange={handleChange("priority")}
          disabled={formData.isSubTask}
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
          onChange={(e) => handleSubtaskToggle(e.target.checked)}
          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="isSubTask" className="text-sm font-medium text-gray-700">
          Create as Subtask
        </label>
      </div>
      
{formData.isSubTask && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">Subtask Details</h3>
          
          <Input
            label="Subtask Title"
            placeholder="Enter subtask title"
            value={formData.subtask.title}
            onChange={handleChange("subtask.title")}
            error={errors["subtask.title"]}
            required
          />
          
          <Textarea
            label="Subtask Description"
            placeholder="Enter subtask description (optional)"
            value={formData.subtask.description}
            onChange={handleChange("subtask.description")}
            rows={3}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Subtask Due Date"
              type="date"
              value={formData.subtask.dueDate}
              onChange={handleChange("subtask.dueDate")}
              error={errors["subtask.dueDate"]}
              required
            />
            
            <Select
              label="Subtask Priority"
              value={formData.subtask.priority}
              onChange={handleChange("subtask.priority")}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </div>
          
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
        </div>
      )}
      
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