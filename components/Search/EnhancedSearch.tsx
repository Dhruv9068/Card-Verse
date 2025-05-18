"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { generateMockCards } from "@/lib/mock-data"
import { addPoints } from "@/lib/points-system"
import { gsap } from "gsap"
import "./EnhancedSearch.css"
import { notify } from "@/components/Notifications/NotificationSystem"

// Define the search result type
type SearchResultType = "card" | "collection" | "category" | "challenge" | "user" | "page" | "article"

// Define the search result interface
interface SearchResult {
  id: string
  title: string
  description: string
  type: SearchResultType
  imageUrl?: string
  route: string
}

/**
 * EnhancedSearch Component
 *
 * A full-featured search component with filters, recent searches, and real-time results
 *
 * @author Michael Brown
 * @created 2023-07-20
 */
export default function EnhancedSearch() {
  // State for search query and results
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<SearchResultType | "all">("all")
  const [isExpanded, setIsExpanded] = useState(false)

  // Refs for DOM elements
  const searchRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Router for navigation
  const router = useRouter()

  // Load recent searches on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches")
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  // Animate search results when they appear
  useEffect(() => {
    if (searchResults.length > 0 && resultsRef.current) {
      // Use GSAP for smooth animations
      gsap.fromTo(
        resultsRef.current.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
        },
      )
    }
  }, [searchResults])

  // Handle click outside to close search results
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

  // Handle search input change
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value
    setSearchQuery(query)
    setIsExpanded(true)

    if (query.length > 0) {
      setIsSearching(true)
      // Simulate search with a shorter delay for real-time feel
      setTimeout(() => {
        performSearch(query)
        setIsSearching(false)
      }, 150)
    } else {
      setSearchResults([])
    }
  }

  // Update the performSearch function to ensure all routes are valid
  function performSearch(query: string) {
    // In a real app, this would be an API call
    // For now, we'll use mock data

    // Generate mock data for search
    const allCards = generateMockCards(20)

    // Convert cards to search results
    const cardResults: SearchResult[] = allCards
      .filter(
        (card) =>
          card.title.toLowerCase().includes(query.toLowerCase()) ||
          card.description.toLowerCase().includes(query.toLowerCase()) ||
          card.category.toLowerCase().includes(query.toLowerCase()),
      )
      .map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        type: "card",
        imageUrl: card.imageUrl,
        route: `/card/${card.id}`,
      }))

    // Generate mock collections
    const collectionResults: SearchResult[] = [
      {
        id: "collection-1",
        title: "Nature Collection",
        description: "Beautiful nature cards",
        type: "collection",
        imageUrl: "https://picsum.photos/seed/nature-collection-search/300/200",
        route: "/collections/collection-1",
      },
      {
        id: "collection-2",
        title: "Technology Wonders",
        description: "Amazing technology cards",
        type: "collection",
        imageUrl: "https://picsum.photos/seed/tech-collection-search/300/200",
        route: "/collections/collection-2",
      },
    ].filter(
      (collection) =>
        collection.title.toLowerCase().includes(query.toLowerCase()) ||
        collection.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Generate mock categories
    const categoryResults: SearchResult[] = [
      {
        id: "category-nature",
        title: "Nature",
        description: "Explore nature cards",
        type: "category",
        imageUrl: "https://picsum.photos/seed/nature-category-search/300/200",
        route: "/explore?category=nature",
      },
      {
        id: "category-technology",
        title: "Technology",
        description: "Discover technology cards",
        type: "category",
        imageUrl: "https://picsum.photos/seed/tech-category-search/300/200",
        route: "/explore?category=technology",
      },
      {
        id: "category-art",
        title: "Art",
        description: "Browse art cards",
        type: "category",
        imageUrl: "https://picsum.photos/seed/art-category-search/300/200",
        route: "/explore?category=art",
      },
    ].filter(
      (category) =>
        category.title.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Generate mock challenges
    const challengeResults: SearchResult[] = [
      {
        id: "challenge-1",
        title: "First Steps",
        description: "Swipe through 5 cards",
        type: "challenge",
        imageUrl: "https://picsum.photos/seed/challenge-1-search/300/200",
        route: "/challenges",
      },
      {
        id: "challenge-2",
        title: "Collector",
        description: "Add 3 cards to favorites",
        type: "challenge",
        imageUrl: "https://picsum.photos/seed/challenge-2-search/300/200",
        route: "/challenges",
      },
    ].filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(query.toLowerCase()) ||
        challenge.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Generate mock users - redirect to leaderboard since we don't have user pages
    const userResults: SearchResult[] = [
      {
        id: "user-1",
        title: "CardMaster",
        description: "Top ranked user",
        type: "user",
        imageUrl: "https://picsum.photos/seed/user-1-search/300/300",
        route: "/leaderboard",
      },
      {
        id: "user-2",
        title: "SwipeKing",
        description: "Second ranked user",
        type: "user",
        imageUrl: "https://picsum.photos/seed/user-2-search/300/300",
        route: "/leaderboard",
      },
    ].filter(
      (user) =>
        user.title.toLowerCase().includes(query.toLowerCase()) ||
        user.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Update page results to only include pages that actually exist
    const pageResults: SearchResult[] = [
      {
        id: "page-home",
        title: "Home Page",
        description: "Main landing page with featured cards",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-home-search/300/200",
        route: "/",
      },
      {
        id: "page-explore",
        title: "Explore Page",
        description: "Discover new cards and collections",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-explore-search/300/200",
        route: "/explore",
      },
      {
        id: "page-favorites",
        title: "Favorites Page",
        description: "View your favorite cards",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-favorites-search/300/200",
        route: "/favorites",
      },
      {
        id: "page-collections",
        title: "Collections Page",
        description: "Browse your card collections",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-collections-search/300/200",
        route: "/collections",
      },
      {
        id: "page-challenges",
        title: "Challenges Page",
        description: "Complete challenges to earn points",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-challenges-search/300/200",
        route: "/challenges",
      },
      {
        id: "page-bookmarks",
        title: "Bookmarks Page",
        description: "View your bookmarked content",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-bookmarks-search/300/200",
        route: "/bookmarks",
      },
      {
        id: "page-leaderboard",
        title: "Leaderboard Page",
        description: "See top users and rankings",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-leaderboard-search/300/200",
        route: "/leaderboard",
      },
      {
        id: "page-profile",
        title: "Profile Page",
        description: "View and edit your profile",
        type: "page",
        imageUrl: "https://picsum.photos/seed/page-profile-search/300/200",
        route: "/profile",
      },
    ].filter(
      (page) =>
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Replace articles with redirects to explore page since we don't have article pages
    const articleResults: SearchResult[] = [
      {
        id: "article-1",
        title: "How to Create the Perfect Collection",
        description: "Tips and tricks for organizing your cards",
        type: "article",
        imageUrl: "https://picsum.photos/seed/article-1-search/300/200",
        route: "/explore",
      },
      {
        id: "article-2",
        title: "Top 10 Cards of the Month",
        description: "The most popular cards in our community",
        type: "article",
        imageUrl: "https://picsum.photos/seed/article-2-search/300/200",
        route: "/explore",
      },
      {
        id: "article-3",
        title: "Mastering the Art of Card Swiping",
        description: "Become a pro at discovering new cards",
        type: "article",
        imageUrl: "https://picsum.photos/seed/article-3-search/300/200",
        route: "/explore",
      },
    ].filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()),
    )

    // Combine all results
    let allResults = [
      ...cardResults,
      ...collectionResults,
      ...categoryResults,
      ...challengeResults,
      ...userResults,
      ...pageResults,
      ...articleResults,
    ]

    // Filter by selected category if not "all"
    if (selectedCategory !== "all") {
      allResults = allResults.filter((result) => result.type === selectedCategory)
    }

    // Limit to 15 results
    allResults = allResults.slice(0, 15)

    setSearchResults(allResults)
  }

  // Handle click on a search result
  function handleResultClick(result: SearchResult) {
    // Add to recent searches
    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

    // Award points for discovering content
    addPoints(5, `Discovered content through search: ${result.title}`)

    // Show notification
    notify({
      message: `Found: ${result.title}`,
      type: "success",
    })

    // Navigate to the result
    router.push(result.route)
    setIsExpanded(false)
  }

  // Handle search form submission
  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Add to recent searches
      const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))

      // Award points for searching
      addPoints(2, "Performed a search")

      router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsExpanded(false)
    }
  }

  // Handle click on a recent search
  function handleRecentSearchClick(search: string) {
    setSearchQuery(search)
    performSearch(search)
  }

  // Clear all recent searches
  function clearRecentSearches() {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  // Handle focus on the search input
  function handleFocus() {
    setIsExpanded(true)
  }

  return (
    <div className={`global-search ${isExpanded ? "expanded" : ""}`} ref={searchRef}>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
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
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for cards, collections, categories, challenges, users, pages, articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <button type="submit" className="search-submit" aria-label="Search">
              Search
            </button>
          </div>
        </form>

        {isExpanded && (
          <div className="search-dropdown">
            <div className="search-filters">
              <button
                className={`filter-button ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              <button
                className={`filter-button ${selectedCategory === "card" ? "active" : ""}`}
                onClick={() => setSelectedCategory("card")}
              >
                Cards
              </button>
              <button
                className={`filter-button ${selectedCategory === "collection" ? "active" : ""}`}
                onClick={() => setSelectedCategory("collection")}
              >
                Collections
              </button>
              <button
                className={`filter-button ${selectedCategory === "category" ? "active" : ""}`}
                onClick={() => setSelectedCategory("category")}
              >
                Categories
              </button>
              <button
                className={`filter-button ${selectedCategory === "challenge" ? "active" : ""}`}
                onClick={() => setSelectedCategory("challenge")}
              >
                Challenges
              </button>
              <button
                className={`filter-button ${selectedCategory === "user" ? "active" : ""}`}
                onClick={() => setSelectedCategory("user")}
              >
                Users
              </button>
              <button
                className={`filter-button ${selectedCategory === "page" ? "active" : ""}`}
                onClick={() => setSelectedCategory("page")}
              >
                Pages
              </button>
              <button
                className={`filter-button ${selectedCategory === "article" ? "active" : ""}`}
                onClick={() => setSelectedCategory("article")}
              >
                Articles
              </button>
            </div>

            {isSearching && (
              <div className="search-loading">
                <div className="search-loading-pattern">
                  <div className="pattern-dot"></div>
                  <div className="pattern-dot"></div>
                  <div className="pattern-dot"></div>
                  <div className="pattern-dot"></div>
                  <div className="pattern-dot"></div>
                </div>
                <span>Searching across CardVerse...</span>
              </div>
            )}

            {!isSearching && searchQuery.length === 0 && recentSearches.length > 0 && (
              <div className="recent-searches">
                <div className="recent-searches-header">
                  <h3>Recent Searches</h3>
                  <button className="clear-recent" onClick={clearRecentSearches}>
                    Clear
                  </button>
                </div>
                <div className="recent-searches-list">
                  {recentSearches.map((search, index) => (
                    <button key={index} className="recent-search-item" onClick={() => handleRecentSearchClick(search)}>
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
                        className="recent-icon"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="search-results" ref={resultsRef}>
                {searchResults.map((result) => (
                  <div key={result.id} className="search-result-item" onClick={() => handleResultClick(result)}>
                    <div className="result-image">
                      {result.imageUrl ? (
                        <img src={result.imageUrl || "/placeholder.svg"} alt={result.title} loading="lazy" />
                      ) : (
                        <div className="result-icon">
                          {result.type === "card" && "🃏"}
                          {result.type === "collection" && "📚"}
                          {result.type === "category" && "🏷️"}
                          {result.type === "challenge" && "🏆"}
                          {result.type === "user" && "👤"}
                          {result.type === "page" && "📄"}
                          {result.type === "article" && "📰"}
                        </div>
                      )}
                    </div>
                    <div className="result-info">
                      <div className="result-title">{result.title}</div>
                      <div className="result-description">{result.description}</div>
                      <div className="result-type">{result.type}</div>
                    </div>
                  </div>
                ))}
                <div className="view-all-results" onClick={handleSearchSubmit}>
                  View all results for "{searchQuery}"
                </div>
              </div>
            )}

            {!isSearching && searchQuery.length > 0 && searchResults.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No results found</h3>
                <p>We couldn't find any matches for "{searchQuery}"</p>
                <p>Try different keywords or check for typos</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
