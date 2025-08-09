'use client'

import { ReactNode, useEffect, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'

// Create a context to hold the Lenis instance
export const LenisContext = createContext<Lenis | null>(null)

// Custom hook to access the context
export const useLenis = () => useContext(LenisContext)

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Only initialize Lenis on desktop (screen width >= 1024px)
    const isDesktop = () => window.innerWidth >= 1024

    if (!isDesktop()) {
      // If we are on mobile, destroy any existing lenis instance
      if (lenis) {
        lenis.destroy()
        setLenis(null)
      }
      return
    }

    try {
      // Initialize Lenis
      const newLenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        autoRaf: false, // We handle raf manually
      })

      // Store it in state
      setLenis(newLenis)

      // Request animation frame loop
      const raf = (time: number) => {
        if (newLenis) {
          newLenis.raf(time)
          requestAnimationFrame(raf)
        }
      }

      requestAnimationFrame(raf)

      // Handle window resize - disable on mobile if window becomes smaller
      const handleResize = () => {
        if (!isDesktop()) {
          if (newLenis && !newLenis.isDestroyed) {
            newLenis.destroy()
          }
          setLenis(null)
        }
      }

      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        if (newLenis && !newLenis.isDestroyed) {
          newLenis.destroy()
        }
        setLenis(null) // Clear state on unmount
        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
      console.warn('Failed to initialize Lenis smooth scrolling:', error)
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
