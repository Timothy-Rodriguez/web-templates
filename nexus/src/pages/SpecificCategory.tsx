"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Search } from "lucide-react"
import { getCategoryBySlug, getPostsByCategory, type BlogPost } from "../data/mockData"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

const SpecificCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const [category, setCategory] = useState<ReturnType<typeof getCategoryBySlug>>(undefined)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    if (categorySlug) {
      const categoryData = getCategoryBySlug(categorySlug)
      setCategory(categoryData)

      if (categoryData) {
        const categoryPosts = getPostsByCategory(categorySlug)
        setPosts(categoryPosts)
        setFilteredPosts(categoryPosts)
      }
    }
  }, [categorySlug])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredPosts(filtered)
    }
    setCurrentPage(1) // Reset to first page on search
  }, [searchTerm, posts])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <p className="text-gray-500 mb-6">The category you're looking for doesn't exist.</p>
        <Link to="/categories">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Categories</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">{category.description}</p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Input
            type="search"
            placeholder={`Search in ${category.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-[85%] mx-auto">
            {currentPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <Card className="h-full transition-all hover:shadow-md border-0 shadow-sm overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      {post.author.name}
                    </div>
                    <div className="text-sm text-gray-500">{post.views} views</div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No articles found matching "{searchTerm}"</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="border-blue-200 text-blue-600">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}

export default SpecificCategory
