import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface RoundedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  containerClassName?: string
  size?: 'small' | 'medium' | 'large'
  aspectRatio?: string
  priority?: boolean
  fill?: boolean
  withHover?: boolean
  withShadow?: boolean
}

/**
 * RoundedImage Component
 * 
 * A reusable component for images with consistent rounded corners and premium styling.
 * 
 * Design Guidelines:
 * - Always use object-cover to fill containers completely
 * - Container must have overflow-hidden to clip image properly
 * - Use consistent border-radius: rounded-xl (small), rounded-2xl (medium), rounded-3xl (large)
 * - Add subtle borders for better definition
 * - Optional hover effects for interactive elements
 * 
 * @param src - Image source URL
 * @param alt - Alt text for accessibility
 * @param size - Predefined size variant (small: rounded-xl, medium: rounded-2xl, large: rounded-3xl)
 * @param aspectRatio - Custom aspect ratio (e.g., "aspect-[16/10]")
 * @param withHover - Add hover scale effect
 * @param withShadow - Add shadow for depth
 */
const RoundedImage: React.FC<RoundedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  size = 'large',
  aspectRatio = 'aspect-[16/10]',
  priority = false,
  fill = false,
  withHover = false,
  withShadow = true,
}) => {
  // Define size-based styles
  const sizeStyles = {
    small: 'rounded-xl',
    medium: 'rounded-2xl',
    large: 'rounded-3xl',
  }

  const roundedClass = sizeStyles[size]

  const containerClasses = cn(
    'w-full overflow-hidden border border-gray-200 dark:border-gray-800',
    !containerClassName?.includes('rounded') && roundedClass, // Only apply default rounded if not overridden
    aspectRatio,
    withShadow && 'shadow-lg',
    withHover && 'transition-transform hover:scale-[1.02] duration-300',
    containerClassName
  )

  const imageClasses = cn(
    'w-full h-full object-cover',
    className
  )

  return (
    <div className={containerClasses}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={imageClasses}
        priority={priority}
      />
    </div>
  )
}

export default RoundedImage

/**
 * Usage Examples:
 * 
 * // Large hero image (default)
 * <RoundedImage 
 *   src="/hero.jpg" 
 *   alt="Hero image"
 *   width={1200}
 *   height={750}
 *   withHover
 * />
 * 
 * // Medium blog image
 * <RoundedImage 
 *   src="/blog.jpg" 
 *   alt="Blog post"
 *   size="medium"
 *   aspectRatio="aspect-[16/9]"
 *   width={800}
 *   height={450}
 * />
 * 
 * // Small thumbnail
 * <RoundedImage 
 *   src="/thumb.jpg" 
 *   alt="Thumbnail"
 *   size="small"
 *   aspectRatio="aspect-square"
 *   width={200}
 *   height={200}
 *   withShadow={false}
 * />
 * 
 * // Fill container
 * <div className="w-full h-64">
 *   <RoundedImage 
 *     src="/fill.jpg" 
 *     alt="Fill container"
 *     fill
 *     containerClassName="h-full"
 *   />
 * </div>
 */