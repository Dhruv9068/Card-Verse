"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import PointsDisplay from "@/components/Points/PointsDisplay"
import { useRouter } from "next/navigation"
import "./HeroSection.css"

export default function HeroSection() {
  // refs for animations
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (heroRef.current) {
      // animate the content with a slight delay between elements
      gsap.fromTo(
        ".hero-content > *",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // make the cards float around randomly
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        for (let i = 0; i < cards.length; i++) {
          // random movement for each card
          gsap.to(cards[i], {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-5, 5)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          })
        }
      }
    }
  }, [])

  // navigation handlers
  const handleExploreClick = () => {
    router.push("/explore")
  }

  const goToCollections = () => {
    router.push("/collections")
  }

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your <span className="accent">Next Favorite</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of stunning cards. Swipe, collect, and share your favorites.
          </p>

          <div className="hero-actions">
            <button className="hero-button primary" onClick={handleExploreClick}>
              Start Exploring
            </button>
            <button className="hero-button secondary" onClick={goToCollections}>
              View Collections
            </button>
          </div>

          <div className="hero-stats">
            <PointsDisplay size="large" />
            <div className="hero-stat">
              <span className="stat-value">1.2K+</span>
              <span className="stat-label">Cards</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">50+</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-cards" ref={cardsRef}>
        <div className="floating-card card-1">
          <img src="https://picsum.photos/seed/nature-1/400/600" alt="Nature card" />
        </div>
        <div className="floating-card card-2">
          <img src="https://picsum.photos/seed/tech-2/400/600" alt="Technology card" />
        </div>
        <div className="floating-card card-3">
          <img src="https://picsum.photos/seed/art-3/400/600" alt="Art card" />
        </div>
        <div className="floating-card card-4">
          <img src="https://picsum.photos/seed/science-4/400/600" alt="Science card" />
        </div>
        <div className="floating-card card-5">
          <img src="https://picsum.photos/seed/history-5/400/600" alt="History card" />
        </div>
      </div>
    </section>
  )
}
