"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import PointsDisplay from "@/components/Points/PointsDisplay"
import "./BookmarksPage.css"

interface Collection {
  id: string
  name: string
  description: string
  cards: Card[]
  coverImage: string
}

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  icon: string
  difficulty: "easy" | "medium" | "hard"
}

export default function BookmarksPage() {
  const [bookmarkedCards, setBookmarkedCards] = useState<Card[]>([])
  const [bookmarkedCollections, setBookmarkedCollections] = useState<Collection[]>([])
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState<Challenge[]>([])
  const [activeTab, setActiveTab] = useState<"cards" | "collections" | "challenges">("cards")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Replace the useEffect that loads bookmarks with this improved version
  useEffect(() => {
    loadBookmarks()
  }, [])

  // Add this function to load bookmarks
  const loadBookmarks = () => {
    setIsLoading(true)
    console.log("Loading bookmarks...")

    try {
      // Initialize bookmarks if they don't exist
      if (!localStorage.getItem("bookmarks")) {
        localStorage.setItem("bookmarks", JSON.stringify({}))
      }

      // Load bookmarks directly from localStorage
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
      console.log("Retrieved bookmarks:", bookmarks)

      // Get all card IDs that are bookmarked
      const cardIds = bookmarks.card || []
      console.log("Bookmarked card IDs:", cardIds)

      if (cardIds.length > 0) {
        // Generate a set of cards that will always include our bookmarked IDs
        const allCards = generateMockCards(50)

        // Create cards with the exact IDs we need
        const bookmarkedCards = cardIds.map((id) => {
          // Try to find an existing card with this ID
          const existingCard = allCards.find((card) => card.id === id)

          if (existingCard) {
            return existingCard
          } else {
            // Create a new card with this ID
            return {
              id: id,
              title: `Card ${id}`,
              description: "A bookmarked card",
              imageUrl: `https://picsum.photos/seed/${id}/600/400`,
              category: "Bookmarked",
              reactions: [{ emoji: "❤️", count: 10 }],
              addedAt: Date.now(),
            }
          }
        })

        console.log("Created bookmarked cards:", bookmarkedCards)
        setBookmarkedCards(bookmarkedCards)
      } else {
        setBookmarkedCards([])
      }

      // Load collections
      const collectionIds = bookmarks.collection || []
      const mockCollections: Collection[] = [
        {
          id: "collection-1",
          name: "Nature Collection",
          description: "Beautiful nature cards",
          cards: [],
          coverImage: "/nature-collection.png",
        },
        {
          id: "collection-2",
          name: "Technology Wonders",
          description: "Amazing technology cards",
          cards: [],
          coverImage: "/placeholder-sdchs.png",
        },
      ]
      const collections = mockCollections.filter((collection) => collectionIds.includes(collection.id))
      setBookmarkedCollections(collections)

      // Load challenges
      const challengeIds = bookmarks.challenge || []
      const mockChallenges: Challenge[] = [
        {
          id: "challenge-1",
          title: "First Steps",
          description: "Swipe through 5 cards",
          points: 50,
          completed: false,
          icon: "🚀",
          difficulty: "easy",
        },
        {
          id: "challenge-2",
          title: "Collector",
          description: "Add 3 cards to favorites",
          points: 100,
          completed: false,
          icon: "⭐",
          difficulty: "easy",
        },
      ]
      const challenges = mockChallenges.filter((challenge) => challengeIds.includes(challenge.id))
      setBookmarkedChallenges(challenges)
    } catch (error) {
      console.error("Error loading bookmarks:", error)
      // Initialize with empty arrays in case of error
      setBookmarkedCards([])
      setBookmarkedCollections([])
      setBookmarkedChallenges([])
    }

    setIsLoading(false)
  }

  // Replace the useEffect that listens for bookmark updates with this improved version
  useEffect(() => {
    // Function to handle bookmark updates
    const handleBookmarkUpdate = (event: CustomEvent) => {
      console.log("Bookmark update detected:", event.detail)
      loadBookmarks()
    }

    // Add event listener for bookmark updates
    window.addEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("bookmarkUpdated", handleBookmarkUpdate as EventListener)
    }
  }, [])

  const handleCardClick = (cardId: string) => {
    router.push(`/card/${cardId}`)
  }

  const handleCollectionClick = (collectionId: string) => {
    router.push(`/collections/${collectionId}`)
  }

  const handleChallengeClick = () => {
    router.push("/challenges")
  }

  return (
    <div className="bookmarks-page">
      <div className="page-header">
        <h1 className="page-title">Your Bookmarks</h1>
        <PointsDisplay />
      </div>

      <div className="bookmarks-tabs">
        <button className={`tab-button ${activeTab === "cards" ? "active" : ""}`} onClick={() => setActiveTab("cards")}>
          Cards ({bookmarkedCards.length})
        </button>
        <button
          className={`tab-button ${activeTab === "collections" ? "active" : ""}`}
          onClick={() => setActiveTab("collections")}
        >
          Collections ({bookmarkedCollections.length})
        </button>
        <button
          className={`tab-button ${activeTab === "challenges" ? "active" : ""}`}
          onClick={() => setActiveTab("challenges")}
        >
          Challenges ({bookmarkedChallenges.length})
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-pattern">
            <div className="pattern-square"></div>
            <div className="pattern-square"></div>
            <div className="pattern-square"></div>
            <div className="pattern-square"></div>
          </div>
          <p>Loading your bookmarks...</p>
        </div>
      ) : (
        <div className="bookmarks-content">
          {activeTab === "cards" && (
            <>
              {bookmarkedCards.length > 0 ? (
                <div className="bookmarked-cards-grid">
                  {bookmarkedCards.map((card) => (
                    <div key={card.id} className="bookmarked-card" onClick={() => handleCardClick(card.id)}>
                      <div className="bookmarked-card-image">
                        <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
                      </div>
                      <div className="bookmarked-card-content">
                        <h3 className="bookmarked-card-title">{card.title}</h3>
                        <p className="bookmarked-card-description">{card.description}</p>
                        <div className="bookmarked-card-category">{card.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-bookmarks">
                  <div className="empty-icon">🔖</div>
                  <h3>No bookmarked cards</h3>
                  <p>Bookmark cards to save them for later</p>
                  <button className="browse-button" onClick={() => router.push("/explore")}>
                    Browse Cards
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "collections" && (
            <>
              {bookmarkedCollections.length > 0 ? (
                <div className="bookmarked-collections-grid">
                  {bookmarkedCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="bookmarked-collection"
                      onClick={() => handleCollectionClick(collection.id)}
                    >
                      <div className="bookmarked-collection-image">
                        <img src={collection.coverImage || "/placeholder.svg"} alt={collection.name} />
                      </div>
                      <div className="bookmarked-collection-content">
                        <h3 className="bookmarked-collection-title">{collection.name}</h3>
                        <p className="bookmarked-collection-description">{collection.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-bookmarks">
                  <div className="empty-icon">🔖</div>
                  <h3>No bookmarked collections</h3>
                  <p>Bookmark collections to save them for later</p>
                  <button className="browse-button" onClick={() => router.push("/collections")}>
                    Browse Collections
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "challenges" && (
            <>
              {bookmarkedChallenges.length > 0 ? (
                <div className="bookmarked-challenges-grid">
                  {bookmarkedChallenges.map((challenge) => (
                    <div key={challenge.id} className="bookmarked-challenge" onClick={handleChallengeClick}>
                      <div className="challenge-icon">{challenge.icon}</div>
                      <div className="bookmarked-challenge-content">
                        <h3 className="bookmarked-challenge-title">{challenge.title}</h3>
                        <p className="bookmarked-challenge-description">{challenge.description}</p>
                        <div className="challenge-footer">
                          <div className="challenge-points">+{challenge.points} points</div>
                          <div className="challenge-difficulty">{challenge.difficulty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-bookmarks">
                  <div className="empty-icon">🔖</div>
                  <h3>No bookmarked challenges</h3>
                  <p>Bookmark challenges to save them for later</p>
                  <button className="browse-button" onClick={() => router.push("/challenges")}>
                    Browse Challenges
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
