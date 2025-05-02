"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostBySlug, getRelatedPosts, type BlogPost } from "../data/mockData"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Facebook, Twitter, Linkedin, Share2, ThumbsUp, Eye, Calendar, MessageSquare } from "lucide-react"
import ImageModal from "../components/ImageModal"
import CommentSection from "../components/CommentSection"
import { toast } from "sonner"

const Blog = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>()
  const [post, setPost] = useState<ReturnType<typeof getPostBySlug>>(undefined)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState({ src: "", alt: "" })
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    if (blogSlug) {
      const blogPost = getPostBySlug(blogSlug)
      setPost(blogPost)

      if (blogPost) {
        setLikeCount(blogPost.likes)

        // Check if post is liked from localStorage
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
        setIsLiked(likedPosts.includes(blogPost.id))

        const related = getRelatedPosts(blogPost.id, blogPost.category.slug, blogPost.tags)
        setRelatedPosts(related)
      }
    }
  }, [blogSlug])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleImageClick = (src: string, alt: string) => {
    setCurrentImage({ src, alt })
    setIsImageModalOpen(true)
  }

  const handleLikePost = () => {
    if (!post) return

    // Toggle like state
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1))

    // Update localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
    if (newLikedState) {
      if (!likedPosts.includes(post.id)) {
        likedPosts.push(post.id)
        toast.success("Added to your liked posts")
      }
    } else {
      const index = likedPosts.indexOf(post.id)
      if (index > -1) {
        likedPosts.splice(index, 1)
        toast.success("Removed from your liked posts")
      }
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
  }

  // Function to make images in content clickable
  const enhanceContentWithClickableImages = (content: string) => {
    if (!content) return ""

    // Replace img tags with clickable versions
    return content.replace(/<img(.*?)src="(.*?)"(.*?)alt="(.*?)"(.*?)>/g, (match, p1, src, p3, alt, p5) => {
      return `<img${p1}src="${src}"${p3}alt="${alt}"${p5} class="cursor-zoom-in hover:opacity-90 transition-opacity" onclick="window.handleImageClick('${src}', '${alt}')">`
    })
  }

  // Add the click handler to the window object
  useEffect(() => {
    window.handleImageClick = (src: string, alt: string) => {
      handleImageClick(src, alt)
    }

    return () => {
      delete window.handleImageClick
    }
  }, [])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
        <Link to="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>/</span>
            <Link to={`/category/${post.category.slug}`} className="hover:text-blue-600">
              {post.category.name}
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </li>
        </ol>
      </nav>

      {/* Blog Hero */}
      <div className="mb-8">
        <div className="rounded-xl overflow-hidden mb-6">
          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px] cursor-zoom-in hover:opacity-90 transition-opacity"
            onClick={() => handleImageClick(post.coverImage, post.title)}
          />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-gray-500">Author</div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center text-gray-500">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center text-gray-500">
            <Eye className="mr-1 h-4 w-4" />
            <span>{post.views} views</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <div className="flex items-center text-gray-500">
            <Share2 className="mr-1 h-4 w-4" />
            <span>{post.shares} shares</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
            onClick={handleLikePost}
          >
            <ThumbsUp className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
            <span>{likeCount} likes</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-blue-50">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Content */}
      <div
        className="prose prose-blue max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: enhanceContentWithClickableImages(post.content) }}
      />

      {/* Like and Comment Section */}
      <div className="bg-blue-50 rounded-xl p-6 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLikePost}
              className={`${isLiked ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {isLiked ? "Liked" : "Like this article"}
            </Button>
            <Button variant="outline" className="border-blue-200">
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Comment
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Share this article:</span>
            <Button variant="outline" size="icon" className="rounded-full border-blue-200 h-8 w-8">
              <Facebook className="h-4 w-4 text-blue-600" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-blue-200 h-8 w-8">
              <Twitter className="h-4 w-4 text-blue-400" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-blue-200 h-8 w-8">
              <Linkedin className="h-4 w-4 text-blue-700" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection postId={post.id} postSlug={post.slug} />

      {/* Author Info */}
      <div className="bg-blue-50 rounded-xl p-6 mb-12 mt-12">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
            <p className="text-gray-500 mb-4">{post.author.bio}</p>
            <Button variant="outline" className="text-blue-600 border-blue-600">
              View All Articles
            </Button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                <Card className="h-full transition-all hover:shadow-md border-0 shadow-sm">
                  <div className="h-40 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="text-sm text-gray-500 mb-2">{formatDate(relatedPost.date)}</div>
                    <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-500 line-clamp-2">{relatedPost.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        src={currentImage.src || "/placeholder.svg"}
        alt={currentImage.alt}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </div>
  )
}

export default Blog
