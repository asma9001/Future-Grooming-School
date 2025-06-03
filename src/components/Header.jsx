"use client"

import { Menu, MessageCircle, Bell, User } from "lucide-react"

import SearchBar from "../components/ui/search-bar"
import NotificationBadge from "../components/ui/notification-badge"

export default function Header({
  selectedSchool,
  setSelectedSchool,
  selectedLanguage,
  setSelectedLanguage,
  toggleSidebar,
}) {
  return (
    <header className="bg-slate-700 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* <Logo /> */}
          <Menu className="w-6 h-6 cursor-pointer hover:text-slate-300 transition-colors" onClick={toggleSidebar} />
        </div>

        {/* Center section */}
        <div className="flex items-center space-x-4">
          <SearchBar placeholder="Search Student By Name" />

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white text-gray-800 px-3 py-2 rounded"
          >
            <option>English</option>
            <option>Urdu</option>
          </select>

          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="bg-white text-gray-800 px-3 py-2 rounded"
          >
            <option>Future Grooming School</option>
          </select>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <NotificationBadge Icon={MessageCircle} count={1} color="bg-red-500" />
          <NotificationBadge Icon={Bell} count={1} color="bg-yellow-500" />
          <User className="w-6 h-6" />
        </div>
      </div>

      {/* Navigation */}
      {/* <Navbar /> */}
    </header>
  )
}
