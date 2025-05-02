import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: ReactNode
  isBlogPage?: boolean
}

const Layout = ({ children, isBlogPage = false }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className={`flex-1 mx-auto w-full ${isBlogPage ? "max-w-[80%]" : "max-w-[90%]"} px-4`}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
