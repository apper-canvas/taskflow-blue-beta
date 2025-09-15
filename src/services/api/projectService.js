import projectsData from "@/services/mockData/projects.json"

class ProjectService {
  constructor() {
    this.storageKey = "taskflow_projects"
    this.initializeData()
  }

  initializeData() {
    const existingData = localStorage.getItem(this.storageKey)
    if (!existingData) {
      localStorage.setItem(this.storageKey, JSON.stringify(projectsData))
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
        const projects = this.getData()
        resolve([...projects])
      }, 300)
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const projects = this.getData()
        const project = projects.find(p => p.Id === id)
        if (project) {
          resolve({ ...project })
        } else {
          reject(new Error("Project not found"))
        }
      }, 200)
    })
  }

async create(projectData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const projects = this.getData()
        const maxId = Math.max(...projects.map(p => p.Id), 0)
        const newProject = {
          Id: maxId + 1,
          title: projectData.title,
          description: projectData.description,
          color: projectData.color,
          createdAt: new Date().toISOString()
        }
        const updatedProjects = [newProject, ...projects]
        this.saveData(updatedProjects)
        resolve({ ...newProject })
      }, 300)
    })
  }

  async update(id, projectData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const projects = this.getData()
        const projectIndex = projects.findIndex(p => p.Id === id)
        
        if (projectIndex === -1) {
          reject(new Error("Project not found"))
          return
        }

        const updatedProject = {
          ...projects[projectIndex],
          ...projectData,
          Id: id
        }
        
        projects[projectIndex] = updatedProject
        this.saveData(projects)
        resolve({ ...updatedProject })
      }, 250)
    })
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const projects = this.getData()
        const projectIndex = projects.findIndex(p => p.Id === id)
        
        if (projectIndex === -1) {
          reject(new Error("Project not found"))
          return
        }

        const deletedProject = projects[projectIndex]
        const updatedProjects = projects.filter(p => p.Id !== id)
        this.saveData(updatedProjects)
        resolve({ ...deletedProject })
      }, 200)
    })
  }
}

export const projectService = new ProjectService()