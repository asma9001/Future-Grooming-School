"use client"

import { useState, useEffect } from "react"

export default function Chapter() {
  // Form state
  const [formData, setFormData] = useState({
    program: "",
    department: "",
    class: "",
    course: "",
    chapterNo: "",
    chapterName: "",
  })

  // Chapters data state
  const [chapters, setChapters] = useState([
    {
      id: 1,
      sr: 1,
      class: "PLAY GROUP - PLAY - 2024 - A",
      course: "ENGLISH (THEORY)",
      chapterNo: "1",
      name: "Introduction to Alphabets",
      user: "Aitzaz Wattoo",
      campus: "Tech Minds School BWN",
    },
    {
      id: 2,
      sr: 2,
      class: "PRIMARY - ONE - 2024 - A",
      course: "MATHEMATICS (THEORY)",
      chapterNo: "1",
      name: "Numbers and Counting",
      user: "Aitzaz Wattoo",
      campus: "Tech Minds School BWN",
    },
    {
      id: 3,
      sr: 3,
      class: "PRIMARY - TWO - 2024 - A",
      course: "SCIENCE (THEORY)",
      chapterNo: "1",
      name: "Living and Non-Living Things",
      user: "Aitzaz Wattoo",
      campus: "Tech Minds School BWN",
    },
  ])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")
  const [filteredChapters, setFilteredChapters] = useState(chapters)

  // Options for dropdowns
  const programOptions = ["PLAY GROUP", "PRIMARY", "MIDDLE", "SECONDARY"]
  const departmentOptions = ["PLAY GROUP", "PRIMARY", "MIDDLE", "SECONDARY"]
  const classOptions = ["PLAY", "NURSERY", "PREP", "ONE", "TWO", "THREE", "FOUR", "FIVE"]
  const courseOptions = [
    "ENGLISH (THEORY)",
    "MATHEMATICS (THEORY)",
    "SCIENCE (THEORY)",
    "URDU (THEORY)",
    "ISLAMIAT (THEORY)",
    "SOCIAL STUDIES (THEORY)",
    "COMPUTER (THEORY)",
  ]

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
    if (
      !formData.program ||
      !formData.department ||
      !formData.class ||
      !formData.course ||
      !formData.chapterNo.trim() ||
      !formData.chapterName.trim()
    ) {
      alert("Please fill in all fields")
      return
    }

    // Create new chapter
    const newChapter = {
      id: chapters.length > 0 ? Math.max(...chapters.map((chapter) => chapter.id)) + 1 : 1,
      sr: chapters.length + 1,
      class: `${formData.program} - ${formData.class} - 2024 - A`,
      course: formData.course,
      chapterNo: formData.chapterNo.trim(),
      name: formData.chapterName.trim(),
      user: "Aitzaz Wattoo",
      campus: "Tech Minds School BWN",
    }

    // Add to chapters data
    setChapters([...chapters, newChapter])

    // Reset form
    handleReset()

    // Show success message
    alert("Chapter added successfully!")
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      program: "",
      department: "",
      class: "",
      course: "",
      chapterNo: "",
      chapterName: "",
    })
  }

  // Filter chapters based on search
  useEffect(() => {
    let results = chapters

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()

      if (searchColumn === "all") {
        results = results.filter(
          (chapter) =>
            chapter.class.toLowerCase().includes(searchValue) ||
            chapter.course.toLowerCase().includes(searchValue) ||
            chapter.chapterNo.toLowerCase().includes(searchValue) ||
            chapter.name.toLowerCase().includes(searchValue) ||
            chapter.user.toLowerCase().includes(searchValue) ||
            chapter.campus.toLowerCase().includes(searchValue) ||
            chapter.sr.toString().includes(searchValue),
        )
      } else {
        results = results.filter((chapter) => {
          const fieldValue = chapter[searchColumn]
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchValue)
          } else if (typeof fieldValue === "number") {
            return fieldValue.toString().includes(searchValue)
          }
          return false
        })
      }
    }

    setFilteredChapters(results)
  }, [searchTerm, chapters, searchColumn])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Course Chapters</h1>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Chapter Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program:</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department:</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class:</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course:</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {courseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chapter No:</label>
              <input
                type="text"
                name="chapterNo"
                value={formData.chapterNo}
                onChange={handleInputChange}
                placeholder="--Chapter No--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Name:</label>
              <input
                type="text"
                name="chapterName"
                value={formData.chapterName}
                onChange={handleInputChange}
                placeholder="---Name---"
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
                <option value="sr">Sr</option>
                <option value="class">Class</option>
                <option value="course">Course</option>
                <option value="chapterNo">Chapter No</option>
                <option value="name">Name</option>
                <option value="user">User</option>
                <option value="campus">Campus</option>
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
          {filteredChapters.length !== chapters.length && chapters.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredChapters.length} of {chapters.length} results
            </div>
          )}
        </div>

        {/* Chapters Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="min-w-[1000px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chapter No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChapters.length > 0 ? (
                  filteredChapters.map((chapter) => (
                    <tr key={chapter.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chapter.sr}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{chapter.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{chapter.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{chapter.chapterNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chapter.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{chapter.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{chapter.campus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            {chapters.length > 0 ? (
              `Showing 1 to ${filteredChapters.length} of ${chapters.length} rows`
            ) : (
              <span>No records found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
