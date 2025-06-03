"use client"

import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarOpen")
    if (savedSidebarState !== null) {
      setSidebarOpen(JSON.parse(savedSidebarState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarOpen
    setSidebarOpen(newState)
    // Save state to localStorage
    localStorage.setItem("sidebarOpen", JSON.stringify(newState))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white z-20 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div
        className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <Header
            toggleSidebar={toggleSidebar}
            selectedSchool="Future Grooming School"
            setSelectedSchool={() => {}}
            selectedLanguage="English"
            setSelectedLanguage={() => {}}
          />
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
