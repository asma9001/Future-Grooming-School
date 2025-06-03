"use client"

import { useState, useEffect } from "react"

export default function Programs() {
  // Form state
  const [formData, setFormData] = useState({
    programCode: "",
    programName: "",
    programDetail: "",
    programType: "",
  })

  // Programs data state
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "PLAY GROUP",
      detail: "PLAY GROUP",
      degreeType: "REGULAR",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
    {
      id: 2,
      name: "PRIMARY",
      detail: "PRIMARY",
      degreeType: "REGULAR",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
    {
      id: 3,
      name: "MIDDLE",
      detail: "MIDDLE",
      degreeType: "REGULAR",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
    {
      id: 4,
      name: "MATRIC",
      detail: "MATRIC",
      degreeType: "REGULAR",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
    {
      id: 5,
      name: "16710",
      detail: "16710",
      degreeType: "PRIVATE",
      campus: "Future Grooming School",
      user: "Aitzaz Wattoo",
    },
  ])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")
  const [filteredPrograms, setFilteredPrograms] = useState(programs)

  // Program type options
  const programTypeOptions = ["Regular", "Private", "Distance Learning"]

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
      !formData.programCode.trim() ||
      !formData.programName.trim() ||
      !formData.programDetail.trim() ||
      !formData.programType
    ) {
      alert("Please fill in all fields")
      return
    }

    // Check if program code already exists
    const existingProgram = programs.find(
      (program) => program.name.toLowerCase() === formData.programCode.trim().toLowerCase(),
    )
    if (existingProgram) {
      alert("Program with this code already exists")
      return
    }

    // Create new program
    const newProgram = {
      id: programs.length > 0 ? Math.max(...programs.map((program) => program.id)) + 1 : 1,
      name: formData.programCode.trim().toUpperCase(),
      detail: formData.programDetail.trim(),
      degreeType: formData.programType.toUpperCase(),
      campus: "Tech Minds School BWN",
      user: "Aitzaz Wattoo",
    }

    // Add to programs data
    setPrograms([...programs, newProgram])

    // Reset form
    handleReset()

    // Show success message
    alert("Program added successfully!")
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      programCode: "",
      programName: "",
      programDetail: "",
      programType: "",
    })
  }

  // Filter programs based on search
  useEffect(() => {
    let results = programs

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()

      if (searchColumn === "all") {
        results = results.filter(
          (program) =>
            program.name.toLowerCase().includes(searchValue) ||
            program.detail.toLowerCase().includes(searchValue) ||
            program.degreeType.toLowerCase().includes(searchValue) ||
            program.campus.toLowerCase().includes(searchValue) ||
            program.user.toLowerCase().includes(searchValue),
        )
      } else {
        results = results.filter((program) => {
          const fieldValue = program[searchColumn]
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchValue)
          }
          return false
        })
      }
    }

    setFilteredPrograms(results)
  }, [searchTerm, programs, searchColumn])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Admission Programs</h1>
      </div>

      <div className="p-6 bg-gray-100">
        {/* Program Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Code:</label>
              <input
                type="text"
                name="programCode"
                value={formData.programCode}
                onChange={handleInputChange}
                placeholder="--Code--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Name:</label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                placeholder="--Name--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Detail:</label>
              <input
                type="text"
                name="programDetail"
                value={formData.programDetail}
                onChange={handleInputChange}
                placeholder="--Detail--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Type:</label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">--Select--</option>
                {programTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                <option value="name">Name</option>
                <option value="detail">Detail</option>
                <option value="degreeType">Degree Type</option>
                <option value="campus">Campus</option>
                <option value="user">User</option>
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
          {filteredPrograms.length !== programs.length && programs.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredPrograms.length} of {programs.length} results
            </div>
          )}
        </div>

        {/* Programs Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="min-w-[800px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Degree Type
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
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{program.detail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            program.degreeType === "REGULAR"
                              ? "bg-green-100 text-green-800"
                              : program.degreeType === "PRIVATE"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {program.degreeType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{program.campus}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{program.user}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            {programs.length > 0 ? (
              `Showing 1 to ${filteredPrograms.length} of ${programs.length} rows`
            ) : (
              <span>No records found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
