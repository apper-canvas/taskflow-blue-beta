import tasksData from "@/services/mockData/tasks.json";
class TaskService {
  constructor() {
    this.storageKey = "taskflow_tasks"
    this.initializeData()
  }

  initializeData() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(tasksData))
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getData()
        resolve([...tasks])
      }, 300)
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = this.getData()
        const task = tasks.find(t => t.Id === id)
        if (task) {
          resolve({ ...task })
        } else {
          reject(new Error("Task not found"))
        }
      }, 200)
    })
  }

  async getByProject(projectId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getData()
        const projectTasks = tasks.filter(t => t.projectId === projectId)
        resolve([...projectTasks])
      }, 300)
    })
  }

  async create(taskData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.getData()
        const maxId = Math.max(...tasks.map(t => t.Id), 0)
        const newTask = {
Id: maxId + 1,
          title: taskData.title,
          description: taskData.description || "",
          dueDate: taskData.dueDate,
          priority: taskData.priority,
          status: "pending",
          projectId: taskData.projectId || null,
          parentTaskId: taskData.parentTaskId || null,
          isSubTask: taskData.isSubTask || false,
          createdAt: new Date().toISOString(),
          completedAt: null
        }
        const updatedTasks = [newTask, ...tasks]
        this.saveData(updatedTasks)
        resolve({ ...newTask })
      }, 300)
    })
  }

  async update(id, taskData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = this.getData()
        const taskIndex = tasks.findIndex(t => t.Id === id)
        
        if (taskIndex === -1) {
          reject(new Error("Task not found"))
          return
        }

const updatedTask = {
          ...tasks[taskIndex],
          ...taskData,
          Id: id,
          parentTaskId: taskData.parentTaskId || tasks[taskIndex].parentTaskId,
          isSubTask: taskData.isSubTask !== undefined ? taskData.isSubTask : tasks[taskIndex].isSubTask
        }
        tasks[taskIndex] = updatedTask
        this.saveData(tasks)
        resolve({ ...updatedTask })
      }, 250)
    })
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = this.getData()
        const taskIndex = tasks.findIndex(t => t.Id === id)
        
        if (taskIndex === -1) {
          reject(new Error("Task not found"))
          return
        }

        const deletedTask = tasks[taskIndex]
        const updatedTasks = tasks.filter(t => t.Id !== id)
        this.saveData(updatedTasks)
        resolve({ ...deletedTask })
      }, 200)
    })
  }
}

export const taskService = new TaskService()