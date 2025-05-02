import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Category from "./pages/Category"
import SpecificCategory from "./pages/SpecificCategory"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Contact from "./pages/Contact"
import UserProfile from "./pages/UserProfile"
import { Toaster } from "sonner"

// Wrapper component to determine if current route is a blog page
const LayoutWrapper = ({ children }) => {
  const location = useLocation()
  const isBlogPage = location.pathname.startsWith("/blog/")

  return <Layout isBlogPage={isBlogPage}>{children}</Layout>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Home />
            </LayoutWrapper>
          }
        />
        <Route
          path="/categories"
          element={
            <LayoutWrapper>
              <Category />
            </LayoutWrapper>
          }
        />
        <Route
          path="/category/:categorySlug"
          element={
            <LayoutWrapper>
              <SpecificCategory />
            </LayoutWrapper>
          }
        />
        <Route
          path="/blog/:blogSlug"
          element={
            <LayoutWrapper>
              <Blog />
            </LayoutWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <LayoutWrapper>
              <About />
            </LayoutWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <LayoutWrapper>
              <Contact />
            </LayoutWrapper>
          }
        />
        <Route
          path="/profile/*"
          element={
            <LayoutWrapper>
              <UserProfile />
            </LayoutWrapper>
          }
        />
      </Routes>
      <Toaster position="bottom-center" richColors />
    </Router>
  )
}

export default App
