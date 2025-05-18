"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import PointsDisplay from "@/components/Points/PointsDisplay"
import { notify } from "@/components/Notifications/NotificationSystem"
import "./collection-detail.css"

// Define the Collection interface
interface Collection {
  id: string
  name: string
  description: string
  cards: Card[]
  coverImage: string
}

export default function CollectionDetail() {
  const params = useParams()
  const router = useRouter()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")

  useEffect(() => {
    // Load collection data
    const collectionId = params.id as string
    const storedCollections = JSON.parse(localStorage.getItem("collections") || "[]")
    const foundCollection = storedCollections.find((c: Collection) => c.id === collectionId)

    if (foundCollection) {
      // If collection has no cards, generate some mock cards
      if (!foundCollection.cards || foundCollection.cards.length === 0) {
        foundCollection.cards = generateMockCards(4)
      }

      setCollection(foundCollection)
      setEditName(foundCollection.name)
      setEditDescription(foundCollection.description)
    }

    setIsLoading(false)
  }, [params.id])

  // Handle save collection changes
  function handleSaveChanges() {
    if (!collection) return

    // Update collection
    const updatedCollection = {
      ...collection,
      name: editName,
      description: editDescription,
    }

    // Update in localStorage
    const storedCollections = JSON.parse(localStorage.getItem("collections") || "[]")
    const updatedCollections = storedCollections.map((c: Collection) =>
      c.id === collection.id ? updatedCollection : c,
    )

    localStorage.setItem("collections", JSON.stringify(updatedCollections))
    setCollection(updatedCollection)
    setIsEditing(false)

    notify({
      message: "Collection updated successfully!",
      type: "success",
    })
  }

  // Handle card click
  function handleCardClick(cardId: string) {
    router.push(`/card/${cardId}`)
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading collection...</p>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="error-state">
        <h2>Collection not found</h2>
        <p>The collection you're looking for doesn't exist.</p>
        <button className="back-button" onClick={() => router.push("/collections")}>
          Back to Collections
        </button>
      </div>
    )
  }

  return (
    <div className="collection-detail-page">
      <div className="collection-header">
        <div className="collection-cover">
          <img src={collection.coverImage || "/placeholder.svg"} alt={collection.name} />
        </div>

        <div className="collection-info">
          {isEditing ? (
            <div className="collection-edit-form">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="collection-name-input"
                placeholder="Collection name"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="collection-description-input"
                placeholder="Collection description"
              />
              <div className="edit-actions">
                <button className="save-button" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="collection-name">{collection.name}</h1>
              <p className="collection-description">{collection.description}</p>
              <div className="collection-meta">
                <span className="card-count">{collection.cards.length} cards</span>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit Collection
                </button>
              </div>
            </>
          )}
        </div>

        <div className="collection-actions">
          <PointsDisplay />
        </div>
      </div>

      <div className="collection-content">
        <h2 className="section-title">Cards in this Collection</h2>

        {collection.cards.length > 0 ? (
          <div className="collection-cards-grid">
            {collection.cards.map((card) => (
              <div key={card.id} className="collection-card" onClick={() => handleCardClick(card.id)}>
                <div className="card-image">
                  <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <div className="card-category">{card.category}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-collection">
            <p>This collection is empty. Add cards to your collection!</p>
            <button className="explore-button" onClick={() => router.push("/explore")}>
              Explore Cards
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
