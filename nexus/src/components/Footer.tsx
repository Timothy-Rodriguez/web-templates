import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "./ui/button"

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
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-blue-400">Nexus</div>
            </Link>
            <p className="text-gray-300 mb-6">
              Explore the intersection of technology, science, and innovation. Your source for insightful articles and
              the latest developments.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-blue-400">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-blue-400">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-blue-400">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-blue-400">
                <Linkedin size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/profile/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter to get the latest updates.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Nexus Blog. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
