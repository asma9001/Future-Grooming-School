"use client"

import { useState } from "react"

export default function StudentTransfer() {
  const [selectedSection, setSelectedSection] = useState("")
  const [searchName, setSearchName] = useState("")
  const [searchRollNo, setSearchRollNo] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("all")
  const [students, setStudents] = useState([])
  const [showStudents, setShowStudents] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [transferForm, setTransferForm] = useState({
    campus: "",
    program: "",
    department: "",
    class: "",
    classYear: "",
    section: "",
  })

  // Sample data
  const sections = [
    { id: 1, name: "PLAY A", class: "PLAY", section: "A" },
    { id: 2, name: "PLAY B", class: "PLAY", section: "B" },
    { id: 3, name: "NURSERY A", class: "NURSERY", section: "A" },
    { id: 4, name: "NURSERY B", class: "NURSERY", section: "B" },
    { id: 5, name: "KG A", class: "KG", section: "A" },
    { id: 6, name: "KG B", class: "KG", section: "B" },
  ]

  const sampleStudents = [
    {
      id: 1,
      compReg: "10967",
      familyNo: 1,
      rollNo: 1,
      name: "AITZAZ HASSAN",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
    },
    {
      id: 2,
      compReg: "10968",
      familyNo: 1,
      rollNo: 2,
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
    },
    {
      id: 3,
      compReg: "10969",
      familyNo: 1,
      rollNo: 3,
      name: "HUMERA ASGHAR",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
    },
    {
      id: 4,
      compReg: "10970",
      familyNo: 1,
      rollNo: 4,
      name: "GHAZALA ASGHAR",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
    },
    {
      id: 5,
      compReg: "10971",
      familyNo: 2,
      rollNo: 5,
      name: "KHANSA MAROOF",
      father: "MAROOF",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03166758694",
      phone2: "03166758694",
      status: "Active",
    },
  ]

  const campuses = ["Tech Minds School BWN", "Tech Minds School LHR", "Tech Minds School KHI", "Tech Minds School ISB"]

  const programs = ["Primary", "Middle", "Secondary", "Higher Secondary"]

  const departments = ["Science", "Arts", "Commerce", "Computer Science"]

  const classes = ["PLAY", "NURSERY", "KG", "CLASS 1", "CLASS 2", "CLASS 3", "CLASS 4", "CLASS 5"]

  const classYears = ["2023", "2024", "2025", "2026"]

  const sectionOptions = ["A", "B", "C", "D"]

  const handleGetAllStudents = () => {
    setLoading(true)
    setTimeout(() => {
      setStudents(sampleStudents)
      setShowStudents(true)
      setLoading(false)
    }, 1000)
  }

  const handleFetchBySection = () => {
    if (!selectedSection) {
      alert("Please select a section!")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setStudents(sampleStudents)
      setShowStudents(true)
      setLoading(false)
    }, 1000)
  }

  const handleFetchByName = () => {
    if (!searchName.trim()) {
      alert("Please enter a name!")
      return
    }
    setLoading(true)
    setTimeout(() => {
      const filtered = sampleStudents.filter((student) => student.name.toLowerCase().includes(searchName.toLowerCase()))
      setStudents(filtered)
      setShowStudents(true)
      setLoading(false)
    }, 1000)
  }

  const handleFetchByRollNo = () => {
    if (!searchRollNo.trim()) {
      alert("Please enter a roll number!")
      return
    }
    setLoading(true)
    setTimeout(() => {
      const filtered = sampleStudents.filter((student) => student.rollNo.toString() === searchRollNo)
      setStudents(filtered)
      setShowStudents(true)
      setLoading(false)
    }, 1000)
  }

  const handleTransferClick = (student) => {
    setSelectedStudent(student)
    setShowTransferModal(true)
  }

  const handleTransferFormChange = (field, value) => {
    setTransferForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTransferSubmit = () => {
    if (!transferForm.campus || !transferForm.program || !transferForm.class) {
      alert("Please fill in all required fields!")
      return
    }

    // Update student status
    setStudents(
      students.map((student) => (student.id === selectedStudent.id ? { ...student, status: "Transferred" } : student)),
    )

    // Reset form and close modal
    setTransferForm({
      campus: "",
      program: "",
      department: "",
      class: "",
      classYear: "",
      section: "",
    })
    setShowTransferModal(false)
    setSelectedStudent(null)

    alert("Student transferred successfully!")
  }

  const handleResetForm = () => {
    setTransferForm({
      campus: "",
      program: "",
      department: "",
      class: "",
      classYear: "",
      section: "",
    })
  }

  // Filter students based on search
  const filteredStudents = students.filter((student) => {
    if (!searchTerm) return true

    const searchValue = searchTerm.toLowerCase()

    switch (searchFilter) {
      case "compReg":
        return student.compReg.toLowerCase().includes(searchValue)
      case "familyNo":
        return student.familyNo.toString().includes(searchValue)
      case "rollNo":
        return student.rollNo.toString().includes(searchValue)
      case "name":
        return student.name.toLowerCase().includes(searchValue)
      case "father":
        return student.father.toLowerCase().includes(searchValue)
      case "class":
        return student.class.toLowerCase().includes(searchValue)
      case "all":
      default:
        return Object.values(student).some((value) => value.toString().toLowerCase().includes(searchValue))
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg shadow-lg">
          <div className="flex items-center p-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
              <span className="text-blue-700 font-bold text-xl">→</span>
            </div>
            <h1 className="text-2xl font-bold">Student Transfer</h1>
          </div>
        </div>

        {/* Search Controls */}
        <div className="bg-white shadow-lg">
          {/* Primary Actions Row */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Get All Students - Full width on mobile, auto on desktop */}
              <div className="lg:w-auto w-full">
                <button
                  onClick={handleGetAllStudents}
                  disabled={loading}
                  className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">👥</span>
                      Get All Students
                    </>
                  )}
                </button>
              </div>

              {/* Section Selection */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative min-w-0">
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700 font-medium"
                    >
                      <option value="">Select Section</option>
                      {sections.map((section) => (
                        <option key={section.id} value={section.name}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={handleFetchBySection}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <span className="mr-2">🔍</span>
                    Fetch Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Search Row */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search by Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="mr-2">👤</span>
                  Search by Student Name
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter student name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                  />
                  <button
                    onClick={handleFetchByName}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <span className="mr-2">🔍</span>
                    Search
                  </button>
                </div>
              </div>

              {/* Search by Roll Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <span className="mr-2">🔢</span>
                  Search by Roll Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter roll number..."
                    value={searchRollNo}
                    onChange={(e) => setSearchRollNo(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                  />
                  <button
                    onClick={handleFetchByRollNo}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <span className="mr-2">🔍</span>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Search Bar */}
          {showStudents && (
            <div className="px-6 pb-6 border-t border-gray-200 pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="mr-2">🔍</span>
                  Advanced Search & Filter
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label htmlFor="search-filter" className="text-sm font-medium whitespace-nowrap text-gray-600">
                      Filter by:
                    </label>
                    <select
                      id="search-filter"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm font-medium"
                    >
                      <option value="all">All Fields</option>
                      <option value="compReg">Comp. Reg#</option>
                      <option value="familyNo">Family No</option>
                      <option value="rollNo">Roll No</option>
                      <option value="name">Name</option>
                      <option value="father">Father</option>
                      <option value="class">Class</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      placeholder={`Search ${searchFilter === "all" ? "all fields" : searchFilter}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-80 font-medium"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm transition-colors font-medium"
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                  <div className="mt-3 text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded-lg border border-blue-200">
                    {filteredStudents.length > 0 ? (
                      <>
                        Found {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
                        {searchFilter !== "all" && ` in ${searchFilter}`}
                        matching "{searchTerm}"
                      </>
                    ) : (
                      <>
                        No students found matching "{searchTerm}" {searchFilter !== "all" && `in ${searchFilter}`}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Students Table */}
        {showStudents && (
          <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Comp. Reg#
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Family No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Roll No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Father
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Phone 1
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Phone 2
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Transfer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.compReg}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.familyNo}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.rollNo}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.father}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.class}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.address}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.phone1}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.phone2}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          {student.status === "Active" ? (
                            <button
                              onClick={() => handleTransferClick(student)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              Transfer
                            </button>
                          ) : (
                            <span className="text-green-600 font-semibold flex items-center">
                              <span className="mr-1">✅</span>
                              Transferred
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                        {searchTerm ? "No students found matching your search criteria." : "No students found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>
                  Showing {filteredStudents.length > 0 ? "1" : "0"} to {filteredStudents.length} of{" "}
                  {filteredStudents.length} rows
                  {searchTerm && ` (filtered from ${students.length} total students)`}
                </span>
                {filteredStudents.length > 0 && (
                  <span className="text-blue-600 font-medium">Total Students: {students.length}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Transfer Modal */}
        {showTransferModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800">Student Transfer</h3>
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Student Info */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-semibold text-gray-800">
                    {selectedStudent.rollNo} : {selectedStudent.name} S / O {selectedStudent.father}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Class: {selectedStudent.class}</div>
                </div>

                {/* Transfer Form */}
                <div className="space-y-4">
                  {/* Select Campus */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Campus: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={transferForm.campus}
                        onChange={(e) => handleTransferFormChange("campus", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">Select Campus</option>
                        {campuses.map((campus, index) => (
                          <option key={index} value={campus}>
                            {campus}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Program: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={transferForm.program}
                        onChange={(e) => handleTransferFormChange("program", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">--Select--</option>
                        {programs.map((program, index) => (
                          <option key={index} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Departments */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Departments:</label>
                    <div className="relative">
                      <select
                        value={transferForm.department}
                        onChange={(e) => handleTransferFormChange("department", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">--Select--</option>
                        {departments.map((dept, index) => (
                          <option key={index} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class: <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={transferForm.class}
                        onChange={(e) => handleTransferFormChange("class", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">--Select--</option>
                        {classes.map((cls, index) => (
                          <option key={index} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Class Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class Year:</label>
                    <div className="relative">
                      <select
                        value={transferForm.classYear}
                        onChange={(e) => handleTransferFormChange("classYear", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">--Select--</option>
                        {classYears.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Section:</label>
                    <div className="relative">
                      <select
                        value={transferForm.section}
                        onChange={(e) => handleTransferFormChange("section", e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700"
                      >
                        <option value="">--Select--</option>
                        {sectionOptions.map((section, index) => (
                          <option key={index} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleTransferSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Transfer Student
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
