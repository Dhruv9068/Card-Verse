"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../ThemeProvider/ThemeProvider"
import "./LoadingScreen.css"

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete: () => void
}

// Array of inspirational quotes about cards, collections, and discovery
const quotes = [
  {
    text: "Every card tells a story waiting to be discovered.",
    author: "CardVerse Team",
  },
  {
    text: "The joy of collecting is not in possessing, but in discovering.",
    author: "Anonymous Collector",
  },
  {
    text: "In the world of cards, every swipe is a new adventure.",
    author: "CardVerse Wisdom",
  },
  {
    text: "Collections are memories organized into beautiful patterns.",
    author: "Card Enthusiast",
  },
  {
    text: "The best discoveries happen when you're not afraid to explore.",
    author: "CardVerse Philosophy",
  },
  {
    text: "Behind every card is a world of imagination and creativity.",
    author: "Design Team",
  },
  {
    text: "Curate your collection, express your personality.",
    author: "Collection Master",
  },
  {
    text: "The perfect card is the one that speaks to your heart.",
    author: "CardVerse Creator",
  },
]

export default function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const { theme } = useTheme()
  const [quote, setQuote] = useState({ text: "", author: "" })
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Select a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)

    if (isLoading) {
      setOpacity(1)

      // Set a timer to complete loading after 3 seconds
      const timer = setTimeout(() => {
        setOpacity(0)

        // Wait for fade out animation to complete before calling onLoadingComplete
        setTimeout(() => {
          onLoadingComplete()
        }, 500)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isLoading, onLoadingComplete])

  if (!isLoading) return null

  return (
    <div className={`loading-screen ${theme}`} style={{ opacity }}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-logo-text">
            Card<span className="loading-logo-accent">Verse</span>
          </span>
        </div>

        <div className="loading-spinner"></div>

        <div className="quote-container">
          <div className="quote">{quote.text}</div>
          <div className="quote-author">— {quote.author}</div>
        </div>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>
      </div>
    </div>
  )
}
