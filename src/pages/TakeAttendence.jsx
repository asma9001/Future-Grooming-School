"use client"

import { useState, useEffect } from "react"

export default function TakeAttendance() {
  // State for classes data
  const [classes, setClasses] = useState([
    {
      id: 1,
      program: "PLAY GROUP",
      department: "PLAY GROUP",
      class: "PLAY",
      classYear: "2024",
      section: "A",
    },
    {
      id: 2,
      program: "PLAY GROUP",
      department: "PLAY GROUP",
      class: "NURSERY",
      classYear: "2024",
      section: "A",
    },
    {
      id: 3,
      program: "PLAY GROUP",
      department: "PLAY GROUP",
      class: "PREP",
      classYear: "2024",
      section: "A",
    },
    {
      id: 4,
      program: "PRIMARY",
      department: "PRIMARY",
      class: "ONE",
      classYear: "2024",
      section: "A",
    },
    {
      id: 5,
      program: "PRIMARY",
      department: "PRIMARY",
      class: "TWO",
      classYear: "2024",
      section: "A",
    },
    {
      id: 6,
      program: "MIDDLE",
      department: "MIDDLE",
      class: "16710",
      classYear: "2024",
      section: "16710",
    },
  ])

  // Students data by class
  const studentsByClass = {
    "PLAY GROUP-PLAY GROUP-PLAY-2024-A": [
      { id: 1, name: "AITZAZ HASSAN", father: "MUSHTAQ WATTOO" },
      { id: 2, name: "ALI RAZA", father: "MUSHTAQ WATTOO" },
      { id: 3, name: "HUMERA ASGHAR", father: "MUSHTAQ WATTOO" },
      { id: 4, name: "GHAZALA ASGHAR", father: "MUSHTAQ WATTOO" },
      { id: 5, name: "KHANSA MAROOF", father: "MAROOF" },
    ],
    "PLAY GROUP-PLAY GROUP-NURSERY-2024-A": [
      { id: 6, name: "SARAH AHMED", father: "AHMED KHAN" },
      { id: 7, name: "HAMZA ALI", father: "ALI HASSAN" },
      { id: 8, name: "FATIMA MALIK", father: "MALIK RIAZ" },
    ],
    "PLAY GROUP-PLAY GROUP-PREP-2024-A": [
      { id: 9, name: "AYESHA MALIK", father: "MALIK RIAZ" },
      { id: 10, name: "USMAN KHAN", father: "KHAN MUHAMMAD" },
    ],
    "PRIMARY-PRIMARY-ONE-2024-A": [
      { id: 11, name: "FATIMA ZAHRA", father: "ZAHRA HUSSAIN" },
      { id: 12, name: "MUHAMMAD HASSAN", father: "HASSAN ALI" },
    ],
    "PRIMARY-PRIMARY-TWO-2024-A": [
      { id: 13, name: "BILAL AHMAD", father: "AHMAD RAZA" },
      { id: 14, name: "ZAINAB FATIMA", father: "FATIMA JAVED" },
    ],
    "MIDDLE-MIDDLE-16710-2024-16710": [
      { id: 15, name: "AHMED HASSAN", father: "HASSAN MAHMOOD" },
      { id: 16, name: "MARIA KHAN", father: "KHAN SAHIB" },
    ],
  }

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredClasses, setFilteredClasses] = useState(classes)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState({})

  // Handle search
  useEffect(() => {
    let results = classes

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()
      results = results.filter(
        (classItem) =>
          classItem.program.toLowerCase().includes(searchValue) ||
          classItem.department.toLowerCase().includes(searchValue) ||
          classItem.class.toLowerCase().includes(searchValue) ||
          classItem.classYear.includes(searchValue) ||
          classItem.section.toLowerCase().includes(searchValue),
      )
    }

    setFilteredClasses(results)
  }, [searchTerm, classes])

  // Handle Get Students button click
  const handleGetStudents = (classItem) => {
    setSelectedClass(classItem)
    setShowModal(true)

    // Initialize attendance for all students as Present
    const classKey = `${classItem.program}-${classItem.department}-${classItem.class}-${classItem.classYear}-${classItem.section}`
    const students = studentsByClass[classKey] || []
    const initialAttendance = {}
    students.forEach((student) => {
      initialAttendance[student.id] = "Present"
    })
    setAttendance(initialAttendance)
  }

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    })
  }

  // Handle submit attendance
  const handleSubmitAttendance = () => {
    // In a real app, this would send data to a server
    console.log("Attendance submitted:", {
      class: selectedClass,
      date: selectedDate,
      attendance: attendance,
    })

    alert("Attendance submitted successfully!")
    setShowModal(false)
    setSelectedClass(null)
    setAttendance({})
  }

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedClass(null)
    setAttendance({})
  }

  // Get students for selected class
  const getStudentsForClass = () => {
    if (!selectedClass) return []
    const classKey = `${selectedClass.program}-${selectedClass.department}-${selectedClass.class}-${selectedClass.classYear}-${selectedClass.section}`
    return studentsByClass[classKey] || []
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Take Attendance</h1>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Search Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-end">
            <div className="relative">
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        {/* Classes Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="min-w-[800px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClasses.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{classItem.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{classItem.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{classItem.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{classItem.classYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{classItem.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleGetStudents(classItem)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Get Students
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            Showing 1 to {filteredClasses.length} of {classes.length} rows
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-800">Take Attendance</h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Date Selection */}
              <div className="mb-6">
                <div className="flex gap-2 items-center">
                  <label className="text-sm font-medium text-gray-700">Date:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors">
                    Select Date
                  </button>
                </div>
              </div>

              {/* Class Information */}
              <div className="mb-6 p-3 bg-gray-100 rounded-md">
                <h4 className="text-sm font-medium text-gray-800">
                  {selectedClass.program} - {selectedClass.department} - {selectedClass.class} -{" "}
                  {selectedClass.classYear} - {selectedClass.section}
                </h4>
              </div>

              {/* Students List */}
              <div className="space-y-4 mb-6">
                {getStudentsForClass().map((student, index) => (
                  <div key={student.id}>
                    <div className="p-3 bg-gray-100 rounded-md mb-2">
                      <span className="text-sm font-medium text-gray-800">
                        {index + 1}: {student.name} S/O {student.father}
                      </span>
                    </div>
                    <select
                      value={attendance[student.id] || "Present"}
                      onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="Excused">Excused</option>
                    </select>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitAttendance}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Submit
              </button>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
