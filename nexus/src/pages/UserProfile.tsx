"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom"
import { LayoutDashboard, Settings, Edit, LogOut, BookOpen, Heart, MessageSquare } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import Dashboard from "./user/Dashboard"
import UserSettings from "./user/Settings"
import Editor from "./user/Editor"

const UserProfile = () => {
  const location = useLocation()
  const [notifications, setNotifications] = useState(3)

  const sidebarItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      name: "Dashboard",
      path: "/profile/dashboard",
    },
    {
      icon: <Edit className="h-5 w-5" />,
      name: "Editor",
      path: "/profile/editor",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      name: "My Articles",
      path: "/profile/articles",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      name: "Favorites",
      path: "/profile/favorites",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      name: "Comments",
      path: "/profile/comments",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      name: "Settings",
      path: "/profile/settings",
    },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="w-[95%] mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6 pb-6 border-b">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-500 text-sm">john.doe@example.com</p>
              <div className="mt-2 flex items-center">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Author</Badge>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.name === "Dashboard" && notifications > 0 && (
                    <Badge className="ml-auto bg-red-500 hover:bg-red-600 text-white">{notifications}</Badge>
                  )}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/profile/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/articles" element={<div className="p-4">My Articles content</div>} />
              <Route path="/favorites" element={<div className="p-4">Favorites content</div>} />
              <Route path="/comments" element={<div className="p-4">Comments content</div>} />
              <Route path="*" element={<Navigate to="/profile/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
