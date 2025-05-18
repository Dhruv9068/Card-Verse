"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Card } from "@/types/card"
import { generateMockCards } from "@/lib/mock-data"
import "./SearchBar.css"

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Card[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Handle click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.length > 1) {
      setIsSearching(true)
      // Simulate search with a delay
      setTimeout(() => {
        performSearch(query)
        setIsSearching(false)
      }, 300)
    } else {
      setSearchResults([])
    }
  }

  const performSearch = (query: string) => {
    // Generate mock cards for search
    const allCards = generateMockCards(20)

    // Filter cards based on search query
    const results = allCards
      .filter(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.description.toLowerCase().includes(query.toLowerCase()) ||
          card.category.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 5) // Limit to 5 results

    setSearchResults(results)
  }

  const handleResultClick = (cardId: string) => {
    router.push(`/card/${cardId}`)
    setIsExpanded(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsExpanded(false)
    }
  }

  return (
    <div className={`search-bar ${isExpanded ? "expanded" : ""}`} ref={searchRef}>
      <button className="search-toggle" onClick={toggleSearch} aria-label="Toggle search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-submit" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {isSearching && (
          <div className="search-loading">
            <div className="search-spinner"></div>
            <span>Searching...</span>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((card) => (
              <div key={card.id} className="search-result-item" onClick={() => handleResultClick(card.id)}>
                <div className="result-image">
                  <img src={card.imageUrl || "/placeholder.svg"} alt={card.title} />
                </div>
                <div className="result-info">
                  <div className="result-title">{card.title}</div>
                  <div className="result-category">{card.category}</div>
                </div>
              </div>
            ))}
            <div className="view-all-results" onClick={handleSearchSubmit}>
              View all results for "{searchQuery}"
            </div>
          </div>
        )}

        {!isSearching && searchQuery.length > 1 && searchResults.length === 0 && (
          <div className="no-results">No results found for "{searchQuery}"</div>
        )}
      </div>
    </div>
  )
}
