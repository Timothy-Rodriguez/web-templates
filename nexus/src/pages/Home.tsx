"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, TrendingUp, Clock, Sparkles } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { categories, getTrendingPosts, getRecentPosts, getNewPosts, type BlogPost } from "../data/mockData"
import { motion } from "framer-motion"

const Home = () => {
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [newPosts, setNewPosts] = useState<BlogPost[]>([])
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTrendingPosts(getTrendingPosts())
    setRecentPosts(getRecentPosts())
    setNewPosts(getNewPosts())
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Animation */}
      <section ref={heroRef} className="relative overflow-hidden rounded-3xl mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 z-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-blue-400 opacity-20 top-[-10%] left-[-5%]"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-purple-400 opacity-20 bottom-[-20%] right-[-10%]"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 18,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-white opacity-10 top-[40%] left-[60%]"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 12,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-20 py-16 md:py-24 lg:py-32 px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                  Discover Insights That Matter
                </h1>
                <p className="max-w-[600px] text-blue-100 md:text-xl mb-8">
                  Explore the intersection of technology, science, and innovation. Your source for insightful articles
                  and the latest developments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/categories">
                    <Button className="bg-white text-blue-600 hover:bg-blue-50">Explore Categories</Button>
                  </Link>
                  <Link to="/blog/future-ai-healthcare">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Featured Article
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transform rotate-3 scale-105 opacity-50"></div>
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Digital Innovation"
                  className="rounded-xl shadow-xl relative z-10 object-cover w-full aspect-[4/3]"
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="text-sm font-medium text-blue-600">Latest Article</div>
                  <div className="text-xs text-gray-500">5 min read</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore Categories</h2>
          <Link to="/categories" className="text-blue-600 hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/category/${category.slug}`}>
                  <Card className="h-full transition-all hover:shadow-lg overflow-hidden group">
                    <CardHeader className="p-0">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative">
                      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                        {category.name.charAt(0)}
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
      </section>

      {/* Trending Posts */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg overflow-hidden group">
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-2 left-2 z-20 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {post.category.name}
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
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
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <Clock className="mr-2 h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Recent Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col md:flex-row h-full transition-all hover:shadow-lg group">
                  <div className="h-48 md:h-auto md:w-1/3 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10 md:opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col p-4 md:w-2/3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-500">{formatDate(post.date)}</div>
                      <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{post.category.name}</div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        {post.author.name}
                      </div>
                      <div className="text-sm text-gray-500">{post.views} views</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Posts */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <Sparkles className="mr-2 h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Fresh Content</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg overflow-hidden group">
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className="absolute top-2 right-2 z-20 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </CardTitle>
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
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-16 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-white opacity-10 top-[-10%] left-[-5%]"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-white opacity-10 bottom-[-20%] right-[-10%]"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 18,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter to receive the latest articles and updates directly in your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-12 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <Button type="submit" className="bg-white hover:bg-blue-50 text-blue-600 h-12 px-6">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
