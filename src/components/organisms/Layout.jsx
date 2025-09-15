import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Layout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return { title: "Dashboard", subtitle: "Overview of your productivity" }
      case "/tasks":
        return { title: "Tasks", subtitle: "Manage and track your tasks" }
      case "/projects":
        return { title: "Projects", subtitle: "Organize tasks by project" }
      case "/calendar":
        return { title: "Calendar", subtitle: "Timeline view of your tasks" }
      case "/analytics":
        return { title: "Analytics", subtitle: "Productivity insights and metrics" }
      default:
        return { title: "TaskFlow Pro", subtitle: "Task management dashboard" }
    }
  }

  const pageInfo = getPageTitle()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />
      
      <div className="flex flex-col flex-1 lg:ml-64">
        <div className="flex items-center gap-4 lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">TaskFlow Pro</span>
          </div>
        </div>
        
        <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout