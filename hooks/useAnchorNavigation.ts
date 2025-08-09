'use client'

import { useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLenis } from '@/components/LenisProvider'

export const useAnchorNavigation = () => {
  const lenis = useLenis()
  const router = useRouter()
  const pathname = usePathname()

  const navigateToAnchor = useCallback((anchor: string, targetPage?: string) => {
    try {
      // If we're navigating to a different page
      if (targetPage && pathname !== targetPage) {
        router.push(`${targetPage}${anchor}`)
        return
      }

      // If we're on the same page and have Lenis available and it's not destroyed
      if (lenis && typeof lenis.scrollTo === 'function') {
        // Use Lenis to scroll to the anchor
        lenis.scrollTo(anchor, {
          offset: 0,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        // Fallback to default browser behavior if Lenis is not available
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    } catch (error) {
      console.warn('Navigation failed, using fallback:', error)
      // Final fallback - basic scroll
      const element = document.querySelector(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [lenis, router, pathname])

  return { navigateToAnchor }
}