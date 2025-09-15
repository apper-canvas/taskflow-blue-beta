import { useState } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search...", className }) => {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={20} className="text-secondary-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}

export default SearchBar