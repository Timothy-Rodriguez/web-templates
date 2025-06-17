"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Search, Bell } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "500", href: "/500" },
    { name: "401", href: "/401" },
    { name: "404", href: "/404" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white"
      }`}
    >
      <div className="mx-auto w-full max-w-[90%] px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo with animation */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              {/* Animated circles */}
              <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"></div>
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30"></div>

              {/* Main logo circle */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <div className="h-6 w-6 rounded-full bg-white opacity-90 animate-pulse"></div>
                <div className="absolute h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-spin"></div>
              </div>
            </div>
            <div
              className={`text-2xl font-bold ${isScrolled ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" : "text-white"}`}
            >
              Nexus
            </div>
          </Link>

          {/* Right side - Navigation and User Actions */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - moved to right */}
            <nav className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-300 relative ${
                    location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href))
                      ? `${isScrolled ? "text-blue-600" : "text-blue-300"} after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-blue-400`
                      : `${isScrolled ? "text-gray-700" : "text-white"}`
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              {isSearchOpen ? (
                <div className="relative hidden md:block">
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="w-[200px] lg:w-[300px] pr-8 border-blue-200 focus:border-blue-400"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hidden md:flex ${isScrolled ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white hover:text-blue-200 hover:bg-white/10"}`}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative hidden md:flex ${isScrolled ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white hover:text-blue-200 hover:bg-white/10"}`}
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                      3
                    </Badge>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">New comment on your article</p>
                        <p className="text-xs text-gray-500">Sarah commented on "The Future of AI"</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Your article is trending</p>
                        <p className="text-xs text-gray-500">"Quantum Computing" is gaining traction</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">New follower</p>
                        <p className="text-xs text-gray-500">Michael Chen started following you</p>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer justify-center text-blue-600">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex hover:bg-blue-50">
                    <Avatar className="h-8 w-8 border-2 border-blue-200">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile/dashboard">
                    <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to="/profile/editor">
                    <DropdownMenuItem className="cursor-pointer">New Article</DropdownMenuItem>
                  </Link>
                  <Link to="/profile/settings">
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Navigation */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Menu"
                    className={`${isScrolled ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white hover:text-blue-200 hover:bg-white/10"}`}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px] p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
                      <div className="flex items-center space-x-3 mb-6">
                        <Avatar className="h-10 w-10 border-2 border-white/20">
                          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-blue-200">john.doe@example.com</p>
                        </div>
                      </div>

                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />
                        <Input
                          type="search"
                          placeholder="Search articles..."
                          className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="p-4 flex-1 overflow-auto">
                      <nav className="space-y-6">
                        <div className="space-y-3">
                          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">
                            Main Navigation
                          </p>
                          <div className="space-y-1">
                            <Link
                              to="/"
                              className="flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => setIsOpen(false)}
                            >
                              Home
                            </Link>
                            {navLinks.map((link) => (
                              <Link
                                key={link.name}
                                to={link.href}
                                className={`flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600 ${
                                  location.pathname === link.href ||
                                  (link.href !== "/" && location.pathname.startsWith(link.href))
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Account</p>
                          <div className="space-y-1">
                            <Link
                              to="/profile/dashboard"
                              className="flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => setIsOpen(false)}
                            >
                              Dashboard
                            </Link>
                            <Link
                              to="/profile/editor"
                              className="flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => setIsOpen(false)}
                            >
                              New Article
                            </Link>
                            <Link
                              to="/profile/settings"
                              className="flex items-center py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => setIsOpen(false)}
                            >
                              Settings
                            </Link>
                          </div>
                        </div>
                      </nav>
                    </div>

                    <div className="p-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full justify-center border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Log out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
