import { useState } from "react"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Button from "@/components/atoms/Button"

const ProjectForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    color: initialData?.color || "#3b82f6"
  })

  const [errors, setErrors] = useState({})

  const projectColors = [
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f59e0b" },
    { name: "Pink", value: "#ec4899" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Teal", value: "#14b8a6" }
  ]

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

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Title"
        placeholder="Enter project title"
        value={formData.title}
        onChange={handleChange("title")}
        error={errors.title}
        required
      />
      
      <Textarea
        label="Description"
        placeholder="Describe your project goals and objectives"
        value={formData.description}
        onChange={handleChange("description")}
        error={errors.description}
        rows={3}
        required
      />
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-secondary-600">
          Project Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {projectColors.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`w-full h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                formData.color === color.value 
                  ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ backgroundColor: `${color.value}20` }}
              onClick={() => handleColorSelect(color.value)}
            >
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color.value }}
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-secondary-500">
          Selected: {projectColors.find(c => c.value === formData.color)?.name}
        </p>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm