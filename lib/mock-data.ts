/**
 * Mock data generator for CardVerse
 *
 * This file contains functions to generate mock data for the application
 * when real data is not available. Used primarily for development and testing.
 *
 * @author Jane Smith
 * @created 2023-04-12
 */

import type { Card } from "@/types/card"
import { getItem, setItem, isBrowser } from "./storage-utils"

// Helper function to get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Main function to generate mock cards
export function generateMockCards(count: number): Card[] {
  const categories = ["Nature", "Technology", "Art", "Science", "History"]
  const emojis = ["❤️", "👍", "🔥", "⭐", "🎉", "😍", "👏"]

  // Create an array of cards with the specified count
  return Array.from({ length: count }, (_, i) => {
    // Pick a random category for this card
    const category = getRandomItem(categories)

    // Generate a unique ID for the image
    const id = Math.floor(Math.random() * 1000) + 1

    // Generate 2-4 random reactions for the card
    const reactionCount = getRandomNumber(2, 4)
    const reactions = Array.from({ length: reactionCount }, () => {
      const emoji = getRandomItem(emojis)
      const count = getRandomNumber(1, 100)
      return { emoji, count }
    })

    // Return the card object
    return {
      id: `card-${i + 1}-${Date.now()}`,
      title: getRandomTitle(category),
      description: getRandomDescription(category),
      imageUrl: `https://picsum.photos/seed/${category.toLowerCase()}-${id}/600/400`,
      category,
      reactions,
      addedAt: Date.now() - Math.floor(Math.random() * 1000000000), // Random time in the past
    }
  })
}

// Add a function to get consistent mock cards - this is now a client-only function
export function getConsistentMockCards(): Card[] {
  if (!isBrowser()) {
    // Return fresh cards on server
    return generateMockCards(50)
  }

  // Check if we have stored mock cards
  const storedCards = getItem<Card[]>("allMockCards", [])
  if (storedCards.length > 0) {
    return storedCards
  }

  // Generate new mock cards
  const newCards = generateMockCards(50)
  // Store them for future use
  setItem("allMockCards", newCards)
  return newCards
}

// Get a random title based on the category
function getRandomTitle(category: string): string {
  // Different title options for each category
  const titles: Record<string, string[]> = {
    Nature: ["Mountain Sunrise", "Ocean Waves", "Forest Canopy", "Desert Bloom", "Arctic Aurora"],
    Technology: ["Future Interface", "Smart City", "Quantum Computing", "Neural Network", "Augmented Reality"],
    Art: ["Abstract Harmony", "Modern Expression", "Vibrant Palette", "Sculptural Form", "Digital Canvas"],
    Science: ["Cosmic Discovery", "Molecular Structure", "Evolutionary Path", "Chemical Reaction", "Biological System"],
    History: [
      "Ancient Civilization",
      "Medieval Castle",
      "Renaissance Innovation",
      "Industrial Revolution",
      "Cultural Heritage",
    ],
  }

  const categoryTitles = titles[category] || titles["Nature"]
  return getRandomItem(categoryTitles)
}

// Get a random description based on the category
function getRandomDescription(category: string): string {
  // Different description options for each category
  const descriptions: Record<string, string[]> = {
    Nature: [
      "Breathtaking views of untouched wilderness showcasing the beauty of our natural world.",
      "Serene landscapes that capture the essence of nature's tranquility and power.",
      "Vibrant ecosystems teeming with life and biodiversity in perfect harmony.",
      "Majestic natural formations shaped by millions of years of geological processes.",
      "Seasonal transformations revealing nature's ever-changing canvas of colors and textures.",
    ],
    Technology: [
      "Cutting-edge innovations that are reshaping how we interact with the digital world.",
      "Smart systems designed to enhance efficiency and connectivity in modern life.",
      "Revolutionary technologies pushing the boundaries of what's possible in computing.",
      "Futuristic interfaces merging human creativity with artificial intelligence.",
      "Sustainable tech solutions addressing global challenges through innovation.",
    ],
    Art: [
      "Bold expressions of creativity that challenge conventional perspectives and norms.",
      "Intricate compositions blending traditional techniques with contemporary vision.",
      "Visual narratives exploring the depth of human emotion and experience.",
      "Experimental mediums pushing the boundaries of artistic expression and form.",
      "Cultural reflections captured through diverse artistic voices and styles.",
    ],
    Science: [
      "Fascinating discoveries unveiling the mysteries of our universe and natural laws.",
      "Microscopic worlds revealing the complexity of life at its most fundamental level.",
      "Experimental breakthroughs advancing our understanding of physical phenomena.",
      "Interdisciplinary research connecting diverse fields to solve complex problems.",
      "Data-driven insights illuminating patterns and relationships in natural systems.",
    ],
    History: [
      "Preserved artifacts offering glimpses into the daily lives of ancient civilizations.",
      "Architectural wonders standing as testaments to human ingenuity across centuries.",
      "Cultural traditions passed down through generations, maintaining heritage and identity.",
      "Pivotal moments that shaped the course of human development and society.",
      "Archaeological discoveries rewriting our understanding of historical timelines.",
    ],
  }

  const categoryDescriptions = descriptions[category] || descriptions["Nature"]
  return getRandomItem(categoryDescriptions)
}
