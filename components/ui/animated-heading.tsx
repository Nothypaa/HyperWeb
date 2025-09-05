'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  text: string
  mobileText?: string
  className?: string
  mobileClassName?: string
  delay?: number
  staggerDelay?: number
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  mobileText,
  className = '',
  mobileClassName = '',
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

  // Desktop-specific render function
  const renderDesktopText = (textToRender: string, keyPrefix: string = 'desktop') => {
    const lines = textToRender.split('<br/>')
    let letterIndex = 0

    return (
      <>
        {lines.map((line, lineIndex) => (
          <React.Fragment key={`${keyPrefix}-${lineIndex}`}>
            <span className="block text-center whitespace-nowrap">
              {line.split('').map((char, charIndex) => {
                const currentIndex = letterIndex++
                return (
                  <span
                    key={`${keyPrefix}-${lineIndex}-${charIndex}`}
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
      </>
    )
  }

  // Mobile-specific render function
  const renderMobileText = (textToRender: string, keyPrefix: string = 'mobile') => {
    const lines = textToRender.split('<br/>')
    let letterIndex = 0

    return (
      <>
        {lines.map((line, lineIndex) => (
          <React.Fragment key={`${keyPrefix}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            <span className="inline-block whitespace-normal">
              {line.split('').map((char, charIndex) => {
                const currentIndex = letterIndex++
                return (
                  <span
                    key={`${keyPrefix}-${lineIndex}-${charIndex}`}
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
      </>
    )
  }

  return (
    <>
      {/* Desktop Version */}
      <h1 className={cn("relative hidden md:block", className)}>
        {renderDesktopText(text)}
      </h1>
      
      {/* Mobile Version */}
      {mobileText && (
        <h1 className={cn("relative block md:hidden", mobileClassName || className)}>
          {renderMobileText(mobileText)}
        </h1>
      )}
    </>
  )
}

