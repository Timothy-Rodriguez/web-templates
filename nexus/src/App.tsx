import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Category from "./pages/Category"
import SpecificCategory from "./pages/SpecificCategory"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Contact from "./pages/Contact"
import UserProfile from "./pages/UserProfile"
import { Toaster } from "sonner"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/category/:categorySlug" element={<SpecificCategory />} />
          <Route path="/blog/:blogSlug" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/*" element={<UserProfile />} />
        </Routes>
      </Layout>
      <Toaster position="bottom-center" richColors />
    </Router>
  )
}

export default App
