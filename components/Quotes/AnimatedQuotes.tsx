"use client"

import { useState, useEffect } from "react"
import "./AnimatedQuotes.css"

const quotes = [
  {
    text: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
  {
    text: "Good design is obvious. Great design is transparent.",
    author: "Joe Sparano",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "The function of design is letting design function.",
    author: "Micha Commeren",
  },
]

export default function AnimatedQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsAnimating(false)
      }, 500) // Wait for fade out animation to complete
    }, 8000) // Change quote every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="animated-quotes-section">
      <div className="quotes-container">
        <div className={`quote ${isAnimating ? "fade-out" : "fade-in"}`}>
          <div className="quote-mark start">"</div>
          <p className="quote-text">{quotes[currentQuote].text}</p>
          <div className="quote-mark end">"</div>
          <p className="quote-author">— {quotes[currentQuote].author}</p>
        </div>
      </div>
    </section>
  )
}
