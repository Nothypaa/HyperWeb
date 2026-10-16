"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Clock, Download, FolderUp, Pencil, Plus, Save, Sparkles } from "lucide-react"

import { BrandLogo } from "@/components/ui/brand-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useLenis } from "@/components/LenisProvider"
import { cn } from "@/lib/utils"
import { ALL_QUESTIONS, BRIEF_SECTIONS, DONT_KNOW, DRIVE_FOLDER_URL, type BriefQuestion } from "./questions"
import { briefDate, encodeBrief, extractHexes, formatAnswer, pad, type Answers, type Picks } from "./format"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdekjwqy"
// Same heading treatment as the rest of the site
const HEADING = "font-black tracking-tighter"
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const REVIEW_STEP = BRIEF_SECTIONS.length + 1

type Status = "idle" | "sending" | "sent" | "error"

interface SavedBrief {
  answers: Answers
  picks: Picks
  step: number
  submitted?: boolean
}

/* ------------------------------------------------------------------ */

export default function ClientBrief({ clientName, storageKey }: { clientName?: string; storageKey: string }) {
  const [answers, setAnswers] = useState<Answers>({})
  const [picks, setPicks] = useState<Picks>({})
  const [step, setStep] = useState(0)
  // Last chapter the client was on, so "Reprendre" can bring them back after the intro screen
  const [resumeStep, setResumeStep] = useState(1)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [hydrated, setHydrated] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [needsEmail, setNeedsEmail] = useState(false)
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  // Restore a draft so clients can come back later without losing anything
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const saved: SavedBrief = JSON.parse(raw)
        setAnswers(saved.answers || {})
        setPicks(saved.picks || {})
        // Always open on the intro screen; "Reprendre où j’en étais" jumps back to the saved chapter
        setResumeStep(Math.min(Math.max(saved.step || 1, 1), REVIEW_STEP))
        if (saved.submitted) setStatus("sent")
      }
    } catch {
      // Storage unavailable (private mode…): the form still works, just without drafts
    }
    setHydrated(true)
  }, [storageKey])

  // Saved on every change (the draft is tiny) so closing the tab never loses the last keystrokes
  useEffect(() => {
    if (!hydrated) return
    try {
      const data: SavedBrief = { answers, picks, step: step > 0 ? step : resumeStep, submitted: status === "sent" }
      localStorage.setItem(storageKey, JSON.stringify(data))
      setSavedAt(Date.now())
    } catch {}
  }, [answers, picks, step, resumeStep, status, hydrated, storageKey])

  useEffect(() => {
    if (step > 0) setResumeStep(step)
  }, [step])

  // Runs once the previous view has animated out, so the new one always starts at the top
  const scrollToTop = useCallback(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo({ top: 0 })
  }, [lenis])

  const answeredCount = useMemo(
    () => ALL_QUESTIONS.filter((q) => formatAnswer(q, answers, picks) !== "").length,
    [answers, picks]
  )
  const progress = Math.round((answeredCount / ALL_QUESTIONS.length) * 100)
  const displayName = clientName || ""

  const setAnswer = useCallback((id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }, [])

  const togglePick = useCallback((q: BriefQuestion, option: string) => {
    setPicks((prev) => {
      const current = prev[q.id] || []
      if (q.kind === "choice") {
        return { ...prev, [q.id]: current[0] === option ? [] : [option] }
      }
      return {
        ...prev,
        [q.id]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
      }
    })
  }, [])

  const goTo = useCallback((next: number) => {
    setStep(Math.max(0, Math.min(REVIEW_STEP, next)))
  }, [])

  useEffect(() => {
    if (step === REVIEW_STEP && !EMAIL_PATTERN.test((answers.email || "").trim())) setNeedsEmail(true)
    // Only re-evaluate when arriving on the review step, not while the client types
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Ctrl/Cmd + Enter moves to the next chapter
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && step < REVIEW_STEP && status !== "sent") {
        e.preventDefault()
        goTo(step + 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [step, status, goTo])

  const emailValid = EMAIL_PATTERN.test((answers.email || "").trim())

  const handleSubmit = async () => {
    if (status === "sending") return
    if (!emailValid) {
      setNeedsEmail(true)
      setErrorMessage("Ajoute ton adresse e-mail pour que je puisse te répondre.")
      setStatus("error")
      return
    }

    setStatus("sending")
    setErrorMessage("")

    const nameAnswer = (answers.nom || "").trim()
    const body = new URLSearchParams()
    body.append("_subject", `Cahier des charges — ${displayName || nameAnswer || "Nouveau client"}`)
    body.append("email", answers.email.trim())
    body.append("Client", displayName || nameAnswer || "—")
    body.append("Progression", `${answeredCount} / ${ALL_QUESTIONS.length} réponses`)
    try {
      // Private link that opens the full brief with a PDF download, for the agency
      const token = await encodeBrief({ name: displayName || nameAnswer, date: new Date().toISOString(), answers, picks })
      body.append("PDF du cahier des charges", `${window.location.origin}/cahier-des-charges/voir#${token}`)
    } catch {}
    BRIEF_SECTIONS.forEach((section, i) => {
      section.questions.forEach((q) => {
        body.append(`${pad(i + 1)} · ${section.title} — ${q.short}`, formatAnswer(q, answers, picks) || "—")
      })
    })
    body.append("_gotcha", honeypot)

    try {
      // URL-encoded body (not JSON) so the browser skips the CORS preflight round trip
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok) {
        setStatus("sent")
      } else {
        setStatus("error")
        setErrorMessage(data.errors?.[0]?.message || "Une erreur est survenue. Réessaie dans un instant.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Erreur de connexion. Vérifie ta connexion internet et réessaie.")
    }
  }

  const printDocument = () => {
    // Print in light mode so the document is legible on paper
    const root = document.documentElement
    const wasDark = root.classList.contains("dark")
    root.classList.remove("dark")
    window.print()
    if (wasDark) root.classList.add("dark")
  }

  const [downloading, setDownloading] = useState(false)
  const downloadPdf = async () => {
    if (downloading) return
    setDownloading(true)
    try {
      const { downloadBriefPdf } = await import("./brief-pdf")
      await Promise.race([
        downloadBriefPdf({ answers, picks, title: displayName || (answers.nom || "").trim() || "Ton projet" }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("PDF generation timed out")), 20_000)),
      ])
    } catch (error) {
      // PDF generation failed (very old browser…): fall back to the browser's own "save as PDF"
      console.error(error)
      printDocument()
    } finally {
      setDownloading(false)
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      }

  const sectionIndex = step - 1
  const section = BRIEF_SECTIONS[sectionIndex]

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#0B0B0C] dark:text-neutral-100 dark:selection:bg-white dark:selection:text-black print:bg-white">
      <style>{`@media print { @page { margin: 18mm 16mm; } html, body { background: #fff !important; } }`}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-[#FAFAF7]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0B0C]/80 print:hidden">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center space-x-[19px]" aria-label="HyperWeb, retour à l’accueil">
            <BrandLogo />
            <span className="text-lg font-black tracking-tight">HyperWeb</span>
          </Link>
          <button
            type="button"
            onClick={() => status !== "sent" && goTo(0)}
            className="hidden rounded-full px-3 py-1 text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white md:block"
            title="Revenir à l’introduction"
          >
            Cahier des charges{displayName && <> · <span className="text-neutral-900 dark:text-neutral-100">{displayName}</span></>}
          </button>
          <div className="flex items-center gap-3">
            {hydrated && savedAt && status !== "sent" && (
              <span className="hidden items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 sm:flex">
                <Save className="h-3.5 w-3.5" aria-hidden />
                Brouillon enregistré
              </span>
            )}
            <ThemeToggle />
          </div>
        </div>
        {step > 0 && status !== "sent" && (
          <div className="h-[2px] w-full bg-neutral-200/70 dark:bg-white/10" aria-hidden>
            <div
              className="h-full bg-neutral-900 transition-[width] duration-700 ease-out dark:bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <main className={cn("mx-auto px-4 pb-24 sm:px-6", !hydrated && "invisible")}>
        <AnimatePresence mode="wait" onExitComplete={scrollToTop}>
          {status === "sent" ? (
            <motion.div key="sent" {...motionProps}>
              <SuccessView
                displayName={displayName || (answers.nom || "").trim()}
                onDownload={downloadPdf}
                downloading={downloading}
                onEdit={() => {
                  setStatus("idle")
                  setStep(REVIEW_STEP)
                }}
              >
                <BriefDocument answers={answers} picks={picks} clientName={displayName} answeredCount={answeredCount} />
              </SuccessView>
            </motion.div>
          ) : step === 0 ? (
            <motion.div key="welcome" {...motionProps}>
              <Welcome
                displayName={displayName}
                hasDraft={answeredCount > 0}
                onStart={() => goTo(answeredCount > 0 ? resumeStep : 1)}
              />
            </motion.div>
          ) : step === REVIEW_STEP ? (
            <motion.div key="review" {...motionProps} className="mx-auto max-w-3xl pt-12 sm:pt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                Dernière étape
              </p>
              <h1 className={cn(HEADING, "mt-4 text-4xl leading-tight sm:text-5xl")}>
                Relis ton cahier des charges
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                Voici le récapitulatif de tes réponses. Tu peux modifier chaque chapitre avant de me l’envoyer.
              </p>

              <div className="mt-10">
                <BriefDocument
                  answers={answers}
                  picks={picks}
                  clientName={displayName}
                  answeredCount={answeredCount}
                  onEditSection={(i) => goTo(i + 1)}
                />
              </div>

              <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03),0_20px_50px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
                {needsEmail && (
                  <div className="mb-6">
                    <label htmlFor="review-email" className="text-[15px] font-medium">
                      À quelle adresse e-mail puis-je te répondre ?
                    </label>
                    <input
                      id="review-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={answers.email || ""}
                      onChange={(e) => setAnswer("email", e.target.value)}
                      placeholder="toi@exemple.fr"
                      className={inputClass}
                    />
                  </div>
                )}

                {status === "error" && errorMessage && (
                  <p role="alert" className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-500/10 dark:text-red-300">
                    {errorMessage}
                  </p>
                )}

                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={() => goTo(step - 1)} className={ghostButtonClass}>
                    <ArrowLeft className="h-4 w-4" aria-hidden /> Revenir
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className={primaryButtonClass}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer mon cahier des charges <ArrowRight className="h-4 w-4" aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key={section.id} {...motionProps} className="mx-auto max-w-6xl pt-10 sm:pt-14">
              <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
                <ChapterRail
                  current={sectionIndex}
                  answers={answers}
                  picks={picks}
                  onSelect={(i) => goTo(i + 1)}
                  onReview={() => goTo(REVIEW_STEP)}
                />

                <section aria-labelledby={`chapter-${section.id}`} className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                    Chapitre {pad(step)} <span className="text-neutral-300 dark:text-neutral-600">/ {pad(BRIEF_SECTIONS.length)}</span>
                  </p>
                  <h1 id={`chapter-${section.id}`} className={cn(HEADING, "mt-4 text-4xl leading-tight sm:text-5xl")}>
                    {section.title}
                  </h1>
                  <p className="mt-4 text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400">{section.intro}</p>

                  <div className="mt-12 space-y-12">
                    {section.questions.map((q, qi) => (
                      <QuestionField
                        key={q.id}
                        index={qi + 1}
                        question={q}
                        value={answers[q.id] || ""}
                        picked={picks[q.id] || []}
                        onChange={(v) => setAnswer(q.id, v)}
                        onTogglePick={(o) => togglePick(q, o)}
                      />
                    ))}
                  </div>

                  <div className="mt-16 flex items-center justify-between gap-3 border-t border-neutral-200 pt-8 dark:border-white/10">
                    <button type="button" onClick={() => goTo(step - 1)} className={ghostButtonClass}>
                      <ArrowLeft className="h-4 w-4" aria-hidden /> Précédent
                    </button>
                    <button type="button" onClick={() => goTo(step + 1)} className={primaryButtonClass}>
                      {step === BRIEF_SECTIONS.length ? "Relire mes réponses" : "Continuer"}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  <p className="mt-4 hidden text-right text-xs text-neutral-400 sm:block">
                    Astuce : <kbd className="font-sans">Ctrl</kbd> + <kbd className="font-sans">Entrée</kbd> pour continuer
                  </p>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

/* ------------------------------------------------------------------ */

const inputClass =
  "mt-3 block w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3.5 text-[17px] leading-relaxed text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:hover:border-white/20 dark:focus:border-white/60 dark:focus:ring-white/10"

export const primaryButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-white/30"

const ghostButtonClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium text-neutral-600 transition hover:bg-neutral-900/5 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/10 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"

/* ------------------------------------------------------------------ */

function Welcome({ displayName, hasDraft, onStart }: { displayName: string; hasDraft: boolean; onStart: () => void }) {
  return (
    <div className="mx-auto max-w-3xl pt-16 sm:pt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
        Cahier des charges du site web
      </p>
      <h1 className={cn(HEADING, "mt-6 text-5xl leading-[1.02] sm:text-7xl")}>
        Bonjour{displayName ? ` ${displayName}` : ""},
        <br />
        <span className="text-neutral-400 dark:text-neutral-500">imaginons ton site ensemble.</span>
      </h1>
      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
        {[
          { icon: Clock, label: "15 minutes" },
          { icon: Save, label: "Sauvegarde automatique" },
          { icon: Sparkles, label: "Aucune pression" },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-neutral-400" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="button" onClick={onStart} className={cn(primaryButtonClass, "h-14 px-8 text-base")}>
          {hasDraft ? "Reprendre où j’en étais" : "Commencer"} <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <ol className="mt-20 grid gap-x-10 border-t border-neutral-200 pt-8 dark:border-white/10 sm:grid-cols-2">
        {BRIEF_SECTIONS.map((s, i) => (
          <li key={s.id} className="flex items-baseline gap-4 border-b border-neutral-200/70 py-3.5 dark:border-white/5">
            <span className="w-6 text-xs tabular-nums text-neutral-400">{pad(i + 1)}</span>
            <span className="text-[15px]">{s.title}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function ChapterRail({
  current,
  answers,
  picks,
  onSelect,
  onReview,
}: {
  current: number
  answers: Answers
  picks: Picks
  onSelect: (i: number) => void
  onReview: () => void
}) {
  return (
    <nav aria-label="Chapitres" className="hidden lg:block">
      <ol className="sticky top-28 space-y-0.5">
        {BRIEF_SECTIONS.map((s, i) => {
          const done = s.questions.filter((q) => formatAnswer(q, answers, picks) !== "").length
          const complete = done === s.questions.length
          const active = i === current
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
                  active
                    ? "bg-neutral-900/[0.04] font-medium text-neutral-900 dark:bg-white/[0.06] dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] tabular-nums transition",
                    complete
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                      : done > 0
                        ? "border-neutral-900 dark:border-white"
                        : "border-neutral-300 dark:border-neutral-600"
                  )}
                  aria-hidden
                >
                  {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className="truncate">{s.title}</span>
              </button>
            </li>
          )
        })}
        <li className="pt-3">
          <button
            type="button"
            onClick={onReview}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden /> Relire et envoyer
          </button>
        </li>
      </ol>
    </nav>
  )
}

/* ------------------------------------------------------------------ */

function AutoTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight + 2}px`
  }, [props.value])
  return <textarea ref={ref} rows={3} {...props} className={cn(inputClass, "resize-none", props.className)} />
}

function QuestionField({
  index,
  question: q,
  value,
  picked,
  onChange,
  onTogglePick,
}: {
  index: number
  question: BriefQuestion
  value: string
  picked: string[]
  onChange: (v: string) => void
  onTogglePick: (option: string) => void
}) {
  const fieldId = `q-${q.id}`
  const hintId = q.hint ? `${fieldId}-hint` : undefined
  const isChoice = q.kind === "choice" || q.kind === "multi"
  const dontKnowActive = value.trim() === DONT_KNOW
  const offersDontKnow = !q.required && !(isChoice && q.options?.includes(DONT_KNOW))

  // For choice questions, "je ne sais pas" lives in the detail text so the picks stay untouched
  const toggleDontKnow = () => onChange(dontKnowActive ? "" : DONT_KNOW)

  const hexes = q.kind === "colors" ? extractHexes(value) : []

  return (
    <div className="group/q">
      <div className="flex gap-4">
        <span className="w-5 shrink-0 pt-0.5 text-lg font-black tabular-nums text-neutral-300 dark:text-neutral-600" aria-hidden>
          {index}.
        </span>
        <div className="min-w-0 flex-1">
          {isChoice ? (
            <p id={`${fieldId}-label`} className="text-[18px] font-medium leading-snug">
              {q.label}
            </p>
          ) : (
            <label htmlFor={fieldId} className="block text-[18px] font-medium leading-snug">
              {q.label}
              {q.required && <span className="ml-1 text-neutral-400" aria-label="obligatoire">*</span>}
            </label>
          )}
          {q.hint && (
            <p id={hintId} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              {q.hint}
            </p>
          )}
          {q.upload && (
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/30"
            >
              <FolderUp className="h-4 w-4" aria-hidden /> Déposer mes fichiers
            </a>
          )}

          {isChoice && (
            <div
              role={q.kind === "choice" ? "radiogroup" : "group"}
              aria-labelledby={`${fieldId}-label`}
              className="mt-4 flex flex-wrap gap-2"
            >
              {q.options!.map((option) => {
                const selected = picked.includes(option)
                return (
                  <button
                    key={option}
                    type="button"
                    role={q.kind === "choice" ? "radio" : "checkbox"}
                    aria-checked={selected}
                    onClick={() => onTogglePick(option)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/10 dark:focus-visible:ring-white/20",
                      selected
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,0.45)] dark:border-white dark:bg-white dark:text-neutral-900"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300 dark:hover:border-white/30"
                    )}
                  >
                    {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                    {option}
                  </button>
                )
              })}
            </div>
          )}

          {q.kind === "text" || q.kind === "email" ? (
            <input
              id={fieldId}
              type={q.kind === "email" ? "email" : "text"}
              inputMode={q.kind === "email" ? "email" : q.id === "siret" ? "numeric" : undefined}
              autoComplete={q.kind === "email" ? "email" : q.id === "nom" ? "name" : q.id === "entreprise" ? "organization" : "off"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={q.placeholder}
              aria-describedby={hintId}
              required={q.required}
              className={inputClass}
            />
          ) : q.kind === "colors" ? (
            <>
              <AutoTextarea
                id={fieldId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={q.placeholder}
                aria-describedby={hintId}
                rows={2}
              />
              <ColorTools hexes={hexes} onAdd={(hex) => onChange(value.trim() ? `${value.trim()}, ${hex}` : hex)} />
            </>
          ) : q.kind === "textarea" || q.placeholder ? (
            <AutoTextarea
              id={fieldId}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={q.placeholder || "Ta réponse…"}
              aria-describedby={hintId}
              aria-label={isChoice ? `${q.label} — précisions` : undefined}
              rows={isChoice ? 1 : 3}
            />
          ) : null}

          {offersDontKnow && (
            <button
              type="button"
              onClick={toggleDontKnow}
              aria-pressed={dontKnowActive}
              className={cn(
                "mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition",
                dontKnowActive
                  ? "bg-neutral-900/5 text-neutral-900 dark:bg-white/10 dark:text-white"
                  : "text-neutral-400 opacity-80 hover:bg-neutral-900/5 hover:text-neutral-700 group-focus-within/q:opacity-100 dark:hover:bg-white/5 dark:hover:text-neutral-200"
              )}
            >
              {dontKnowActive && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              {DONT_KNOW}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ColorTools({ hexes, onAdd }: { hexes: string[]; onAdd: (hex: string) => void }) {
  const [pickerValue, setPickerValue] = useState("#1A2B3C")
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {hexes.map((hex) => (
        <span
          key={hex}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3 text-xs font-medium tabular-nums dark:border-white/10 dark:bg-white/[0.04]"
        >
          <span className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: hex }} aria-hidden />
          {hex}
        </span>
      ))}
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-neutral-300 py-1 pl-1 pr-3 text-xs font-medium text-neutral-500 transition hover:border-neutral-500 hover:text-neutral-800 dark:border-white/20 dark:text-neutral-400 dark:hover:text-white">
        <span className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: pickerValue }}>
          <input
            type="color"
            value={pickerValue}
            onChange={(e) => setPickerValue(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Choisir une couleur"
          />
        </span>
        <button type="button" onClick={() => onAdd(pickerValue.toUpperCase())} className="inline-flex items-center gap-1">
          <Plus className="h-3 w-3" aria-hidden /> Ajouter {pickerValue.toUpperCase()}
        </button>
      </label>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function BriefDocument({
  answers,
  picks,
  clientName,
  answeredCount,
  date,
  onEditSection,
}: {
  answers: Answers
  picks: Picks
  clientName: string
  answeredCount: number
  date?: string
  onEditSection?: (i: number) => void
}) {
  const today = briefDate(date)
  const title = clientName || (answers.nom || "").trim() || "Ton projet"

  return (
    <article className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03),0_30px_80px_-40px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-[#111113] print:rounded-none print:border-0 print:shadow-none">
      {/* Cover */}
      <header className="relative border-b border-neutral-200 px-6 py-10 dark:border-white/10 sm:px-12 sm:py-14 print:px-0">
        <div className="flex items-center justify-between text-neutral-400">
          <span className="flex items-center space-x-3 text-neutral-900 dark:text-neutral-100">
            <BrandLogo className="h-[17px] w-[21px]" />
            <span className="text-base font-black tracking-tight">HyperWeb</span>
          </span>
          <span className="text-xs tabular-nums">{today}</span>
        </div>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
          Cahier des charges du site web
        </p>
        <h2 className={cn(HEADING, "mt-3 text-4xl leading-tight sm:text-6xl")}>{title}</h2>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-1 w-40 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10 print:hidden">
            <div
              className="h-full rounded-full bg-neutral-900 dark:bg-white"
              style={{ width: `${(answeredCount / ALL_QUESTIONS.length) * 100}%` }}
            />
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {answeredCount} {answeredCount > 1 ? "réponses" : "réponse"} sur {ALL_QUESTIONS.length}
          </span>
        </div>
      </header>

      {/* Chapters */}
      <div className="divide-y divide-neutral-200 dark:divide-white/10">
        {BRIEF_SECTIONS.map((section, i) => (
          <section key={section.id} className="px-6 py-10 sm:px-12 print:break-inside-avoid-page print:px-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="flex items-baseline gap-4">
                <span className="text-lg font-black tabular-nums text-neutral-300 dark:text-neutral-600">{pad(i + 1)}</span>
                <span className={cn(HEADING, "text-2xl sm:text-[28px]")}>{section.title}</span>
              </h3>
              {onEditSection && (
                <button
                  type="button"
                  onClick={() => onEditSection(i)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white print:hidden"
                >
                  <Pencil className="h-3 w-3" aria-hidden /> Modifier
                </button>
              )}
            </div>

            <dl className="mt-8 space-y-7 sm:pl-10">
              {section.questions.map((q) => {
                const selected = picks[q.id] || []
                const text = (answers[q.id] || "").trim()
                const empty = formatAnswer(q, answers, picks) === ""
                const hexes = q.kind === "colors" ? extractHexes(text) : []
                return (
                  <div key={q.id} className="print:break-inside-avoid">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">{q.short}</dt>
                    <dd className="mt-2">
                      {empty ? (
                        <span className="text-[15px] italic text-neutral-400 dark:text-neutral-500">Non renseigné</span>
                      ) : (
                        <>
                          {selected.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {selected.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full border border-neutral-900/80 px-3 py-1 text-sm dark:border-white/70"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                          {hexes.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-3">
                              {hexes.map((hex) => (
                                <span key={hex} className="flex flex-col items-start gap-1.5">
                                  <span
                                    className="h-12 w-16 rounded-xl ring-1 ring-inset ring-black/10 print:[print-color-adjust:exact]"
                                    style={{ backgroundColor: hex }}
                                  />
                                  <span className="text-[11px] tabular-nums text-neutral-500">{hex}</span>
                                </span>
                              ))}
                            </div>
                          )}
                          {text && (
                            <p className={cn("whitespace-pre-wrap text-[17px] leading-relaxed", selected.length > 0 && "mt-2.5 text-neutral-600 dark:text-neutral-300")}>
                              {text}
                            </p>
                          )}
                        </>
                      )}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>
        ))}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */

function SuccessView({
  displayName,
  onDownload,
  downloading,
  onEdit,
  children,
}: {
  displayName: string
  onDownload: () => void
  downloading: boolean
  onEdit: () => void
  children: React.ReactNode
}) {
  // Same success animation as the site contact form (components/ui/contact-2.tsx):
  // the circle draws itself, then the checkmark pops in, then the text fades up
  const [animationProgress, setAnimationProgress] = useState(377) // Full circle circumference
  const [showCheckmark, setShowCheckmark] = useState(false)

  useEffect(() => {
    const circle = setTimeout(() => setAnimationProgress(0), 100)
    const check = setTimeout(() => setShowCheckmark(true), 600)
    return () => {
      clearTimeout(circle)
      clearTimeout(check)
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl pt-14 sm:pt-20">
      <div className="text-center print:hidden">
        <div className="relative mx-auto h-32 w-32">
          <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128" aria-hidden>
            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="3" fill="none" className="text-gray-200 dark:text-white/15" />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-black transition-all duration-500 ease-out dark:text-white"
              style={{ strokeDasharray: 377, strokeDashoffset: animationProgress }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className={cn(
                "h-16 w-16 text-black transition-all duration-500 dark:text-white",
                showCheckmark ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div
          className={cn(
            "transition-all delay-150 duration-500",
            showCheckmark ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <h1 className={cn(HEADING, "mt-8 text-4xl leading-tight sm:text-6xl")}>
            Merci{displayName ? ` ${displayName}` : ""}.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            Ton cahier des charges est bien arrivé. Je l’étudie avec attention et je reviens vers toi très vite avec les
            prochaines étapes.
          </p>
        </div>
        <div
          className={cn(
            "mt-8 flex flex-wrap items-center justify-center gap-3 transition-all delay-300 duration-500",
            showCheckmark ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <button type="button" onClick={onDownload} disabled={downloading} className={primaryButtonClass}>
            {downloading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
                Création du PDF…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" aria-hidden /> Télécharger en PDF
              </>
            )}
          </button>
          <button type="button" onClick={onEdit} className={ghostButtonClass}>
            <Pencil className="h-4 w-4" aria-hidden /> Modifier mes réponses
          </button>
        </div>
      </div>
      <div
        className={cn(
          "mt-14 transition-all delay-300 duration-500 print:mt-0 print:translate-y-0 print:opacity-100",
          showCheckmark ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}
