"use client"

import { useState, useEffect } from "react"

// Mock data for classes with their associated fee structures
const classData = [
  {
    id: 1,
    name: "PLAY GROUP - PLAY GROUP - PLAY - 2024 - A",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 2000 },
      { id: 2, name: "Admission Fee", amount: 5000 },
      { id: 3, name: "Annual Fee", amount: 10000 },
    ],
  },
  {
    id: 2,
    name: "PLAY GROUP - PLAY GROUP - NURSERY - 2024 - A",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 2200 },
      { id: 2, name: "Admission Fee", amount: 5500 },
      { id: 3, name: "Annual Fee", amount: 11000 },
    ],
  },
  {
    id: 3,
    name: "PLAY GROUP - PLAY GROUP - PREP - 2024 - A",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 2500 },
      { id: 2, name: "Admission Fee", amount: 6000 },
      { id: 3, name: "Annual Fee", amount: 12000 },
    ],
  },
  {
    id: 4,
    name: "PRIMARY - PRIMARY - ONE - 2024 - A",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 3000 },
      { id: 2, name: "Admission Fee", amount: 7000 },
      { id: 3, name: "Annual Fee", amount: 15000 },
    ],
  },
  {
    id: 5,
    name: "PRIMARY - PRIMARY - TWO - 2024 - A",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 3500 },
      { id: 2, name: "Admission Fee", amount: 7500 },
      { id: 3, name: "Annual Fee", amount: 16000 },
    ],
  },
  {
    id: 6,
    name: "MIDDLE - MIDDLE - 16710 - 2024 - 16710",
    fees: [
      { id: 1, name: "Monthly Fee", amount: 4000 },
      { id: 2, name: "Admission Fee", amount: 8000 },
      { id: 3, name: "Annual Fee", amount: 18000 },
    ],
  },
]

// Mock student data for each class
const studentsByClass = {
  "PLAY GROUP - PLAY GROUP - PLAY - 2024 - A": [
    {
      id: 1,
      name: "AITZAZ HASSAN",
      fatherName: "MUSHTAQ WATTOO",
      className: "PLAY Class Fee-2000",
      feeAmount: 2000,
    },
    {
      id: 2,
      name: "ALI RAZA",
      fatherName: "MUSHTAQ WATTOO",
      className: "PLAY Class Fee-2000",
      feeAmount: 2000,
    },
    {
      id: 3,
      name: "HUMERA ASGHAR",
      fatherName: "MUSHTAQ WATTOO",
      className: "PLAY Class Fee-2000",
      feeAmount: 2000,
    },
    {
      id: 4,
      name: "GHAZALA ASGHAR",
      fatherName: "MUSHTAQ WATTOO",
      className: "PLAY Class Fee-2000",
      feeAmount: 2000,
    },
    {
      id: 5,
      name: "KHANSA MAROOF",
      fatherName: "MAROOF",
      className: "PLAY Class Fee-2000",
      feeAmount: 2000,
    },
  ],
  "PLAY GROUP - PLAY GROUP - NURSERY - 2024 - A": [
    {
      id: 6,
      name: "SARAH AHMED",
      fatherName: "AHMED KHAN",
      className: "NURSERY Class Fee-2200",
      feeAmount: 2200,
    },
    {
      id: 7,
      name: "HAMZA ALI",
      fatherName: "ALI HASSAN",
      className: "NURSERY Class Fee-2200",
      feeAmount: 2200,
    },
  ],
  "PLAY GROUP - PLAY GROUP - PREP - 2024 - A": [
    {
      id: 8,
      name: "AYESHA MALIK",
      fatherName: "MALIK RIAZ",
      className: "PREP Class Fee-2500",
      feeAmount: 2500,
    },
    {
      id: 9,
      name: "USMAN KHAN",
      fatherName: "KHAN MUHAMMAD",
      className: "PREP Class Fee-2500",
      feeAmount: 2500,
    },
  ],
  "PRIMARY - PRIMARY - ONE - 2024 - A": [
    {
      id: 10,
      name: "FATIMA ZAHRA",
      fatherName: "ZAHRA HUSSAIN",
      className: "ONE Class Fee-3000",
      feeAmount: 3000,
    },
  ],
  "PRIMARY - PRIMARY - TWO - 2024 - A": [
    {
      id: 11,
      name: "BILAL AHMAD",
      fatherName: "AHMAD RAZA",
      className: "TWO Class Fee-3500",
      feeAmount: 3500,
    },
  ],
  "MIDDLE - MIDDLE - 16710 - 2024 - 16710": [
    {
      id: 12,
      name: "ZAINAB FATIMA",
      fatherName: "FATIMA JAVED",
      className: "MIDDLE Class Fee-4000",
      feeAmount: 4000,
    },
  ],
}

