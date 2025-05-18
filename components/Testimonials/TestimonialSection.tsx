"use client"

import { useState, useEffect } from "react"
import "./TestimonialSection.css"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
}

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UX Designer",
      content:
        "CardVerse has completely changed how I organize my design inspiration. The interface is intuitive and the card system makes it easy to categorize and find what I need.",
      avatar: "https://picsum.photos/seed/user1/100/100",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Content Creator",
      content:
        "As someone who works with visual content daily, CardVerse has become an essential tool in my workflow. The collections feature is a game-changer!",
      avatar: "https://picsum.photos/seed/user2/100/100",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Digital Artist",
      content:
        "I love how CardVerse makes organizing my art references so simple. The voice commands are surprisingly useful when my hands are busy with my tablet.",
      avatar: "https://picsum.photos/seed/user3/100/100",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>

        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`testimonial-card ${index === activeIndex ? "active" : ""}`}>
              <div className="testimonial-content">
                <div className="quote-mark">"</div>
                <p className="testimonial-text">{testimonial.content}</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
