import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Category from "./pages/Category"
import SpecificCategory from "./pages/SpecificCategory"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Contact from "./pages/Contact"
import UserProfile from "./pages/UserProfile"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import NotFound from "./pages/NotFound"
import Unauthorized from "./pages/Unauthorized"
import ServerError from "./pages/ServerError"
import { Toaster } from "sonner"

// Wrapper component to determine if current route is a blog page
// const LayoutWrapper = ({ children }) => {
//   const location = useLocation()
//   const isBlogPage = location.pathname.startsWith("/blog/")

//   return <Layout isBlogPage={isBlogPage}>{children}</Layout>
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <LayoutWrapper>
//               <Home />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/categories"
//           element={
//             <LayoutWrapper>
//               <Category />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/category/:categorySlug"
//           element={
//             <LayoutWrapper>
//               <SpecificCategory />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/blog/:blogSlug"
//           element={
//             <LayoutWrapper>
//               <Blog />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <LayoutWrapper>
//               <About />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <LayoutWrapper>
//               <Contact />
//             </LayoutWrapper>
//           }
//         />
//         <Route
//           path="/profile/*"
//           element={
//             <LayoutWrapper>
//               <UserProfile />
//             </LayoutWrapper>
//           }
//         />
//       </Routes>
//       <Toaster position="bottom-center" richColors />
//     </Router>
//   )
// }

// export default App

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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
