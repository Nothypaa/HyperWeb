import Image from "next/image"
import { cn } from "@/lib/utils"

// Same logo file and proportions as the site navbar; inverted in dark mode so it stays visible
export function BrandLogo({ className = "h-[21px] w-[26px]" }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0", className)}>
      <Image src="/HyperWeb-logo/hyperweb-logo.svg" alt="HyperWeb" fill className="object-contain dark:invert print:invert-0" priority />
    </span>
  )
}
