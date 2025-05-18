"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "../ThemeProvider/ThemeProvider"
import "../../app/custom-cursor.css"

export default function CustomCursor() {
  const { colorTheme } = useTheme()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const trailsContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update the cursor to be more visible and colorful
    // Create trail elements
    if (trailsContainer.current) {
      trailsContainer.current.innerHTML = "" // Clear existing trails
      trailsRef.current = []
      for (let i = 0; i < 5; i++) {
        const trail = document.createElement("div")
        trail.className = "cursor-trail"
        trail.style.opacity = `${0.7 - i * 0.1}` // Make trails more visible
        trail.style.width = `${8 - i}px` // Vary the size
        trail.style.height = `${8 - i}px` // Vary the size
        trailsContainer.current.appendChild(trail)
        trailsRef.current.push(trail)
      }
    }

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("card-image") ||
        target.classList.contains("explore-card") ||
        target.classList.contains("favorite-card") ||
        target.classList.contains("swipeable-card") ||
        target.classList.contains("collection-card")

      setIsHovering(isClickable)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mousemove", updateHoverState)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mousemove", updateHoverState)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }

    // Update trail positions with delay
    if (trailsRef.current.length > 0) {
      trailsRef.current.forEach((trail, index) => {
        setTimeout(() => {
          if (trail) {
            trail.style.transform = `translate(${position.x - 3}px, ${position.y - 3}px)`
          }
        }, index * 50)
      })
    }
  }, [position])

  // Handle cursor visibility on mobile devices
  useEffect(() => {
    const handleTouchStart = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none"
      }
      if (trailsContainer.current) {
        trailsContainer.current.style.display = "none"
      }
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block"
      }
      if (trailsContainer.current) {
        trailsContainer.current.style.display = "block"
      }
    }

    document.addEventListener("touchstart", handleTouchStart)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Add sparkle effect on click
  useEffect(() => {
    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div")
      sparkle.className = "cursor-sparkle"
      sparkle.style.left = `${x}px`
      sparkle.style.top = `${y}px`
      document.body.appendChild(sparkle)

      // Remove sparkle after animation completes
      setTimeout(() => {
        if (document.body.contains(sparkle)) {
          document.body.removeChild(sparkle)
        }
      }, 800)
    }

    const handleClick = (e: MouseEvent) => {
      // Create multiple sparkles for a more dramatic effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createSparkle(e.clientX - 10, e.clientY - 10)
        }, i * 100)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""}`}
        data-color-theme={colorTheme}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
      </div>
      <div ref={trailsContainer} className="cursor-trails"></div>
    </>
  )
}
