"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { toast } from "sonner"
import { categories } from "../../data/mockData"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  LinkIcon,
  Save,
  Eye,
  FileText,
  Upload,
} from "lucide-react"

const Editor = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePublish = (isDraft: boolean) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(isDraft ? "Draft saved successfully" : "Article published successfully")
    }, 1500)
  }

  const insertFormatting = (format: string) => {
    // This would be replaced with actual rich text editor functionality
    toast.info(`${format} formatting applied`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Article Editor</h1>

      <div className="mb-6">
        <div className="space-y-2">
          <Label htmlFor="title">Article Title</Label>
          <Input
            id="title"
            placeholder="Enter a compelling title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg"
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="coverImage">Cover Image</Label>
        <div className="mt-2 flex items-center gap-4">
          {coverImage ? (
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img src={coverImage || "/placeholder.svg"} alt="Cover preview" className="w-full h-full object-cover" />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setCoverImage("")}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop an image, or click to browse</p>
              <Button variant="outline" size="sm">
                Select Image
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={() =>
                  setCoverImage(
                    "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                  )
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="Write a brief summary of your article"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="write">
          <div className="flex items-center justify-between mb-2">
            <TabsList>
              <TabsTrigger value="write" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Write</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Bold")}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Italic")}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Underline")}>
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Bulleted List")}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Numbered List")}>
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Align Left")}>
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Align Center")}>
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Align Right")}>
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Insert Image")}>
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Insert Link")}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="write">
            <Textarea
              placeholder="Start writing your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="font-mono"
            />
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="text-gray-400 italic">Your article preview will appear here...</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
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

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="Enter tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => handlePublish(true)} disabled={isSubmitting}>
          Save as Draft
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => handlePublish(false)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Publishing...</>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" /> Publish Article
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Editor
