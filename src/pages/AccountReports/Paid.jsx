"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Search, X, ChevronDown } from "lucide-react"

const Paid = () => {
  const [singleDate, setSingleDate] = useState("2025-06-01")
  const [startDate, setStartDate] = useState("2025-06-01")
  const [endDate, setEndDate] = useState("2025-06-01")
  const [selectedFeesJob, setSelectedFeesJob] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColumn, setFilterColumn] = useState("all")
  const [showResults, setShowResults] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [currentFilter, setCurrentFilter] = useState("")

  // Sample data for different scenarios
  const [paidFeesData] = useState([
    {
      id: 1,
      srNo: 1,
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      class: "PLAY",
      section: "A",
      category: "Normal",
      childDetails: "2nd",
      cell: "03336308274",
      residency: "BAHAWALNAGAR, PAKISTAN",
      totalFees: 2000,
      feesDetails: "December 2024",
      date: "31-05-2025",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
    {
      id: 2,
      srNo: 2,
      name: "AITZAZ HASSAN",
      father: "HASSAN ALI",
      class: "PLAY",
      section: "A",
      category: "Normal",
      childDetails: "1st",
      cell: "03166758694",
      residency: "LAHORE, PAKISTAN",
      totalFees: 1500,
      feesDetails: "November 2024",
      date: "30-05-2025",
      campus: "Future Grooming School",
      user: "Admin User",
    },
  ])

  const feesJobOptions = ["--Select--", "November 2024", "December 2024"]

  // Auto-update data when dates change
  useEffect(() => {
    if (singleDate && currentFilter === "singleDate") {
      setShowResults(true)
    }
  }, [singleDate, currentFilter])

  useEffect(() => {
    if (startDate && endDate && currentFilter === "dateRange") {
      setShowResults(true)
    }
  }, [startDate, endDate, currentFilter])

  const handleSingleDateSubmit = () => {
    setCurrentFilter("singleDate")
    setShowResults(true)
  }

  const handleDateRangeSubmit = () => {
    setCurrentFilter("dateRange")
    setShowResults(true)
  }

  const handleFeesJobSubmit = () => {
    setCurrentFilter("feesJob")
    setShowResults(true)
  }

  // Determine what data to show based on current filter and selections
  const getFilteredData = () => {
    if (!showResults) return []

    let data = []

    // If no fees job is selected or "--Select--" is selected, show no data
    if (currentFilter === "feesJob" && (!selectedFeesJob || selectedFeesJob === "--Select--")) {
      return []
    }

    // If a specific month is selected, show filtered data
    if (currentFilter === "feesJob" && selectedFeesJob && selectedFeesJob !== "--Select--") {
      data = paidFeesData.filter((item) => item.feesDetails === selectedFeesJob)
    }

    // For date filters, show data if dates are selected
    if ((currentFilter === "singleDate" && singleDate) || (currentFilter === "dateRange" && startDate && endDate)) {
      data = paidFeesData
    }

    // Apply search filter
    if (searchTerm && data.length > 0) {
      const searchLower = searchTerm.toLowerCase()

      data = data.filter((item) => {
        switch (filterColumn) {
          case "name":
            return item.name.toLowerCase().includes(searchLower)
          case "father":
            return item.father.toLowerCase().includes(searchLower)
          case "class":
            return item.class.toLowerCase().includes(searchLower)
          case "section":
            return item.section.toLowerCase().includes(searchLower)
          case "category":
            return item.category.toLowerCase().includes(searchLower)
          case "cell":
            return item.cell.includes(searchTerm)
          case "campus":
            return item.campus.toLowerCase().includes(searchLower)
          case "user":
            return item.user.toLowerCase().includes(searchLower)
          default:
            return (
              item.name.toLowerCase().includes(searchLower) ||
              item.father.toLowerCase().includes(searchLower) ||
              item.class.toLowerCase().includes(searchLower) ||
              item.section.toLowerCase().includes(searchLower) ||
              item.category.toLowerCase().includes(searchLower) ||
              item.cell.includes(searchTerm) ||
              item.campus.toLowerCase().includes(searchLower) ||
              item.user.toLowerCase().includes(searchLower) ||
              item.feesDetails.toLowerCase().includes(searchLower)
            )
        }
      })
    }

    return data
  }

  const filteredData = getFilteredData()
  const collectedAmount = filteredData.reduce((sum, item) => sum + item.totalFees, 0)

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Students Paid Fees</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg">
          {/* Filter Section */}
          <div className="p-6 space-y-6">
            {/* Single Date Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={singleDate}
                  onChange={(e) => {
                    setSingleDate(e.target.value)
                    setCurrentFilter("singleDate")
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fetch Data</label>
                <button
                  onClick={handleSingleDateSubmit}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value)
                    setCurrentFilter("dateRange")
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value)
                    setCurrentFilter("dateRange")
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fetch Data</label>
                <button
                  onClick={handleDateRangeSubmit}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Fees Job Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Fees Job</label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
                  >
                    <span className={selectedFeesJob ? "text-gray-900" : "text-gray-500"}>
                      {selectedFeesJob || "--Select--"}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {feesJobOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedFeesJob(option)
                            setShowDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fetch Data</label>
                <button
                  onClick={handleFeesJobSubmit}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <>
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
                      <option value="name">Name</option>
                      <option value="father">Father</option>
                      <option value="class">Class</option>
                      <option value="section">Section</option>
                      <option value="category">Category</option>
                      <option value="cell">Cell</option>
                      <option value="campus">Campus</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>

                {/* Search Results Counter */}
                {searchTerm && (
                  <div className="mt-2 text-sm text-gray-600">
                    Showing {filteredData.length} of {getFilteredData().length} results for "{searchTerm}"
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Sr No
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Name
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Father
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Class
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Section
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Category
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Child Details
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        CELL
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Residency
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Total Fees
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Fees Details
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Date
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                        Campus
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        USER
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.srNo}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                            {item.father}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.class}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.section}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                            {item.category}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.childDetails}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                            {item.cell}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                            <div className="break-words">{item.residency}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.totalFees}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                            {item.feesDetails}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                            {item.date}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                            <div className="break-words">{item.campus}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.user}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="px-6 py-8 text-center text-gray-500">
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-4">
                <div className="text-sm text-gray-700">
                  Showing 1 to {filteredData.length} of {filteredData.length} rows
                </div>
                <div className="text-2xl font-semibold text-gray-900">
                  Collected Amount: {collectedAmount.toLocaleString()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Paid
