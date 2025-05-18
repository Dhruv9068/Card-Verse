"use client"

import { useTheme } from "../ThemeProvider/ThemeProvider"
import "./GlobalLoadingFallback.css"

export default function GlobalLoadingFallback() {
  const { theme } = useTheme()

  return (
    <div className={`global-loading-fallback ${theme}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <span className="loading-logo-text">
            Card<span className="loading-logo-accent">Verse</span>
          </span>
        </div>

        <div className="loading-spinner"></div>

        <div className="loading-message">
          <p>Loading amazing content...</p>
        </div>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>
      </div>
    </div>
  )
}
