"use client"

import { useState, useEffect } from "react"
import "./CategoryFilter.css"

interface CategoryFilterProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryFilter({ activeCategory, setActiveCategory }: CategoryFilterProps) {
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "nature", name: "Nature" },
    { id: "technology", name: "Technology" },
    { id: "art", name: "Art" },
    { id: "science", name: "Science" },
    { id: "history", name: "History" },
  ]

  if (!isClient) {
    // Return a placeholder during server rendering
    return <div className="category-filter-placeholder" style={{ height: "50px" }}></div>
  }

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? "active" : ""}`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
