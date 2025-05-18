"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import "./FeaturedCategories.css"

// Define the category interface
interface Category {
  id: string
  name: string
  imageUrl: string
  count: number
}

// FeaturedCategories component
export default function FeaturedCategories() {
  // State for categories
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true) // not used yet but might need later
  const router = useRouter()

  // Load categories on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockCategories: Category[] = [
      {
        id: "nature",
        name: "Nature",
        imageUrl: "https://picsum.photos/seed/nature-category/600/400",
        count: 42,
      },
      {
        id: "technology",
        name: "Technology",
        imageUrl: "https://picsum.photos/seed/tech-category/600/400",
        count: 38,
      },
      {
        id: "art",
        name: "Art",
        imageUrl: "https://picsum.photos/seed/art-category/600/400",
        count: 35,
      },
      {
        id: "science",
        name: "Science",
        imageUrl: "https://picsum.photos/seed/science-category/600/400",
        count: 29,
      },
      {
        id: "history",
        name: "History",
        imageUrl: "https://picsum.photos/seed/history-category/600/400",
        count: 24,
      },
    ]

    // Set the categories in state
    setCategories(mockCategories)
    setIsLoading(false)
  }, [])

  // Handle category click
  function handleCategoryClick(categoryId: string) {
    // Navigate to the category page
    router.push(`/explore?category=${categoryId}`)
  }

  return (
    <div className="featured-categories">
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
            <div className="category-image">
              <img src={category.imageUrl || "/placeholder.svg"} alt={`${category.name} category`} loading="lazy" />
            </div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <div className="category-count">{category.count} cards</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
