import ApperIcon from "@/components/ApperIcon"

const Header = ({ title, subtitle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-secondary-500">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-secondary-600">Welcome back!</p>
            <p className="text-xs text-secondary-400">Stay organized and productive</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header