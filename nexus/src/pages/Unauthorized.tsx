"use client"

import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Home, LogIn, ArrowLeft, ShieldX } from "lucide-react"

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          {/* 401 Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-red-100 select-none">401</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldX className="h-16 w-16 text-red-600 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-2">You don't have permission to access this resource.</p>
            <p className="text-gray-500">Please log in with appropriate credentials or contact an administrator.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/profile">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.history.back()} className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Information Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Why am I seeing this?</h3>
            <ul className="text-sm text-red-700 text-left space-y-1">
              <li>• You may not be logged in to your account</li>
              <li>• Your session may have expired</li>
              <li>• You don't have the required permissions</li>
              <li>• The resource requires a premium subscription</li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Account Issues</h4>
                <p className="text-gray-600 mb-2">Having trouble with your account?</p>
                <Link to="/contact" className="text-blue-600 hover:text-blue-800 underline">
                  Contact Support
                </Link>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Create Account</h4>
                <p className="text-gray-600 mb-2">Don't have an account yet?</p>
                <Link to="/profile" className="text-blue-600 hover:text-blue-800 underline">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>

          {/* Status Code Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Error Code: 401 - Unauthorized Access</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Unauthorized
