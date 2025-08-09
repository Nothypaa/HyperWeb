// Clear animation sessionStorage flags - run this in browser console if needed
if (typeof window !== 'undefined') {
  sessionStorage.removeItem('animated-heading-completed')
  sessionStorage.removeItem('hero-animations-completed')
  console.log('Animation cache cleared')
} else {
  console.log('Run this in browser console to clear animation cache')
}