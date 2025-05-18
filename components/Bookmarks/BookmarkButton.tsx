"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { addPoints } from "@/lib/points-system"
import "./BookmarkButton.css"
// Add notify import
import { notify } from "@/components/Notifications/NotificationSystem"

interface BookmarkButtonProps {
  itemId: string
  itemType: "card" | "collection" | "challenge"
  onBookmark?: (isBookmarked: boolean) => void
}

export default function BookmarkButton({ itemId, itemType, onBookmark }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if item is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
    const typeBookmarks = bookmarks[itemType] || []
    setIsBookmarked(typeBookmarks.includes(itemId))
  }, [itemId, itemType])

  // Replace the entire toggleBookmark function with this completely rewritten version
  const toggleBookmark = (e: React.MouseEvent) => {
    // Prevent event propagation to avoid card click
    e.stopPropagation()
    e.preventDefault()

    console.log("Toggle bookmark clicked for:", itemId, itemType)

    // Initialize bookmarks object if it doesn't exist
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify({}))
    }

    // Get current bookmarks
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")

    // Initialize the type array if it doesn't exist
    if (!bookmarks[itemType]) {
      bookmarks[itemType] = []
    }

    const typeBookmarks = bookmarks[itemType]
    const isCurrentlyBookmarked = typeBookmarks.includes(itemId)

    // Toggle bookmark status
    if (isCurrentlyBookmarked) {
      // Remove from bookmarks
      bookmarks[itemType] = typeBookmarks.filter((id: string) => id !== itemId)

      // Show notification
      notify({
        message: `Removed from bookmarks`,
        type: "info",
      })
    } else {
      // Add to bookmarks
      bookmarks[itemType] = [...typeBookmarks, itemId]

      // Add points for bookmarking
      addPoints(10, `Bookmarked a ${itemType}`)

      // Show notification
      notify({
        message: `Added to bookmarks! +10 points`,
        type: "success",
      })

      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }

    // Update localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    console.log("Updated bookmarks in localStorage:", bookmarks)

    // Update state
    setIsBookmarked(!isCurrentlyBookmarked)

    // Call callback if provided
    if (onBookmark) {
      onBookmark(!isCurrentlyBookmarked)
    }

    // Force a reload of the bookmarks page if we're on it
    if (window.location.pathname === "/bookmarks") {
      window.location.reload()
    }
  }

  return (
    <button
      className={`bookmark-button ${isBookmarked ? "bookmarked" : ""} ${isAnimating ? "animating" : ""}`}
      onClick={toggleBookmark}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bookmark-icon"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      {isAnimating && (
        <div className="bookmark-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      )}
    </button>
  )
}
