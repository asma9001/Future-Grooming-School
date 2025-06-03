"use client"

import { useState, useEffect } from "react"

export default function PublicMessage() {
  // State for Public Message For All form
  const [publicMessageAll, setPublicMessageAll] = useState({
    title: "",
    endDate: "",
    image: null,
    description: "",
  })

  // State for Public Message For Classes form
  const [publicMessageClasses, setPublicMessageClasses] = useState({
    title: "",
    endDate: "",
    image: null,
    section: "",
    description: "",
  })

  // State for messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "Message",
      section: "PLAY GROUP - PLAY - 2024 - A",
      title: "message",
      image: "",
      expiryDate: "26-May-2025",
      description: "fsdsds",
      date: "26-May-2025",
    },
    {
      id: 2,
      type: "Announcement",
      section: "All",
      title: "School Closure Notice",
      image: "",
      expiryDate: "30-May-2025",
      description: "School will remain closed on 31st May due to maintenance work.",
      date: "25-May-2025",
    },
    {
      id: 3,
      type: "Message",
      section: "PRIMARY - ONE - 2024 - A",
      title: "Exam Schedule",
      image: "",
      expiryDate: "15-Jun-2025",
      description: "Final exams will start from 20th June 2025.",
      date: "28-May-2025",
    },
  ])

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMessages, setFilteredMessages] = useState(messages)

  // Section options
  const sectionOptions = [
    "PLAY GROUP - PLAY - 2024 - A",
    "PLAY GROUP - NURSERY - 2024 - A",
    "PLAY GROUP - PREP - 2024 - A",
    "PRIMARY - ONE - 2024 - A",
    "PRIMARY - TWO - 2024 - A",
    "MIDDLE - 16710 - 2024 - 16710",
  ]

  // Handle Public Message For All form input changes
  const handleAllInputChange = (e) => {
    const { name, value } = e.target
    setPublicMessageAll({
      ...publicMessageAll,
      [name]: value,
    })
  }

  // Handle Public Message For Classes form input changes
  const handleClassesInputChange = (e) => {
    const { name, value } = e.target
    setPublicMessageClasses({
      ...publicMessageClasses,
      [name]: value,
    })
  }

  // Handle image upload for Public Message For All
  const handleAllImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPublicMessageAll({
        ...publicMessageAll,
        image: file,
      })
    }
  }

  // Handle image upload for Public Message For Classes
  const handleClassesImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPublicMessageClasses({
        ...publicMessageClasses,
        image: file,
      })
    }
  }

  // Handle Public Message For All form submission
  const handleAllSubmit = (e) => {
    e.preventDefault()

    // Create new message
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map((message) => message.id)) + 1 : 1,
      type: "Announcement",
      section: "All",
      title: publicMessageAll.title,
      image: publicMessageAll.image ? URL.createObjectURL(publicMessageAll.image) : "",
      expiryDate: formatDate(publicMessageAll.endDate),
      description: publicMessageAll.description,
      date: formatDate(new Date().toISOString().split("T")[0]),
    }

    // Add to messages data
    setMessages([...messages, newMessage])

    // Reset form
    setPublicMessageAll({
      title: "",
      endDate: "",
      image: null,
      description: "",
    })

    // Show success message
    alert("Public message for all added successfully!")
  }

  // Handle Public Message For Classes form submission
  const handleClassesSubmit = (e) => {
    e.preventDefault()

    // Create new message
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map((message) => message.id)) + 1 : 1,
      type: "Message",
      section: publicMessageClasses.section,
      title: publicMessageClasses.title,
      image: publicMessageClasses.image ? URL.createObjectURL(publicMessageClasses.image) : "",
      expiryDate: formatDate(publicMessageClasses.endDate),
      description: publicMessageClasses.description,
      date: formatDate(new Date().toISOString().split("T")[0]),
    }

    // Add to messages data
    setMessages([...messages, newMessage])

    // Reset form
    setPublicMessageClasses({
      title: "",
      endDate: "",
      image: null,
      section: "",
      description: "",
    })

    // Show success message
    alert("Public message for class added successfully!")
  }

  // Format date from YYYY-MM-DD to DD-MMM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }

  // Filter messages based on search
  useEffect(() => {
    let results = messages

    if (searchTerm) {
      const searchValue = searchTerm.toLowerCase()
      results = results.filter(
        (message) =>
          message.type.toLowerCase().includes(searchValue) ||
          message.section.toLowerCase().includes(searchValue) ||
          message.title.toLowerCase().includes(searchValue) ||
          message.description.toLowerCase().includes(searchValue) ||
          message.expiryDate.toLowerCase().includes(searchValue) ||
          message.date.toLowerCase().includes(searchValue),
      )
    }

    setFilteredMessages(results)
  }, [searchTerm, messages])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-700 text-sm font-bold">→</span>
        </div>
        <h1 className="text-lg font-medium">Public Message</h1>
      </div>

      <div className="p-6 bg-gray-100 space-y-6">
        {/* Public Message For All Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-500 text-white p-3">
            <h2 className="text-lg font-medium">Public Message For All</h2>
          </div>
          <form onSubmit={handleAllSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={publicMessageAll.title}
                  onChange={handleAllInputChange}
                  placeholder="--Title--"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={publicMessageAll.endDate}
                  onChange={handleAllInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAllImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
              <textarea
                name="description"
                value={publicMessageAll.description}
                onChange={handleAllInputChange}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Public Message For Classes Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-500 text-white p-3">
            <h2 className="text-lg font-medium">Public Message For Classes</h2>
          </div>
          <form onSubmit={handleClassesSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={publicMessageClasses.title}
                  onChange={handleClassesInputChange}
                  placeholder="--Title--"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={publicMessageClasses.endDate}
                  onChange={handleClassesInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleClassesImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Section:</label>
                <select
                  name="section"
                  value={publicMessageClasses.section}
                  onChange={handleClassesInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Section</option>
                  {sectionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                <textarea
                  name="description"
                  value={publicMessageClasses.description}
                  onChange={handleClassesInputChange}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold text-gray-800">Public Messages</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{message.section}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {message.image ? (
                          <img
                            src={message.image || "/placeholder.svg"}
                            alt={message.title}
                            className="h-10 w-10 object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{message.expiryDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{message.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{message.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500">
            Showing 1 to {filteredMessages.length} of {messages.length} rows
          </div>
        </div>
      </div>
    </div>
  )
}
