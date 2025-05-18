"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Card } from "@/types/card"
import { useRouter } from "next/navigation"
import "./FavoriteCard.css"
import { notify } from "@/components/Notifications/NotificationSystem"
import BookmarkButton from "@/components/Bookmarks/BookmarkButton"

interface FavoriteCardProps {
  card: Card
}

export default function FavoriteCard({ card }: FavoriteCardProps) {
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
  const [isRemoving, setIsRemoving] = useState(false)
  const router = useRouter()

  const removeFromFavorites = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRemoving(true)

    setTimeout(() => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      const updatedFavorites = favorites.filter((fav: Card) => fav.id !== card.id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

      // Show notification
      notify({
        message: `Removed from favorites: ${card.title}`,
        type: "info",
      })

      // Force a reload to update the UI
      window.location.reload()
    }, 300)
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
        saveBookmark(card.id, isBookmarked)
      }
    }

    // Add event listener
    window.addEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)
    }
  }, [card.id])

  return (
    <div className={`favorite-card ${isRemoving ? "removing" : ""}`} onClick={handleCardClick}>
      <div className="card-image">
        <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
        <button className="remove-btn" onClick={removeFromFavorites} aria-label="Remove from favorites">
          ✕
        </button>
        <div className="bookmark-container">
          <BookmarkButton itemId={card.id} itemType="card" />
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-description">{card.description}</p>
        <div className="card-category">{card.category}</div>
      </div>
    </div>
  )
}
