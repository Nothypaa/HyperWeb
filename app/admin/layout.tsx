import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel - HyperWeb',
  description: 'Admin panel for managing contact submissions',
  robots: 'noindex, nofollow' // Don't index admin pages
}

// MINIMAL LAYOUT: Do not add any UI components here
// Admin pages must be clean to prevent React event handling issues
// No Navbar, Footer, Theme toggles, or wrapper components
// This layout ensures the logout button works properly
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}