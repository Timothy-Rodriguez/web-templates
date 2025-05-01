"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Toaster, toast } from "sonner"
import { Mail, Phone, MapPin } from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster richColors position="top-right" />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you. Fill out the form below or
          reach out through any of our contact channels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
            <Mail className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <p className="text-muted-foreground">contact@nexusblog.com</p>
            <p className="text-muted-foreground">support@nexusblog.com</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
            <Phone className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
            <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl">
            <MapPin className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Visit Us</h3>
            <p className="text-muted-foreground">123 Tech Avenue</p>
            <p className="text-muted-foreground">San Francisco, CA 94107</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact