import { AuroraBackground } from '../../components/ui/aurora-background'
import Navbar from '../../components/Navbar'
import { Footer } from '@/components/ui/large-name-footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuroraBackground showAurora={true}>
      <Navbar />
      {children}
      <Footer />
    </AuroraBackground>
  )
}
