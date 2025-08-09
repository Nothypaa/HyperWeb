'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 40
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if animation has already run after hydration
    const completedBefore = sessionStorage.getItem('animated-heading-completed') === 'true'
    
    if (completedBefore) {
      // If already completed, show immediately
      setIsVisible(true)
    } else {
      // Run animation with delay
      const timer = setTimeout(() => {
        setIsVisible(true)
        sessionStorage.setItem('animated-heading-completed', 'true')
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [delay])

  // Split text by <br/> first, then by letters
  const lines = text.split('<br/>')
  let letterIndex = 0

  return (
    <h1 className={cn("relative", className)}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          <span className="inline-block">
            {line.split('').map((char, charIndex) => {
              const currentIndex = letterIndex++
              return (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block transition-all duration-700 ease-out"
                  style={{
                    transform: isVisible ? 'translateY(0px)' : 'translateY(-20px)',
                    opacity: isVisible ? 1 : 0,
                    filter: isVisible ? 'blur(0px)' : 'blur(10px)',
                    transitionDelay: `${currentIndex * staggerDelay}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        </React.Fragment>
      ))}
    </h1>
  )
}

