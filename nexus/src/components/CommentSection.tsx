"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { toast } from "sonner"
import { Heart, Reply, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface Comment {
  id: string
  text: string
  author: {
    name: string
    avatar: string
  }
  date: string
  likes: number
  isLiked: boolean
}

interface CommentSectionProps {
  postId: string
  postSlug: string
}

const CommentSection = ({ postId, postSlug }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${postSlug}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [postSlug])

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${postSlug}`, JSON.stringify(comments))
    }
  }, [comments, postSlug])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        author: {
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
        },
        date: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      }

      setComments((prev) => [comment, ...prev])
      setNewComment("")
      setIsSubmitting(false)
      toast.success("Comment posted successfully")
    }, 500)
  }

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id))
    toast.success("Comment deleted")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ${days === 1 ? "day" : "days"} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment form */}
      <div className="mb-8">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px] border-blue-200 focus:border-blue-400"
        />
        <Button
          onClick={handleSubmitComment}
          disabled={!newComment.trim() || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between">
                <div className="flex items-center mb-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <div className="text-xs text-gray-500">{formatDate(comment.date)}</div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)} className="text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="mb-3">{comment.text}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${comment.isLiked ? "text-red-500" : ""}`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <Heart className="h-4 w-4" fill={comment.isLiked ? "currentColor" : "none"} />
                  {comment.likes > 0 && <span>{comment.likes}</span>}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

export default CommentSection
