"use client"

import { useState } from "react"
import { ChevronRight, Search, X } from "lucide-react"

const Payable = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColumn, setFilterColumn] = useState("all")

  // Sample data matching the image
  const [payableData] = useState([
    {
      id: 1,
      srNo: 1,
      rollNo: 1,
      name: "AITZAZ HASSAN",
      class: "PLAY (2024)",
      total: 5500,
      phone: "03336308274",
      feesType: "December 2024 , December 2024 , December 2024 , November 2024",
      feesAmounts: "2000 , 1000 , 500 , 2000",
      campus: "Future Grooming School",
    },
    {
      id: 2,
      srNo: 2,
      rollNo: 2,
      name: "ALI RAZA",
      class: "PLAY (2024)",
      total: 1500,
      phone: "03336308274",
      feesType: "December 2024 , December 2024 , December 2024 , November 2024",
      feesAmounts: "0 , 1000 , 500 , 0",
      campus: "Future Grooming School",
    },
    {
      id: 3,
      srNo: 3,
      rollNo: 3,
      name: "HUMERA ASGHAR",
      class: "PLAY (2024)",
      total: 4500,
      phone: "03336308274",
      feesType: "December 2024 , December 2024 , November 2024",
      feesAmounts: "2000 , 500 , 2000",
      campus: "Future Grooming School",
    },
    {
      id: 4,
      srNo: 4,
      rollNo: 4,
      name: "GHAZALA ASGHAR",
      class: "PLAY (2024)",
      total: 4000,
      phone: "03336308274",
      feesType: "December 2024 , November 2024",
      feesAmounts: "2000 , 2000",
      campus: "Future Grooming School",
    },
    {
      id: 5,
      srNo: 5,
      rollNo: 5,
      name: "KHANSA MAROOF",
      class: "PLAY (2024)",
      total: 5000,
      phone: "03166758694",
      feesType: "December 2024 , December 2024 , November 2024",
      feesAmounts: "2000 , 1000 , 2000",
      campus: "Future Grooming School",
    },
  ])

  // Filter data based on search and column filter
  const filteredData = payableData.filter((item) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()

    switch (filterColumn) {
      case "name":
        return item.name.toLowerCase().includes(searchLower)
      case "class":
        return item.class.toLowerCase().includes(searchLower)
      case "phone":
        return item.phone.includes(searchTerm)
      case "campus":
        return item.campus.toLowerCase().includes(searchLower)
      case "total":
        return item.total.toString().includes(searchTerm)
      default:
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.class.toLowerCase().includes(searchLower) ||
          item.phone.includes(searchTerm) ||
          item.campus.toLowerCase().includes(searchLower) ||
          item.total.toString().includes(searchTerm) ||
          item.feesType.toLowerCase().includes(searchLower) ||
          item.feesAmounts.includes(searchTerm)
        )
    }
  })

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 flex items-center gap-2">
          <ChevronRight className="w-5 h-5" />
          <h1 className="text-lg font-semibold">Students Payable Fees</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg">
          {/* Search and Filter Section */}
          <div className="p-6 flex justify-end items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <select
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="all">All Columns</option>
                <option value="name">Name</option>
                <option value="class">Class</option>
                <option value="total">Total</option>
                <option value="phone">Phone</option>
                <option value="campus">Campus</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Sr No
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Roll No
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Name
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Class
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Total
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Fees Type
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Fees Amounts
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                        {item.srNo}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                        {item.rollNo}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium border-r border-gray-200">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                        {item.class}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                        {item.total}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r border-gray-200">
                        {item.phone}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                        <div className="break-words">{item.feesType}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                        <div className="break-words">{item.feesAmounts}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="break-words">{item.campus}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-700">Showing 1 to 5 of 5 rows</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payable
