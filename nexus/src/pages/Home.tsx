"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Clock, Sparkles, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { categories, getTrendingPosts, getRecentPosts, getNewPosts, type BlogPost } from "../data/mockData"
import { motion } from "framer-motion"

const Home = () => {
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [newPosts, setNewPosts] = useState<BlogPost[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const maxSlides = 3

  useEffect(() => {
    setTrendingPosts(getTrendingPosts())
    setRecentPosts(getRecentPosts())
    setNewPosts(getNewPosts())

    // Auto-advance hero slider
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % maxSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  return (
    <div className="py-8">
      {/* Hero Section with Trending Posts */}
      <section className="mb-16 relative overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"></div>

        {/* Hero Slider */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden">
          {trendingPosts.slice(0, maxSlides).map((post, index) => (
            <div
              key={post.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-center p-12 text-white max-w-2xl">
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-600/80 backdrop-blur-sm px-3 py-1 text-sm font-medium">
                    {post.category.name}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-lg text-white/80 mb-6">{post.excerpt}</p>
                <div className="flex items-center mb-6">
                  <img
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    className="h-10 w-10 rounded-full border-2 border-white/20 mr-3"
                  />
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-white/70">{formatDate(post.date)}</p>
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {trendingPosts.slice(0, maxSlides).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeSlide ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 backdrop-blur-sm transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
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
                  <Card className="h-full transition-all hover:shadow-lg overflow-hidden group border-0 shadow-sm">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
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

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex items-center mb-6">
          <Clock className="mr-2 h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Recent Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[85%] mx-auto">
          {recentPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-md group border-0 shadow-sm overflow-hidden">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[85%] mx-auto">
          {newPosts.map((post, index) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-md overflow-hidden group border-0 shadow-sm">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
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
