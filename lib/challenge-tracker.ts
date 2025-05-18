/**
 * Challenge Tracker
 *
 * This module tracks user actions and checks if challenges are completed
 */

import { notify } from "@/components/Notifications/NotificationSystem"
import { addPoints } from "./points-system"
import { getItem, setItem, isBrowser } from "./storage-utils"

// Define challenge types
export type ChallengeDifficulty = "easy" | "medium" | "hard"

export interface Challenge {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  icon: string
  difficulty: ChallengeDifficulty
  badge?: string
  criteria: ChallengeCriteria
}

export interface ChallengeCriteria {
  type:
    | "swipe"
    | "favorite"
    | "collection"
    | "category"
    | "points"
    | "bookmark"
    | "visit"
    | "search"
    | "theme"
    | "voice"
    | "app_visit"
    | "view_cards"
  target: number
  progress: number
  categories?: string[]
  pages?: string[]
}

// Initialize challenges
export function initializeChallenges() {
  if (!isBrowser()) return

  const storedChallenges = getItem<Challenge[] | null>("challenges", null)

  if (storedChallenges) {
    return
  }

  // Create default challenges with real criteria
  const defaultChallenges: Challenge[] = [
    // New challenges as requested
    {
      id: "challenge-explorer",
      title: "Explorer",
      description: "Like 5 cards",
      points: 50,
      completed: false,
      icon: "🧭",
      badge: "Explorer",
      difficulty: "easy",
      criteria: {
        type: "favorite",
        target: 5,
        progress: 0,
      },
    },
    {
      id: "challenge-curator",
      title: "Curator",
      description: "Bookmark 3 cards",
      points: 75,
      completed: false,
      icon: "🔖",
      badge: "Curator",
      difficulty: "easy",
      criteria: {
        type: "bookmark",
        target: 3,
        progress: 0,
      },
    },
    {
      id: "challenge-organizer",
      title: "Organizer",
      description: "Create 1 collection",
      points: 100,
      completed: false,
      icon: "📚",
      badge: "Organizer",
      difficulty: "easy",
      criteria: {
        type: "collection",
        target: 1,
        progress: 0,
      },
    },
    {
      id: "challenge-regular",
      title: "Regular Visitor",
      description: "Visit the app 3 times",
      points: 60,
      completed: false,
      icon: "🏠",
      badge: "Regular Visitor",
      difficulty: "easy",
      criteria: {
        type: "app_visit",
        target: 3,
        progress: 0,
      },
    },
    {
      id: "challenge-learner",
      title: "Learner",
      description: "View 10 cards in any category",
      points: 80,
      completed: false,
      icon: "📖",
      badge: "Learner",
      difficulty: "easy",
      criteria: {
        type: "view_cards",
        target: 10,
        progress: 0,
      },
    },
    // Additional challenges for variety
    {
      id: "challenge-enthusiast",
      title: "Enthusiast",
      description: "Earn 500 points total",
      points: 150,
      completed: false,
      icon: "🏆",
      badge: "Enthusiast",
      difficulty: "medium",
      criteria: {
        type: "points",
        target: 500,
        progress: 0,
      },
    },
    {
      id: "challenge-explorer-plus",
      title: "Category Master",
      description: "View cards from all categories",
      points: 120,
      completed: false,
      icon: "🌟",
      badge: "Category Master",
      difficulty: "medium",
      criteria: {
        type: "category",
        target: 5, // Assuming 5 categories
        progress: 0,
        categories: [],
      },
    },
  ]

  setItem("challenges", defaultChallenges)
}

// Track user actions and update challenge progress
export function trackAction(action: string, data: any = {}) {
  if (!isBrowser()) return []

  const challenges = getItem<Challenge[]>("challenges", [])
  let updated = false

  const updatedChallenges = challenges.map((challenge: Challenge) => {
    // Skip already completed challenges
    if (challenge.completed) {
      return challenge
    }

    let shouldUpdate = false

    // Check different action types
    switch (action) {
      case "swipe":
        if (challenge.criteria.type === "swipe") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "favorite":
        if (challenge.criteria.type === "favorite") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "bookmark":
        if (challenge.criteria.type === "bookmark") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "collection_created":
        if (challenge.criteria.type === "collection") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "category_viewed":
        if (challenge.criteria.type === "category") {
          const category = data.category
          if (category && !challenge.criteria.categories?.includes(category)) {
            challenge.criteria.categories = [...(challenge.criteria.categories || []), category]
            challenge.criteria.progress = challenge.criteria.categories.length
            shouldUpdate = true
          }
        }
        break

      case "page_visited":
        if (challenge.criteria.type === "visit") {
          const page = data.page
          if (page) {
            // For specific pages like "explore", "help", etc.
            if (challenge.criteria.pages && challenge.criteria.pages.some((p) => page.includes(p))) {
              challenge.criteria.progress += 1
              shouldUpdate = true
            }
            // For card pages
            else if (challenge.criteria.pages && challenge.criteria.pages.includes("card") && page.includes("card")) {
              challenge.criteria.progress += 1
              shouldUpdate = true
            }
          }
        }
        break

      case "app_visit":
        if (challenge.criteria.type === "app_visit") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "view_card":
        if (challenge.criteria.type === "view_cards") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "search_performed":
        if (challenge.criteria.type === "search") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "theme_changed":
        if (challenge.criteria.type === "theme") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "voice_command_used":
        if (challenge.criteria.type === "voice") {
          challenge.criteria.progress += 1
          shouldUpdate = true
        }
        break

      case "points_earned":
        if (challenge.criteria.type === "points") {
          const currentPoints = getItem<number>("userPoints", 0)
          challenge.criteria.progress = currentPoints
          shouldUpdate = true
        }
        break
    }

    // Check if challenge is completed
    if (shouldUpdate && challenge.criteria.progress >= challenge.criteria.target) {
      challenge.completed = true
      updated = true

      // Award points for completing the challenge
      addPoints(challenge.points, `Completed challenge: ${challenge.title}`)

      // Show notification with badge info
      notify({
        message: `Challenge completed: ${challenge.title}! +${challenge.points} points. Unlocked "${challenge.badge}" badge!`,
        type: "success",
        duration: 5000,
      })

      // Track the badge in localStorage
      const badges = getItem<string[]>("user_badges", [])
      if (challenge.badge && !badges.includes(challenge.badge)) {
        badges.push(challenge.badge)
        setItem("user_badges", badges)
      }
    }

    return challenge
  })

  // Save updated challenges
  setItem("challenges", updatedChallenges)

  // If any challenge was completed, dispatch an event
  if (updated) {
    const event = new CustomEvent("challengesUpdated")
    window.dispatchEvent(event)
  }

  return updatedChallenges
}

// Get current challenge progress
export function getChallengeProgress(challengeId: string): number {
  if (!isBrowser()) return 0

  const challenges = getItem<Challenge[]>("challenges", [])
  const challenge = challenges.find((c: Challenge) => c.id === challengeId)

  if (!challenge) return 0

  return Math.min(100, (challenge.criteria.progress / challenge.criteria.target) * 100)
}

// Get all user badges
export function getUserBadges(): string[] {
  return getItem<string[]>("user_badges", [])
}

// Track app visit
export function trackAppVisit() {
  if (!isBrowser()) return

  // Get today's date as a string
  const today = new Date().toDateString()

  // Get stored visits
  const visits = getItem<string[]>("app_visits", [])

  // Check if we already recorded a visit today
  if (!visits.includes(today)) {
    visits.push(today)
    setItem("app_visits", visits)

    // Track the action for challenges
    trackAction("app_visit")
  }
}
