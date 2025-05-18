"use client"

import { useEffect, useState } from "react"
import PointsDisplay from "@/components/Points/PointsDisplay"
import "../leaderboard.css"

// Define the LeaderboardUser interface
interface LeaderboardUser {
  id: string
  name: string
  points: number
  rank: number
  avatar: string
  imageUrl: string
}

// Leaderboard page component
export default function Leaderboard() {
  // State for users and loading state
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null)

  // Load leaderboard data on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data

    // Generate mock leaderboard data
    const mockUsers: LeaderboardUser[] = [
      {
        id: "user-1",
        name: "CardMaster",
        points: 5280,
        rank: 1,
        avatar: "👑",
        imageUrl: "https://picsum.photos/seed/user-1/300/300",
      },
      {
        id: "user-2",
        name: "SwipeKing",
        points: 4950,
        rank: 2,
        avatar: "🏆",
        imageUrl: "https://picsum.photos/seed/user-2/300/300",
      },
      {
        id: "user-3",
        name: "CollectorPro",
        points: 4820,
        rank: 3,
        avatar: "🥇",
        imageUrl: "https://picsum.photos/seed/user-3/300/300",
      },
      {
        id: "user-4",
        name: "CardWizard",
        points: 4500,
        rank: 4,
        avatar: "🧙",
        imageUrl: "https://picsum.photos/seed/user-4/300/300",
      },
      {
        id: "user-5",
        name: "SwipeQueen",
        points: 4200,
        rank: 5,
        avatar: "👸",
        imageUrl: "https://picsum.photos/seed/user-5/300/300",
      },
      {
        id: "user-6",
        name: "CardNinja",
        points: 3800,
        rank: 6,
        avatar: "🥷",
        imageUrl: "https://picsum.photos/seed/user-6/300/300",
      },
      {
        id: "user-7",
        name: "CollectAll",
        points: 3600,
        rank: 7,
        avatar: "🦸",
        imageUrl: "https://picsum.photos/seed/user-7/300/300",
      },
      {
        id: "user-8",
        name: "SwipeMaster",
        points: 3400,
        rank: 8,
        avatar: "🔥",
        imageUrl: "https://picsum.photos/seed/user-8/300/300",
      },
      {
        id: "user-9",
        name: "CardGuru",
        points: 3200,
        rank: 9,
        avatar: "🧠",
        imageUrl: "https://picsum.photos/seed/user-9/300/300",
      },
      {
        id: "user-10",
        name: "SwipeExpert",
        points: 3000,
        rank: 10,
        avatar: "⚡",
        imageUrl: "https://picsum.photos/seed/user-10/300/300",
      },
    ]

    // Get current user's points from localStorage
    const currentPoints = Number.parseInt(localStorage.getItem("userPoints") || "0")

    // Add current user to the leaderboard
    const currentUser: LeaderboardUser = {
      id: "current-user",
      name: "You",
      points: currentPoints,
      rank: 0, // Will be calculated
      avatar: "😎",
      imageUrl: "https://picsum.photos/seed/current-user/300/300",
    }

    // Combine and sort all users by points (highest first)
    const allUsers = [...mockUsers, currentUser].sort((a, b) => b.points - a.points)

    // Update ranks based on sorted order
    allUsers.forEach((user, index) => {
      user.rank = index + 1
      if (user.id === "current-user") {
        setCurrentUserRank(index + 1)
      }
    })

    // Update state
    setUsers(allUsers)
    setIsLoading(false)
  }, [])

  // Render the leaderboard
  return (
    <div className="leaderboard-page">
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
        <PointsDisplay />
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      ) : (
        <>
          <div className="leaderboard-info">
            {currentUserRank && (
              <div className="user-rank">
                Your Rank: <span className="rank-number">#{currentUserRank}</span>
              </div>
            )}
            <div className="leaderboard-description">
              Compete with other users and earn points by completing challenges and daily activities.
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-header">
              <div className="rank-column">Rank</div>
              <div className="user-column">User</div>
              <div className="points-column">Points</div>
            </div>

            <div className="leaderboard-body">
              {users.map((user) => (
                <div key={user.id} className={`leaderboard-row ${user.id === "current-user" ? "current-user" : ""}`}>
                  <div className="rank-column">
                    {user.rank <= 3 ? (
                      <span className={`top-rank rank-${user.rank}`}>{user.rank}</span>
                    ) : (
                      <span className="normal-rank">{user.rank}</span>
                    )}
                  </div>
                  <div className="user-column">
                    <div className="user-avatar">
                      <img
                        src={user.imageUrl || "/placeholder.svg"}
                        alt={`${user.name}'s avatar`}
                        className="user-avatar-img"
                        loading="lazy"
                      />
                    </div>
                    <span className="user-name">{user.name}</span>
                  </div>
                  <div className="points-column">{user.points.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
