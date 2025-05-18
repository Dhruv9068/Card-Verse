"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import { addPoints } from "@/lib/points-system"
import RecommendationBanner from "@/components/Recommendations/RecommendationBanner"
import CardRecommendations from "@/components/Recommendations/CardRecommendations"
import BookmarkButton from "@/components/Bookmarks/BookmarkButton"
import { gsap } from "gsap"
import "../../card/[id]/card-detail.css"

export default function CardDetail() {
  const params = useParams()
  const router = useRouter()
  const [card, setCard] = useState<Card | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [relatedCards, setRelatedCards] = useState<Card[]>([])

  useEffect(() => {
    // Find the card by ID
    const cardId = params.id as string

    // Check localStorage first
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const swiped = JSON.parse(localStorage.getItem("swiped") || "[]")

    // Look for the card in favorites or swiped
    let foundCard = favorites.find((c: Card) => c.id === cardId) || swiped.find((c: Card) => c.id === cardId)

    if (!foundCard) {
      // If not found, generate a mock card
      const mockCards = generateMockCards(1)
      foundCard = mockCards[0]
      foundCard.id = cardId
    }

    setCard(foundCard)
    setIsFavorite(favorites.some((c: Card) => c.id === cardId))

    // Generate related cards
    const mockRelated = generateMockCards(3)
    setRelatedCards(mockRelated)

    // Add points for viewing a card
    addPoints(5, "Viewed card details")

    setIsLoading(false)
  }, [params.id])

  // Add animations when card loads
  useEffect(() => {
    if (!isLoading && card) {
      // Animate card details
      gsap.fromTo(
        ".card-detail-container",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
      )

      // Animate related cards with stagger
      gsap.fromTo(
        ".related-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
        },
      )
    }
  }, [isLoading, card])

  const toggleFavorite = () => {
    if (!card) return

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((c: Card) => c.id !== card.id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } else {
      // Add to favorites
      localStorage.setItem("favorites", JSON.stringify([...favorites, card]))
      setIsFavorite(true)
      addPoints(10, "Added card to favorites")
    }
  }

  const handleRelatedCardClick = (cardId: string) => {
    router.push(`/card/${cardId}`)
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-animation">
          <div className="loading-card"></div>
          <div className="loading-card"></div>
          <div className="loading-card"></div>
        </div>
        <p>Loading card details...</p>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="error-state">
        <h2>Card not found</h2>
        <p>The card you're looking for doesn't exist.</p>
        <button className="back-button" onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="card-detail-page">
      <div className="card-detail-container">
        <div className="card-image-container">
          <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} className="card-image" />
          <div className="card-actions-overlay">
            <button className={`favorite-button ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
              {isFavorite ? "❤️" : "🤍"}
            </button>
            <BookmarkButton itemId={card.id} itemType="card" />
          </div>
        </div>

        <div className="card-info">
          <h1 className="card-title">{card.title}</h1>

          <div className="card-category">
            Category: <span className="category-name">{card.category}</span>
          </div>

          <p className="card-description">{card.description}</p>

          <div className="card-reactions">
            {card.reactions.map((reaction) => (
              <span key={reaction.emoji} className="reaction">
                {reaction.emoji} {reaction.count}
              </span>
            ))}
          </div>

          <div className="card-actions">
            <button className="back-button" onClick={() => router.push("/")}>
              Back to Cards
            </button>
            <button className="share-button">Share Card</button>
          </div>
        </div>
      </div>

      <RecommendationBanner type="card" cardCategory={card.category} />

      <div className="related-cards-section">
        <h2 className="section-title">Related Cards</h2>

        <div className="related-cards-grid">
          {relatedCards.map((relatedCard) => (
            <div key={relatedCard.id} className="related-card" onClick={() => handleRelatedCardClick(relatedCard.id)}>
              <img
                src={relatedCard.imageUrl || "/placeholder.svg"}
                alt={relatedCard.title}
                className="related-card-image"
              />
              <div className="related-card-content">
                <h3 className="related-card-title">{relatedCard.title}</h3>
                <div className="related-card-category">{relatedCard.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CardRecommendations cardId={card.id} category={card.category} />
    </div>
  )
}
