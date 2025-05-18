"use client"

// Imports
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./CardRecommendations.css"

// Register ScrollTrigger plugin if we're in the browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Props interface
interface CardRecommendationsProps {
  cardId?: string
  category?: string
}

/**
 * CardRecommendations Component
 *
 * Displays a grid of recommended cards based on the current card or category
 */
export default function CardRecommendations({ cardId, category }: CardRecommendationsProps) {
  // State for recommendations
  const [recommendations, setRecommendations] = useState<Card[]>([])

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Router for navigation
  const router = useRouter()

  // Load recommendations on component mount or when cardId/category changes
  useEffect(() => {
    // Generate recommendations based on category or random
    function generateRecommendations() {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const allCards = generateMockCards(6)

      // If category is provided, prioritize cards from that category
      if (category) {
        const categoryCards = allCards.map((card) => ({
          ...card,
          category: Math.random() > 0.7 ? card.category : category,
        }))
        setRecommendations(categoryCards)
      } else {
        setRecommendations(allCards)
      }
    }

    generateRecommendations()
  }, [category, cardId])

  // Set up animations when recommendations change
  useEffect(() => {
    // Initialize animations when component mounts
    if (containerRef.current && cardsRef.current && typeof window !== "undefined") {
      // Animate cards on scroll
      gsap.fromTo(
        cardsRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }
  }, [recommendations])

  // Handle click on a recommendation card
  function handleCardClick(card: Card) {
    router.push(`/card/${card.id}`)
  }

  // Render the recommendations
  return (
    <div className="card-recommendations" ref={containerRef}>
      <h2 className="recommendations-title">Recommended for you</h2>
      <p className="recommendations-subtitle">Based on your interests and activity</p>

      <div className="recommendations-grid" ref={cardsRef}>
        {recommendations.map((card) => (
          <div key={card.id} className="recommendation-card" onClick={() => handleCardClick(card)}>
            <div className="recommendation-card-image">
              <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} loading="lazy" />
              <div className="recommendation-card-category">{card.category}</div>
            </div>
            <div className="recommendation-card-content">
              <h3 className="recommendation-card-title">{card.title}</h3>
              <p className="recommendation-card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
