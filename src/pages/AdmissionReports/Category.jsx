"use client"

import { useState } from "react"
import { ChevronRight, Search, X } from "lucide-react"

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColumn, setFilterColumn] = useState("all")

  // Sample data matching the image
  const [categoryData] = useState([
    {
      id: 1,
      category: "Normal",
      students: 5,
    },
  ])

  // Filter data based on search and column filter
  const filteredData = categoryData.filter((item) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    switch (filterColumn) {
      case "category":
        return item.category.toLowerCase().includes(searchLower)
      case "students":
        return item.students.toString().includes(searchTerm)
      default:
        return item.category.toLowerCase().includes(searchLower) || item.students.toString().includes(searchTerm)
    }
  })

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Category wise Students Report</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-lg shadow-lg">
          {/* Search and Filter Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 w-full">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Dropdown */}
              <div className="flex-shrink-0">
                <select
                  value={filterColumn}
                  onChange={(e) => setFilterColumn(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                >
                  <option value="all">All Columns</option>
                  <option value="category">Category</option>
                  <option value="students">Students</option>
                </select>
              </div>
            </div>

            {/* Search Results Counter */}
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-600">
                Showing {filteredData.length} of {categoryData.length} results for "{searchTerm}"
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.students}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-700">Showing 1 to 1 of 1 rows</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
