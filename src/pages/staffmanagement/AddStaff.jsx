"use client"

import { useState, useEffect } from "react"

export default function StaffManagement() {
  // Form state
  const [formData, setFormData] = useState({
    cellNo2: "",
    password: "",
    designation: "",
    jobType: "",
    pecNo: "",
    subjectSpecialist: "",
    professionalDegree: "",
    masterDegree: "",
    bachelorDegree: "",
    intermediate: "",
    matric: "",
    specialization: "",
    joiningDate: "",
    experienceYears: "",
    name: "",
    nameUrdu: "",
    father: "",
    fatherUrdu: "",
    dob: "",
    dobUrdu: "",
    gender: "",
    email: "",
    address: "",
    religion: "",
    cnic: "",
    cellNo1: "",
    bankInfoAvailable: "",
    bankDetail: "",
    pay: "",
    accountNo: "",
    ntnNo: "",
  })

  // Staff data state
  const [staffData, setStaffData] = useState([
    {
      id: 246,
      name: "NOUR YOUSEF",
      fatherName: "YOUSEF",
      cnic: "232323",
      dob: "26-Dec-2024",
      email: "nourrwaa@gmail.com",
      permanentAddress: "حي البوادي شارع الخطيب التبريزي عمارة زكي عمر بجوار مخابز وتموينات غذاء",
      phoneNo: "1",
      designation: "arabic teacher",
      campus: "Future Grooming School",
    },
    {
      id: 247,
      name: "AHMED KHAN",
      fatherName: "MUHAMMAD KHAN",
      cnic: "345678",
      dob: "15-Jan-2024",
      email: "ahmed.khan@gmail.com",
      permanentAddress: "123 Main Street, Islamabad",
      phoneNo: "03001234567",
      designation: "math teacher",
      campus: "Future Grooming School",
    },
    {
      id: 248,
      name: "FATIMA ALI",
      fatherName: "ALI AHMED",
      cnic: "987654",
      dob: "03-Mar-2024",
      email: "fatima.ali@gmail.com",
      permanentAddress: "456 Park Avenue, Lahore",
      phoneNo: "03009876543",
      designation: "science teacher",
      campus: "Future Grooming School",
    },
  ])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredStaff, setFilteredStaff] = useState(staffData)

  // Add these new state variables after the existing state
  const [searchColumn, setSearchColumn] = useState("all")

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

    // Create new staff member
    const newStaff = {
      id: staffData.length > 0 ? Math.max(...staffData.map((staff) => staff.id)) + 1 : 1,
      name: formData.name,
      fatherName: formData.father,
      cnic: formData.cnic,
      dob: formData.dob,
      email: formData.email,
      permanentAddress: formData.address,
      phoneNo: formData.cellNo1,
      designation: formData.designation,
      campus: "Tech Minds School BWN",
    }

    // Add to staff data
    setStaffData([...staffData, newStaff])

    // Reset form
    handleReset()

    // Show success message
    alert("Staff member added successfully!")
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      cellNo2: "",
      password: "",
      designation: "",
      jobType: "",
      pecNo: "",
      subjectSpecialist: "",
      professionalDegree: "",
      masterDegree: "",
      bachelorDegree: "",
      intermediate: "",
      matric: "",
      specialization: "",
      joiningDate: "",
      experienceYears: "",
      name: "",
      nameUrdu: "",
      father: "",
      fatherUrdu: "",
      dob: "",
      dobUrdu: "",
      gender: "",
      email: "",
      address: "",
      religion: "",
      cnic: "",
      cellNo1: "",
      bankInfoAvailable: "",
      bankDetail: "",
      pay: "",
      accountNo: "",
      ntnNo: "",
    })
  }

  // Update the useEffect for filtering to include multiple filters
  useEffect(() => {
    let results = staffData

    if (searchTerm) {
      results = results.filter((staff) => {
        const searchValue = searchTerm.toLowerCase()

        if (searchColumn === "all") {
          return (
            staff.name.toLowerCase().includes(searchValue) ||
            staff.fatherName.toLowerCase().includes(searchValue) ||
            staff.designation.toLowerCase().includes(searchValue) ||
            staff.cnic.includes(searchValue) ||
            staff.email.toLowerCase().includes(searchValue) ||
            staff.id.toString().includes(searchValue) ||
            staff.campus.toLowerCase().includes(searchValue)
          )
        } else {
          const fieldValue = staff[searchColumn]
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchValue)
          } else if (typeof fieldValue === "number") {
            return fieldValue.toString().includes(searchValue)
          }
          return false
        }
      })
    }

    setFilteredStaff(results)
  }, [searchTerm, staffData, searchColumn])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 flex items-center gap-2">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-teal-700 text-sm font-bold">+</span>
        </div>
        <h1 className="text-lg font-medium">Add Staff</h1>
      </div>

      <div className="p-6 bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="--Name--"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name Urdu:</label>
              <input
                type="text"
                name="nameUrdu"
                value={formData.nameUrdu}
                onChange={handleInputChange}
                placeholder="--Name Urdu--"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Father: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="father"
                value={formData.father}
                onChange={handleInputChange}
                placeholder="Father Name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father Urdu:</label>
              <input
                type="text"
                name="fatherUrdu"
                value={formData.fatherUrdu}
                onChange={handleInputChange}
                placeholder="Father Urdu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DOB: <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DOB Urdu/English:</label>
              <input
                type="text"
                name="dobUrdu"
                value={formData.dobUrdu}
                onChange={handleInputChange}
                placeholder="Dob Urdu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Religion:</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder="Religion"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNIC:</label>
              <input
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleInputChange}
                placeholder="Cnic"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cell No 1: <span className="text-red-500">*</span> <span className="text-red-500">Login</span>
              </label>
              <input
                type="text"
                name="cellNo1"
                value={formData.cellNo1}
                onChange={handleInputChange}
                placeholder="Cell NO"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cell No 2:</label>
              <input
                type="text"
                name="cellNo2"
                value={formData.cellNo2}
                onChange={handleInputChange}
                placeholder="Cell No"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password: <span className="text-red-500">*</span> <span className="text-red-500">Login</span>{" "}
                <span className="text-green-600">(AutoFill: Coping Cell No 1)</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Staff Information */}
          <h2 className="text-lg font-medium text-gray-700 mb-4 border-b border-gray-200 pb-2">Staff Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation:</label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Designation</option>
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Senior Teacher">Senior Teacher</option>
                <option value="Teacher">Teacher</option>
                <option value="Junior Teacher">Junior Teacher</option>
                <option value="Admin Staff">Admin Staff</option>
                <option value="IT Staff">IT Staff</option>
                <option value="Accountant">Accountant</option>
                <option value="Clerk">Clerk</option>
                <option value="Peon">Peon</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Driver">Driver</option>
                <option value="Sweeper">Sweeper</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type:</label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                placeholder="Job Type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PEC NO:</label>
              <input
                type="text"
                name="pecNo"
                value={formData.pecNo}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Specialist:</label>
              <input
                type="text"
                name="subjectSpecialist"
                value={formData.subjectSpecialist}
                onChange={handleInputChange}
                placeholder="Subject Specialist"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Degree:</label>
              <input
                type="text"
                name="professionalDegree"
                value={formData.professionalDegree}
                onChange={handleInputChange}
                placeholder="Professional Degree"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Master Degree:</label>
              <input
                type="text"
                name="masterDegree"
                value={formData.masterDegree}
                onChange={handleInputChange}
                placeholder="Master Degree"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bachelor Degree:</label>
              <input
                type="text"
                name="bachelorDegree"
                value={formData.bachelorDegree}
                onChange={handleInputChange}
                placeholder="Bachelor Degree"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intermediate:</label>
              <input
                type="text"
                name="intermediate"
                value={formData.intermediate}
                onChange={handleInputChange}
                placeholder="Intermediate"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Matric:</label>
              <input
                type="text"
                name="matric"
                value={formData.matric}
                onChange={handleInputChange}
                placeholder="Matric"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization:</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="Extra Specialization"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date:</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience In Years:</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Bank Information */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Information Available or Not? <span className="text-red-500">Select necessarily *</span>
              </label>
              <select
                name="bankInfoAvailable"
                value={formData.bankInfoAvailable}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Detail:</label>
              <select
                name="bankDetail"
                value={formData.bankDetail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select</option>
                <option value="Allied Bank">Allied Bank</option>
                <option value="Bank Al Habib">Bank Al Habib</option>
                <option value="Bank Alfalah">Bank Alfalah</option>
                <option value="Faysal Bank">Faysal Bank</option>
                <option value="Habib Bank">Habib Bank</option>
                <option value="MCB Bank">MCB Bank</option>
                <option value="Meezan Bank">Meezan Bank</option>
                <option value="National Bank">National Bank</option>
                <option value="UBL Bank">UBL Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pay:</label>
              <input
                type="number"
                name="pay"
                value={formData.pay}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account No:</label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NTN NO:</label>
              <input
                type="text"
                name="ntnNo"
                value={formData.ntnNo}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
            >
              submit
            </button>
          </div>
        </form>

        {/* Staff Table */}
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Staff Management</h2>
            <p className="text-gray-600">Manage your staff members and their information</p>
          </div>

          {/* Modern Search Section */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 flex gap-2">
                <select
                  value={searchColumn}
                  onChange={(e) => setSearchColumn(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Columns</option>
                  <option value="id">Staff ID</option>
                  <option value="name">Name</option>
                  <option value="fatherName">Father Name</option>
                  <option value="cnic">CNIC</option>
                  <option value="email">Email</option>
                  <option value="designation">Designation</option>
                  <option value="campus">Campus</option>
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
            {filteredStaff.length !== staffData.length && (
              <div className="mt-2 text-sm text-gray-600">
                Showing {filteredStaff.length} of {staffData.length} results
              </div>
            )}
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="min-w-[1200px]">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Father Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CNIC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DOB
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permanent Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campus
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.fatherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.cnic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{staff.permanentAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.phoneNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.campus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
              Showing 1 to {filteredStaff.length} of {staffData.length} rows
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
