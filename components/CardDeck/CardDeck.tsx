"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import SwipeableCard from "../Cards/SwipeableCard"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import { addPoints } from "@/lib/points-system"
import "./CardDeck.css"

// Add import for challenge tracker
import { trackAction } from "@/lib/challenge-tracker"

// Add this function at the beginning of the component, before the useState declarations
const saveCardToLocalStorage = (card: Card) => {
  // Get existing cards
  const allMockCards = JSON.parse(localStorage.getItem("allMockCards") || "[]")

  // Check if card already exists
  const exists = allMockCards.some((c: Card) => c.id === card.id)

  if (!exists) {
    // Add the new card
    allMockCards.push(card)

    // Save back to localStorage
    localStorage.setItem("allMockCards", JSON.stringify(allMockCards))
    console.log("Card saved to localStorage:", card.id)
  }
}

export default function CardDeck() {
  const [cards, setCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const deckRef = useRef<HTMLDivElement>(null)

  // Then modify the useEffect that loads cards to save them to localStorage
  useEffect(() => {
    // Load cards
    const mockCards = generateMockCards(10)
    setCards(mockCards)
    setIsLoading(false)

    // Save these cards to localStorage for consistent retrieval
    mockCards.forEach((card) => saveCardToLocalStorage(card))

    // Initialize swiped cards in localStorage if not exists
    if (!localStorage.getItem("swiped")) {
      localStorage.setItem("swiped", JSON.stringify([]))
    }

    if (!localStorage.getItem("favorites")) {
      localStorage.setItem("favorites", JSON.stringify([]))
    }
  }, [])

  // Update the handleSwipe function to track swipes for challenges
  const handleSwipe = (direction: "left" | "right", card: Card) => {
    // Add to swiped cards
    const swiped = JSON.parse(localStorage.getItem("swiped") || "[]")
    localStorage.setItem("swiped", JSON.stringify([...swiped, card]))

    // Track swipe action for challenges
    trackAction("swipe", { direction, card })

    // Add to favorites if swiped right
    if (direction === "right") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      localStorage.setItem("favorites", JSON.stringify([...favorites, card]))

      // Add points for adding to favorites
      addPoints(10, "Added card to favorites")

      // Track favorite action for challenges
      trackAction("favorite", { card })

      // Show emoji explosion
      showEmojiExplosion()
    } else {
      // Add points for swiping
      addPoints(2, "Swiped a card")
    }

    // Move to next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Reshuffle when all cards are swiped
      reshuffleCards()
    }
  }

  const reshuffleCards = () => {
    setIsLoading(true)

    // Generate new cards
    setTimeout(() => {
      const newCards = generateMockCards(10)
      setCards(newCards)
      setCurrentIndex(0)
      setIsLoading(false)

      // Add points for completing a deck
      addPoints(25, "Completed a card deck")
    }, 1000)
  }

  const showEmojiExplosion = () => {
    if (!deckRef.current) return

    const emojis = ["❤️", "👍", "🔥", "⭐", "🎉"]
    const container = deckRef.current

    for (let i = 0; i < 15; i++) {
      const emoji = document.createElement("div")
      emoji.className = "emoji-particle"
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]

      // Random position
      const x = Math.random() * 200 - 100
      const y = Math.random() * 200 - 100

      container.appendChild(emoji)

      // Animate with GSAP
      gsap.fromTo(
        emoji,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
        },
        {
          x: x,
          y: y,
          scale: 1 + Math.random(),
          opacity: 0,
          duration: 1 + Math.random(),
          ease: "power2.out",
          onComplete: () => {
            container.removeChild(emoji)
          },
        },
      )
    }
  }

  return (
    <div className="card-deck-container">
      <div className="card-deck" ref={deckRef}>
        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading cards...</p>
          </div>
        ) : (
          <>
            {cards.map((card, index) => (
              <div key={card.id} className={`card-wrapper ${index === currentIndex ? "active" : "hidden"}`}>
                <SwipeableCard card={card} onSwipe={handleSwipe} isActive={index === currentIndex} />
              </div>
            ))}

            <div className="card-counter">
              {currentIndex + 1} / {cards.length}
            </div>
          </>
        )}
      </div>

      <div className="swipe-instructions">
        <div className="swipe-instruction left">
          <span className="instruction-icon">👈</span>
          <span className="instruction-text">Swipe left to skip</span>
        </div>
        <div className="swipe-instruction right">
          <span className="instruction-text">Swipe right to like</span>
          <span className="instruction-icon">👉</span>
        </div>
      </div>
    </div>
  )
}
