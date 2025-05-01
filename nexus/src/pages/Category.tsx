"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { categories, getPostsByCategory } from "../data/mockData"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

const Category = () => {
  const [categoriesWithCount, setCategories] = useState<Array<{ category: (typeof categories)[0]; count: number }>>([])

  useEffect(() => {
    const categoriesWithPostCount = categories.map((category) => ({
      category,
      count: getPostsByCategory(category.slug).length,
    }))
    setCategories(categoriesWithPostCount)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Explore Categories</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover articles across various topics and fields. Each category offers unique insights and perspectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesWithCount.map(({ category, count }) => (
          <Link to={`/category/${category.slug}`} key={category.id}>
            <Card className="h-full transition-all hover:shadow-md overflow-hidden">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700 text-sm">
                    {count} articles
                  </span>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="text-sm text-blue-600">View articles →</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
