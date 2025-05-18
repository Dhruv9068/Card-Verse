"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "../ThemeProvider/ThemeProvider"
import "./ThemeSelector.css"

const themes = [
  {
    id: "default",
    name: "Teal",
    colors: {
      primary: "#00b4d8",
      secondary: "#fb8500",
      accent: "#06d6a0",
    },
  },
  {
    id: "purple",
    name: "Purple",
    colors: {
      primary: "#8b5cf6",
      secondary: "#ec4899",
      accent: "#c4b5fd",
    },
  },
  {
    id: "green",
    name: "Green",
    colors: {
      primary: "#10b981",
      secondary: "#f59e0b",
      accent: "#6ee7b7",
    },
  },
  {
    id: "blue",
    name: "Blue",
    colors: {
      primary: "#3b82f6",
      secondary: "#06b6d4",
      accent: "#93c5fd",
    },
  },
  {
    id: "red",
    name: "Red",
    colors: {
      primary: "#ef4444",
      secondary: "#f97316",
      accent: "#fca5a5",
    },
  },
]

export default function ThemeSelector() {
  const { theme: mode, setTheme: setMode, colorTheme, setColorTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleThemeChange = (themeId: string) => {
    setColorTheme(themeId)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get current theme colors
  const currentTheme = themes.find((t) => t.id === colorTheme) || themes[0]

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button
        className="theme-selector-button"
        onClick={toggleDropdown}
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <div className="current-theme-preview">
          <div className="theme-color-pill" style={{ backgroundColor: currentTheme.colors.primary }}></div>
          <div className="theme-color-pill" style={{ backgroundColor: currentTheme.colors.secondary }}></div>
          <div className="theme-color-pill" style={{ backgroundColor: currentTheme.colors.accent }}></div>
        </div>
        <span className="theme-selector-label">Theme</span>
        <span className="theme-selector-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <h3 className="theme-dropdown-title">Select Theme</h3>
          <div className="theme-options">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={`theme-option ${colorTheme === theme.id ? "active" : ""}`}
                onClick={() => handleThemeChange(theme.id)}
                aria-selected={colorTheme === theme.id}
              >
                <div className="theme-preview">
                  <div className="theme-color-strip" style={{ backgroundColor: theme.colors.primary }}></div>
                  <div className="theme-color-strip" style={{ backgroundColor: theme.colors.secondary }}></div>
                  <div className="theme-color-strip" style={{ backgroundColor: theme.colors.accent }}></div>
                </div>
                <span className="theme-option-name">{theme.name}</span>
                {colorTheme === theme.id && <span className="theme-selected-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
