import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Tasks", href: "/tasks", icon: "CheckSquare" },
    { name: "Projects", href: "/projects", icon: "Folder" },
    { name: "Calendar", href: "/calendar", icon: "Calendar" },
    { name: "Analytics", href: "/analytics", icon: "BarChart3" }
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <ApperIcon name="CheckSquare" size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          <p className="text-sm text-secondary-500">Pro</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onMobileClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                  : "text-secondary-600 hover:bg-gray-100 hover:text-gray-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon 
                  name={item.icon} 
                  size={20} 
                  className={isActive ? "text-white" : "text-secondary-500"} 
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-700">Stay Productive</p>
              <p className="text-xs text-primary-600">Organize your workflow</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200 lg:z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="relative flex flex-col w-80 bg-white border-r border-gray-200 shadow-xl"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={onMobileClose}
                className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-gray-100 rounded-lg"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            <SidebarContent />
          </motion.aside>
        </div>
      )}
    </>
  )
}

export default Sidebar