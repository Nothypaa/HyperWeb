"use client"

import { useEffect, useMemo, useState } from "react"
import { Download } from "lucide-react"

import { BrandLogo } from "@/components/ui/brand-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BriefDocument, primaryButtonClass } from "./client-brief"
import { decodeBrief, formatAnswer, type SharedBrief } from "./format"
import { ALL_QUESTIONS } from "./questions"

export default function BriefViewer() {
  const [brief, setBrief] = useState<SharedBrief | null | undefined>(undefined)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // The brief lives in the URL fragment, which is never sent to the server
    const token = window.location.hash.slice(1)
    if (!token) return setBrief(null)
    decodeBrief(token).then(setBrief)
  }, [])

  const title = brief ? brief.name || (brief.answers.nom || "").trim() || "Projet" : ""
  const answeredCount = useMemo(
    () => (brief ? ALL_QUESTIONS.filter((q) => formatAnswer(q, brief.answers, brief.picks) !== "").length : 0),
    [brief]
  )

  const download = async () => {
    if (!brief || downloading) return
    setDownloading(true)
    try {
      const { downloadBriefPdf } = await import("./brief-pdf")
      await downloadBriefPdf({ answers: brief.answers, picks: brief.picks, title, date: brief.date })
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-neutral-900 antialiased dark:bg-[#0B0B0C] dark:text-neutral-100">
      <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-[#FAFAF7]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0B0C]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center space-x-[19px]">
            <BrandLogo />
            <span className="text-lg font-black tracking-tight">HyperWeb</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
        {brief === undefined ? null : brief === null ? (
          <div className="pt-16 text-center">
            <h1 className="text-3xl font-black tracking-tighter sm:text-4xl">Lien incomplet</h1>
            <p className="mx-auto mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
              Ce lien ne contient pas de cahier des charges lisible. Copie le lien complet depuis l’e-mail reçu.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                  Cahier des charges reçu
                </p>
                <h1 className="mt-3 text-4xl font-black leading-tight tracking-tighter sm:text-5xl">{title}</h1>
              </div>
              <button type="button" onClick={download} disabled={downloading} className={primaryButtonClass}>
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
            </div>
            <BriefDocument
              answers={brief.answers}
              picks={brief.picks}
              clientName={brief.name}
              answeredCount={answeredCount}
              date={brief.date}
            />
          </>
        )}
      </main>
    </div>
  )
}
