'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  text: string
  mobileText?: string
  smallMobileText?: string // For 360x740 (Galaxy S8+)
  mediumMobileText?: string // For 390x844 (iPhone 12 Pro)
  className?: string
  mobileClassName?: string
  smallMobileClassName?: string
  mediumMobileClassName?: string
  delay?: number
  staggerDelay?: number
  mobileStaggerDelay?: number
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  mobileText,
  smallMobileText,
  mediumMobileText,
  className = '',
  mobileClassName = '',
  smallMobileClassName = '',
  mediumMobileClassName = '',
  delay = 0,
  staggerDelay = 40,
  mobileStaggerDelay = 8
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

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
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', checkMobile)
      }
    }

    return () => window.removeEventListener('resize', checkMobile)
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
                      willChange: 'transform, opacity',
                      transform3d: 'translate3d(0, 0, 0)',
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
    const currentStaggerDelay = isMobile ? mobileStaggerDelay : staggerDelay

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
                      filter: isMobile ? 'none' : (isVisible ? 'blur(0px)' : 'blur(10px)'),
                      transitionDelay: `${currentIndex * currentStaggerDelay}ms`,
                      willChange: 'transform, opacity',
                      transform3d: 'translate3d(0, 0, 0)',
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

      {/* Small Mobile Version (up to 389px) */}
      {smallMobileText && (
        <h1 className={cn("relative max-[389px]:block min-[390px]:hidden", smallMobileClassName || mobileClassName || className)}>
          {renderMobileText(smallMobileText)}
        </h1>
      )}

      {/* Medium Mobile Version (390px to 429px) */}
      {mediumMobileText && (
        <h1 className={cn("relative max-[389px]:hidden min-[390px]:max-[429px]:block min-[430px]:hidden", mediumMobileClassName || mobileClassName || className)}>
          {renderMobileText(mediumMobileText)}
        </h1>
      )}

      {/* Large Mobile Version (430px and up, but below desktop) */}
      {mobileText && (
        <h1 className={cn("relative max-[429px]:hidden min-[430px]:block md:hidden", mobileClassName || className)}>
          {renderMobileText(mobileText)}
        </h1>
      )}
    </>
  )
}

