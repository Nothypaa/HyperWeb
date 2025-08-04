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
    })

    // Store it in state
    setLenis(newLenis)

    // Request animation frame loop
    function raf(time: number) {
      newLenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle window resize - disable on mobile if window becomes smaller
    const handleResize = () => {
      if (!isDesktop()) {
        newLenis.destroy()
        setLenis(null)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      newLenis.destroy()
      setLenis(null) // Clear state on unmount
      window.removeEventListener('resize', handleResize)
    }
    // We only want this to run once on mount, so we leave the dependency array empty.
    // The resize handler will manage destruction on smaller screens.
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
