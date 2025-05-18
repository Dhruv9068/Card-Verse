"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import "./ExploreCard.css"
// Add notify import
import { notify } from "@/components/Notifications/NotificationSystem"
import BookmarkButton from "@/components/Bookmarks/BookmarkButton"

interface ExploreCardProps {
  card: Card
}

export default function ExploreCard({ card }: ExploreCardProps) {
  // Add this function at the beginning of the component, before the useState declarations
  const saveBookmark = (cardId: string, isBookmarked: boolean) => {
    // Initialize bookmarks if they don't exist
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify({}))
    }

    // Get current bookmarks
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")

    // Initialize the card array if it doesn't exist
    if (!bookmarks.card) {
      bookmarks.card = []
    }

    if (isBookmarked) {
      // Add to bookmarks if not already there
      if (!bookmarks.card.includes(cardId)) {
        bookmarks.card.push(cardId)
      }
    } else {
      // Remove from bookmarks
      bookmarks.card = bookmarks.card.filter((id: string) => id !== cardId)
    }

    // Update localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    console.log("Updated bookmarks in localStorage:", bookmarks)
  }

  const [isFavorite, setIsFavorite] = useState(() => {
    // Check if card is in favorites
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    return favorites.some((fav: Card) => fav.id === card.id)
  })
  const router = useRouter()

  // Update the toggleFavorite function to show notifications
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav: Card) => fav.id !== card.id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

      // Show notification
      notify({
        message: `Removed from favorites: ${card.title}`,
        type: "info",
      })
    } else {
      // Add to favorites
      localStorage.setItem("favorites", JSON.stringify([...favorites, card]))

      // Show notification
      notify({
        message: `Added to favorites: ${card.title}! +10 points`,
        type: "success",
      })
    }

    setIsFavorite(!isFavorite)
  }

  const handleCardClick = () => {
    router.push(`/card/${card.id}`)
  }

  // Update the useEffect to ensure it properly handles bookmark updates
  useEffect(() => {
    // Function to handle bookmark updates
    const handleBookmarkUpdate = (event: CustomEvent<any>) => {
      const { itemId, itemType, isBookmarked } = event.detail
      if (itemType === "card" && itemId === card.id) {
        // No need to update state as the BookmarkButton component handles its own state
        console.log(`Card ${card.id} bookmark status updated to: ${isBookmarked}`)
      }
    }

    // Add event listener
    window.addEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)
    }
  }, [card.id])

  // Add this useEffect after the existing useEffect
  useEffect(() => {
    // Add a click handler to the document to test bookmarks
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "b") {
        console.log("Current bookmarks:", JSON.parse(localStorage.getItem("bookmarks") || "{}"))
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return (
    <div className="explore-card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
        <div className="card-category">{card.category}</div>
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div className="bookmark-container">
          <BookmarkButton itemId={card.id} itemType="card" />
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-description">{card.description}</p>
        <div className="card-reactions">
          {card.reactions.map((reaction) => (
            <span key={reaction.emoji} className="reaction">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
