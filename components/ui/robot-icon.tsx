import React from 'react'

interface RobotIconProps {
  className?: string
  size?: number
}

export const RobotIcon: React.FC<RobotIconProps> = ({ className, size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Robot head */}
      <rect x="6" y="6" width="12" height="10" rx="2" fill="currentColor" />
      
      {/* Robot antenna */}
      <line x1="12" y1="6" x2="12" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      
      {/* Robot eyes */}
      <circle cx="9.5" cy="9" r="1" fill="white" />
      <circle cx="14.5" cy="9" r="1" fill="white" />
      
      {/* Robot mouth */}
      <rect x="10" y="12" width="4" height="1.5" rx="0.75" fill="white" />
      
      {/* Robot body */}
      <rect x="8" y="16" width="8" height="6" rx="1" fill="currentColor" />
      
      {/* Robot arms */}
      <rect x="4" y="17" width="3" height="1.5" rx="0.75" fill="currentColor" />
      <rect x="17" y="17" width="3" height="1.5" rx="0.75" fill="currentColor" />
      
      {/* Robot chest detail */}
      <circle cx="12" cy="19" r="1" fill="white" />
    </svg>
  )
}