"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { Upload, Link, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      // In a real app, you would upload to your server/cloud storage
      // For demo, we'll use a placeholder service
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
        setIsUploading(false)
        toast.success("Image uploaded successfully")
      }
      reader.readAsDataURL(file)
    }, 1500)
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid URL")
      return
    }

    // Basic URL validation
    try {
      new URL(urlInput)
      onChange(urlInput)
      setUrlInput("")
      toast.success("Image URL added successfully")
    } catch {
      toast.error("Please enter a valid URL")
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  if (value) {
    return (
      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden group">
        <img src={value || "/placeholder.svg"} alt="Cover preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={triggerFileInput}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Upload className="h-4 w-4 mr-1" />
              Change
            </Button>
            <Button variant="destructive" size="sm" onClick={onRemove}>
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              From URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={triggerFileInput}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                  <p className="text-sm text-gray-500">Uploading...</p>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
                />
                <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
