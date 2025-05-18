"use client"

import { useEffect, useState } from "react"
import type { Card } from "@/types/card"
import CollectionCard from "@/components/Collections/CollectionCard"
import PointsDisplay from "@/components/Points/PointsDisplay"
import "../collections.css"

// Define the Collection interface
interface Collection {
  id: string
  name: string
  description: string
  cards: Card[]
  coverImage: string
}

// Collections page component
export default function Collections() {
  // State for collections and loading state
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load collections on component mount
  useEffect(() => {
    // Load collections from localStorage or initialize with defaults
    const storedCollections = localStorage.getItem("collections")

    if (storedCollections) {
      // If we have stored collections, use them
      setCollections(JSON.parse(storedCollections))
    } else {
      // Otherwise, create default collections
      const defaultCollections = [
        {
          id: "collection-1",
          name: "My First Collection",
          description: "Start adding cards to your first collection",
          cards: [],
          coverImage: "https://picsum.photos/seed/collection-1/600/400",
        },
        {
          id: "collection-2",
          name: "Nature Wonders",
          description: "Beautiful nature cards from around the world",
          cards: [],
          coverImage: "https://picsum.photos/seed/nature-collection/600/400",
        },
        {
          id: "collection-3",
          name: "Tech Innovations",
          description: "The latest in technology and innovation",
          cards: [],
          coverImage: "https://picsum.photos/seed/tech-collection/600/400",
        },
      ]

      // Store the default collections in localStorage
      localStorage.setItem("collections", JSON.stringify(defaultCollections))
      setCollections(defaultCollections)
    }

    // Set loading state to false
    setIsLoading(false)
  }, [])

  // Function to create a new collection
  function createNewCollection() {
    // Create a new collection object
    const newCollection = {
      id: `collection-${Date.now()}`,
      name: "New Collection",
      description: "Add a description for your collection",
      cards: [],
      coverImage: "https://picsum.photos/seed/new-collection/600/400",
    }

    // Add the new collection to the existing collections
    const updatedCollections = [...collections, newCollection]

    // Update state and localStorage
    setCollections(updatedCollections)
    localStorage.setItem("collections", JSON.stringify(updatedCollections))

    // Track collection creation for challenges
    import("@/lib/challenge-tracker").then(({ trackAction }) => {
      trackAction("collection_created", { collection: newCollection })
    })

    // Show notification
    import("@/components/Notifications/NotificationSystem").then(({ notify }) => {
      notify({
        message: "New collection created!",
        type: "success",
      })
    })
  }

  return (
    <div className="collections-page">
      <div className="page-header">
        <h1 className="page-title">Your Collections</h1>
        <PointsDisplay />
      </div>

      <div className="collections-actions">
        <button className="create-collection-btn" onClick={createNewCollection}>
          Create New Collection
        </button>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your collections...</p>
        </div>
      ) : (
        <div className="collections-grid">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}
