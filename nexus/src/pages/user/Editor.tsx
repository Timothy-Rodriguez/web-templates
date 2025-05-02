"use client"

import { useState, useRef, useEffect } from "react"
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
  ImageIcon,
  LinkIcon,
  Save,
  Eye,
  FileText,
  Upload,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
  Table,
  Undo,
  Redo,
  PaintBucket,
  Type,
  Palette,
  Eraser,
  FileCode,
  CheckSquare,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

// Local storage keys
const EDITOR_CONTENT_KEY = "nexus-editor-content"
const EDITOR_TITLE_KEY = "nexus-editor-title"
const EDITOR_EXCERPT_KEY = "nexus-editor-excerpt"
const EDITOR_CATEGORY_KEY = "nexus-editor-category"
const EDITOR_TAGS_KEY = "nexus-editor-tags"
const EDITOR_COVER_IMAGE_KEY = "nexus-editor-cover-image"

const Editor = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [htmlContent, setHtmlContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")

  // Load from local storage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem(EDITOR_TITLE_KEY)
    const savedContent = localStorage.getItem(EDITOR_CONTENT_KEY)
    const savedExcerpt = localStorage.getItem(EDITOR_EXCERPT_KEY)
    const savedCategory = localStorage.getItem(EDITOR_CATEGORY_KEY)
    const savedTags = localStorage.getItem(EDITOR_TAGS_KEY)
    const savedCoverImage = localStorage.getItem(EDITOR_COVER_IMAGE_KEY)

    if (savedTitle) setTitle(savedTitle)
    if (savedContent) setContent(savedContent)
    if (savedExcerpt) setExcerpt(savedExcerpt)
    if (savedCategory) setCategory(savedCategory)
    if (savedTags) setTags(savedTags)
    if (savedCoverImage) setCoverImage(savedCoverImage)
  }, [])

  // Save to local storage whenever content changes
  useEffect(() => {
    localStorage.setItem(EDITOR_TITLE_KEY, title)
    localStorage.setItem(EDITOR_CONTENT_KEY, content)
    localStorage.setItem(EDITOR_EXCERPT_KEY, excerpt)
    localStorage.setItem(EDITOR_CATEGORY_KEY, category)
    localStorage.setItem(EDITOR_TAGS_KEY, tags)
    localStorage.setItem(EDITOR_COVER_IMAGE_KEY, coverImage)
  }, [title, content, excerpt, category, tags, coverImage])

  useEffect(() => {
    // Convert content to HTML for preview
    const html = content
      // Convert headings
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
      // Convert bold, italic, underline
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/__(.+?)__/g, "<u>$1</u>")
      // Convert lists
      .replace(/^\* (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.+<\/li>\n)+/g, '<ul class="list-disc pl-5 my-2">$&</ul>')
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.+<\/li>\n)+/g, '<ol class="list-decimal pl-5 my-2">$&</ol>')
      // Convert blockquotes
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-4">$1</blockquote>')
      // Convert code blocks
      .replace(/```(.+?)```/gs, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">$1</pre>')
      // Convert inline code
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      // Convert links
      .replace(/\[(.+?)\]$$(.+?)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      // Convert images
      .replace(
        /!\[(.+?)\]$$(.+?)$$/g,
        '<img src="$2" alt="$1" class="my-4 rounded-lg w-full" onerror="this.onerror=null; this.src=\'data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%%22 height=%22100%%22 viewBox=%220 0 100 100%22><rect width=%22100%%22 height=%22100%%22 fill=%22%23f0f0f0%22></rect><text x=%2250%%22 y=%2250%%22 fontFamily=%22Arial%22 fontSize=%2220%22 textAnchor=%22middle%22 dominantBaseline=%22middle%22 fill=%22%23999%22>$1</text></svg>\'" />',
      )
      // Convert paragraphs (must be last)
      .replace(/^(?!<[a-z]).+$/gm, '<p class="my-2">$&</p>')
      // Fix empty paragraphs
      .replace(/<p class="my-2"><\/p>/g, '<p class="my-2">&nbsp;</p>')

    setHtmlContent(html)
  }, [content])

  const handlePublish = (isDraft: boolean) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(isDraft ? "Draft saved successfully" : "Article published successfully")
    }, 1500)
  }

  const insertFormatting = (format: string) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let formattedText = ""
    let cursorPosition = 0

    switch (format) {
      case "Bold":
        formattedText = `**${selectedText}**`
        cursorPosition = selectedText ? 2 : 0
        break
      case "Italic":
        formattedText = `*${selectedText}*`
        cursorPosition = selectedText ? 1 : 0
        break
      case "Underline":
        formattedText = `__${selectedText}__`
        cursorPosition = selectedText ? 2 : 0
        break
      case "Strikethrough":
        formattedText = `~~${selectedText}~~`
        cursorPosition = selectedText ? 2 : 0
        break
      case "Heading1":
        formattedText = `# ${selectedText}`
        cursorPosition = selectedText ? 2 : 0
        break
      case "Heading2":
        formattedText = `## ${selectedText}`
        cursorPosition = selectedText ? 3 : 0
        break
      case "Heading3":
        formattedText = `### ${selectedText}`
        cursorPosition = selectedText ? 4 : 0
        break
      case "BulletedList":
        formattedText = `* ${selectedText}`
        cursorPosition = selectedText ? 2 : 0
        break
      case "NumberedList":
        formattedText = `1. ${selectedText}`
        cursorPosition = selectedText ? 3 : 0
        break
      case "Code":
        formattedText = `\`${selectedText}\``
        cursorPosition = selectedText ? 1 : 0
        break
      case "CodeBlock":
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``
        cursorPosition = selectedText ? 4 : 0
        break
      case "Quote":
        formattedText = `> ${selectedText}`
        cursorPosition = selectedText ? 2 : 0
        break
      case "Link":
        formattedText = `[${selectedText || "Link text"}](url)`
        cursorPosition = selectedText ? selectedText.length + 3 : 9
        break
      case "Image":
        formattedText = `![${selectedText || "Alt text"}](image-url)`
        cursorPosition = selectedText ? selectedText.length + 3 : 9
        break
      case "Table":
        formattedText = `| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Cell 1 | Cell 2 | Cell 3 |\n| Cell 4 | Cell 5 | Cell 6 |`
        cursorPosition = 0
        break
      case "Checkbox":
        formattedText = `- [ ] ${selectedText || "Task"}`
        cursorPosition = selectedText ? 6 : 0
        break
      default:
        return
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
      } else {
        textarea.setSelectionRange(start + cursorPosition, start + cursorPosition)
      }
    }, 0)
  }

  const handleImageUpload = () => {
    // Simulate image upload
    const imageUrl =
      "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"

    // Insert image markdown at cursor position
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const imageMarkdown = `![Image description](${imageUrl})`

      const newContent = content.substring(0, start) + imageMarkdown + content.substring(start)
      setContent(newContent)

      // Set cursor position after the inserted image markdown
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length)
      }, 0)
    }
  }

  const handleUndo = () => {
    document.execCommand("undo")
  }

  const handleRedo = () => {
    document.execCommand("redo")
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCoverImage(
                    "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                  )
                }}
              >
                Select Image
              </Button>
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

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleUndo} title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRedo} title="Redo">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded-lg mb-2">
            <div className="flex flex-wrap gap-1 mb-2">
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Heading1")} title="Heading 1">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Heading2")} title="Heading 2">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Heading3")} title="Heading 3">
                <Heading3 className="h-4 w-4" />
              </Button>
              <Separator className="mx-1 h-6" />
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Bold")} title="Bold">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Italic")} title="Italic">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Underline")} title="Underline">
                <Underline className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => insertFormatting("Strikethrough")}
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Separator className="mx-1 h-6" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => insertFormatting("BulletedList")}
                title="Bulleted List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => insertFormatting("NumberedList")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Checkbox")} title="Checkbox">
                <CheckSquare className="h-4 w-4" />
              </Button>
              <Separator className="mx-1 h-6" />
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Quote")} title="Quote">
                <Quote className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Code")} title="Inline Code">
                <Code className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("CodeBlock")} title="Code Block">
                <FileCode className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Table")} title="Insert Table">
                <Table className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-1">
              <Button variant="ghost" size="icon" onClick={() => insertFormatting("Link")} title="Insert Link">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleImageUpload} title="Insert Image">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Separator className="mx-1 h-6" />
              <Button variant="ghost" size="icon" title="Align Left">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Align Center">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Align Right">
                <AlignRight className="h-4 w-4" />
              </Button>
              <Separator className="mx-1 h-6" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" title="Font Size">
                    <Type className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Font Size</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{fontSize}px</span>
                      <Slider
                        value={[fontSize]}
                        min={10}
                        max={24}
                        step={1}
                        onValueChange={(value) => setFontSize(value[0])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" title="Text Color">
                    <PaintBucket className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Text Color</h4>
                    <div className="grid grid-cols-8 gap-2">
                      {["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#808080"].map(
                        (color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full cursor-pointer border"
                            style={{ backgroundColor: color }}
                            onClick={() => setTextColor(color)}
                          />
                        ),
                      )}
                    </div>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" title="Background Color">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Background Color</h4>
                    <div className="grid grid-cols-8 gap-2">
                      {["#ffffff", "#f0f0f0", "#d0d0d0", "#f0f8ff", "#f5f5dc", "#f0fff0", "#fff0f5", "#f0ffff"].map(
                        (color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full cursor-pointer border"
                            style={{ backgroundColor: color }}
                            onClick={() => setBgColor(color)}
                          />
                        ),
                      )}
                    </div>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="ghost" size="icon" title="Clear Formatting">
                <Eraser className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="write">
            <Textarea
              ref={textareaRef}
              placeholder="Start writing your article here... Use Markdown formatting like # for headings, ** for bold, * for italic, etc."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="font-mono border-blue-200 focus:border-blue-400"
              style={{ fontSize: `${fontSize}px`, color: textColor, backgroundColor: bgColor }}
            />
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[400px] prose max-w-none">
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
            <SelectTrigger className="border-blue-200">
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
            className="border-blue-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => handlePublish(true)}
          disabled={isSubmitting}
          className="border-blue-200 text-blue-600"
        >
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
