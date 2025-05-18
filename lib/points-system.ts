// Points system for tracking user points

// Add notify import
import { notify } from "@/components/Notifications/NotificationSystem"

// Add import for challenge tracker
import { trackAction } from "./challenge-tracker"
import { getItem, setItem, isBrowser } from "./storage-utils"

// Define a points transaction
interface PointsTransaction {
  id: string
  amount: number
  description: string
  timestamp: number
}

// Add points to the user's account
export function addPoints(amount: number, description: string): void {
  if (!isBrowser()) return

  try {
    // Get current points
    const currentPoints = getItem<number>("userPoints", 0)

    // Calculate new points total
    const newPoints = currentPoints + amount

    // Save to localStorage
    setItem("userPoints", newPoints)

    // Create a transaction record
    const transaction: PointsTransaction = {
      id: `transaction-${Date.now()}`,
      amount,
      description,
      timestamp: Date.now(),
    }

    // Get existing transactions
    const transactions = getItem<PointsTransaction[]>("pointsTransactions", [])

    // Add new transaction
    transactions.push(transaction)

    // Save transactions
    setItem("pointsTransactions", transactions)

    // Show notification
    notify({
      message: `${description}: +${amount} points`,
      type: "success",
      duration: 2000,
    })

    // Track points earned for challenges
    trackAction("points_earned", { amount })

    // Dispatch event to notify components
    const event = new Event("pointsUpdated")
    window.dispatchEvent(event)
  } catch (error) {
    console.error("Error adding points:", error)
  }
}

// Get current points
export function getPoints(): number {
  return getItem<number>("userPoints", 0)
}

// Get points history
export function getPointsHistory(): PointsTransaction[] {
  return getItem<PointsTransaction[]>("pointsTransactions", [])
}
