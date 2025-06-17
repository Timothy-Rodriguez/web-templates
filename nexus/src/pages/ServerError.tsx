"use client"

import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Home, RefreshCw, ArrowLeft, ServerCrash, Mail } from "lucide-react"

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4 py-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          {/* 500 Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-purple-100 select-none">500</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ServerCrash className="h-16 w-16 text-purple-600 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Internal Server Error</h1>
            <p className="text-lg text-gray-600 mb-2">Something went wrong on our end. We're working to fix it!</p>
            <p className="text-gray-500">Our team has been notified and is investigating the issue.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button onClick={handleRefresh} size="lg" className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
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

          {/* Status Information */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">What happened?</h3>
            <ul className="text-sm text-purple-700 text-left space-y-1">
              <li>• Our servers are experiencing technical difficulties</li>
              <li>• The issue is temporary and we're working on a fix</li>
              <li>• Your data is safe and secure</li>
              <li>• Normal service will resume shortly</li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What can you do?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <RefreshCw className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Wait & Retry</h4>
                <p className="text-gray-600">Try refreshing the page in a few minutes</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Home className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Visit Homepage</h4>
                <p className="text-gray-600">Browse other sections of our site</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Mail className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Contact Us</h4>
                <p className="text-gray-600">Report persistent issues to our team</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              If the problem persists, please{" "}
              <Link to="/contact" className="text-purple-600 hover:text-purple-800 underline">
                contact our support team
              </Link>{" "}
              with error code: 500-{Date.now().toString().slice(-6)}
            </p>
          </div>

          {/* Status Updates */}
          <div className="mt-6">
            <p className="text-xs text-gray-500">
              For real-time updates, follow us on social media or check our status page
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServerError
