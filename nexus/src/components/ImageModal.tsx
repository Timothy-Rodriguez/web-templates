"use client"

import { useState, useEffect } from "react"
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { Button } from "./ui/button"

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  // Reset zoom and rotation when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setRotation(0)
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc)
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5))
  const rotate = () => setRotation((prev) => (prev + 90) % 360)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
            onClick={zoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
            onClick={zoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
            onClick={rotate}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="max-h-[90vh] max-w-full object-contain transition-transform duration-200 cursor-move"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
          draggable="false"
        />
      </div>
    </div>
  )
}

export default ImageModal
