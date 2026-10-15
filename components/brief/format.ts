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

export function briefDate() {
  return new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}
