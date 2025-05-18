"use client"

// Imports
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import "./RecommendationBanner.css"

// Props interface
interface RecommendationBannerProps {
  type?: "home" | "favorites" | "card"
  cardCategory?: string
}

/**
 * RecommendationBanner Component
 *
 * Displays a banner with a recommended card based on the context
 */
export default function RecommendationBanner({ type = "home", cardCategory }: RecommendationBannerProps) {
  // State for the recommendation
  const [recommendation, setRecommendation] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(true) // not used yet but might need later
  const router = useRouter()

  // Load recommendation on component mount or when type/category changes
  useEffect(() => {
    // Generate a recommendation based on type
    const generateRecommendation = () => {
      setIsLoading(true)

      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockCards = generateMockCards(1)
      const card = mockCards[0]

      // If type is card and category is provided, match the category
      if (type === "card" && cardCategory) {
        card.category = cardCategory
      }

      setRecommendation(card)
      setIsLoading(false)
    }

    generateRecommendation()
  }, [type, cardCategory])

  // Handle click on the recommendation
  const handleClick = () => {
    if (recommendation) {
      router.push(`/card/${recommendation.id}`)
    }
  }

  // Don't render anything if there's no recommendation
  if (!recommendation) return null

  // Render the recommendation banner
  return (
    <div className="recommendation-banner" onClick={handleClick}>
      <div className="recommendation-image">
        <img src={recommendation.imageUrl || "/placeholder.svg"} alt={recommendation.title} loading="lazy" />
      </div>
      <div className="recommendation-content">
        <div className="recommendation-label">
          {type === "home" && "Recommended for you"}
          {type === "favorites" && "Based on your favorites"}
          {type === "card" && "Similar to what you're viewing"}
        </div>
        <h3 className="recommendation-title">{recommendation.title}</h3>
        <p className="recommendation-description">{recommendation.description}</p>
        <div className="recommendation-category">{recommendation.category}</div>
      </div>
    </div>
  )
}
