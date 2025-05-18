"use client"

import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import "./CollectionCard.css"
import { notify } from "@/components/Notifications/NotificationSystem"

// Define the Collection interface
interface Collection {
  id: string
  name: string
  description: string
  cards: Card[]
  coverImage: string
}

// Props interface
interface CollectionCardProps {
  collection: Collection
}

// CollectionCard component
export default function CollectionCard({ collection }: CollectionCardProps) {
  // Get the router
  const router = useRouter()

  // Handle click on the collection card
  function handleClick() {
    // Show notification
    notify({
      message: `Opening collection: ${collection.name}`,
      type: "info",
    })

    // Navigate to collection detail page
    router.push(`/collections/${collection.id}`)
  }

  // Render the collection card
  return (
    <div className="collection-card" onClick={handleClick}>
      <div className="collection-image">
        <img src={collection.coverImage || "/placeholder.svg"} alt={collection.name} loading="lazy" />
        <div className="card-count">{collection.cards.length} cards</div>
      </div>
      <div className="collection-content">
        <h3 className="collection-name">{collection.name}</h3>
        <p className="collection-description">{collection.description}</p>
      </div>
    </div>
  )
}
