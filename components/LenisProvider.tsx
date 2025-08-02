'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Only initialize Lenis on desktop (screen width >= 1024px)
    const isDesktop = () => window.innerWidth >= 1024

    if (!isDesktop()) {
      return
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle window resize - disable on mobile if window becomes smaller
    const handleResize = () => {
      if (!isDesktop()) {
        lenis.destroy()
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>{children}</>
}