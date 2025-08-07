'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const portfolioItems = [
  {
    id: 1,
    image: "/projet-client/examplesiteweb1.webp",
    alt: "Site web vidéosurveillance créé à Montpellier",
    bgClass: "bg-gradient-to-br from-zinc-900/95 via-red-950/90 to-zinc-900/95",
    name: "Site Vidéosurveillance",
    description: "Installation vidéosurveillance"
  },
  {
    id: 2,
    image: "/projet-client/examplesiteweb2.webp",
    alt: "Site web tatouage créé à Castelnau-le-Lez",
    bgClass: "bg-gradient-to-br from-orange-600/95 via-amber-500/90 to-orange-600/95",
    name: "Site Tatouage",
    description: "Studio de tatouage"
  }
]

const MockupGrid: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === portfolioItems.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const currentItem = portfolioItems[currentIndex]

  return (
    <div className="w-full max-w-[120rem] mx-auto p-4 md:p-8">
      <div 
        className={`${currentItem.bgClass} backdrop-blur rounded-3xl h-[600px] md:h-[800px] w-full p-4 md:p-8 flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out relative`}
      >
        <div className="w-[90%] md:w-[80%] max-w-4xl aspect-[16/10] bg-white/5 dark:bg-black/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image 
            key={currentItem.id} // Force re-render for smooth transitions
            src={currentItem.image}
            alt={currentItem.alt}
            width={1200}
            height={750}
            className="w-full h-full object-cover animate-fadeIn"
            priority
          />
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MockupGrid