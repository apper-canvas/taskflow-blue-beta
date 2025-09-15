import { useState } from "react"
import { format } from "date-fns"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    dueDate: initialData?.dueDate ? format(new Date(initialData.dueDate), "yyyy-MM-dd") : "",
    priority: initialData?.priority || "Medium"
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
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