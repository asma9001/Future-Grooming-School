"use client"

import { useState } from "react"

// Update the print styles to better accommodate three copies on one page
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    
    .print-family-fee-content, .print-family-fee-content * {
      visibility: visible;
    }
    
    .print-family-fee-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
    }
    
    .print-modal-header, .print-modal-footer, .print-buttons {
      display: none !important;
    }
    
    .print-family-fee-body {
      padding: 0;
      margin: 0;
    }
    
    table {
      page-break-inside: avoid;
    }
    
    @page {
      size: A4;
      margin: 5mm;
    }
    
    .print-fee-form {
      font-size: 8pt;
      line-height: 1;
    }
    
    .print-fee-form td {
      padding: 1px 2px;
    }
    
    .print-fee-form th {
      padding: 1px 2px;
    }
    
    .print-fee-form .fee-header {
      font-size: 10pt;
      font-weight: bold;
    }
    
    .print-fee-form .small-text {
      font-size: 7pt;
    }
    
    .print-fee-form .signature-space {
      height: 10px;
    }
    
    .fee-challan-copy {
      margin-bottom: 5mm;
    }
    
    .fee-challan-copy:last-child {
      margin-bottom: 0;
    }
  }
`

export default function StudentAccount() {
  const [selectedSection, setSelectedSection] = useState("")
  const [searchName, setSearchName] = useState("")
  const [searchRollNo, setSearchRollNo] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("all")
  const [students, setStudents] = useState([])
  const [showStudents, setShowStudents] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showFeeModal, setShowFeeModal] = useState(false)
  const [showFamilyFeeModal, setShowFamilyFeeModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [showFeeCollectionModal, setShowFeeCollectionModal] = useState(false)

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
    // PLAY A Students
    {
      id: 1,
      compReg: "10967",
      familyNo: 1,
      rollNo: 1,
      name: "AITZAZ HASSAN",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      section: "PLAY A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
      fees: [
        { id: 1, challan: "20158(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2000 },
        { id: 2, challan: "20158(0)", type: "December 2024", name: "Admission Fee", amount: 1000 },
        { id: 3, challan: "20158(0)", type: "December 2024", name: "Annual Fund", amount: 500 },
        { id: 4, challan: "20158(162)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2000 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20158", name: "November 2024", amount: 2000, date: "21-Dec-2024" },
        { id: 2, challanId: "20157", name: "School Fees (December 2024)", amount: 3500, date: "21-Dec-2024" },
      ],
    },
    {
      id: 2,
      compReg: "10968",
      familyNo: 1,
      rollNo: 2,
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024) - A",
      section: "PLAY A",
      address: "BAHAWALNAGAR, PAKISTAN",
      phone1: "03336308274",
      phone2: "03336308274",
      status: "Active",
      fees: [
        { id: 1, challan: "20159(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2000 },
        { id: 2, challan: "20159(0)", type: "December 2024", name: "Admission Fee", amount: 1000 },
        { id: 3, challan: "20159(0)", type: "December 2024", name: "Annual Fund", amount: 500 },
        { id: 4, challan: "20159(163)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2000 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20159", name: "November 2024", amount: 2000, date: "21-Dec-2024" },
        { id: 2, challanId: "20160", name: "School Fees (December 2024)", amount: 3500, date: "21-Dec-2024" },
      ],
    },
    // NURSERY A Students
    {
      id: 3,
      compReg: "10969",
      familyNo: 2,
      rollNo: 1,
      name: "SARA AHMED",
      father: "AHMED ALI",
      class: "NURSERY (2024) - A",
      section: "NURSERY A",
      address: "LAHORE, PAKISTAN",
      phone1: "03001234567",
      phone2: "03001234567",
      status: "Active",
      fees: [
        { id: 1, challan: "20161(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2500 },
        { id: 2, challan: "20161(0)", type: "December 2024", name: "Admission Fee", amount: 1200 },
        { id: 3, challan: "20161(0)", type: "December 2024", name: "Annual Fund", amount: 600 },
        { id: 4, challan: "20161(164)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2500 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20161", name: "November 2024", amount: 2500, date: "21-Dec-2024" },
        { id: 2, challanId: "20162", name: "School Fees (December 2024)", amount: 3800, date: "21-Dec-2024" },
      ],
    },
    {
      id: 4,
      compReg: "10970",
      familyNo: 2,
      rollNo: 2,
      name: "HASSAN AHMED",
      father: "AHMED ALI",
      class: "NURSERY (2024) - A",
      section: "NURSERY A",
      address: "LAHORE, PAKISTAN",
      phone1: "03001234567",
      phone2: "03001234567",
      status: "Active",
      fees: [
        { id: 1, challan: "20163(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2500 },
        { id: 2, challan: "20163(0)", type: "December 2024", name: "Admission Fee", amount: 1200 },
        { id: 3, challan: "20163(0)", type: "December 2024", name: "Annual Fund", amount: 600 },
        { id: 4, challan: "20163(165)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2500 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20163", name: "November 2024", amount: 2500, date: "21-Dec-2024" },
        { id: 2, challanId: "20164", name: "School Fees (December 2024)", amount: 3800, date: "21-Dec-2024" },
      ],
    },
    // NURSERY B Students
    {
      id: 5,
      compReg: "10971",
      familyNo: 3,
      rollNo: 1,
      name: "FATIMA KHAN",
      father: "HASSAN KHAN",
      class: "NURSERY (2024) - B",
      section: "NURSERY B",
      address: "KARACHI, PAKISTAN",
      phone1: "03009876543",
      phone2: "03009876543",
      status: "Active",
      fees: [
        { id: 1, challan: "20165(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2500 },
        { id: 2, challan: "20165(0)", type: "December 2024", name: "Admission Fee", amount: 1200 },
        { id: 3, challan: "20165(0)", type: "December 2024", name: "Annual Fund", amount: 600 },
        { id: 4, challan: "20165(166)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2500 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20165", name: "November 2024", amount: 2500, date: "21-Dec-2024" },
        { id: 2, challanId: "20166", name: "School Fees (December 2024)", amount: 3800, date: "21-Dec-2024" },
      ],
    },
    // KG A Students
    {
      id: 6,
      compReg: "10972",
      familyNo: 4,
      rollNo: 1,
      name: "OMAR IBRAHIM",
      father: "MUHAMMAD IBRAHIM",
      class: "KG (2024) - A",
      section: "KG A",
      address: "ISLAMABAD, PAKISTAN",
      phone1: "03215555555",
      phone2: "03215555555",
      status: "Active",
      fees: [
        { id: 1, challan: "20167(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 3000 },
        { id: 2, challan: "20167(0)", type: "December 2024", name: "Admission Fee", amount: 1500 },
        { id: 3, challan: "20167(0)", type: "December 2024", name: "Annual Fund", amount: 700 },
        { id: 4, challan: "20167(167)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 3000 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20167", name: "November 2024", amount: 3000, date: "21-Dec-2024" },
        { id: 2, challanId: "20168", name: "School Fees (December 2024)", amount: 4200, date: "21-Dec-2024" },
      ],
    },
    // PLAY B Students
    {
      id: 7,
      compReg: "10973",
      familyNo: 5,
      rollNo: 1,
      name: "ZAINAB MALIK",
      father: "MALIK SAEED",
      class: "PLAY (2024) - B",
      section: "PLAY B",
      address: "FAISALABAD, PAKISTAN",
      phone1: "03331111111",
      phone2: "03331111111",
      status: "Active",
      fees: [
        { id: 1, challan: "20169(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 2000 },
        { id: 2, challan: "20169(0)", type: "December 2024", name: "Admission Fee", amount: 1000 },
        { id: 3, challan: "20169(0)", type: "December 2024", name: "Annual Fund", amount: 500 },
        { id: 4, challan: "20169(168)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 2000 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20169", name: "November 2024", amount: 2000, date: "21-Dec-2024" },
        { id: 2, challanId: "20170", name: "School Fees (December 2024)", amount: 3500, date: "21-Dec-2024" },
      ],
    },
    // KG B Students
    {
      id: 8,
      compReg: "10974",
      familyNo: 6,
      rollNo: 1,
      name: "ABDULLAH SHAH",
      father: "SHAH NAWAZ",
      class: "KG (2024) - B",
      section: "KG B",
      address: "MULTAN, PAKISTAN",
      phone1: "03222222222",
      phone2: "03222222222",
      status: "Active",
      fees: [
        { id: 1, challan: "20171(0)", type: "December 2024", name: "School Fees (December 2024)", amount: 3000 },
        { id: 2, challan: "20171(0)", type: "December 2024", name: "Admission Fee", amount: 1500 },
        { id: 3, challan: "20171(0)", type: "December 2024", name: "Annual Fund", amount: 700 },
        { id: 4, challan: "20171(169)", type: "November 2024", name: "Monthly Fee (November 2024)", amount: 3000 },
      ],
      unpaidFees: [
        { id: 1, challanId: "20171", name: "November 2024", amount: 3000, date: "21-Dec-2024" },
        { id: 2, challanId: "20172", name: "School Fees (December 2024)", amount: 4200, date: "21-Dec-2024" },
      ],
    },
  ]

  // Family fee structure
  const familyFees = [
    {
      id: 1,
      familyNo: 1,
      father: "MUSHTAQ WATTOO",
      accountTitle: "ALLIED BANK",
      accountNo: "5220237489349",
      dueDate: "26-Dec-2024",
      month: "November 2024",
      students: [
        {
          rollNo: 1,
          name: "AITZAZ HASSAN",
          father: "MUSHTAQ WATTOO",
          class: "PLAY",
          admissionFee: 0,
          annualFund: 0,
          tuitionFee: 1800,
          computerFee: 0,
          securityFee: 100,
          sportsFee: 100,
          fine: 0,
          arrears: 3500,
          total: 5500,
        },
        {
          rollNo: 2,
          name: "ALI RAZA",
          father: "MUSHTAQ WATTOO",
          class: "PLAY",
          admissionFee: 0,
          annualFund: 0,
          tuitionFee: 0,
          computerFee: 1500,
          securityFee: 1500,
          sportsFee: 0,
          fine: 0,
          arrears: 0,
          total: 3000,
        },
        {
          rollNo: 3,
          name: "HUMERA ASGHAR",
          father: "MUSHTAQ WATTOO",
          class: "PLAY",
          admissionFee: 0,
          annualFund: 0,
          tuitionFee: 1800,
          computerFee: 0,
          securityFee: 100,
          sportsFee: 100,
          fine: 0,
          arrears: 2500,
          total: 4500,
        },
        {
          rollNo: 4,
          name: "GHAZALA ASGHAR",
          father: "MUSHTAQ WATTOO",
          class: "PLAY",
          admissionFee: 0,
          annualFund: 0,
          tuitionFee: 1800,
          computerFee: 0,
          securityFee: 100,
          sportsFee: 100,
          fine: 0,
          arrears: 2000,
          total: 4000,
        },
      ],
      grandTotal: 15500,
    },
    {
      id: 2,
      familyNo: 2,
      father: "MAROOF",
      accountTitle: "ALLIED BANK",
      accountNo: "5220237489349",
      dueDate: "26-Dec-2024",
      month: "November 2024",
      students: [
        {
          rollNo: 5,
          name: "KHANSA MAROOF",
          father: "MAROOF",
          class: "PLAY",
          admissionFee: 0,
          annualFund: 0,
          tuitionFee: 1800,
          computerFee: 0,
          securityFee: 100,
          sportsFee: 100,
          fine: 0,
          arrears: 2000,
          total: 4000,
        },
      ],
      grandTotal: 4000,
    },
  ]

  const familyMonthlyFees = [
    { id: 1, studentName: "ALI RAZA", month: "December 2024", amount: 0 },
    { id: 2, studentName: "ALI RAZA", month: "December 2024", amount: 1000 },
    { id: 3, studentName: "ALI RAZA", month: "December 2024", amount: 500 },
    { id: 4, studentName: "ALI RAZA", month: "November 2024", amount: 0 },
    { id: 5, studentName: "HUMERA ASGHAR", month: "December 2024", amount: 2000 },
    { id: 6, studentName: "HUMERA ASGHAR", month: "December 2024", amount: 500 },
    { id: 7, studentName: "HUMERA ASGHAR", month: "November 2024", amount: 2000 },
    { id: 8, studentName: "GHAZALA ASGHAR", month: "December 2024", amount: 2000 },
    { id: 9, studentName: "GHAZALA ASGHAR", month: "November 2024", amount: 2000 },
  ]

  const handleGetAllStudents = () => {
    setLoading(true)
    setTimeout(() => {
      setStudents(sampleStudents) // Show all students
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
      // Filter students by selected section
      const filtered = sampleStudents.filter((student) => student.section === selectedSection)
      setStudents(filtered)
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

  const handleShowFeeDetails = (student) => {
    setSelectedStudent(student)
    setShowFeeModal(true)
  }

  const handleShowFamilyFees = (student) => {
    const family = familyFees.find((f) => f.familyNo === student.familyNo)
    setSelectedFamily(family)
    setShowFamilyFeeModal(true)
  }

  const handlePrintFamilyFees = () => {
    window.print()
  }

  const handleFeeCollection = () => {
    setShowFeeCollectionModal(true)
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
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-t-lg shadow-lg">
          <div className="flex items-center p-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
              <span className="text-blue-700 font-bold text-xl">→</span>
            </div>
            <h1 className="text-2xl font-bold">Students Accounts Management</h1>
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
                  className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <span className="mr-2">🔍</span>
                    Fetch Data
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
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    <span className="mr-2">🔍</span>
                    Fetch Data
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
                      Fees
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-blue-200">
                      Fees Printing (Family)
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
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                          {student.compReg}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.familyNo}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.rollNo}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">{student.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                          {student.father}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.class}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.address}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.phone1}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{student.phone2}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleShowFeeDetails(student)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            Fees
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleShowFamilyFees(student)}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            Family Fees Printing
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
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

        {/* Fee Details Modal */}
        {showFeeModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800">Fees Details</h3>
                <button
                  onClick={() => setShowFeeModal(false)}
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
                    {selectedStudent.rollNo} : {selectedStudent.name} S / O {selectedStudent.father} Fees Details
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="text-blue-600 font-medium">* Fees Collection Of Un-Paid Fees, Available in Bottom</p>
                    <p className="text-red-600 font-medium">* One of Un-paid Challan (Policy) should be Non-Zero</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>

                {/* Fees Table */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Sr No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Challan (Policy)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Fees Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Fees Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                          Fees
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedStudent.fees.map((fee, index) => (
                        <tr
                          key={fee.id}
                          className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{fee.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.challan}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.type}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {fee.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Showing Rows */}
                <div className="text-sm text-gray-600 mb-6">
                  Showing 1 to {selectedStudent.fees.length} of {selectedStudent.fees.length} rows
                </div>

                {/* Un Paid Challan */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-red-600 mb-4">Un Paid Challan</h4>

                  {/* Search Bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative w-64">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>

                  {/* Un Paid Challan Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                            Sr No
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                            Challan ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedStudent.unpaidFees.map((fee, index) => (
                          <tr
                            key={fee.id}
                            className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{fee.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.challanId}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {fee.amount}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{fee.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Showing Rows */}
                  <div className="text-sm text-gray-600 mt-2">
                    Showing 1 to {selectedStudent.unpaidFees.length} of {selectedStudent.unpaidFees.length} rows
                  </div>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-500 text-center mt-6">
                  Copyright © 2024 <span className="text-blue-600 font-semibold">Future Grooming School</span>. All
                  rights reserved.
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => setShowFeeModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Family Fees Modal */}
        {showFamilyFeeModal && selectedFamily && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg print-modal-header">
                <h3 className="text-lg font-semibold text-gray-800">Family Wise Fees Print</h3>
                <div className="flex gap-3 print-buttons">
                  <button
                    onClick={handlePrintFamilyFees}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <span>🖨️</span> Print
                  </button>
                  <button
                    onClick={() => setShowFamilyFeeModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 print-family-fee-content">
                <div className="print-family-fee-body print-fee-form">
                  {/* Action Buttons - Hidden in print */}
                  <div className="flex gap-4 mb-6 print-buttons">
                    <button
                      onClick={handleFeeCollection}
                      className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Fees Collection
                    </button>
                  </div>

                  {/* CAMPUS / HEAD OFFICE COPY */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 fee-challan-copy">
                    {/* Header */}
                    <div className="border-b border-gray-300 p-2 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs text-center">
                            Future
                            <br />
                            Grooming
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-center fee-header">FUTURE GROOMING SCHOOL</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>A/C TITLE:</div>
                              <div className="font-medium">ALLIED BANK</div>
                              <div>A/C No:</div>
                              <div className="font-medium">{selectedFamily.accountNo}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xs">F/No.</div>
                          <div className="text-xl font-bold">{selectedFamily.familyNo}</div>
                        </div>
                      </div>
                    </div>

                    {/* Fee Details */}
                    <div className="border-b border-gray-300">
                      <div className="grid grid-cols-3 text-center border-b border-gray-300">
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">Due Date</div>
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">
                          {selectedFamily.dueDate}
                        </div>
                        <div className="p-2 font-semibold text-xs">Fee Challan Details For {selectedFamily.month}</div>
                      </div>

                      {/* Fee Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Roll No
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Student Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Father Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Class
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Admission Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Annual Fund
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Tuition Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Computer Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Security Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Sports Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Fine
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Arrears
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedFamily.students.map((student, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.rollNo}
                                </td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.name}</td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.father}</td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.class}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.admissionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.annualFund}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.tuitionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.computerFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.securityFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.sportsFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.fine}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.arrears}
                                </td>
                                <td className="px-1 py-1 text-center text-xs font-semibold">{student.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 border-b border-gray-300">
                      <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">
                        CAMPUS / HEAD OFFICE COPY
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">G/Total</div>
                        <div className="p-2 text-center font-bold text-xs">{selectedFamily.grandTotal}</div>
                      </div>
                    </div>
                  </div>

                  {/* BANK COPY */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden mb-6 fee-challan-copy">
                    {/* Header */}
                    <div className="border-b border-gray-300 p-2 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs text-center">
                            Future
                            <br />
                            Grooming
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-center fee-header">FUTURE GROOMING SCHOOL</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>A/C TITLE:</div>
                              <div className="font-medium">ALLIED BANK</div>
                              <div>A/C No:</div>
                              <div className="font-medium">{selectedFamily.accountNo}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xs">F/No.</div>
                          <div className="text-xl font-bold">{selectedFamily.familyNo}</div>
                        </div>
                      </div>
                    </div>

                    {/* Fee Details */}
                    <div className="border-b border-gray-300">
                      <div className="grid grid-cols-3 text-center border-b border-gray-300">
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">Due Date</div>
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">
                          {selectedFamily.dueDate}
                        </div>
                        <div className="p-2 font-semibold text-xs">Fee Challan Details For {selectedFamily.month}</div>
                      </div>

                      {/* Fee Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Roll No
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Student Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Father Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Class
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Admission Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Annual Fund
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Tuition Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Computer Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Security Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Sports Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Fine
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Arrears
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedFamily.students.map((student, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.rollNo}
                                </td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.name}</td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.father}</td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.class}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.admissionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.annualFund}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.tuitionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.computerFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.securityFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.sportsFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.fine}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.arrears}
                                </td>
                                <td className="px-1 py-1 text-center text-xs font-semibold">{student.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 border-b border-gray-300">
                      <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">BANK COPY</div>
                      <div className="grid grid-cols-2">
                        <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">G/Total</div>
                        <div className="p-2 text-center font-bold text-xs">{selectedFamily.grandTotal}</div>
                      </div>
                    </div>
                  </div>

                  {/* PARENT COPY */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden fee-challan-copy">
                    {/* Header */}
                    <div className="border-b border-gray-300 p-2 bg-white">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs text-center">
                            Future
                            <br />
                            Grooming
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-center fee-header">FUTURE GROOMING SCHOOL</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>A/C TITLE:</div>
                              <div className="font-medium">ALLIED BANK</div>
                              <div>A/C No:</div>
                              <div className="font-medium">{selectedFamily.accountNo}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xs">F/No.</div>
                          <div className="text-xl font-bold">{selectedFamily.familyNo}</div>
                        </div>
                      </div>
                    </div>

                    {/* Fee Details */}
                    <div className="border-b border-gray-300">
                      <div className="grid grid-cols-3 text-center border-b border-gray-300">
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">Due Date</div>
                        <div className="p-2 font-semibold border-r border-gray-300 text-xs">
                          {selectedFamily.dueDate}
                        </div>
                        <div className="p-2 font-semibold text-xs">Fee Challan Details For {selectedFamily.month}</div>
                      </div>

                      {/* Fee Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Roll No
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Student Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Father Name
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Class
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Admission Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Annual Fund
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Tuition Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Computer Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Security Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Sports Fee
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Fine
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase border-r border-gray-300">
                                Arrears
                              </th>
                              <th className="px-1 py-1 text-center text-xs font-semibold text-gray-600 uppercase">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedFamily.students.map((student, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.rollNo}
                                </td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.name}</td>
                                <td className="px-1 py-1 text-xs border-r border-gray-300">{student.father}</td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.class}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.admissionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.annualFund}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.tuitionFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.computerFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.securityFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.sportsFee}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.fine}
                                </td>
                                <td className="px-1 py-1 text-center text-xs border-r border-gray-300">
                                  {student.arrears}
                                </td>
                                <td className="px-1 py-1 text-center text-xs font-semibold">{student.total}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 border-b border-gray-300">
                      <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">PARENT COPY</div>
                      <div className="grid grid-cols-2">
                        <div className="p-2 text-center font-bold border-r border-gray-300 text-xs">G/Total</div>
                        <div className="p-2 text-center font-bold text-xs">{selectedFamily.grandTotal}</div>
                      </div>
                    </div>

                    {/* Copyright */}
                    <div className="p-2 text-xs text-gray-500 text-center small-text">
                      Copyright © 2024 <span className="text-blue-600 font-semibold">Future Grooming School</span>. All
                      rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fee Collection Modal */}
        {showFeeCollectionModal && selectedFamily && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-800">Family Wise Fees Print</h3>
                <button
                  onClick={() => setShowFeeCollectionModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="space-y-3">
                  {familyMonthlyFees.map((fee, index) => (
                    <div key={fee.id} className="p-3 bg-gray-100 rounded-lg border border-gray-300">
                      <div className="text-sm text-gray-700">
                        {index + 5}. {selectedFamily.familyNo} : {fee.studentName} = {fee.month} (Rs. {fee.amount}/-)
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-center font-bold text-lg">Total Rs. {selectedFamily.grandTotal}/-</div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-lg">
                <button
                  onClick={() => setShowFeeCollectionModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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
