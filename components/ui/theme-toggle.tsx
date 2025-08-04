"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false)
  const [isManualOverride, setIsManualOverride] = useState(false)

  // Apply theme to document
  const applyTheme = (shouldBeDark: boolean) => {
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme and listen for system changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // Check if we have a saved manual preference and apply it initially
    if (savedTheme === 'dark') {
      applyTheme(true)
      setIsManualOverride(true)
    } else if (savedTheme === 'light') {
      applyTheme(false)
      setIsManualOverride(true)
    } else {
      // No manual preference, follow system
      applyTheme(mediaQuery.matches)
      setIsManualOverride(false)
    }

    // Listen for system theme changes - ALWAYS apply them
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // System changes always take precedence, clear manual override
      applyTheme(e.matches)
      setIsManualOverride(false)
      localStorage.removeItem('theme') // Clear manual preference
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])


  const toggleTheme = () => {
    // Simple toggle: flip current state and save as manual preference
    const newIsDark = !isDark
    applyTheme(newIsDark)
    setIsManualOverride(true)
    
    // Save manual preference (will be cleared when system preference changes)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-zinc-800" 
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-gray-700" 
              strokeWidth={1.5}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-4 h-4 text-gray-500" 
              strokeWidth={1.5}
            />
          ) : (
            <Moon 
              className="w-4 h-4 text-black" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  )
}