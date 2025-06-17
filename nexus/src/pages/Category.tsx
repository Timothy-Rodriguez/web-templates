"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { categories, getPostsByCategory } from "../data/mockData"
import { CardImage } from "../components/ui/card"
import { Input } from "../components/ui/input"

const Category = () => {
  const [categoriesWithCount, setCategories] = useState<Array<{ category: (typeof categories)[0]; count: number }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCategories, setFilteredCategories] = useState<
    Array<{ category: (typeof categories)[0]; count: number }>
  >([])

  useEffect(() => {
    const categoriesWithPostCount = categories.map((category) => ({
      category,
      count: getPostsByCategory(category.slug).length,
    }))
    setCategories(categoriesWithPostCount)
    setFilteredCategories(categoriesWithPostCount)
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCategories(categoriesWithCount)
    } else {
      const filtered = categoriesWithCount.filter(
        ({ category }) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCategories(filtered)
    }
  }, [searchTerm, categoriesWithCount])

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Explore Categories</h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          Discover articles across various topics and fields. Each category offers unique insights and perspectives.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[85%] mx-auto">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(({ category, count }) => (
            <Link to={`/category/${category.slug}`} key={category.id}>
              <CardImage className="h-full transition-all hover:shadow-md overflow-hidden border shadow-sm">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700 text-sm">
                      {count} articles
                    </span>
                  </h3>
                  <p className="text-gray-500 text-sm">{category.description}</p>
                  <div className="mt-4 text-sm text-blue-600">View articles →</div>
                </div>
              </CardImage>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No categories found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Category
