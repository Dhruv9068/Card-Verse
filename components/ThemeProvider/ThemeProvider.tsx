"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ColorTheme = "default" | "purple" | "green" | "blue" | "red"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorTheme: ColorTheme
  setColorTheme: (colorTheme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark") // Changed default to dark
  const [colorTheme, setColorTheme] = useState<ColorTheme>("purple")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null
      const storedColorTheme = localStorage.getItem("colorTheme") as ColorTheme | null

      if (storedTheme) {
        setTheme(storedTheme)
      } else {
        // Default to dark mode
        setTheme("dark")
        localStorage.setItem("theme", "dark")
      }

      if (storedColorTheme) {
        setColorTheme(storedColorTheme)
      } else {
        // Set purple as default if no stored theme
        setColorTheme("purple")
        localStorage.setItem("colorTheme", "purple")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme)
      document.documentElement.setAttribute("data-color-theme", colorTheme)
      localStorage.setItem("theme", theme)
      localStorage.setItem("colorTheme", colorTheme)
    }
  }, [theme, colorTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorTheme, setColorTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
