import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Projects = () => {
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="FolderPlus" size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Project Creation</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Create and manage projects to organize your tasks into logical groups and workflows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="GitBranch" size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Task Organization</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Assign tasks to specific projects and track progress across different workstreams.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="BarChart3" size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Project Analytics</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: View project completion rates, timelines, and performance metrics for better planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" size={20} className="text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Team Projects</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Collaborate on projects with team members and track collective progress.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Calendar" size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Visualize project timelines, milestones, and critical path planning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Archive" size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Project Templates</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Create reusable project templates to quickly set up similar workstreams.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects