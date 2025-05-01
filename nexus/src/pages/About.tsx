import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Nexus</h1>

        <div className="mb-8 rounded-xl overflow-hidden">
          <img src="/placeholder.svg?height=400&width=800" alt="Nexus Team" className="w-full h-auto" />
        </div>

        <div className="prose prose-blue max-w-none mb-12">
          <h2>Our Mission</h2>
          <p>
            At Nexus, we believe in the power of knowledge and the importance of staying informed in our rapidly
            evolving world. Our mission is to provide insightful, accurate, and engaging content that bridges the gap
            between complex topics and everyday understanding.
          </p>

          <h2>Who We Are</h2>
          <p>
            Nexus was founded in 2020 by a group of journalists, scientists, and technology enthusiasts who saw the need
            for accessible yet in-depth coverage of the innovations and discoveries shaping our future. Our team has
            grown to include experts from various fields, all united by a passion for clear communication and a
            commitment to journalistic integrity.
          </p>

          <h2>What We Cover</h2>
          <p>
            Our content spans a wide range of topics, with a focus on technology, science, space exploration, and
            programming. We strive to explain complex concepts in accessible ways without sacrificing accuracy or
            nuance. Whether you're a professional in these fields or simply curious about the world around you, Nexus
            offers content that informs, challenges, and inspires.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Accuracy:</strong> We prioritize factual reporting and thorough research in all our articles.
            </li>
            <li>
              <strong>Accessibility:</strong> We believe knowledge should be accessible to everyone, regardless of their
              background.
            </li>
            <li>
              <strong>Curiosity:</strong> We approach topics with an open mind and a desire to understand and explain.
            </li>
            <li>
              <strong>Innovation:</strong> We embrace new ideas and technologies, both in the subjects we cover and in
              how we deliver content.
            </li>
          </ul>

          <h2>Join Our Community</h2>
          <p>
            Nexus is more than just a blog—it's a community of curious minds. We encourage our readers to engage with
            our content, share their perspectives, and connect with others who share their interests. Follow us on
            social media, subscribe to our newsletter, or reach out directly through our contact page.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Link to="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700">Contact Us</Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Explore Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About
