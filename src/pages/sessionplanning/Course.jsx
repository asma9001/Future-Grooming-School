"use client"

import { useState } from "react"
import { Search, BookOpen } from "lucide-react"

const Course = () => {
  const [formData, setFormData] = useState({
    programName: "",
    departmentName: "",
    className: "",
    courseName: "",
    creditHour: "",
    coh: "",
    textBook: "",
    courseType: "",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")

  // Sample data for dropdowns
  const programs = ["PLAY GROUP", "PRIMARY", "MIDDLE", "MATRIC", "16710"]

  const departmentsByProgram = {
    "PLAY GROUP": ["PLAY GROUP"],
    PRIMARY: ["PRIMARY"],
    MIDDLE: ["MIDDLE"],
    MATRIC: ["MATRIC"],
    16710: ["16710"],
  }

  const classesByDepartment = {
    "PLAY GROUP": ["PLAY", "NURSERY", "PREP"],
    PRIMARY: ["ONE", "TWO", "THREE", "FOUR", "FIVE"],
    MIDDLE: ["SIX", "SEVEN", "EIGHT"],
    MATRIC: ["NINE", "TEN"],
    16710: ["16710"],
  }

  const courseTypes = ["THEORY", "PRACTICAL", "LAB", "PROJECT", "SEMINAR"]

  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: 1,
      program: "PLAY GROUP",
      department: "PLAY GROUP",
      class: "PLAY",
      name: "ENGLISH",
      type: "THEORY",
      book: "ENGLISH",
      ch: 6,
      coh: 1,
      campus: "Future Grooming School",
      user: "Atizaz Wattoo",
    },
    {
      id: 2,
      program: "PRIMARY",
      department: "PRIMARY",
      class: "ONE",
      name: "MATHEMATICS",
      type: "THEORY",
      book: "MATH BASICS",
      ch: 5,
      coh: 1,
      campus: "Future Grooming School",
      user: "Atizaz Wattoo",
    },
    {
      id: 3,
      program: "MIDDLE",
      department: "MIDDLE",
      class: "SIX",
      name: "SCIENCE",
      type: "PRACTICAL",
      book: "SCIENCE EXPLORER",
      ch: 4,
      coh: 2,
      campus: "Future Grooming School",
      user: "Atizaz Wattoo",
    },
    {
      id: 4,
      program: "MATRIC",
      department: "MATRIC",
      class: "NINE",
      name: "PHYSICS",
      type: "LAB",
      book: "PHYSICS FUNDAMENTALS",
      ch: 3,
      coh: 2,
      campus: "Future Grooming School",
      user: "Atizaz Wattoo",
    },
    {
      id: 5,
      program: "PRIMARY",
      department: "PRIMARY",
      class: "TWO",
      name: "URDU",
      type: "THEORY",
      book: "URDU PRIMER",
      ch: 4,
      coh: 1,
      campus: "Future Grooming School",
      user: "Atizaz Wattoo",
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }

      // Reset dependent fields when parent changes
      if (name === "programName") {
        newData.departmentName = ""
        newData.className = ""
      } else if (name === "departmentName") {
        newData.className = ""
      }

      return newData
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (
      !formData.programName ||
      !formData.departmentName ||
      !formData.className ||
      !formData.courseName ||
      !formData.creditHour ||
      !formData.coh ||
      !formData.textBook ||
      !formData.courseType
    ) {
      alert("Please fill in all required fields")
      return
    }

    // Check for duplicate course
    const isDuplicate = courses.some(
      (course) =>
        course.program === formData.programName &&
        course.department === formData.departmentName &&
        course.class === formData.className &&
        course.name.toLowerCase() === formData.courseName.toLowerCase(),
    )

    if (isDuplicate) {
      alert("This course already exists for the selected program, department, and class")
      return
    }

    const newCourse = {
      id: courses.length + 1,
      program: formData.programName,
      department: formData.departmentName,
      class: formData.className,
      name: formData.courseName.toUpperCase(),
      type: formData.courseType,
      book: formData.textBook.toUpperCase(),
      ch: Number.parseInt(formData.creditHour),
      coh: Number.parseInt(formData.coh),
      campus: "Tech Minds School BWN",
      user: "Atizaz Wattoo",
    }

    setCourses([...courses, newCourse])
    handleReset()
    alert("Course added successfully!")
  }

  const handleReset = () => {
    setFormData({
      programName: "",
      departmentName: "",
      className: "",
      courseName: "",
      creditHour: "",
      coh: "",
      textBook: "",
      courseType: "",
    })
  }

  // Filter courses based on search
  const filteredCourses = courses.filter((course) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    if (searchColumn === "all") {
      return Object.values(course).some((value) => value.toString().toLowerCase().includes(searchLower))
    } else {
      return course[searchColumn]?.toString().toLowerCase().includes(searchLower)
    }
  })

  const availableDepartments = formData.programName ? departmentsByProgram[formData.programName] || [] : []
  const availableClasses = formData.departmentName ? classesByDepartment[formData.departmentName] || [] : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Courses</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program Name:</label>
                <select
                  name="programName"
                  value={formData.programName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">--Select--</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departments Name:</label>
                <select
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!formData.programName}
                  required
                >
                  <option value="">--Select--</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Name:</label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!formData.departmentName}
                  required
                >
                  <option value="">--Select--</option>
                  {availableClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name:</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  placeholder="--Name--"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Hour: <span className="text-red-500 text-xs">How Many Lectures(Hour) in Week</span>
                </label>
                <input
                  type="number"
                  name="creditHour"
                  value={formData.creditHour}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  COH: <span className="text-red-500 text-xs">How Many Lecture(Hours) in a Day</span>
                </label>
                <input
                  type="number"
                  name="coh"
                  value={formData.coh}
                  onChange={handleInputChange}
                  min="1"
                  max="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Text Book:</label>
                <input
                  type="text"
                  name="textBook"
                  value={formData.textBook}
                  onChange={handleInputChange}
                  placeholder="--Book--"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Type:</label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">--Course Type--</option>
                  {courseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Columns</option>
              <option value="program">Program</option>
              <option value="department">Department</option>
              <option value="class">Class</option>
              <option value="name">Course Name</option>
              <option value="type">Type</option>
              <option value="book">Book</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CH</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    COH
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.type === "THEORY"
                            ? "bg-blue-100 text-blue-800"
                            : course.type === "PRACTICAL"
                              ? "bg-green-100 text-green-800"
                              : course.type === "LAB"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.book}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                      {course.ch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                      {course.coh}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.campus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course
