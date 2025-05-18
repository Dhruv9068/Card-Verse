"use client"

import { useEffect, useState } from "react"
import ChallengeCard from "@/components/Challenges/ChallengeCard"
import PointsDisplay from "@/components/Points/PointsDisplay"
import "../challenges.css"

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  icon: string
  difficulty: "easy" | "medium" | "hard"
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Update the useEffect to initialize challenges
  useEffect(() => {
    // Load challenges from localStorage or initialize with defaults
    const storedChallenges = localStorage.getItem("challenges")

    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges))
    } else {
      // Initialize challenges with the challenge tracker
      import("@/lib/challenge-tracker").then(({ initializeChallenges }) => {
        initializeChallenges()
        const newChallenges = JSON.parse(localStorage.getItem("challenges") || "[]")
        setChallenges(newChallenges)
      })
    }

    // Listen for challenge updates
    const handleChallengeUpdate = () => {
      const updatedChallenges = JSON.parse(localStorage.getItem("challenges") || "[]")
      setChallenges(updatedChallenges)
    }

    window.addEventListener("challengesUpdated", handleChallengeUpdate)

    setIsLoading(false)

    return () => {
      window.removeEventListener("challengesUpdated", handleChallengeUpdate)
    }
  }, [])

  // Remove the completeChallenge function as challenges are now completed automatically
  // based on user actions tracked by the challenge tracker

  return (
    <div className="challenges-page">
      <div className="page-header">
        <h1 className="page-title">Challenges</h1>
        <PointsDisplay />
      </div>

      <div className="challenges-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(challenges.filter((c) => c.completed).length / challenges.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="progress-text">
          {challenges.filter((c) => c.completed).length} / {challenges.length} completed
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading challenges...</p>
        </div>
      ) : (
        <div className="challenges-grid">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} onComplete={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}
