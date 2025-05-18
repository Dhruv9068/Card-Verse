"use client"

import "./ChallengeCard.css"
import { notify } from "@/components/Notifications/NotificationSystem"
import { useState, useEffect } from "react"
import { getChallengeProgress } from "@/lib/challenge-tracker"

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  icon: string
  difficulty: "easy" | "medium" | "hard"
  criteria: {
    progress: number
    target: number
  }
}

interface ChallengeCardProps {
  challenge: Challenge
  onComplete: (challengeId: string) => void
}

export default function ChallengeCard({ challenge, onComplete }: ChallengeCardProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Get initial progress
    const initialProgress = getChallengeProgress(challenge.id)
    setProgress(initialProgress)

    // Update progress when challenges are updated
    const handleChallengeUpdate = () => {
      const updatedProgress = getChallengeProgress(challenge.id)
      setProgress(updatedProgress)
    }

    window.addEventListener("challengesUpdated", handleChallengeUpdate)
    window.addEventListener("pointsUpdated", handleChallengeUpdate)

    return () => {
      window.removeEventListener("challengesUpdated", handleChallengeUpdate)
      window.removeEventListener("pointsUpdated", handleChallengeUpdate)
    }
  }, [challenge.id])

  const handleComplete = () => {
    if (!challenge.completed) {
      onComplete(challenge.id)

      // Show notification
      notify({
        message: `Challenge completed: ${challenge.title}! +${challenge.points} points`,
        type: "success",
        duration: 4000,
      })
    }
  }

  return (
    <div className={`challenge-card ${challenge.completed ? "completed" : ""} ${challenge.difficulty}`}>
      <div className="challenge-icon">{challenge.icon}</div>
      <div className="challenge-content">
        <h3 className="challenge-title">{challenge.title}</h3>
        <p className="challenge-description">{challenge.description}</p>
        <div className="challenge-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            {challenge.criteria.progress} / {challenge.criteria.target}
          </div>
        </div>
        <div className="challenge-footer">
          <div className="challenge-points">+{challenge.points} points</div>
          <div className="challenge-difficulty">{challenge.difficulty}</div>
        </div>
      </div>
      <button
        className={`complete-button ${challenge.completed ? "completed" : ""}`}
        onClick={handleComplete}
        disabled={challenge.completed}
      >
        {challenge.completed ? "Completed" : "Complete"}
      </button>
    </div>
  )
}