export default function StudentFeeAssign() {
  const [selectedClass, setSelectedClass] = useState("")
  const [students, setStudents] = useState([])
  const [showStudents, setShowStudents] = useState(false)
  const [removeDialog, setRemoveDialog] = useState({
    open: false,
    studentId: null,
    studentName: "",
  })

  // Class-specific fee data
  const [availableFees, setAvailableFees] = useState([])
  const [selectedFee, setSelectedFee] = useState(null)

  // Fee assignment form state
  const [feeJob, setFeeJob] = useState("")
  const [feeName, setFeeName] = useState("")
  const [feeAmount, setFeeAmount] = useState("")
  const [dueDate, setDueDate] = useState("2025-05-31")
  const [expiryDate, setExpiryDate] = useState("2025-05-31")

  // Update available fees when class changes
  useEffect(() => {
    if (selectedClass) {
      const classInfo = classData.find((c) => c.name === selectedClass)
      if (classInfo) {
        setAvailableFees(classInfo.fees)
        setFeeJob("")
        setFeeName("")
        setFeeAmount("")
      }
    } else {
      setAvailableFees([])
    }
  }, [selectedClass])

  // Update fee name and amount when fee job changes
  useEffect(() => {
    if (feeJob) {
      const fee = availableFees.find((f) => f.name === feeJob)
      if (fee) {
        setFeeName(fee.name)
        setFeeAmount(fee.amount)
        setSelectedFee(fee)
      }
    } else {
      setFeeName("")
      setFeeAmount("")
      setSelectedFee(null)
    }
  }, [feeJob, availableFees])

  const handleFetchStudents = () => {
    if (selectedClass) {
      setStudents(studentsByClass[selectedClass] || [])
      setShowStudents(true)
    }
  }

  const handleRemoveClick = (studentId, studentName) => {
    setRemoveDialog({
      open: true,
      studentId,
      studentName,
    })
  }

  const handleConfirmRemove = () => {
    if (removeDialog.studentId) {
      setStudents(students.filter((student) => student.id !== removeDialog.studentId))
    }
    setRemoveDialog({ open: false, studentId: null, studentName: "" })
  }

  const handleCancelRemove = () => {
    setRemoveDialog({ open: false, studentId: null, studentName: "" })
  }

  const handleAssignFees = () => {
    if (!selectedFee) return

    // In a real app, this would send data to a server
    console.log("Assigning fees:", {
      class: selectedClass,
      feeJob,
      feeName,
      feeAmount,
      dueDate,
      expiryDate,
      students: students.map((s) => s.id),
    })

    // Show success message (in a real app, you'd use a toast notification)
    alert(`Successfully assigned ${feeName} (${feeAmount}) to ${students.length} students in ${selectedClass}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h1 className="flex items-center gap-2 text-xl font-semibold m-0">👥 Students Fees Assign</h1>
      </div>

      <div className="p-6">
        {/* Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Select Section</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">--Select--</option>
              {classData.map((classItem) => (
                <option key={classItem.id} value={classItem.name}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Fetch Students</label>
            <button
              className={`w-full p-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedClass
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
              onClick={handleFetchStudents}
              disabled={!selectedClass}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Students Details */}
        {showStudents && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="bg-blue-500 text-white p-4 text-lg font-semibold">👥 Students Details</div>
            <div className="p-0">
              <div className="bg-gray-100 p-4 font-medium text-gray-800 border-b border-gray-200">{selectedClass}</div>
              {students.length > 0 ? (
                <div>
                  {students.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1 text-gray-700">
                        <span className="text-gray-600 mr-2">{index + 1}:</span>
                        <span className="font-medium">{student.name}</span>
                        <span className="text-gray-600 mx-2">S/O</span>
                        <span className="text-gray-600">{student.fatherName}</span>
                        <span className="text-gray-500 ml-2">({student.className})</span>
                      </div>
                      <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white border-none rounded text-xs font-medium cursor-pointer transition-colors duration-200"
                        onClick={() => handleRemoveClick(student.id, student.name)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-600">No students found for this class.</div>
              )}
            </div>
          </div>
        )}

        {/* Assign Fees */}
        {showStudents && students.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-500 text-white p-4 text-lg font-semibold">💰 Assign Fees</div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Fee Job:</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={feeJob}
                    onChange={(e) => setFeeJob(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {availableFees.map((fee) => (
                      <option key={fee.id} value={fee.name}>
                        {fee.name} (Rs. {fee.amount})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Fee Name:</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    value={feeName}
                    onChange={(e) => setFeeName(e.target.value)}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Fee Amount:</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    value={feeAmount ? `Rs. ${feeAmount}` : ""}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Due Date:</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Expiry Date:</label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-4 text-gray-600">
                  This will assign <strong>{feeName}</strong> {feeAmount && <span>(Rs. {feeAmount})</span>} to all{" "}
                  <strong>{students.length} students</strong> in <strong>{selectedClass}</strong>.
                </p>
                <button
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    feeJob
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  onClick={handleAssignFees}
                  disabled={!feeJob}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {removeDialog.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCancelRemove}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-11/12 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-red-600 mb-2 m-0">🗑️ Confirm Removal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Are you sure you want to remove <strong>{removeDialog.studentName}</strong> from the list? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={handleCancelRemove}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors duration-200"
                onClick={handleConfirmRemove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
