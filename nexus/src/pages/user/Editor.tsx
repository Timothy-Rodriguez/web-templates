"use client"

import { useState } from "react"
import DOMPurify from "dompurify"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { FileText, Eye, Save } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { toast } from "sonner"
import { categories } from "../../data/mockData"
import QuillEditor from "./QuillEditor"
import ImageUpload from "../../components/ImageUpload"

export default function Editor() {
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [excerpt, setExcerpt] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [coverImage, setCoverImage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEditorChange = (newContent: string) => {
    setContent(newContent)
  }

  const getWordCount = () => {
    const text = content
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    return text ? text.split(" ").length : 0
  }

  const getReadingTime = () => {
    const wordsPerMinute = 200
    const minutes = Math.ceil(getWordCount() / wordsPerMinute)
    return minutes
  }

  const handlePublish = (isDraft: boolean) => {
    if (!title.trim()) {
      toast.error("Please enter a title for your article")
      return
    }

    if (!content.trim() || content === "<p><br></p>") {
      toast.error("Please write some content for your article")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(isDraft ? "Draft saved successfully" : "Article published successfully")
    }, 1500)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Article Editor</h1>
          <p className="text-gray-600 mt-1">Create and publish your blog articles</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              {getWordCount()} words
            </Badge>
            <Badge variant="outline">~{getReadingTime()} min read</Badge>
          </div>
        </div>
      </div>

      {/* Article Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief description of your article"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload value={coverImage} onChange={setCoverImage} onRemove={() => setCoverImage("")} />
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <div className="quill-editor">
                <QuillEditor value={content} onChange={handleEditorChange} />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="min-h-[400px] border rounded-lg bg-white">
                {content && content.trim() && content !== "<p><br></p>" ? (
                  <div className="article-preview">
                    {/* Preview Header */}
                    {title && (
                      <div className="mb-6 pb-4 border-b">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        {excerpt && <p className="text-lg text-gray-600">{excerpt}</p>}
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span>{getWordCount()} words</span>
                          <span>~{getReadingTime()} min read</span>
                          {category && (
                            <Badge variant="secondary">{categories.find((cat) => cat.id === category)?.name}</Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cover Image in Preview */}
                    {coverImage && (
                      <div className="mb-6">
                        <img
                          src={coverImage || "/placeholder.svg"}
                          alt="Article cover"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                  </div>
                ) : (
                  <div className="preview-empty-state">
                    <Eye className="h-12 w-12" />
                    <p className="text-lg font-medium">No content to preview</p>
                    <p className="text-sm">Start writing in the editor to see your content here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => handlePublish(true)}
          disabled={isSubmitting}
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => handlePublish(false)}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? (
            "Publishing..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Publish Article
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
