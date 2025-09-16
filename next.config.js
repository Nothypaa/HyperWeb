/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true, // Temporarily disable optimization to test
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig