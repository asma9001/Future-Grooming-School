"use client"

import { useState } from "react"
import { ChevronRight, X, ChevronLeft, ChevronDown } from "lucide-react"

const Birthday = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColumn, setFilterColumn] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showRowsDropdown, setShowRowsDropdown] = useState(false)

  // Sample data matching the image
  const [ageData] = useState([
    { id: 1, age: 0, students: 0, sum: 0 },
    { id: 2, age: 1, students: 1, sum: 1 },
    { id: 3, age: 2, students: 0, sum: 1 },
    { id: 4, age: 3, students: 0, sum: 1 },
    { id: 5, age: 4, students: 0, sum: 1 },
    { id: 6, age: 5, students: 0, sum: 1 },
    { id: 7, age: 6, students: 1, sum: 2 },
    { id: 8, age: 7, students: 0, sum: 2 },
    { id: 9, age: 8, students: 0, sum: 2 },
    { id: 10, age: 9, students: 1, sum: 3 },
    // Adding more data to demonstrate pagination
    { id: 11, age: 10, students: 0, sum: 3 },
    { id: 12, age: 11, students: 1, sum: 4 },
    { id: 13, age: 12, students: 2, sum: 6 },
    { id: 14, age: 13, students: 0, sum: 6 },
    { id: 15, age: 14, students: 1, sum: 7 },
    { id: 16, age: 15, students: 0, sum: 7 },
    { id: 17, age: 16, students: 1, sum: 8 },
    { id: 18, age: 17, students: 0, sum: 8 },
    { id: 19, age: 18, students: 1, sum: 9 },
    { id: 20, age: 19, students: 0, sum: 9 },
    { id: 21, age: 20, students: 1, sum: 10 },
    { id: 22, age: 21, students: 0, sum: 10 },
    { id: 23, age: 22, students: 1, sum: 11 },
    { id: 24, age: 23, students: 0, sum: 11 },
    { id: 25, age: 24, students: 1, sum: 12 },
    { id: 26, age: 25, students: 0, sum: 12 },
    { id: 27, age: 26, students: 1, sum: 13 },
    { id: 28, age: 27, students: 0, sum: 13 },
    { id: 29, age: 28, students: 1, sum: 14 },
    { id: 30, age: 29, students: 0, sum: 14 },
    { id: 31, age: 30, students: 1, sum: 15 },
  ])

  // Filter data based on search and column filter
  const filteredData = ageData.filter((item) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    switch (filterColumn) {
      case "age":
        return item.age.toString().includes(searchTerm)
      case "students":
        return item.students.toString().includes(searchTerm)
      case "sum":
        return item.sum.toString().includes(searchTerm)
      default:
        return (
          item.age.toString().includes(searchTerm) ||
          item.students.toString().includes(searchTerm) ||
          item.sum.toString().includes(searchTerm)
        )
    }
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const clearSearch = () => {
    setSearchTerm("")
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows)
    setCurrentPage(1)
    setShowRowsDropdown(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Age Wise Student Count</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg">
          {/* Secondary Header */}
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-2xl font-medium text-gray-800">Age Wise List</h2>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <select
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="all">All Columns</option>
                <option value="age">Age</option>
                <option value="students">Students</option>
                <option value="sum">Sum</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-center">
                        {item.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-center">
                        {item.sum}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} rows
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm flex items-center gap-1"
                >
                  {rowsPerPage} <span className="text-xs">rows per page</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showRowsDropdown && (
                  <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {[5, 10, 20, 50, 100].map((rows) => (
                      <button
                        key={rows}
                        onClick={() => handleRowsPerPageChange(rows)}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {rows}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-1 rounded-md ${
                    currentPage === 1 ? "text-gray-400" : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === pageNum ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                {totalPages > 5 && <span className="px-2">...</span>}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded-md ${
                    currentPage === totalPages ? "text-gray-400" : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Birthday
