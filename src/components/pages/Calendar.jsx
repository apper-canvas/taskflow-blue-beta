import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Calendar = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ApperIcon name="Calendar" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Calendar View</h1>
            <p className="text-purple-100">Timeline view of your tasks and deadlines for better planning</p>
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
              <ApperIcon name="CalendarDays" size={20} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Monthly View</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: See all your tasks and deadlines in a monthly calendar format for better overview.
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
              <ApperIcon name="Clock" size={20} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Timeline View</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Visualize your tasks on a timeline to understand workload distribution.
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
              <ApperIcon name="Bell" size={20} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Deadline Reminders</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Get notified about upcoming deadlines and never miss important due dates.
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
              <ApperIcon name="Filter" size={20} className="text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Calendar Filters</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Filter calendar view by project, priority, or task status for focused planning.
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
              <ApperIcon name="Repeat" size={20} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Recurring Tasks</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Set up recurring tasks and see them automatically scheduled in your calendar.
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
            <h3 className="text-lg font-semibold text-gray-900">Calendar Export</h3>
          </div>
          <p className="text-secondary-600">
            Coming soon: Export your task calendar to external calendar applications like Google Calendar.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Calendar