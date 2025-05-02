import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Award, Globe, Calendar, Mail } from "lucide-react"

const About = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Nexus
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
          Exploring the intersection of technology, science, and innovation since 2020.
        </p>
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Nexus Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <h2 className="text-white text-2xl font-bold mb-2">Our Team</h2>
            <p className="text-white/80 max-w-xl mx-auto">
              A diverse group of journalists, scientists, and technology enthusiasts dedicated to bringing you the
              latest insights.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              At Nexus, we believe in the power of knowledge and the importance of staying informed in our rapidly
              evolving world. Our mission is to provide insightful, accurate, and engaging content that bridges the gap
              between complex topics and everyday understanding.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Educate</h3>
                <p className="text-gray-600">Making complex topics accessible without sacrificing depth or accuracy.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-purple-100 text-purple-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-gray-600">
                  Building a community of curious minds who share a passion for knowledge.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-indigo-100 text-indigo-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inspire</h3>
                <p className="text-gray-600">Encouraging readers to explore new ideas and perspectives on the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur"></div>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Nexus founding"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">2020</span>
                </div>
                <h3 className="text-xl font-bold mb-3">The Beginning</h3>
                <p className="text-gray-600 mb-4">
                  Nexus was founded in 2020 by a group of journalists, scientists, and technology enthusiasts who saw
                  the need for accessible yet in-depth coverage of the innovations and discoveries shaping our future.
                  Our team has grown to include experts from various fields, all united by a passion for clear
                  communication and a commitment to journalistic integrity.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3 md:order-1 order-2">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">2021-2022</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Growth and Expansion</h3>
                <p className="text-gray-600 mb-4">
                  As our readership grew, we expanded our coverage to include more specialized topics and in-depth
                  analyses. We launched our podcast series, established partnerships with leading research institutions,
                  and began hosting virtual events to connect our community with experts in various fields.
                </p>
              </div>
              <div className="md:w-1/3 md:order-2 order-1">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Nexus growth"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur"></div>
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Nexus today"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">Today</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Nexus Today</h3>
                <p className="text-gray-600 mb-4">
                  Today, Nexus stands as a trusted source of information for millions of readers worldwide. We continue
                  to evolve with the changing media landscape, embracing new technologies and formats while staying true
                  to our core mission of making knowledge accessible to all. Our team has grown to include over 50
                  contributors across six continents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-16">
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
                <p className="text-white/80">
                  We prioritize factual reporting and thorough research in all our articles, ensuring that our content
                  is reliable and trustworthy.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-white/80">
                  We believe knowledge should be accessible to everyone, regardless of their background or expertise
                  level.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3">Curiosity</h3>
                <p className="text-white/80">
                  We approach topics with an open mind and a desire to understand and explain complex concepts clearly.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-white/80">
                  We embrace new ideas and technologies, both in the subjects we cover and in how we deliver content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Nexus is more than just a blog—it's a community of curious minds. We encourage our readers to engage with
            our content, share their perspectives, and connect with others who share their interests.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
