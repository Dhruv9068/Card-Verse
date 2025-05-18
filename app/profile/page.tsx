"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import type { Card } from "@/types/card"
import PointsDisplay from "@/components/Points/PointsDisplay"
import PointsHistory from "@/components/Points/PointsHistory"
import { notify } from "@/components/Notifications/NotificationSystem"
import { getUserBadges } from "@/lib/challenge-tracker"
import FavoriteCard from "@/components/Cards/FavoriteCard"
import { getConsistentMockCards } from "@/lib/mock-data"
import "../profile.css"

// Define the PointsTransaction interface
interface PointsTransaction {
  id: string
  amount: number
  description: string
  timestamp: number
}

// Profile page component
export default function Profile() {
  // State for user stats
  const [stats, setStats] = useState({
    totalSwiped: 0,
    favorites: 0,
    collections: 0,
    categories: {},
  })

  // State for user mood and points history
  const [mood, setMood] = useState("neutral")
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([])
  const [userImage, setUserImage] = useState("https://picsum.photos/seed/user-profile/300/300")

  // State for user profile data
  const [username, setUsername] = useState("User")
  const [email, setEmail] = useState("user@example.com")
  const [notifications, setNotifications] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // State for tabs
  const [activeTab, setActiveTab] = useState("stats")
  const [favoriteCards, setFavoriteCards] = useState<Card[]>([])
  const [bookmarkedCards, setBookmarkedCards] = useState<Card[]>([])
  const [badges, setBadges] = useState<string[]>([])

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load user data on component mount
  useEffect(() => {
    // Load stats from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const swiped = JSON.parse(localStorage.getItem("swiped") || "[]")
    const collections = JSON.parse(localStorage.getItem("collections") || "[]")
    const transactions = JSON.parse(localStorage.getItem("pointsTransactions") || "[]")
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
    const userBadges = getUserBadges()

    // Load user profile data
    const storedUsername = localStorage.getItem("username")
    const storedEmail = localStorage.getItem("userEmail")
    const storedNotifications = localStorage.getItem("userNotifications")
    const storedUserImage = localStorage.getItem("userImage")

    if (storedUsername) setUsername(storedUsername)
    if (storedEmail) setEmail(storedEmail)
    if (storedNotifications) setNotifications(storedNotifications === "true")
    if (storedUserImage) setUserImage(storedUserImage)

    // Calculate category distribution
    const categories = swiped.reduce((acc: any, card: Card) => {
      if (!acc[card.category]) {
        acc[card.category] = 0
      }
      acc[card.category]++
      return acc
    }, {})

    // Update stats state
    setStats({
      totalSwiped: swiped.length,
      favorites: favorites.length,
      collections: collections.length,
      categories,
    })

    // Update points history state
    setPointsHistory(transactions)

    // Set mood based on favorites ratio
    if (swiped.length > 0) {
      const ratio = favorites.length / swiped.length
      if (ratio > 0.7) setMood("excited")
      else if (ratio > 0.4) setMood("happy")
      else if (ratio > 0.2) setMood("neutral")
      else setMood("bored")
    }

    // Set favorite cards
    setFavoriteCards(favorites)

    // Set bookmarked cards
    const allCards = getConsistentMockCards()
    const bookmarkedCardIds = bookmarks.card || []
    const bookmarkedCardsList = allCards.filter((card) => bookmarkedCardIds.includes(card.id))
    setBookmarkedCards(bookmarkedCardsList)

    // Set badges
    setBadges(userBadges)
  }, [])

  // Handle form submission
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Save user settings to localStorage
    localStorage.setItem("username", username)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("userNotifications", notifications.toString())

    // Show success notification
    notify({
      message: "Profile settings saved successfully!",
      type: "success",
    })

    // Exit edit mode
    setIsEditing(false)
  }

  // Handle profile image change
  function handleImageClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Process the selected image file
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setUserImage(imageUrl)
        localStorage.setItem("userImage", imageUrl)

        notify({
          message: "Profile picture updated!",
          type: "success",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Render the profile page
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar" onClick={handleImageClick}>
            <img src={userImage || "/placeholder.svg"} alt="User profile" className="avatar-image" />
            <div className="avatar-overlay">
              <div className="avatar-edit-icon">📷</div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="visually-hidden"
            />
          </div>
          <div className={`mood-ring ${mood}`}></div>
        </div>
        <h1 className="username">{username}</h1>
        <PointsDisplay size="large" />
      </div>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
        <button
          className={`profile-tab ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
        <button
          className={`profile-tab ${activeTab === "bookmarks" ? "active" : ""}`}
          onClick={() => setActiveTab("bookmarks")}
        >
          Bookmarks
        </button>
        <button
          className={`profile-tab ${activeTab === "badges" ? "active" : ""}`}
          onClick={() => setActiveTab("badges")}
        >
          Badges
        </button>
        <button
          className={`profile-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      {activeTab === "stats" && (
        <div className="profile-content">
          <div className="profile-column">
            <div className="stats-container">
              <h2 className="section-title">Your Stats</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{stats.totalSwiped}</div>
                  <div className="stat-label">Cards Swiped</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">{stats.favorites}</div>
                  <div className="stat-label">Favorites</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">{stats.collections}</div>
                  <div className="stat-label">Collections</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value">
                    {stats.totalSwiped > 0 ? Math.round((stats.favorites / stats.totalSwiped) * 100) : 0}%
                  </div>
                  <div className="stat-label">Save Rate</div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">Your Preferences</h2>
              <div className="preferences-chart">
                {Object.entries(stats.categories).length > 0 ? (
                  Object.entries(stats.categories).map(([category, count]) => (
                    <div key={category} className="preference-bar">
                      <div className="preference-label">{category}</div>
                      <div className="preference-track">
                        <div
                          className="preference-fill"
                          style={{
                            width: `${Math.min(100, (Number(count) / stats.totalSwiped) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="preference-value">{count}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-data">No preference data yet. Start swiping!</div>
                )}
              </div>
            </div>
          </div>

          <div className="profile-column">
            <div className="profile-section">
              <h2 className="section-title">Points History</h2>
              {pointsHistory.length > 0 ? (
                <PointsHistory transactions={pointsHistory} />
              ) : (
                <div className="no-data">No points history yet. Start earning points!</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "favorites" && (
        <div className="profile-content">
          <h2 className="section-title">Your Favorite Cards</h2>
          {favoriteCards.length > 0 ? (
            <div className="favorites-grid">
              {favoriteCards.map((card) => (
                <FavoriteCard key={card.id} card={card} />
              ))}
            </div>
          ) : (
            <div className="no-data">You haven't added any favorites yet. Start exploring!</div>
          )}
        </div>
      )}

      {activeTab === "bookmarks" && (
        <div className="profile-content">
          <h2 className="section-title">Your Bookmarked Cards</h2>
          {bookmarkedCards.length > 0 ? (
            <div className="bookmarks-grid">
              {bookmarkedCards.map((card) => (
                <div key={card.id} className="bookmark-card">
                  <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} className="bookmark-card-image" />
                  <div className="bookmark-card-content">
                    <h3 className="bookmark-card-title">{card.title}</h3>
                    <p className="bookmark-card-description">{card.description}</p>
                    <div className="bookmark-card-category">{card.category}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">You haven't bookmarked any cards yet. Start exploring!</div>
          )}
        </div>
      )}

      {activeTab === "badges" && (
        <div className="profile-content">
          <h2 className="section-title">Your Badges</h2>
          {badges.length > 0 ? (
            <div className="badges-grid">
              {badges.map((badge) => (
                <div key={badge} className="badge-card">
                  <div className="badge-icon">🏆</div>
                  <div className="badge-name">{badge}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">You haven't earned any badges yet. Complete challenges to earn badges!</div>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Account Settings</h2>
              {!isEditing && (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form className="settings-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label htmlFor="notifications">Notifications</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="notifications"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                  <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <div className="info-label">Username:</div>
                  <div className="info-value">{username}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Email:</div>
                  <div className="info-value">{email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Notifications:</div>
                  <div className="info-value">{notifications ? "Enabled" : "Disabled"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
