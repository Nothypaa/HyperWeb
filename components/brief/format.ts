import type { BriefQuestion } from './questions'

export type Answers = Record<string, string>
export type Picks = Record<string, string[]>

const HEX_PATTERN = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g

export const pad = (n: number) => String(n).padStart(2, '0')

export function formatAnswer(q: BriefQuestion, answers: Answers, picks: Picks) {
  const text = (answers[q.id] || '').trim()
  if (q.kind !== 'choice' && q.kind !== 'multi') return text
  return [(picks[q.id] || []).join(', '), text].filter(Boolean).join(' — ')
}

export function extractHexes(value: string) {
  return Array.from(new Set((value.match(HEX_PATTERN) || []).map((h) => h.toUpperCase())))
}

export function briefDate(date?: string) {
  const d = date ? new Date(date) : new Date()
  return (isNaN(d.getTime()) ? new Date() : d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* Shareable brief: the whole brief packed into a URL fragment (#…), which browsers never send
   to a server. Used for the "PDF" link in the submission e-mail. */

export interface SharedBrief {
  name: string
  date: string
  answers: Answers
  picks: Picks
}

const toBase64Url = (bytes: Uint8Array) => {
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromBase64Url = (value: string) => {
  const bin = atob(value.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function pipeBytes(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream)
  return new Uint8Array(await new Response(out).arrayBuffer())
}

export async function encodeBrief(brief: SharedBrief) {
  // Drop empty answers to keep the link short
  const answers = Object.fromEntries(Object.entries(brief.answers).filter(([, v]) => v && v.trim()))
  const picks = Object.fromEntries(Object.entries(brief.picks).filter(([, v]) => v && v.length))
  const json = new TextEncoder().encode(JSON.stringify({ v: 1, n: brief.name, d: brief.date, a: answers, p: picks }))
  if (typeof CompressionStream !== 'undefined') {
    return 'z.' + toBase64Url(await pipeBytes(json, new CompressionStream('deflate-raw')))
  }
  return 'j.' + toBase64Url(json)
}

export async function decodeBrief(token: string): Promise<SharedBrief | null> {
  try {
    const [kind, data] = [token.slice(0, 2), token.slice(2)]
    let bytes = fromBase64Url(data)
    if (kind === 'z.') bytes = await pipeBytes(bytes, new DecompressionStream('deflate-raw'))
    else if (kind !== 'j.') return null
    const raw = JSON.parse(new TextDecoder().decode(bytes))
    return { name: raw.n || '', date: raw.d || '', answers: raw.a || {}, picks: raw.p || {} }
  } catch {
    return null
  }
}
