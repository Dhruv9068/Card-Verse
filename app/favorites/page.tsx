"use client"

import { useEffect, useState } from "react"
import FavoriteCard from "@/components/Cards/FavoriteCard"
import type { Card } from "@/types/card"
import PointsDisplay from "@/components/Points/PointsDisplay"
import RecommendationBanner from "@/components/Recommendations/RecommendationBanner"
import "../favorites.css"

export default function Favorites() {
  const [favorites, setFavorites] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    setIsLoading(false)
  }, [])

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1 className="page-title">Your Favorites</h1>
        <PointsDisplay />
      </div>

      <RecommendationBanner type="favorites" />

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your favorites...</p>
        </div>
      ) : favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((card) => (
            <FavoriteCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Start swiping cards and save some favorites!</p>
          <a href="/" className="action-button">
            Discover Cards
          </a>
        </div>
      )}
    </div>
  )
}
