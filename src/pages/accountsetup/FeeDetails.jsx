"use client"

import { useState } from "react"
import { ChevronRight, Search, X, CheckCircle, AlertCircle } from "lucide-react"

const FeeDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    isActive: "Active",
  })

  const [feeDetails, setFeeDetails] = useState([
    { id: 1, name: "Tuition Fee", status: "Active", campus: "Future Grooming School" },
    { id: 2, name: "Security Fee", status: "Active", campus: "Future Grooming School" },
    { id: 3, name: "Sports Fee", status: "Active", campus: "Future Grooming School" },
    { id: 4, name: "Computer Fee", status: "Deactive", campus: "Future Grooming School" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterColumn, setFilterColumn] = useState("all")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [actionType, setActionType] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)

  const columns = [
    { key: "all", label: "All Columns" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "campus", label: "Campus" },
  ]

  const filteredData = feeDetails.filter((item) => {
    if (!searchTerm) return true

    if (filterColumn === "all") {
      return Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    } else {
      return item[filterColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
      alert("Please enter a fee detail name")
      return
    }

    const isDuplicate = feeDetails.some((item) => item.name.toLowerCase() === formData.name.toLowerCase())

    if (isDuplicate) {
      alert("Fee detail with this name already exists")
      return
    }

    const newFeeDetail = {
      id: Math.max(...feeDetails.map((item) => item.id)) + 1,
      name: formData.name,
      status: formData.isActive,
      campus: "Tech Mind",
    }

    setFeeDetails((prev) => [...prev, newFeeDetail])
    handleReset()
  }

  const handleReset = () => {
    setFormData({
      name: "",
      isActive: "Active",
    })
  }

  const handleStatusChange = (item, newStatus) => {
    setSelectedItem(item)
    setActionType(newStatus)
    setShowConfirmModal(true)
  }

  const confirmStatusChange = () => {
    setFeeDetails((prev) => prev.map((item) => (item.id === selectedItem.id ? { ...item, status: actionType } : item)))
    setShowConfirmModal(false)

    // Show success message
    const action = actionType === "Active" ? "activated" : "deactivated"
    alert(`Fee detail has been ${action} successfully!`)

    setSelectedItem(null)
    setActionType("")
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 rounded-t-lg flex items-center">
          <ChevronRight className="mr-2" size={20} />
          <h1 className="text-xl font-semibold">Fee Detail</h1>
        </div>

        {/* Form Section */}
        <div className="bg-white p-6 border-x border-gray-200">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="--Fee Detail Name--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Is Active:</label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 border-x border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0">
              <select
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {columns.map((column) => (
                  <option key={column.key} value={column.key}>
                    {column.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredData.length} of {feeDetails.length} results
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-200 rounded-b-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === "Active" ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === "Active" ? (
                        <button
                          onClick={() => handleStatusChange(item, "Deactive")}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Make Deactive
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(item, "Active")}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Make Active
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-700">
            Showing {Math.min(filteredData.length, feeDetails.length)} to {filteredData.length} of {feeDetails.length}{" "}
            rows
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100">
                {actionType === "Active" ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {actionType === "Active" ? "Activate Fee Detail" : "Deactivate Fee Detail"}
              </h3>

              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to {actionType === "Active" ? "activate" : "deactivate"} this fee detail?
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Fee Detail:</span>
                  <span className="text-gray-900">{selectedItem?.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium text-gray-700">Current Status:</span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedItem?.status === "Active" ? "text-green-800 bg-green-100" : "text-red-800 bg-red-100"
                    }`}
                  >
                    {selectedItem?.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusChange}
                  className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors font-medium ${
                    actionType === "Active" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {actionType === "Active" ? "Activate" : "Deactivate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeeDetails
