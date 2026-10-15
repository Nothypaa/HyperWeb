import type { Metadata } from 'next'
import ClientBrief from '@/components/brief/client-brief'

export const metadata: Metadata = {
  title: 'Cahier des charges de ton site web',
  description: 'Réponds à quelques questions pour que nous puissions concevoir ton site web sur mesure.',
  robots: { index: false, follow: false },
}

export default function CahierDesChargesPage() {
  return <ClientBrief storageKey="hw-brief:general" />
}
