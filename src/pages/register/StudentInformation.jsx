"use client"

import { useState } from "react"

export default function StudentInformation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFilter, setSearchFilter] = useState("All Fields")
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Student data
  const [students] = useState([
    {
      id: 1,
      rollNo: 5,
      name: "KHANSA MAROOF",
      father: "MAROOF",
      class: "PLAY (2024)",
      section: "A",
      fatherCell: "03166758694",
      campus: "Future Grooming School",
      // Additional data for print modal
      familyNo: 2,
      bForm: "31101000000000",
      gender: "Female",
      admissionDate: "21-12-2024",
      dob: "21-12-2019",
      fatherCnic: "3110100000",
      cell: "03166758694",
      residency: "BAHAWALPUR, PAKISTAN",
      status: "Active",
      user: "Aitzaz Wattoo",
      nameUrdu: "",
      fatherUrdu: "",
      fatherOccupation: "LAND LORD",
      dobWords: "",
      lastSchool: "",
      permanentAddress: "BAHAWALPUR, PAKISTAN",
      religion: "ISLAM",
      admittedClass: "PLAY",
      admittedSection: "A",
      rollNoAdmitted: "5",
    },
    {
      id: 2,
      rollNo: 4,
      name: "GHAZALA ASGHAR",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024)",
      section: "A",
      fatherCell: "03336308274",
      campus: "Future Grooming School",
      familyNo: 1,
      bForm: "31101000000000",
      gender: "Female",
      admissionDate: "21-12-2024",
      dob: "01-12-2016",
      fatherCnic: "3110100000",
      cell: "03336308274",
      residency: "BAHAWALPUR, PAKISTAN",
      status: "Active",
      user: "Aitzaz Wattoo",
      nameUrdu: "",
      fatherUrdu: "",
      fatherOccupation: "LAND LORD",
      dobWords: "",
      lastSchool: "",
      permanentAddress: "BAHAWALPUR, PAKISTAN",
      religion: "ISLAM",
      admittedClass: "PLAY",
      admittedSection: "A",
      rollNoAdmitted: "4",
    },
    {
      id: 3,
      rollNo: 3,
      name: "HUMERA ASGHAR",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024)",
      section: "A",
      fatherCell: "03336308274",
      campus: "Future Grooming School",
      familyNo: 1,
      bForm: "31101000000000",
      gender: "Female",
      admissionDate: "21-12-2024",
      dob: "21-12-2024",
      fatherCnic: "3110100000",
      cell: "03336308274",
      residency: "BAHAWALPUR, PAKISTAN",
      status: "Active",
      user: "Aitzaz Wattoo",
      nameUrdu: "",
      fatherUrdu: "",
      fatherOccupation: "LAND LORD",
      dobWords: "",
      lastSchool: "",
      permanentAddress: "BAHAWALPUR, PAKISTAN",
      religion: "ISLAM",
      admittedClass: "PLAY",
      admittedSection: "A",
      rollNoAdmitted: "3",
    },
    {
      id: 4,
      rollNo: 2,
      name: "ALI RAZA",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024)",
      section: "A",
      fatherCell: "03336308274",
      campus: "Future Grooming School",
      familyNo: 1,
      bForm: "31101000000000",
      gender: "Male",
      admissionDate: "21-12-2024",
      dob: "10-03-1992",
      fatherCnic: "3110100000",
      cell: "03336308274",
      residency: "BAHAWALPUR, PAKISTAN",
      status: "Active",
      user: "Aitzaz Wattoo",
      nameUrdu: "",
      fatherUrdu: "",
      fatherOccupation: "LAND LORD",
      dobWords: "",
      lastSchool: "",
      permanentAddress: "BAHAWALPUR, PAKISTAN",
      religion: "ISLAM",
      admittedClass: "PLAY",
      admittedSection: "A",
      rollNoAdmitted: "2",
    },
    {
      id: 5,
      rollNo: 1,
      name: "AITZAZ HASSAN",
      father: "MUSHTAQ WATTOO",
      class: "PLAY (2024)",
      section: "A",
      fatherCell: "03336308274",
      campus: "Future Grooming School",
      familyNo: 1,
      bForm: "31101000000000",
      gender: "Male",
      admissionDate: "21-12-2024",
      dob: "15-04-1995",
      fatherCnic: "3110100000",
      cell: "03336308274",
      residency: "BAHAWALPUR, PAKISTAN",
      status: "Active",
      user: "Aitzaz Wattoo",
      nameUrdu: "",
      fatherUrdu: "",
      fatherOccupation: "LAND LORD",
      dobWords: "",
      lastSchool: "",
      permanentAddress: "BAHAWALPUR, PAKISTAN",
      religion: "ISLAM",
      admittedClass: "PLAY",
      admittedSection: "A",
      rollNoAdmitted: "1",
    },
  ])

  const handlePrint = (student) => {
    setSelectedStudent(student)
    setShowPrintModal(true)
  }

  // Filter students based on search term and selected filter
  const filteredStudents = students.filter((student) => {
    const searchTermLower = searchTerm.toLowerCase()

    if (searchFilter === "All Fields") {
      return Object.values(student).some((value) => value.toString().toLowerCase().includes(searchTermLower))
    } else if (searchFilter === "Sr. No") {
      return student.id.toString().toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Roll No") {
      return student.rollNo.toString().toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Name") {
      return student.name.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Father") {
      return student.father.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Class") {
      return student.class.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Section") {
      return student.section.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Father CELL") {
      return student.fatherCell.toLowerCase().includes(searchTermLower)
    } else if (searchFilter === "Campus") {
      return student.campus.toLowerCase().includes(searchTermLower)
    }

    return false // Default to not including the student if the filter is not recognized
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
              <h1 className="text-xl font-semibold">Student Information</h1>
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
                  <option>Roll No</option>
                  <option>Name</option>
                  <option>Father</option>
                  <option>Class</option>
                  <option>Section</option>
                  <option>Father CELL</option>
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
                    Roll No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Father
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Father CELL
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Campus
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Admission Form
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.rollNo}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.father}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.class}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.section}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.fatherCell}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">{student.campus}</td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => handlePrint(student)}
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors font-medium"
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                      {searchTerm ? "No matching students found" : "No students available"}
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
                {filteredStudents.length > 0
                  ? `Showing ${filteredStudents.length} of ${students.length} entries`
                  : "No entries to show"}
              </div>
            </div>
          </div>
        </div>

        {/* Print Modal */}
        {showPrintModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800">Admission Form Print</h3>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Print Content */}
              <div className="p-6 bg-white">
                {/* Header Section */}
                <div className="border-2 border-gray-400 mb-4">
                  <table className="w-full border-collapse">
                    <tr>
                      <td className="border border-gray-400 p-4 w-32">
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            <span className="text-xs">
                              Tech Minds
                              <br />
                              Bahawalpur
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-400 p-4 text-center">
                        <div className="font-bold text-lg underline">TECH MINDS SCHOOL</div>
                        <div className="font-bold text-lg underline">BWN</div>
                        <div className="mt-2 font-semibold">BAHAWALPUR, PAKISTAN</div>
                        <div className="mt-1">03166758694</div>
                      </td>
                      <td className="border border-gray-400 p-4 w-32">
                        <div className="flex items-center justify-center">
                          <div className="w-20 h-24 bg-gray-200 border border-gray-400 flex items-center justify-center">
                            <span className="text-4xl">🎓</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

                {/* Student Information Table */}
                <div className="border border-gray-400 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold w-1/3">
                        Name of Candidate In English
                      </td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.name}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">
                        Name of Candidate In Urdu
                      </td>
                      <td className="border border-gray-400 p-2">{selectedStudent.nameUrdu}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Father Name In English</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.father}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Father Name In Urdu</td>
                      <td className="border border-gray-400 p-2">{selectedStudent.fatherUrdu}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Father CNIC Card No</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.fatherCnic}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Student Bey Form No</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.bForm}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Father Occupation</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.fatherOccupation}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Date of Birth in Figure</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.dob}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Date of Birth in Words</td>
                      <td className="border border-gray-400 p-2">{selectedStudent.dobWords}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Last School Attendent</td>
                      <td className="border border-gray-400 p-2">{selectedStudent.lastSchool}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Present Address</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.residency}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Permanent Address</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.permanentAddress}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Religion</td>
                      <td className="border border-gray-400 p-2 font-semibold w-1/4">{selectedStudent.religion}</td>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold w-1/4">Telephone No.</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.cell}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">
                        Class in which admission is sought
                      </td>
                      <td className="border border-gray-400 p-2 font-semibold w-1/4">
                        {selectedStudent.admittedClass}
                      </td>
                      <td className="border border-gray-400 p-2 font-semibold w-1/4">
                        {selectedStudent.admittedSection}
                      </td>
                    </tr>
                  </table>
                </div>

                {/* Birth Certificate Note */}
                <div className="text-sm mb-4 p-2 border border-gray-400">
                  (Attach birth Certificate in case of Play / Nursery)
                </div>

                {/* Under Taking Section */}
                <div className="mb-4">
                  <div className="font-bold text-center underline mb-2">Under Taking By The Parents</div>
                  <div className="text-sm text-justify leading-relaxed border border-gray-400 p-3">
                    I have read the prospectus of TECH MINDS SCHOOL BWN and hereby undertake that my son/daughter will
                    follow the rules and regulations of the institute promulgated here by the authorities and also
                    undertake that as students of RIPHAH INTERNATIONAL UNIVERSITY He/She will do nothing inside or
                    outside of School premises that will interfere with the administration and discipline of the School
                    and I/he/she will abide by decision of principal. In case, He/She is found guilty of indiscipline
                    defamation and disrespect to teaching staff and involve in other anti institutional activities,
                    He/She will be expelled.
                  </div>
                </div>

                {/* Signature Section */}
                <div className="border border-gray-400 mb-4">
                  <table className="w-full border-collapse text-sm">
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold w-1/4">Signature</td>
                      <td className="border border-gray-400 p-2 h-12"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Name</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.father}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Address</td>
                      <td className="border border-gray-400 p-2 font-semibold">{selectedStudent.residency}</td>
                    </tr>
                  </table>
                </div>

                {/* Office Use Only Section */}
                <div className="mb-4">
                  <div className="font-bold text-center underline mb-2">FOR OFFICE USE ONLY</div>
                  <div className="border border-gray-400">
                    <table className="w-full border-collapse text-sm">
                      <tr>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Admitted In Class</td>
                        <td className="border border-gray-400 p-2 font-semibold w-1/4">
                          {selectedStudent.admittedClass}
                        </td>
                        <td className="border border-gray-400 p-2 font-semibold w-1/4">
                          {selectedStudent.admittedSection}
                        </td>
                        <td className="border border-gray-400 p-2 font-semibold w-1/4">
                          {selectedStudent.rollNoAdmitted}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">
                          Fee Received Vide Receipt No
                        </td>
                        <td className="border border-gray-400 p-2 h-8" colSpan="3"></td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Office Suprintendent</td>
                        <td className="border border-gray-400 p-2 h-8"></td>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Class Teacher</td>
                        <td className="border border-gray-400 p-2 h-8"></td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Account Clerk</td>
                        <td className="border border-gray-400 p-2 h-8"></td>
                        <td className="border border-gray-400 p-2 bg-gray-100 font-semibold">Principal</td>
                        <td className="border border-gray-400 p-2 h-8"></td>
                      </tr>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-right text-sm mb-2">
                  {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  Copyright © 2024 <span className="text-blue-600 font-semibold">Tech Minds BWN</span>. All rights
                  reserved.
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Print
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
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
