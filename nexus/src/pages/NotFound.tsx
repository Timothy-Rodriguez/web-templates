"use client"

import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-blue-100 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileQuestion className="h-16 w-16 text-blue-600 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-2">The page you're looking for doesn't exist or has been moved.</p>
            <p className="text-gray-500">Don't worry, it happens to the best of us. Let's get you back on track.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/categories">
                <Search className="mr-2 h-4 w-4" />
                Browse Articles
              </Link>
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.history.back()} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Sections</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link to="/categories/technology" className="text-blue-600 hover:text-blue-800 hover:underline">
                Technology
              </Link>
              <Link to="/categories/space" className="text-blue-600 hover:text-blue-800 hover:underline">
                Space
              </Link>
              <Link to="/categories/science" className="text-blue-600 hover:text-blue-800 hover:underline">
                Science
              </Link>
              <Link to="/categories/programming" className="text-blue-600 hover:text-blue-800 hover:underline">
                Programming
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Still can't find what you're looking for?{" "}
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
