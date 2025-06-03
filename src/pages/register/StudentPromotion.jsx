"use client"

import { useState } from "react"

export default function StudentPromotion() {
  const [selectedSection, setSelectedSection] = useState("")
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [showStudents, setShowStudents] = useState(false)

  // Sample sections data
  const sections = [
    { id: 1, name: "PLAY A", class: "PLAY", section: "A" },
    { id: 2, name: "PLAY B", class: "PLAY", section: "B" },
    { id: 3, name: "NURSERY A", class: "NURSERY", section: "A" },
    { id: 4, name: "NURSERY B", class: "NURSERY", section: "B" },
    { id: 5, name: "KG A", class: "KG", section: "A" },
    { id: 6, name: "KG B", class: "KG", section: "B" },
    { id: 7, name: "CLASS 1 A", class: "CLASS 1", section: "A" },
    { id: 8, name: "CLASS 1 B", class: "CLASS 1", section: "B" },
  ]

  // Sample students data
  const sampleStudents = [
    {
      id: 1,
      rollNo: 1,
      name: "AITZAZ HASSAN",
      father: "MUSHTAQ WATTOO",
      currentClass: "PLAY",
      currentSection: "A",
      status: "Active",
    },
    {
      id: 2,
      rollNo: 2,
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      currentClass: "PLAY",
      currentSection: "A",
      status: "Active",
    },
    {
      id: 3,
      rollNo: 3,
      name: "HUMERA ASGHAR",
      father: "MUSHTAQ WATTOO",
      currentClass: "PLAY",
      currentSection: "A",
      status: "Active",
    },
    {
      id: 4,
      rollNo: 4,
      name: "GHAZALA ASGHAR",
      father: "MUSHTAQ WATTOO",
      currentClass: "PLAY",
      currentSection: "A",
      status: "Active",
    },
    {
      id: 5,
      rollNo: 5,
      name: "KHANSA MAROOF",
      father: "MAROOF",
      currentClass: "PLAY",
      currentSection: "A",
      status: "Active",
    },
  ]

  const handleFetchStudents = () => {
    if (!selectedSection) {
      alert("Please select a section first!")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setStudents(sampleStudents)
      setShowStudents(true)
      setLoading(false)
    }, 1000)
  }

  const handlePromoteStudent = (studentId) => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, status: "Promoted" } : student)))
  }

  const handlePromoteAll = () => {
    setStudents(students.map((student) => ({ ...student, status: "Promoted" })))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg shadow-lg">
          <div className="flex items-center p-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
              <span className="text-blue-700 font-bold text-xl">→</span>
            </div>
            <h1 className="text-2xl font-bold">Student Promotion</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          {/* Warning Message */}
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-red-600 font-medium flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              Please Deactivate Section To Promote Students
            </p>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Select Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="text-blue-600 mr-2">📚</span>
                Select Section
              </h2>
              <div className="relative">
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white text-gray-700 font-medium"
                >
                  <option value="">--Select--</option>
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
            </div>

            {/* Fetch Students */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                <span className="text-green-600 mr-2">👥</span>
                Fetch Students
              </h2>
              <button
                onClick={handleFetchStudents}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    <span className="mr-2">🔍</span>
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Students Table */}
          {showStudents && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="text-blue-600 mr-2">📋</span>
                  Students in {selectedSection}
                </h3>
                <button
                  onClick={handlePromoteAll}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
                >
                  <span className="mr-2">⬆️</span>
                  Promote All
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Roll No
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Student Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Father Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Current Class
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr
                          key={student.id}
                          className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{student.father}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {student.currentClass} {student.currentSection}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                student.status === "Promoted"
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {student.status === "Active" ? (
                              <button
                                onClick={() => handlePromoteStudent(student.id)}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 shadow-sm hover:shadow-md flex items-center"
                              >
                                <span className="mr-1">⬆️</span>
                                Promote
                              </button>
                            ) : (
                              <span className="text-green-600 font-semibold flex items-center">
                                <span className="mr-1">✅</span>
                                Promoted
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Students: {students.length}</span>
                    <span>
                      Promoted: {students.filter((s) => s.status === "Promoted").length} | Pending:{" "}
                      {students.filter((s) => s.status === "Active").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
