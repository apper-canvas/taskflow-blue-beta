import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ApperIcon name="LayoutDashboard" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-primary-100">Get insights into your productivity and task management</p>
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
            <h3 className="text-lg font-semibold text-gray-900">Productivity Metrics</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Track your task completion rates, productivity trends, and performance insights.
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
              <ApperIcon name="Calendar" size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: View your upcoming task deadlines and never miss important due dates.
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
              <ApperIcon name="Target" size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Goal Tracking</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Set and track your productivity goals with detailed progress monitoring.
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
              <ApperIcon name="Clock" size={20} className="text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Time Tracking</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Track time spent on tasks and analyze your work patterns for better efficiency.
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
            <h3 className="text-lg font-semibold text-gray-900">Priority Alerts</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Get notified about high-priority tasks and important deadlines.
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
              <ApperIcon name="Users" size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Team Collaboration</h3>
          </div>
<p className="text-secondary-600">
            Coming soon: Share tasks, collaborate with team members, and track group progress.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard