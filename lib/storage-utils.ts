/**
 * Check if code is running in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

/**
 * Safely get an item from localStorage with type safety
 */
export function getItem<T>(key: string, defaultValue: T): T {
  if (!isBrowser()) return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * Safely set an item in localStorage
 */
export function setItem<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false

  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error)
    return false
  }
}

/**
 * Safely remove an item from localStorage
 */
export function removeItem(key: string): boolean {
  if (!isBrowser()) return false

  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error)
    return false
  }
}
