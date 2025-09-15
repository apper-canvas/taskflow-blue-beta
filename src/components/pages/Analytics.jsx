import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Analytics = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ApperIcon name="BarChart3" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Analytics & Insights</h1>
            <p className="text-green-100">Track your productivity and gain insights into your work patterns</p>
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
              <ApperIcon name="TrendingUp" size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Productivity Trends</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Track your task completion trends over time and identify productivity patterns.
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
              <ApperIcon name="PieChart" size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Task Distribution</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Visualize how your tasks are distributed across projects and priority levels.
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
              <ApperIcon name="Clock" size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Time Analytics</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Analyze time spent on different types of tasks and optimize your workflow.
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
              <ApperIcon name="Target" size={20} className="text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Goal Progress</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Track progress toward your productivity goals and daily task completion targets.
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
              <ApperIcon name="AlertTriangle" size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Overdue Analysis</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Identify patterns in overdue tasks and get suggestions for better time management.
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
              <ApperIcon name="Download" size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Export Reports</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Generate and export detailed productivity reports for personal or professional use.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics