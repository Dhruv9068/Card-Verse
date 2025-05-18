"use client"

import { useEffect, useState } from "react"
import { getItem } from "@/lib/storage-utils"
import "./PointsDisplay.css"

interface PointsDisplayProps {
  size?: "small" | "medium" | "large"
}

export default function PointsDisplay({ size = "medium" }: PointsDisplayProps) {
  const [points, setPoints] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Load points from localStorage
    const storedPoints = getItem<number>("userPoints", 0)
    setPoints(storedPoints)

    // Listen for points changes
    const handlePointsChange = () => {
      const newPoints = getItem<number>("userPoints", 0)
      if (newPoints > points) {
        setShowAnimation(true)
        setTimeout(() => setShowAnimation(false), 2000)
      }
      setPoints(newPoints)
    }

    window.addEventListener("pointsUpdated", handlePointsChange)

    return () => {
      window.removeEventListener("pointsUpdated", handlePointsChange)
    }
  }, [isClient, points])

  if (!isClient) {
    // Return a placeholder during server rendering
    return (
      <div className={`points-display ${size}`}>
        <div className="points-icon">✨</div>
        <div className="points-info">
          <span className="points-value">0</span>
          <span className="points-label">Points</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`points-display ${size} ${showAnimation ? "animate" : ""}`}>
      <div className="points-icon">✨</div>
      <div className="points-info">
        <span className="points-value">{points}</span>
        <span className="points-label">Points</span>
      </div>
    </div>
  )
}
