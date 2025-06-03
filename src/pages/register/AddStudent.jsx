"use client";

import { useState } from "react";
import axios from "axios"; // Make sure axios is installed
import constant from '/constant';
const printStyles = `
  @media print {
    body * { visibility: hidden; }
    .print-modal-content, .print-modal-content * { visibility: visible; }
    .print-modal-content {
      position: absolute;
      left: 0; top: 0; width: 100%; height: 100%; padding: 0; margin: 0;
    }
    .print-modal-header, .print-modal-footer, .print-buttons { display: none !important; }
    .print-modal-body { padding: 0; margin: 0; }
    table { page-break-inside: avoid; }
    @page { size: A4; margin: 10mm; }
    .print-form { font-size: 10pt; line-height: 1.2; }
    .print-form td { padding: 2px 4px; }
    .print-form .signature-row { height: 30px; }
    .print-form .small-text { font-size: 9pt; }
  }
`;

export default function AddStudent() {
  // ... state variables (as you posted), unchanged ...
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [students, setStudents] = useState([
    // ... (your hardcoded students for demo) ...
  ]);

  const [formData, setFormData] = useState({
    fatherCnic: "",
    fatherCell: "",
    siblingsList: "",
    name: "",
    nameUrdu: "",
    father: "",
    fatherUrdu: "",
    dobWords: "",
    bForm: "",
    contactNo: "",
    gender: "",
    email: "",
    address: "",
    hobby: "",
    religion: "",
    studentCategory: "",
    noInSiblings: "",
    familyNo: "",
    relationWithStudent: "",
    guardianCnic: "",
    guardianContact: "",
    occupation: "",
    monthlyIncome: "",
    permanentAddress: "",
    programName: "",
    departmentName: "",
    className: "",
    classYearName: "",
    sectionName: "",
    rollNo: "",
    bFormRemarks: "",
    fatherCnicRemarks: "",
    birthCertificateRemarks: "",
    feesAttachment: "",
    feeMonth: "",
    feePolicy: "",
    otherFeeNeeded: "",
    otherFee: "",
    admissionFeeAmount: "",
    annualFundAmount: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrint = (student) => {
    setSelectedStudent(student);
    setShowPrintModal(true);
  };

  // --- UPDATED handleSubmit for API integration ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Build the student payload as per your backend schema
    const payload = {
      name: formData.name,
      nameInUrdu: formData.nameUrdu,
      fatherName: formData.father,
      fatherNameInUrdu: formData.fatherUrdu,
      dateOfBirth: dateOfBirth,
      dateOfBirthWords: formData.dobWords,
      contactNo: formData.contactNo,
      bFormNo: formData.bForm,
      email: formData.email,
      gender: formData.gender,
      currentAddress: formData.address,
      religion: formData.religion,
      caste: "", // Add if needed
      hobby: formData.hobby,
      studentCategory: formData.studentCategory,
      familyNo: formData.familyNo,
      noOfSiblings: formData.noInSiblings,
      guardian: {
        relation: formData.relationWithStudent,
        contact: formData.guardianContact,
        monthlyIncome: formData.monthlyIncome,
        cnic: formData.guardianCnic,
        occupation: formData.occupation,
        permanentAddress: formData.permanentAddress,
      },
      admission: {
        programName: formData.programName,
        departmentName: formData.departmentName,
        className: formData.className,
        classYearName: formData.classYearName,
        classYear: "", // Add if needed
        sectionName: formData.sectionName,
        rollNo: formData.rollNo,
        joiningDate: joiningDate,
      },
      checklist: {
        bForm: !!formData.bForm,
        bFormRemarks: formData.bFormRemarks,
        fatherCnic: !!formData.fatherCnic,
        fatherCnicRemarks: formData.fatherCnicRemarks,
        birthCertificate: false,
        birthCertificateRemarks: formData.birthCertificateRemarks,
      },
      fee: {
        isFeeAttachmentNeeded: formData.feesAttachment === "Yes",
        feeMonth: formData.feeMonth,
        dueDate: dueDate,
        feePolicy: formData.feePolicy,
        expiryDate: expiryDate,
      },
      extraFee: {
        isOtherFeeNeeded: formData.otherFeeNeeded === "Yes",
        items: [
          {
            title: "Admission Fee",
            amount: Number(formData.admissionFeeAmount) || 0,
          },
          {
            title: "Annual Fund",
            amount: Number(formData.annualFundAmount) || 0,
          },
        ],
      },
    };

    try {
      // Replace below with your actual backend endpoint if different
      const res = await axios.post(`${constant.apiUrl}/students/`, payload);
      if (res.data.success) {
        setStudents([...students, res.data.student]);
        alert("Student added successfully!");
        setFormData({
          fatherCnic: "",
          fatherCell: "",
          siblingsList: "",
          name: "",
          nameUrdu: "",
          father: "",
          fatherUrdu: "",
          dobWords: "",
          bForm: "",
          contactNo: "",
          gender: "",
          email: "",
          address: "",
          hobby: "",
          religion: "",
          studentCategory: "",
          noInSiblings: "",
          familyNo: "",
          relationWithStudent: "",
          guardianCnic: "",
          guardianContact: "",
          occupation: "",
          monthlyIncome: "",
          permanentAddress: "",
          programName: "",
          departmentName: "",
          className: "",
          classYearName: "",
          sectionName: "",
          rollNo: "",
          bFormRemarks: "",
          fatherCnicRemarks: "",
          birthCertificateRemarks: "",
          feesAttachment: "",
          feeMonth: "",
          feePolicy: "",
          otherFeeNeeded: "",
          otherFee: "",
          admissionFeeAmount: "",
          annualFundAmount: "",
        });
        setDateOfBirth("");
        setJoiningDate("");
        setDueDate("");
        setExpiryDate("");
      } else {
        setError(res.data.message || "Failed to add student");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filter function based on selected filter type
  const filteredStudents = students.filter((student) => {
    if (!searchTerm) return true;

    const searchValue = searchTerm.toLowerCase();

    switch (searchFilter) {
      case "srNo":
        return student.id.toString().includes(searchValue);
      case "familyNo":
        return student.familyNo.toString().includes(searchValue);
      case "rollNo":
        return student.rollNo.toString().includes(searchValue);
      case "name":
        return student.name.toLowerCase().includes(searchValue);
      case "father":
        return student.father.toLowerCase().includes(searchValue);
      case "class":
        return student.class.toLowerCase().includes(searchValue);
      case "section":
        return student.section.toLowerCase().includes(searchValue);
      case "bForm":
        return student.bForm.toLowerCase().includes(searchValue);
      case "gender":
        return student.gender.toLowerCase().includes(searchValue);
      case "fatherCnic":
        return student.fatherCnic.toLowerCase().includes(searchValue);
      case "cell":
        return student.cell.toLowerCase().includes(searchValue);
      case "status":
        return student.status.toLowerCase().includes(searchValue);
      case "all":
      default:
        return Object.values(student).some((value) =>
          value.toString().toLowerCase().includes(searchValue)
        );
    }
  });

  // Add this right after the return statement, before the first div
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header ... */}
        <div className="bg-slate-700 text-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <span className="text-4xl">🎓</span>
            Student Admission
          </h1>
        </div>

        {/* SHOW ERROR/LOADING */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {loading && <div className="text-blue-500 mb-2">Saving...</div>}

        <form onSubmit={handleSubmit}>
          {/* Search Section */}
          <div className="mb-1 bg-slate-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-xl">🔍</span>
              Search By (Auto-Fill Relevant Data)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="father-cnic"
                  className="block text-sm font-medium mb-2"
                >
                  Father CNIC
                </label>
                <input
                  id="father-cnic"
                  type="text"
                  placeholder="--CNIC--"
                  value={formData.fatherCnic}
                  onChange={(e) =>
                    handleInputChange("fatherCnic", e.target.value)
                  }
                  className="w-full p-3 rounded border-0 bg-white/90 focus:bg-white text-gray-900 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="father-cell"
                  className="block text-sm font-medium mb-2"
                >
                  Father CELL NO
                </label>
                <input
                  id="father-cell"
                  type="text"
                  placeholder="--Cell NO--"
                  value={formData.fatherCell}
                  onChange={(e) =>
                    handleInputChange("fatherCell", e.target.value)
                  }
                  className="w-full p-3 rounded border-0 bg-white/90 focus:bg-white text-gray-900 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="siblings-list"
                  className="block text-sm font-medium mb-2"
                >
                  Siblings List:
                </label>
                <input
                  id="siblings-list"
                  type="text"
                  value={formData.siblingsList}
                  onChange={(e) =>
                    handleInputChange("siblingsList", e.target.value)
                  }
                  className="w-full p-3 rounded border-0 bg-white/90 focus:bg-white text-gray-900 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Student Information Section */}
          <div className="mb-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2 pb-3 border-b border-gray-200">
              <span className="text-xl">👤</span>
              Student Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="--Name--"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="father"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Father: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="father"
                    type="text"
                    placeholder="--Father Name--"
                    value={formData.father}
                    onChange={(e) =>
                      handleInputChange("father", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Date Of Birth: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="b-form"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    B-Form / CNIC: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="b-form"
                    type="text"
                    placeholder="--B Form--"
                    value={formData.bForm}
                    onChange={(e) => handleInputChange("bForm", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Gender: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Current Address: <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    placeholder="--Address--"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors min-h-[80px]"
                    required
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="religion"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Religion / Caste:
                  </label>
                  <input
                    id="religion"
                    type="text"
                    placeholder="--Religion / Caste--"
                    value={formData.religion}
                    onChange={(e) =>
                      handleInputChange("religion", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="no-siblings"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    No In Siblings: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="no-siblings"
                    value={formData.noInSiblings}
                    onChange={(e) =>
                      handleInputChange("noInSiblings", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name-urdu"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name In Urdu:
                  </label>
                  <input
                    id="name-urdu"
                    type="text"
                    placeholder="--Name Urdu--"
                    value={formData.nameUrdu}
                    onChange={(e) =>
                      handleInputChange("nameUrdu", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="father-urdu"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Father Name In Urdu:
                  </label>
                  <input
                    id="father-urdu"
                    type="text"
                    placeholder="--Father Urdu--"
                    value={formData.fatherUrdu}
                    onChange={(e) =>
                      handleInputChange("fatherUrdu", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob-words"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Date Of Birth In Words:
                  </label>
                  <input
                    id="dob-words"
                    type="text"
                    placeholder="--Date Of Birth In Words--"
                    value={formData.dobWords}
                    onChange={(e) =>
                      handleInputChange("dobWords", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Contact No: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact"
                    type="text"
                    placeholder="--Cell NO--"
                    value={formData.contactNo}
                    onChange={(e) =>
                      handleInputChange("contactNo", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. example@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hobby"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Hobby:
                  </label>
                  <input
                    id="hobby"
                    type="text"
                    placeholder="--Hobby--"
                    value={formData.hobby}
                    onChange={(e) => handleInputChange("hobby", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-category"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Student Category: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="student-category"
                    value={formData.studentCategory}
                    onChange={(e) =>
                      handleInputChange("studentCategory", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Regular">Regular</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Special Needs">Special Needs</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="family-no"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Family No: <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="family-no"
                    type="text"
                    placeholder="1"
                    value={formData.familyNo}
                    onChange={(e) =>
                      handleInputChange("familyNo", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Parents / Guardian Record */}
          <div className="mb-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2 pb-3 border-b border-gray-200">
              <span className="text-xl">👪</span>
              Parents / Guardian Record
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="relation"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Relation With Student:{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="relation"
                    value={formData.relationWithStudent}
                    onChange={(e) =>
                      handleInputChange("relationWithStudent", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="guardian-contact"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Contact:
                  </label>
                  <input
                    id="guardian-contact"
                    type="text"
                    placeholder="--Phone NO--"
                    value={formData.guardianContact}
                    onChange={(e) =>
                      handleInputChange("guardianContact", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="monthly-income"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Monthly Income:
                  </label>
                  <input
                    id="monthly-income"
                    type="text"
                    placeholder="--Monthly Income--"
                    value={formData.monthlyIncome}
                    onChange={(e) =>
                      handleInputChange("monthlyIncome", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guardian-cnic"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    CNIC:
                  </label>
                  <input
                    id="guardian-cnic"
                    type="text"
                    placeholder="--CNIC--"
                    value={formData.guardianCnic}
                    onChange={(e) =>
                      handleInputChange("guardianCnic", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Occupation:
                  </label>
                  <input
                    id="occupation"
                    type="text"
                    placeholder="--Occupation--"
                    value={formData.occupation}
                    onChange={(e) =>
                      handleInputChange("occupation", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="permanent-address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Permanent Address:
                  </label>
                  <textarea
                    id="permanent-address"
                    placeholder="--Address--"
                    value={formData.permanentAddress}
                    onChange={(e) =>
                      handleInputChange("permanentAddress", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors min-h-[80px]"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Information */}
          <div className="mb-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2 pb-3 border-b border-gray-200">
              <span className="text-xl">🎓</span>
              Admission
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="program-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Program Name: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="program-name"
                    value={formData.programName}
                    onChange={(e) =>
                      handleInputChange("programName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Primary">Primary</option>
                    <option value="Middle">Middle</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Higher Secondary">Higher Secondary</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="class-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Class Name: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="class-name"
                    value={formData.className}
                    onChange={(e) =>
                      handleInputChange("className", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="PLAY">PLAY</option>
                    <option value="NURSERY">NURSERY</option>
                    <option value="KG">KG</option>
                    <option value="CLASS 1">CLASS 1</option>
                    <option value="CLASS 2">CLASS 2</option>
                    <option value="CLASS 3">CLASS 3</option>
                    <option value="CLASS 4">CLASS 4</option>
                    <option value="CLASS 5">CLASS 5</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="section-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Section Name:
                  </label>
                  <select
                    id="section-name"
                    value={formData.sectionName}
                    onChange={(e) =>
                      handleInputChange("sectionName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  >
                    <option value="">--Select--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="joining-date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Joining Date:
                  </label>
                  <input
                    id="joining-date"
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="department-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Department Name: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="department-name"
                    value={formData.departmentName}
                    onChange={(e) =>
                      handleInputChange("departmentName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="class-year"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Class Year Name: <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="class-year"
                    value={formData.classYearName}
                    onChange={(e) =>
                      handleInputChange("classYearName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  >
                    <option value="">--Select--</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="roll-no"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Roll No:
                  </label>
                  <input
                    id="roll-no"
                    type="text"
                    placeholder="--Roll No--"
                    value={formData.rollNo}
                    onChange={(e) =>
                      handleInputChange("rollNo", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Checklist Record */}
          <div className="mb-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2 pb-3 border-b border-gray-200">
              <span className="text-xl">✅</span>
              Checklist Record
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check List:
                  </label>
                  <input
                    type="text"
                    value="B-Form"
                    readOnly
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remarks:
                  </label>
                  <input
                    type="text"
                    placeholder="--Remarks--"
                    value={formData.bFormRemarks}
                    onChange={(e) =>
                      handleInputChange("bFormRemarks", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check List:
                  </label>
                  <input
                    type="text"
                    value="Father CNIC"
                    readOnly
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remarks:
                  </label>
                  <input
                    type="text"
                    placeholder="--Remarks--"
                    value={formData.fatherCnicRemarks}
                    onChange={(e) =>
                      handleInputChange("fatherCnicRemarks", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check List:
                  </label>
                  <input
                    type="text"
                    value="Birth Certificate"
                    readOnly
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remarks:
                  </label>
                  <input
                    type="text"
                    placeholder="--Remarks--"
                    value={formData.birthCertificateRemarks}
                    onChange={(e) =>
                      handleInputChange(
                        "birthCertificateRemarks",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2 pb-3 border-b border-gray-200">
              <span className="text-xl">💰</span>
              Fee
            </h2>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="fees-attachment"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Fees Attachment Needed or Not?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="fees-attachment"
                  value={formData.feesAttachment}
                  onChange={(e) =>
                    handleInputChange("feesAttachment", e.target.value)
                  }
                  className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fee-month"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Fee Month:
                    </label>
                    <select
                      id="fee-month"
                      value={formData.feeMonth}
                      onChange={(e) =>
                        handleInputChange("feeMonth", e.target.value)
                      }
                      className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    >
                      <option value="">--Select--</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="due-date"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Due Date:
                    </label>
                    <input
                      id="due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fee-policy"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Fee Policy:
                    </label>
                    <select
                      id="fee-policy"
                      value={formData.feePolicy}
                      onChange={(e) =>
                        handleInputChange("feePolicy", e.target.value)
                      }
                      className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    >
                      <option value="">--Select--</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Bi-Annual">Bi-Annual</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="expiry-date"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Expiry Date:
                    </label>
                    <input
                      id="expiry-date"
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Extra Fee */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                  <span className="text-lg">➕</span>
                  Extra Fee - Depends upon above Fee
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="other-fee-needed"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Other Fee Needed or Not?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="other-fee-needed"
                      value={formData.otherFeeNeeded}
                      onChange={(e) =>
                        handleInputChange("otherFeeNeeded", e.target.value)
                      }
                      className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Other Fee:
                      </label>
                      <input
                        type="text"
                        value="Admission Fee"
                        readOnly
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fee:
                      </label>
                      <input
                        type="text"
                        placeholder="--Fee--"
                        value={formData.admissionFeeAmount}
                        onChange={(e) =>
                          handleInputChange(
                            "admissionFeeAmount",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Other Fee:
                      </label>
                      <input
                        type="text"
                        value="Annual Fund"
                        readOnly
                        className="w-full p-3 bg-gray-100 border border-gray-200 rounded cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fee:
                      </label>
                      <input
                        type="text"
                        placeholder="--Fee--"
                        value={formData.annualFundAmount}
                        onChange={(e) =>
                          handleInputChange("annualFundAmount", e.target.value)
                        }
                        className="w-full p-3 border border-gray-200 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="reset"
              className="px-8 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span className="text-lg">👥</span>
              Add Student
            </button>
          </div>
        </form>

        {/* Student Records Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-xl">📋</span>
                Student Records
              </h2>

              {/* Enhanced Search Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="search-filter"
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Filter by:
                  </label>
                  <select
                    id="search-filter"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="px-3 py-2 rounded border-0 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                  >
                    <option value="all">All Fields</option>
                    <option value="srNo">Sr. No</option>
                    <option value="familyNo">Family No</option>
                    <option value="rollNo">Roll No</option>
                    <option value="name">Name</option>
                    <option value="father">Father</option>
                    <option value="class">Class</option>
                    <option value="section">Section</option>
                    <option value="bForm">B-Form</option>
                    <option value="gender">Gender</option>
                    <option value="fatherCnic">Father CNIC</option>
                    <option value="cell">Cell</option>
                    <option value="status">Status</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Search ${
                      searchFilter === "all" ? "all fields" : searchFilter
                    }...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 rounded border-0 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-64"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-2 py-2 bg-blue-700 hover:bg-blue-800 rounded text-white text-sm transition-colors"
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="mt-3 text-sm bg-blue-600 bg-opacity-50 px-3 py-2 rounded">
                {filteredStudents.length > 0 ? (
                  <>
                    Found {filteredStudents.length} student
                    {filteredStudents.length !== 1 ? "s" : ""}
                    {searchFilter !== "all" && ` in ${searchFilter}`}
                    matching "{searchTerm}"
                  </>
                ) : (
                  <>
                    No students found matching "{searchTerm}"{" "}
                    {searchFilter !== "all" && `in ${searchFilter}`}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Sr #
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Print
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Family No
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Roll No
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Father
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Section
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Student B-Form
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Admission Date
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    DOB
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Father CNIC
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    CELL
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Father CELL
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Residency
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">
                    Campus
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-3">{student.id}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handlePrint(student)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                        >
                          Print
                        </button>
                      </td>
                      <td className="px-4 py-3">{student.familyNo}</td>
                      <td className="px-4 py-3">{student.admission.rollNo}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">{student.fatherName}</td>
                      <td className="px-4 py-3">{student.admission.className}</td>
                      <td className="px-4 py-3">{student.admission.sectionName}</td>
                      <td className="px-4 py-3">{student.bForm}</td>
                      <td className="px-4 py-3">{student.gender}</td>
                      <td className="px-4 py-3">{student.admission.joiningDate}</td>
                      <td className="px-4 py-3">{student.dateOfBirth}</td>
                      <td className="px-4 py-3">{student.guardian.cnic}</td>
                      <td className="px-4 py-3">{student.cell}</td>
                      <td className="px-4 py-3">{student.fatherCell}</td>
                      <td className="px-4 py-3">{student.residency}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-200">
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{student.user}</td>
                      <td className="px-4 py-3">{student.campus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="19"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {searchTerm
                        ? "No students found matching your search criteria."
                        : "No students registered yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
            <span>
              Showing {filteredStudents.length > 0 ? "1" : "0"} to{" "}
              {filteredStudents.length} of {filteredStudents.length} rows
              {searchTerm &&
                ` (filtered from ${students.length} total students)`}
            </span>
            {filteredStudents.length > 0 && (
              <span className="text-blue-600 font-medium">
                Total Students: {students.length}
              </span>
            )}
          </div>
        </div>

        {/* Print Modal */}
        {showPrintModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-gray-50 print-modal-header">
                <h3 className="text-lg font-semibold text-gray-800">
                  Admission Form Print
                </h3>
                <div className="flex gap-3 print-buttons">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <span>🖨️</span> Print
                  </button>
                  <button
                    onClick={() => setShowPrintModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Print Content */}
              <div className="p-6 bg-white print-modal-content">
                <div className="print-modal-body print-form">
                  {/* Date in top right */}
                  <div className="text-xs text-right mb-1">
                    01/06/2025, 23:58
                  </div>

                  {/* Header Section */}
                  <div className="border border-gray-400 mb-2">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="border border-gray-400 p-1 text-center font-bold text-sm">
                            ADMISSION FORM
                          </td>
                          <td className="border border-gray-400 p-1 text-center font-bold text-sm">
                            SESSION
                          </td>
                          <td className="border border-gray-400 p-1 text-center font-bold text-sm">
                            2024 - 2025
                          </td>
                          <td className="border border-gray-400 p-1 text-center font-bold text-sm">
                            ADMISSION NO
                          </td>
                          <td className="border border-gray-400 p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 w-1/4">
                            <div className="flex items-center justify-center">
                              <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iI2ZmNzg0MyIvPjx0ZXh0IHg9IjQwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuM2VtIj5UZWNoIE1pbmRzPGJyLz5CYWhhd2FsbmFnYXI8L3RleHQ+PC9zdmc+"
                                alt="Future Grooming Logo"
                                className="w-16 h-16"
                              />
                            </div>
                          </td>
                          <td
                            className="border border-gray-400 p-1 text-center"
                            colSpan="3"
                          >
                            <div className="font-bold">
                              FUTURE GROOMING SCHOOL
                            </div>
                            <div className="text-xs">
                              BAHAWALNAGAR, PAKISTAN 03166758694
                            </div>
                          </td>
                          <td className="border border-gray-400 p-1">
                            <div className="flex items-center justify-center">
                              <div className="w-16 h-20 flex items-center justify-center">
                                <span className="text-3xl">🎓</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Student Information Table */}
                  <div className="border border-gray-400 mb-2">
                    <table className="w-full border-collapse text-xs">
                      <tbody>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold w-1/3">
                            Name of Candidate In English
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.name}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Name of Candidate In Urdu
                          </td>
                          <td className="border border-gray-400 p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Father Name In English
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.father}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Father Name In Urdu
                          </td>
                          <td className="border border-gray-400 p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Father CNIC Card No
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.fatherCnic}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Student Bey Form No
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.bForm}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Father Occupation
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.fatherOccupation || "LAND LORD"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Date of Birth in Figure
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.dob}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Date of Birth in Words
                          </td>
                          <td className="border border-gray-400 p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Last School Attendent
                          </td>
                          <td className="border border-gray-400 p-1"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Present Address
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.residency}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Permanent Address
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.permanentAddress}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Religion
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.religion}
                          </td>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Telephone No.
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.cell}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Class in which admission is sought
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.admittedClass}
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold text-center">
                            A
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="border border-gray-400 p-1 small-text"
                            colSpan="4"
                          >
                            (Attach birth Certificate in case of Play / Nursery)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Under Taking Section */}
                  <div className="mb-2">
                    <div className="font-bold text-xs mb-1">
                      Under Taking By The Parents
                    </div>
                    <div className="text-xs text-justify leading-tight border border-gray-400 p-1">
                      I have read the prospectus of FUTURE GROOMING SCHOOL and
                      hereby undertake that my son/daughter will follow the
                      rules and regulations of the institute promulgated here by
                      authorities and also undertake that as students of RPS.
                      He/She will do nothing inside or outside of School
                      premises that will interfere with the administration and
                      discipline of School and I/he/she will abide by decision
                      of principal. In case, He/She is found guilty of
                      indiscipline defamation and disrespect to teaching staff
                      and involve in other anti institutional activities, He/She
                      will be expelled.
                    </div>
                  </div>

                  {/* Signature Section */}
                  <div className="border border-gray-400 mb-2">
                    <table className="w-full border-collapse text-xs">
                      <tbody>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold w-1/4">
                            Signature
                          </td>
                          <td className="border border-gray-400 p-1 signature-row"></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Name
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.father}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                            Address
                          </td>
                          <td className="border border-gray-400 p-1 font-semibold">
                            {selectedStudent.residency}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Office Use Only Section */}
                  <div className="mb-2">
                    <div className="font-bold text-xs text-center mb-1">
                      FOR OFFICE USE ONLY
                    </div>
                    <div className="border border-gray-400">
                      <table className="w-full border-collapse text-xs">
                        <tbody>
                          <tr>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Admitted In Class
                            </td>
                            <td className="border border-gray-400 p-1 font-semibold text-center">
                              {selectedStudent.admittedClass}
                            </td>
                            <td className="border border-gray-400 p-1 font-semibold text-center">
                              A
                            </td>
                            <td className="border border-gray-400 p-1 font-semibold text-center">
                              {selectedStudent.rollNoAdmitted}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Fee Received Vide Receipt No
                            </td>
                            <td
                              className="border border-gray-400 p-1 signature-row"
                              colSpan="3"
                            ></td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Office Suprintendent
                            </td>
                            <td className="border border-gray-400 p-1 signature-row"></td>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Class Teacher
                            </td>
                            <td className="border border-gray-400 p-1 signature-row"></td>
                          </tr>
                          <tr>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Account Clerk
                            </td>
                            <td className="border border-gray-400 p-1 signature-row"></td>
                            <td className="border border-gray-400 p-1 bg-gray-100 font-semibold">
                              Principal
                            </td>
                            <td className="border border-gray-400 p-1 signature-row"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-right text-xs mb-1">Jan 02, 2025</div>

                  <div className="text-xs text-gray-500 mt-2 flex justify-between">
                    <div>
                      https://futuregroomingsbwn.com/school/ERP/users/admission/Student.php
                    </div>
                    <div>1/1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
