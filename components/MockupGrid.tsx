import React from 'react'
import Image from 'next/image'

const MockupGrid: React.FC = () => {
  return (
    <div className="w-full max-w-[120rem] mx-auto p-8">
      <div className="bg-gray-100/95 backdrop-blur rounded-3xl h-[800px] w-full p-8 flex items-center justify-center overflow-hidden">
        <div className="w-[80%] max-w-4xl aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg border">
          <Image 
            src="/projet-client/examplesiteweb1.webp"
            alt="Site web créé à Montpellier"
            width={1200}
            height={750}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default MockupGrid