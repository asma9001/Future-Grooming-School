"use client"

import { useState, useRef } from "react"

export default function FeeCollection() {
  const [rollNo, setRollNo] = useState("")
  const [name, setName] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [showVoucher, setShowVoucher] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const printRef = useRef(null)

  // Mock student data
  const students = [
    {
      id: 1,
      rollNo: "2",
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      beyForm: "31101000000000",
      cnic: "31101000000",
      dob: "10-03-1992",
      fees: [
        {
          id: 1,
          payableNo: "21777",
          type: "December 2024 - School Fees (December 2024) (PLAY)",
          orgFees: 0,
          dueDate: "10-Dec-2024",
          fees: 0,
          received: 0,
          balance: 0,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
        {
          id: 2,
          payableNo: "21778",
          type: "December 2024 - Admission Fee (PLAY)",
          orgFees: 1000,
          dueDate: "10-Dec-2024",
          fees: 1000,
          received: 2000,
          balance: -1000,
          receipts: 14675,
          dates: "31-May-2025",
          cashType: "Cash - 0 - 31-May-2025",
        },
        {
          id: 3,
          payableNo: "21779",
          type: "December 2024 - Annual Fund (PLAY)",
          orgFees: 500,
          dueDate: "10-Dec-2024",
          fees: 500,
          received: 0,
          balance: 500,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
        {
          id: 4,
          payableNo: "21785",
          type: "November 2024 - Monthly Fee (November 2024) (PLAY)",
          orgFees: 0,
          dueDate: "26-Dec-2024",
          fees: 0,
          received: 0,
          balance: 0,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
      ],
    },
    {
      id: 2,
      rollNo: "3",
      name: "HUMERA ASGHAR",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      beyForm: "31101000000001",
      cnic: "31101000001",
      dob: "15-05-1994",
      fees: [
        {
          id: 1,
          payableNo: "21780",
          type: "December 2024 - School Fees (December 2024) (PLAY)",
          orgFees: 0,
          dueDate: "10-Dec-2024",
          fees: 0,
          received: 0,
          balance: 0,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
        {
          id: 2,
          payableNo: "21781",
          type: "December 2024 - Admission Fee (PLAY)",
          orgFees: 1000,
          dueDate: "10-Dec-2024",
          fees: 1000,
          received: 0,
          balance: 1000,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
        {
          id: 3,
          payableNo: "21782",
          type: "December 2024 - Annual Fund (PLAY)",
          orgFees: 500,
          dueDate: "10-Dec-2024",
          fees: 500,
          received: 0,
          balance: 500,
          receipts: 0,
          dates: 0,
          cashType: "Un - Paid",
        },
      ],
    },
  ]

  const handleSearchByRollNo = () => {
    if (!rollNo.trim()) return

    const results = students.filter((student) => student.rollNo.toLowerCase().includes(rollNo.toLowerCase()))

    setSearchResults(results)
    setShowResults(true)
  }

  const handleSearchByName = () => {
    if (!name.trim()) return

    const results = students.filter((student) => student.name.toLowerCase().includes(name.toLowerCase()))

    setSearchResults(results)
    setShowResults(true)
  }

  const handleSelectStudent = (student) => {
    setSelectedStudent(student)
    setShowVoucher(true)
  }

  const handlePrint = () => {
    const printContent = printRef.current
    const originalContents = document.body.innerHTML

    if (printContent) {
      const printWindow = window.open("", "_blank")
      printWindow.document.write(`
        <html>
          <head>
            <title>Fee Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .receipt { max-width: 800px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .footer { margin-top: 30px; text-align: center; font-size: 12px; }
              .total { font-weight: bold; margin-top: 10px; text-align: right; }
              .divider { border-top: 1px dashed #000; margin: 20px 0; }
              .non-refundable { border: 1px solid #000; padding: 10px; margin-top: 20px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="receipt">
              ${printContent.innerHTML}
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  const handleCloseVoucher = () => {
    setShowVoucher(false)
  }

  // Calculate totals for the selected student
  const calculateTotals = () => {
    if (!selectedStudent) return { totalFees: 0, totalPaid: 0, totalBalance: 0 }

    return selectedStudent.fees.reduce(
      (acc, fee) => {
        return {
          totalFees: acc.totalFees + fee.fees,
          totalPaid: acc.totalPaid + fee.received,
          totalBalance: acc.totalBalance + fee.balance,
        }
      },
      { totalFees: 0, totalPaid: 0, totalBalance: 0 },
    )
  }

  const { totalFees, totalPaid, totalBalance } = calculateTotals()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
            <span className="text-slate-800 text-sm font-bold">$</span>
          </div>
          <h1 className="text-xl font-semibold">Fee Collection</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Roll No Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Roll No</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Roll No"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearchByRollNo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Get By Roll No
            </button>
          </div>
        </div>

        {/* Name Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearchByName}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Get By Name
            </button>
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div className="mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Roll No:</span> {selectedStudent.rollNo}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {selectedStudent.name}{" "}
                  <span className="text-gray-500">S/O</span> {selectedStudent.father}
                </p>
                <p>
                  <span className="font-semibold">Class:</span> {selectedStudent.class}
                </p>
              </div>
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Phone:</span> {selectedStudent.phone1}, {selectedStudent.phone2}
                </p>
                <p>
                  <span className="font-semibold">CNIC:</span> {selectedStudent.cnic}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {selectedStudent.address}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        {showResults && searchResults.length > 0 && !selectedStudent && (
          <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Father
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone 1
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone 2
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bey Form
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CNIC
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-red-600">{student.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600">{student.father}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600">{student.address}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.phone1}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.phone2}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.beyForm}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.cnic}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{student.dob}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleSelectStudent(student)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500">
              Showing 1 to {searchResults.length} of {searchResults.length} rows
            </div>
          </div>
        )}

        {/* Fee Details Table */}
        {selectedStudent && (
          <div className="overflow-x-auto bg-white rounded-md shadow-sm border border-gray-200 mb-6">
            <div className="flex justify-end p-2">
              <input
                type="text"
                placeholder="Search"
                className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sr No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payable No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Org. Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receipts
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Print
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cash Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedStudent.fees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.payableNo}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.type}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.orgFees}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.dueDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.fees}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.received}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.balance}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.receipts}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{fee.dates}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {fee.receipts ? (
                        <button
                          onClick={() => setShowVoucher(true)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition-colors"
                        >
                          Print
                        </button>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`${fee.cashType.includes("Un - Paid") ? "text-red-600" : "text-gray-900"}`}>
                        {fee.cashType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Showing 1 to {selectedStudent.fees.length} of {selectedStudent.fees.length} rows
                </span>
                <span className="font-medium">
                  Total Fees: {totalFees} -&gt; Total Paid: {totalPaid} -&gt;
                  <span className={totalBalance < 0 ? "text-red-600" : "text-green-600"}>
                    {" "}
                    Total Balance: {totalBalance}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* No Results Message */}
        {showResults && searchResults.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
            No students found matching your search criteria.
          </div>
        )}
      </div>

      {/* Fee Voucher Modal */}
      {showVoucher && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-800">Fees Print</h3>
              <button onClick={handleCloseVoucher} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <button
                onClick={handlePrint}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mb-6 transition-colors font-semibold"
              >
                Print
              </button>

              <div ref={printRef} className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                {/* Receipt Header */}
                <div className="text-center p-6 bg-white">
                  <h4 className="text-lg font-bold mb-2">Tech Minds School BWN</h4>
                  <p className="text-sm font-semibold underline">Receipt # 14675</p>
                  <p className="text-sm">31-May-2025</p>
                  <div className="border-t border-dashed border-gray-400 my-4"></div>
                </div>

                {/* Student Details */}
                <div className="px-6 pb-4">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Roll # :</span> {selectedStudent.rollNo}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Name :</span> {selectedStudent.name}
                  </p>
                  <p className="text-sm mb-4">
                    <span className="font-semibold">Class :</span> {selectedStudent.class}
                  </p>
                </div>

                {/* Fee Details Table */}
                <div className="px-6 pb-4">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left font-semibold">Name</th>
                        <th className="border border-gray-300 p-2 text-left font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Admission Fee</td>
                        <td className="border border-gray-300 p-2">2,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="px-6 pb-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">Total: 2000</p>
                  </div>
                </div>

                {/* Non-Refundable Notice */}
                <div className="px-6 pb-4">
                  <div className="border border-gray-300 p-3 text-center text-sm bg-gray-50">
                    <p className="mb-1">This is Computer Generated Receipt no need for</p>
                    <p className="mb-1">Signature. For any Inquiry Please Contact at</p>
                    <p className="font-bold">Non Refundable</p>
                  </div>
                </div>

                {/* User Info */}
                <div className="px-6 pb-4">
                  <p className="text-sm">
                    <span className="font-semibold">User :</span> Aitzaz Wattoo
                  </p>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-gray-500 p-4 border-t border-gray-200">
                  Copyright © 2024 <span className="text-blue-600 font-semibold">Tech Minds BWN</span>. All rights
                  reserved.
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={handleCloseVoucher}
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
