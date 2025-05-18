/**
 * Debug Helper Functions
 *
 * This file contains utility functions to help with debugging
 */

// Function to log the current state of bookmarks
export function logBookmarks() {
  try {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
    console.log("Current bookmarks:", bookmarks)

    // Count items in each category
    const counts = {
      card: (bookmarks.card || []).length,
      collection: (bookmarks.collection || []).length,
      challenge: (bookmarks.challenge || []).length,
    }

    console.log("Bookmark counts:", counts)

    return { bookmarks, counts }
  } catch (error) {
    console.error("Error logging bookmarks:", error)
    return null
  }
}

// Function to initialize bookmarks if they don't exist
export function initializeBookmarks() {
  if (!localStorage.getItem("bookmarks")) {
    const emptyBookmarks = {
      card: [],
      collection: [],
      challenge: [],
    }
    localStorage.setItem("bookmarks", JSON.stringify(emptyBookmarks))
    console.log("Initialized empty bookmarks")
  }
}

// Function to add a test bookmark
export function addTestBookmark() {
  // Initialize if needed
  initializeBookmarks()

  // Get current bookmarks
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")

  // Create test card ID
  const testCardId = `test-card-${Date.now()}`

  // Add to card bookmarks
  if (!bookmarks.card) {
    bookmarks.card = []
  }
  bookmarks.card.push(testCardId)

  // Save back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  console.log(`Added test bookmark: ${testCardId}`)

  return testCardId
}
