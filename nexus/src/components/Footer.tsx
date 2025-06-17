import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Footer = () => {
  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const categories = [
    { name: "Technology", href: "/category/technology" },
    { name: "Science", href: "/category/science" },
    { name: "Space", href: "/category/space" },
    { name: "Programming", href: "/category/programming" },
    { name: "AI", href: "/category/ai" },
  ]

  return (
    <footer className="mt-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="mx-auto w-full max-w-[90%] px-4">
        <div className="relative pt-20 pb-12">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

          {/* Newsletter section - above the main footer */}
          <div className="relative mb-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-2">Join Our Newsletter</h3>
                <p className="text-blue-100">Get the latest articles and news delivered to your inbox weekly.</p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white"
                  />
                  <Button className="rounded-l-none bg-white hover:bg-blue-50 text-blue-600">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
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
                <div className="text-2xl font-bold text-white">Nexus</div>
              </Link>
              <p className="text-gray-300 mb-6">
                Explore the intersection of technology, science, and innovation. Your source for insightful articles and
                the latest developments.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-blue-300 hover:text-blue-200"
                >
                  <Facebook size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-blue-300 hover:text-blue-200"
                >
                  <Twitter size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-blue-300 hover:text-blue-200"
                >
                  <Instagram size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-blue-300 hover:text-blue-200"
                >
                  <Linkedin size={20} />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/profile/dashboard"
                    className="text-gray-300 hover:text-blue-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.href}
                      className="text-gray-300 hover:text-blue-300 transition-colors flex items-center"
                    >
                      <ArrowRight className="h-3 w-3 mr-2" />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-blue-300 mt-0.5" />
                  <div>
                    <p className="text-gray-300">contact@nexusblog.com</p>
                    <p className="text-gray-300">support@nexusblog.com</p>
                  </div>
                </li>
                <li className="mt-4">
                  <Button
                    variant="outline"
                    className="border-blue-400/30 text-blue-300 hover:bg-blue-400/10 hover:text-blue-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Nexus Blog. All rights reserved.</p>
            <div className="flex items-center mt-4 md:mt-0 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-400" />
              <span>by Nexus Team</span>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-300 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
