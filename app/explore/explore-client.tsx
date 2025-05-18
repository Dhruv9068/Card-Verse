"use client"

import { useState, useEffect } from "react"
import ExploreCard from "@/components/Cards/ExploreCard"
import CategoryFilter from "@/components/Categories/CategoryFilter"
import { generateMockCards } from "@/lib/mock-data"
import "../explore.css"
import type { Card } from "@/lib/types"

export default function ExploreClient() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load cards on mount
  useEffect(() => {
    if (!isClient) return

    // Generate mock cards for exploration
    const allCards = generateMockCards(16)
    setCards(allCards)
    setIsLoading(false)

    // Save cards to localStorage
    try {
      const storedCards = localStorage.getItem("allMockCards")
      const existingCards = storedCards ? JSON.parse(storedCards) : []

      // Add new cards that don't already exist
      const updatedCards = [...existingCards]
      allCards.forEach((card) => {
        const exists = existingCards.some((c: Card) => c.id === card.id)
        if (!exists) {
          updatedCards.push(card)
        }
      })

      localStorage.setItem("allMockCards", JSON.stringify(updatedCards))
    } catch (error) {
      console.error("Error saving cards to localStorage:", error)
    }
  }, [isClient])

  // Track category views
  useEffect(() => {
    if (!isClient) return

    if (activeCategory !== "all") {
      // Track category viewed for challenges
      import("@/lib/challenge-tracker").then(({ trackAction }) => {
        trackAction("category_viewed", { category: activeCategory })
      })
    }
  }, [activeCategory, isClient])

  // Filter cards based on active category
  const filteredCards =
    activeCategory === "all"
      ? cards
      : cards.filter((card) => card.category.toLowerCase() === activeCategory.toLowerCase())

  // Sort cards based on sortBy
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === "popular") {
      return b.reactions.reduce((sum, r) => sum + r.count, 0) - a.reactions.reduce((sum, r) => sum + r.count, 0)
    } else if (sortBy === "newest") {
      return Number.parseInt(b.id.split("-")[1]) - Number.parseInt(a.id.split("-")[1])
    } else {
      return Number.parseInt(a.id.split("-")[1]) - Number.parseInt(b.id.split("-")[1])
    }
  })

  if (!isClient || isLoading) {
    return null // Return null to avoid any rendering until client-side
  }

  return (
    <div className="explore-content">
      <div className="explore-filters">
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="sort-options">
          <label className="sort-label">Sort by:</label>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="explore-results">
        <h2 className="results-title">
          {filteredCards.length} {filteredCards.length === 1 ? "card" : "cards"} found
        </h2>

        <div className="explore-grid">
          {sortedCards.map((card) => (
            <ExploreCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
