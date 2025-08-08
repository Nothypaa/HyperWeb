'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FadeUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 800,
  distance = 30
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn("transition-all ease-out", className)}
      style={{
        transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0)' : 'blur(4px)',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
