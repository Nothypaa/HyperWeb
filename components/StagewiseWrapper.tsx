'use client'

import { useEffect } from 'react'
import { initToolbar } from '@stagewise/toolbar'

export default function StagewiseWrapper() {
  useEffect(() => {
    // Only initialize in development mode
    if (process.env.NODE_ENV === 'development') {
      try {
        initToolbar({
          plugins: []
        })
      } catch (error) {
        console.warn('Stagewise toolbar failed to initialize:', error)
      }
    }
  }, [])

  // This component doesn't render anything, it just initializes the toolbar
  return null
}