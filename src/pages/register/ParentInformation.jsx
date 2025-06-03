"use client"

import { useState } from "react"

export default function ParentInformation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("All Fields")

  // Parent data
  const [parents] = useState([
    {
      id: 1,
      familyNo: 1,
      father: "MUSHTAQ WATTOO",
      fatherCnic: "31101000000",
      cell: "03336308274",
      fatherCell: "03336308274",
      residency: "BAHAWALNAGAR, PAKISTAN",
      campus: "Future Grooming School",
      // Additional data for completeness
      occupation: "LAND LORD",
      monthlyIncome: "50000",
      email: "mushtaq@example.com",
      emergencyContact: "03336308274",
      relation: "Father",
    },
    {
      id: 2,
      familyNo: 2,
      father: "MAROOF",
      fatherCnic: "31101000000",
      cell: "03166758694",
      fatherCell: "03166758694",
      residency: "BAHAWALNAGAR, PAKISTAN",
      campus: "Future Grooming School",
      occupation: "BUSINESS",
      monthlyIncome: "75000",
      email: "maroof@example.com",
      emergencyContact: "03166758694",
      relation: "Father",
    },
    {
      id: 3,
      familyNo: 3,
      father: "AHMED ALI",
      fatherCnic: "31101000001",
      cell: "03001234567",
      fatherCell: "03001234567",
      residency: "LAHORE, PAKISTAN",
      campus: "Future Grooming School",
      occupation: "ENGINEER",
      monthlyIncome: "80000",
      email: "ahmed@example.com",
      emergencyContact: "03001234567",
      relation: "Father",
    },
    {
      id: 4,
      familyNo: 4,
      father: "HASSAN KHAN",
      fatherCnic: "31101000002",
      cell: "03009876543",
      fatherCell: "03009876543",
      residency: "KARACHI, PAKISTAN",
      campus: "Future Grooming School",
      occupation: "DOCTOR",
      monthlyIncome: "120000",
      email: "hassan@example.com",
      emergencyContact: "03009876543",
      relation: "Father",
    },
    {
      id: 5,
      familyNo: 5,
      father: "MUHAMMAD IBRAHIM",
      fatherCnic: "31101000003",
      cell: "03215555555",
      fatherCell: "03215555555",
      residency: "ISLAMABAD, PAKISTAN",
      campus: "Future Grooming School",
      occupation: "TEACHER",
      monthlyIncome: "45000",
      email: "ibrahim@example.com",
      emergencyContact: "03215555555",
      relation: "Father",
    },
  ])

  // Filter parents based on search term and selected filter
  const filteredParents = parents.filter((parent) => {
    const searchTermLower = searchTerm.toLowerCase()

    if (searchFilter === "All Fields") {
      return Object.values(parent).some((value) => value.toString().toLowerCase().includes(searchTermLower))
    } else if (searchFilter === "Sr. No") {
      return parent.id.toString().toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Family No") {
      return parent.familyNo.toString().toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Father") {
      return parent.father.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Father CNIC") {
      return parent.fatherCnic.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "CELL") {
      return parent.cell.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Father CELL") {
      return parent.fatherCell.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Residency") {
      return parent.residency.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Campus") {
      return parent.campus.toLowerCase().includes(searchTermLower)
    }

    return false
  })

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">→</span>
              </div>
              <h1 className="text-xl font-semibold">Parents Information</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-700"
                >
                  <option>All Fields</option>
                  <option>Sr. No</option>
                  <option>Family No</option>
                  <option>Father</option>
                  <option>Father CNIC</option>
                  <option>CELL</option>
                  <option>Father CELL</option>
                  <option>Residency</option>
                  <option>Campus</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded border-0 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sr #
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Family No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Father
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Father CNIC
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CELL
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Father CELL
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Residency
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.length > 0 ? (
                  filteredParents.map((parent, index) => (
                    <tr key={parent.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.familyNo}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm font-medium text-blue-600">
                        {parent.father}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.fatherCnic}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.cell}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.fatherCell}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.residency}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{parent.campus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                      {searchTerm ? "No matching parents found" : "No parents available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="py-3 px-5 bg-blue-100 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {filteredParents.length > 0
                  ? `Showing 1 to ${filteredParents.length} of ${filteredParents.length} rows`
                  : "No entries to show"}
              </div>
              {searchTerm && (
                <div className="text-sm text-blue-600 font-medium">
                  {filteredParents.length > 0
                    ? `Found ${filteredParents.length} parent${filteredParents.length !== 1 ? "s" : ""} matching "${searchTerm}"`
                    : `No parents found matching "${searchTerm}"`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
