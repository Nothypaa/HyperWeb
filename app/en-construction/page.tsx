import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { BrandLogo } from '@/components/ui/brand-logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const CONTACT_EMAIL = 'contact@agencehyperweb.com'

export const metadata: Metadata = {
  title: { absolute: 'HyperWeb · Notre nouveau site prend forme' },
  description: 'Notre nouveau site prend forme. Écrivez-nous à contact@agencehyperweb.com.',
}

// Shown on every page while COMING_SOON is enabled in middleware.ts
export default function EnConstructionPage() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-[#FAFAF7] text-neutral-900 antialiased dark:bg-[#0B0B0C] dark:text-neutral-100">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-[19px]">
          <BrandLogo />
          <span className="text-lg font-black tracking-tight">HyperWeb</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tighter sm:text-7xl lg:text-8xl">
          Notre nouveau site prend forme<span className="text-neutral-400 dark:text-neutral-500">.</span>
        </h1>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group mt-12 inline-flex w-fit max-w-full items-center gap-3 rounded-full bg-neutral-900 py-2 pl-2 pr-6 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neutral-900/20 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-white/30"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 dark:bg-neutral-900/10">
            <Mail className="h-4 w-4" aria-hidden />
          </span>
          <span className="truncate text-[15px] font-semibold sm:text-base">{CONTACT_EMAIL}</span>
        </a>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-8 text-sm text-neutral-400 sm:px-6">
        © {new Date().getFullYear()} HyperWeb · Montpellier
      </footer>
    </div>
  )
}
