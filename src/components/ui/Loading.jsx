import { motion } from "framer-motion"

const Loading = ({ type = "tasks" }) => {
  const renderSkeletonItem = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
        <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
        <div className="w-12 h-5 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  )

  if (type === "cards") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
          >
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
            </div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {renderSkeletonItem()}
        </motion.div>
      ))}
    </div>
  )
}

export default Loading