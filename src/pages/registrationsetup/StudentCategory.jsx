"use client"

import { useState } from "react"
import { Users, Search } from "lucide-react"

export default function StudentCategory() {
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
  })

  const [categories, setCategories] = useState([
    { id: 18, name: "Normal", detail: "Normal" },
    { id: 19, name: "Hafiz e Quran", detail: "Hafiz e Quran" },
    { id: 20, name: "Special Child", detail: "Special Child" },
    { id: 22, name: "Khansa", detail: "developer" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [searchColumn, setSearchColumn] = useState("all")

  // Filter categories based on search
  const filteredCategories = categories.filter((category) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    switch (searchColumn) {
      case "id":
        return category.id.toString().includes(searchLower)
      case "name":
        return category.name.toLowerCase().includes(searchLower)
      case "detail":
        return category.detail.toLowerCase().includes(searchLower)
      default:
        return (
          category.id.toString().includes(searchLower) ||
          category.name.toLowerCase().includes(searchLower) ||
          category.detail.toLowerCase().includes(searchLower)
        )
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert("Please enter a category name")
      return
    }

    if (!formData.detail.trim()) {
      alert("Please enter category details")
      return
    }

    // Check for duplicate names
    const isDuplicate = categories.some(
      (category) => category.name.toLowerCase() === formData.name.trim().toLowerCase(),
    )

    if (isDuplicate) {
      alert("A category with this name already exists")
      return
    }

    // Generate new ID
    const newId = Math.max(...categories.map((c) => c.id), 0) + 1

    // Add new category
    const newCategory = {
      id: newId,
      name: formData.name.trim(),
      detail: formData.detail.trim(),
    }

    setCategories((prev) => [...prev, newCategory])

    // Reset form
    setFormData({
      name: "",
      detail: "",
    })

    alert(`Category "${newCategory.name}" added successfully!`)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      detail: "",
    })
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchColumn("all")
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 rounded-t-lg">
        <h1 className="flex items-center gap-2 text-xl font-semibold m-0">
          <Users className="w-6 h-6" />
          Student Category
        </h1>
      </div>

      <div className="p-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="--Name--"
                className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Detail:</label>
              <input
                type="text"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                placeholder="--Detail--"
                className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Columns</option>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="detail">Detail</option>
            </select>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
              >
                Clear
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredCategories.length} of {categories.length} categories
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className={`hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{category.detail}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? "No categories found matching your search." : "No categories available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {filteredCategories.length > 0 ? "1" : "0"} to {filteredCategories.length} of{" "}
              {filteredCategories.length} rows
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
