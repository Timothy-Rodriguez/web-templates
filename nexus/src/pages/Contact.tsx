"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      setIsSubmitted(true)
      toast.success("Message sent! We'll get back to you as soon as possible.")
    }, 1500)
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Have a question, suggestion, or just want to say hello? We'd love to hear from you. Fill out the form below or
          reach out through any of our contact channels.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-[85%] mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center transition-transform hover:scale-105 duration-300">
          <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-blue-800">Email Us</h3>
          <p className="text-blue-900 mb-2">contact@nexusblog.com</p>
          <p className="text-blue-900">support@nexusblog.com</p>
          <Button variant="link" className="mt-4 text-blue-700">
            Send an Email <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center transition-transform hover:scale-105 duration-300">
          <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Phone className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-purple-800">Call Us</h3>
          <p className="text-purple-900 mb-2">+1 (555) 123-4567</p>
          <p className="text-purple-900">Mon-Fri, 9am-5pm EST</p>
          <Button variant="link" className="mt-4 text-purple-700">
            Call Now <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 text-center transition-transform hover:scale-105 duration-300">
          <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-indigo-800">Visit Us</h3>
          <p className="text-indigo-900 mb-2">123 Tech Avenue</p>
          <p className="text-indigo-900">San Francisco, CA 94107</p>
          <Button variant="link" className="mt-4 text-indigo-700">
            Get Directions <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Form Side */}
            <div className="md:col-span-3 p-8 md:p-12">
              {!isSubmitted ? (
                <>
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
                          className="border-blue-200 focus:border-blue-400"
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
                          className="border-blue-200 focus:border-blue-400"
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
                        className="border-blue-200 focus:border-blue-400"
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
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="bg-green-100 text-green-600 rounded-full p-4 mb-6">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for reaching out! We've received your message and will get back to you as soon as
                    possible.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    variant="outline"
                    className="border-blue-200 text-blue-600"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Info Side */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="mb-8">
                  Feel free to reach out to us using any of the contact methods below. We're here to help and would love
                  to hear from you!
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-blue-100">contact@nexusblog.com</p>
                      <p className="text-blue-100">support@nexusblog.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-blue-100">+1 (555) 123-4567</p>
                      <p className="text-blue-100">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">Office</h4>
                      <p className="text-blue-100">123 Tech Avenue</p>
                      <p className="text-blue-100">San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm text-blue-100">We typically respond to inquiries within 24-48 business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">How can I contribute an article?</h3>
            <p className="text-gray-600">
              We welcome guest contributions! Please email us at submissions@nexusblog.com with your article idea and a
              brief outline.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Do you offer advertising opportunities?</h3>
            <p className="text-gray-600">
              Yes, we offer various advertising options. Contact our advertising team at ads@nexusblog.com for more
              information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">How can I report an error in an article?</h3>
            <p className="text-gray-600">
              We strive for accuracy. If you spot an error, please email corrections@nexusblog.com with the article link
              and details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Are you hiring?</h3>
            <p className="text-gray-600">
              We're always looking for talented individuals! Check our careers page or email careers@nexusblog.com with
              your resume.
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.77791667087!2d-122.43149334179685!3d37.77492951918011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1652892234400!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nexus Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
