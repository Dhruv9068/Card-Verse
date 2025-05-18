"use client"

import { useTheme } from "./ThemeProvider"
import "./ThemeToggle.css"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb"></div>
        <div className="toggle-icon light">☀️</div>
        <div className="toggle-icon dark">🌙</div>
      </div>
    </button>
  )
}
