"use client"

import { useEffect, useState } from "react"
import CardRecommendations from "./CardRecommendations"

export default function SmartRecommendations() {
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Check if the user has interacted with the app (e.g., swiped a card)
    const swiped = localStorage.getItem("swiped")
    if (swiped && JSON.parse(swiped).length > 0) {
      setHasInteracted(true)
    }
  }, [])

  return (
    <>
      {hasInteracted ? (
        <CardRecommendations />
      ) : (
        <div className="empty-recommendations">{/* You can add a placeholder or a message here */}</div>
      )}
    </>
  )
}
