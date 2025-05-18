"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import type { Card } from "@/types/card"
import { useRouter } from "next/navigation"
import "./SwipeableCard.css"
// Add notify import
import { notify } from "@/components/Notifications/NotificationSystem"
import BookmarkButton from "@/components/Bookmarks/BookmarkButton"

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

interface SwipeableCardProps {
  card: Card
  onSwipe: (direction: "left" | "right", card: Card) => void
  isActive: boolean
}

export default function SwipeableCard({ card, onSwipe, isActive }: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const router = useRouter()

  // Reset card position when it becomes active
  useEffect(() => {
    if (isActive && cardRef.current) {
      gsap.to(cardRef.current, {
        x: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      setCurrentX(0)
      setSwipeDirection(null)
    }
  }, [isActive])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isActive) return
    setStartX(e.clientX)
    setIsDragging(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isActive) return
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isActive || !cardRef.current) return

    const deltaX = e.clientX - startX
    moveCard(deltaX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isActive || !cardRef.current) return

    const deltaX = e.touches[0].clientX - startX
    moveCard(deltaX)
  }

  const moveCard = (deltaX: number) => {
    if (!cardRef.current) return

    setCurrentX(deltaX)

    // Calculate rotation based on drag distance
    const rotation = deltaX * 0.1

    gsap.to(cardRef.current, {
      x: deltaX,
      rotation: rotation,
      duration: 0.1,
    })

    // Determine swipe direction
    if (deltaX > 50) {
      setSwipeDirection("right")
    } else if (deltaX < -50) {
      setSwipeDirection("left")
    } else {
      setSwipeDirection(null)
    }
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Update the handleDragEnd function to show notifications
  const handleDragEnd = () => {
    if (!isDragging || !isActive || !cardRef.current) return
    setIsDragging(false)

    const threshold = 100

    if (currentX > threshold) {
      // Swipe right
      gsap.to(cardRef.current, {
        x: window.innerWidth,
        rotation: 30,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          onSwipe("right", card)
          notify({
            message: "Card added to favorites! +10 points",
            type: "success",
          })
        },
      })
    } else if (currentX < -threshold) {
      // Swipe left
      gsap.to(cardRef.current, {
        x: -window.innerWidth,
        rotation: -30,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          onSwipe("left", card)
          notify({
            message: "Card skipped. +2 points",
            type: "info",
          })
        },
      })
    } else {
      // Return to center
      gsap.to(cardRef.current, {
        x: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      setSwipeDirection(null)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive || !cardRef.current) return

      if (e.key === "ArrowLeft") {
        gsap.to(cardRef.current, {
          x: -window.innerWidth,
          rotation: -30,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => onSwipe("left", card),
        })
      } else if (e.key === "ArrowRight") {
        gsap.to(cardRef.current, {
          x: window.innerWidth,
          rotation: 30,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => onSwipe("right", card),
        })
      }
    }

    if (isActive) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isActive, card, onSwipe])

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if not dragging
    if (!isDragging && Math.abs(currentX) < 10) {
      router.push(`/card/${card.id}`)
    }
  }

  // Add event listener for bookmark updates
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

  return (
    <div
      ref={cardRef}
      className={`swipeable-card ${isDragging ? "dragging" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleCardClick}
    >
      <div className="card-image">
        <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
        <div className="bookmark-container">
          <BookmarkButton itemId={card.id} itemType="card" />
        </div>
      </div>

      <div className="card-content">
        <h2 className="card-title">{card.title}</h2>
        <p className="card-description">{card.description}</p>

        <div className="card-reactions">
          {card.reactions.map((reaction) => (
            <span key={reaction.emoji} className="reaction">
              {reaction.emoji} {reaction.count}
            </span>
          ))}
        </div>
      </div>

      {swipeDirection && (
        <div className={`swipe-indicator ${swipeDirection}`}>{swipeDirection === "right" ? "LIKE" : "SKIP"}</div>
      )}
    </div>
  )
}
