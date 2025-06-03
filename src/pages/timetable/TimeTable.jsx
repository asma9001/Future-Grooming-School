"use client"

import { useState, useEffect } from "react"

export default function TimeTable() {
  // Form state
  const [formData, setFormData] = useState({
    program: "",
    department: "",
    class: "",
    classYear: "",
    sectionName: "",
    courseName: "",
    ch: "",
    coh: "",
    roomNo: "",
    dayNumber: "",
    startTime: "",
    endTime: "",
    studentAllowed: "",
    genderCriteria: "Co-Education",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  })

  // Time table data state
  const [timeTableData, setTimeTableData] = useState([])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")
  const [filteredTimeTable, setFilteredTimeTable] = useState(timeTableData)

  // Options for dropdowns
  const programOptions = ["PLAY GROUP", "PRIMARY", "MIDDLE", "SECONDARY"]
  const departmentOptions = ["PLAY GROUP", "PRIMARY", "MIDDLE", "SECONDARY"]
  const classOptions = ["PLAY", "NURSERY", "PREP", "ONE", "TWO", "THREE", "FOUR", "FIVE"]
  const classYearOptions = ["2024", "2025", "2026"]
  const sectionOptions = ["A", "B", "C", "D"]
  const courseOptions = [
    "ENGLISH (THEORY)",
    "MATHEMATICS (THEORY)",
    "SCIENCE (THEORY)",
    "URDU (THEORY)",
    "ISLAMIAT (THEORY)",
    "SOCIAL STUDIES (THEORY)",
    "COMPUTER (THEORY)",
  ]
  const roomOptions = ["2", "4", "6", "8", "10"]
  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const timeOptions = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ]
  const genderOptions = ["Co-Education", "Boys Only", "Girls Only"]

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
      !formData.classYear ||
      !formData.sectionName ||
      !formData.courseName ||
      !formData.roomNo ||
      !formData.dayNumber ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Please fill in all required fields")
      return
    }

    // Create new time table entry
    const newTimeTableEntry = {
      id: timeTableData.length > 0 ? Math.max(...timeTableData.map((entry) => entry.id)) + 1 : 1,
      class: `${formData.program} - ${formData.class} - ${formData.classYear} - ${formData.sectionName}`,
      teacher: "NOUR YOUSEF", // Default teacher for demo
      course: formData.courseName,
      ch: formData.ch,
      coh: formData.coh,
      timing: `${formData.startTime} - ${formData.endTime}`,
      room: formData.roomNo,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      gender: formData.genderCriteria,
      students: formData.studentAllowed || "0",
      status: "Active",
      user: "Aitzaz Wattoo",
      campus: "Tech Minds School BWN",
    }

    // Add to time table data
    setTimeTableData([...timeTableData, newTimeTableEntry])

    // Reset form
    handleReset()

    // Show success message
    alert("Time table entry added successfully!")
  }

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      program: "",
      department: "",
      class: "",
      classYear: "",
      sectionName: "",
      courseName: "",
      ch: "",
      coh: "",
      roomNo: "",
      dayNumber: "",
      startTime: "",
      endTime: "",
      studentAllowed: "",
      genderCriteria: "Co-Education",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    })
  }

  // Handle delete time table entry
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this time table entry?")) {
      setTimeTableData(timeTableData.filter((entry) => entry.id !== id))
    }
  }

  // Filter time table data based on search
  useEffect(() => {
    let results = timeTableData

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()

      if (searchColumn === "all") {
        results = results.filter(
          (entry) =>
            entry.class.toLowerCase().includes(searchValue) ||
            entry.teacher.toLowerCase().includes(searchValue) ||
            entry.course.toLowerCase().includes(searchValue) ||
            entry.room.toLowerCase().includes(searchValue) ||
            entry.gender.toLowerCase().includes(searchValue) ||
            entry.status.toLowerCase().includes(searchValue) ||
            entry.user.toLowerCase().includes(searchValue) ||
            entry.campus.toLowerCase().includes(searchValue) ||
            entry.ch.toString().includes(searchValue) ||
            entry.coh.toString().includes(searchValue) ||
            entry.students.toString().includes(searchValue) ||
            entry.startDate.includes(searchValue) ||
            entry.endDate.includes(searchValue) ||
            entry.timing.toLowerCase().includes(searchValue),
        )
      } else {
        results = results.filter((entry) => {
          const fieldValue = entry[searchColumn]
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchValue)
          } else if (typeof fieldValue === "number") {
            return fieldValue.toString().includes(searchValue)
          }
          return false
        })
      }
    }

    setFilteredTimeTable(results)
  }, [searchTerm, timeTableData, searchColumn])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Time Table</h1>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Time Table Form */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Year:</label>
              <select
                name="classYear"
                value={formData.classYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {classYearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Name:</label>
              <select
                name="sectionName"
                value={formData.sectionName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {sectionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name:</label>
              <select
                name="courseName"
                value={formData.courseName}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CH: <span className="text-green-600">* Un-Change-able</span>
              </label>
              <input
                type="number"
                name="ch"
                value={formData.ch}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                COH: <span className="text-red-600">* Change-able</span>
              </label>
              <input
                type="number"
                name="coh"
                value={formData.coh}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room No:</label>
              <select
                name="roomNo"
                value={formData.roomNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {roomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day Number:</label>
              <select
                name="dayNumber"
                value={formData.dayNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Day</option>
                {dayOptions.map((option, index) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time:</label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Time</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time:</label>
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Time</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Allowed:</label>
              <input
                type="number"
                name="studentAllowed"
                value={formData.studentAllowed}
                onChange={handleInputChange}
                placeholder="--Student Allowed--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender Criteria:</label>
              <select
                name="genderCriteria"
                value={formData.genderCriteria}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
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
                <option value="class">Class</option>
                <option value="teacher">Teacher</option>
                <option value="course">Course</option>
                <option value="room">Room</option>
                <option value="timing">Timing</option>
                <option value="gender">Gender</option>
                <option value="status">Status</option>
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
          {filteredTimeTable.length !== timeTableData.length && timeTableData.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredTimeTable.length} of {timeTableData.length} results
            </div>
          )}
        </div>

        {/* Time Table Data */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="min-w-[1200px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CH</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    COH
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timing
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTimeTable.length > 0 ? (
                  filteredTimeTable.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{entry.class}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.teacher}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.course}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.ch}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.coh}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.timing}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.room}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.startDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.endDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.gender}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.students}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.user}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{entry.campus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="px-4 py-4 text-center text-sm text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            {timeTableData.length > 0 ? (
              `Showing 1 to ${filteredTimeTable.length} of ${timeTableData.length} rows`
            ) : (
              <span>No records found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
