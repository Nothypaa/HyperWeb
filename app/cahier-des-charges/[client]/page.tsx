import type { Metadata } from 'next'
import ClientBrief from '@/components/brief/client-brief'

// "marie-claire" -> "Marie Claire"
function toDisplayName(slug: string) {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {}
  return decoded
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase('fr-FR') + part.slice(1))
    .join(' ')
}

export function generateMetadata({ params }: { params: { client: string } }): Metadata {
  return {
    title: `Cahier des charges : ${toDisplayName(params.client)}`,
    description: 'Réponds à quelques questions pour que nous puissions concevoir ton site web sur mesure.',
    robots: { index: false, follow: false },
  }
}

export default function ClientCahierDesChargesPage({ params }: { params: { client: string } }) {
  return (
    <ClientBrief
      clientName={toDisplayName(params.client)}
      storageKey={`hw-brief:${params.client.toLowerCase()}`}
    />
  )
}
