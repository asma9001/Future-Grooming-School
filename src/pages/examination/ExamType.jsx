"use client"

import { useState, useEffect } from "react"

export default function ExamType() {
  // Form state
  const [formData, setFormData] = useState({
    examType: "",
    details: "",
  })

  // Exam types data state
  const [examTypes, setExamTypes] = useState([
    {
      id: 1,
      examType: "Math",
      detail: "Mathematics",
    },
    {
      id: 2,
      examType: "English",
      detail: "English Language and Literature",
    },
    {
      id: 3,
      examType: "Science",
      detail: "General Science",
    },
  ])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")
  const [filteredExamTypes, setFilteredExamTypes] = useState(examTypes)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.examType.trim() || !formData.details.trim()) {
      alert("Please fill in all fields")
      return
    }

    // Create new exam type
    const newExamType = {
      id: examTypes.length > 0 ? Math.max(...examTypes.map((exam) => exam.id)) + 1 : 1,
      examType: formData.examType.trim(),
      detail: formData.details.trim(),
    }

    // Add to exam types data
    setExamTypes([...examTypes, newExamType])

    // Reset form
    handleReset()

    // Show success message
    alert("Exam type added successfully!")
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      examType: "",
      details: "",
    })
  }

  // Filter exam types based on search
  useEffect(() => {
    let results = examTypes

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()

      if (searchColumn === "all") {
        results = results.filter(
          (exam) =>
            exam.examType.toLowerCase().includes(searchValue) || exam.detail.toLowerCase().includes(searchValue),
        )
      } else {
        results = results.filter((exam) => {
          const fieldValue = exam[searchColumn]
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchValue)
          }
          return false
        })
      }
    }

    setFilteredExamTypes(results)
  }, [searchTerm, examTypes, searchColumn])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Exam Type</h1>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Exam Type Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
              <input
                type="text"
                name="examType"
                value={formData.examType}
                onChange={handleInputChange}
                placeholder="----Exam Type----"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="-------Details-------"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 flex gap-2">
              <select
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Columns</option>
                <option value="examType">Exam Type</option>
                <option value="detail">Detail</option>
              </select>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={`Search ${searchColumn === "all" ? "all columns" : searchColumn}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {filteredExamTypes.length !== examTypes.length && examTypes.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredExamTypes.length} of {examTypes.length} results
            </div>
          )}
        </div>

        {/* Exam Types Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="min-w-[600px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExamTypes.length > 0 ? (
                  filteredExamTypes.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.examType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{exam.detail}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            {examTypes.length > 0 ? (
              `Showing 1 to ${filteredExamTypes.length} of ${examTypes.length} rows`
            ) : (
              <span>No records found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
