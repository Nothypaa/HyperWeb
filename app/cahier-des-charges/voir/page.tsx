import type { Metadata } from 'next'
import BriefViewer from '@/components/brief/brief-viewer'

export const metadata: Metadata = {
  title: 'Cahier des charges reçu',
  robots: { index: false, follow: false },
}

// Opened from the link in the Formspree e-mail: shows a submitted brief and its PDF
export default function VoirCahierDesChargesPage() {
  return <BriefViewer />
}
