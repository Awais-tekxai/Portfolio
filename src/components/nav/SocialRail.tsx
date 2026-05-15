import { Code2, Mail, UserRound } from 'lucide-react'

import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'

const iconMap = {
  code: Code2,
  user: UserRound,
  mail: Mail,
} as const

export function SocialRail() {
  return (
    <nav
      className={cn(
        'fixed z-[118] flex gap-3',
        'bottom-6 left-1/2 -translate-x-1/2 flex-row sm:bottom-8',
        'lg:bottom-auto lg:left-5 lg:top-[38%] lg:flex-col lg:gap-4 lg:translate-x-0 xl:left-6',
      )}
      aria-label="Social links"
    >
      {PROFILE.socials.map((s) => {
        const Icon = iconMap[s.icon]
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-slate-100 shadow-lg backdrop-blur-md transition hover:border-violet-400/45 hover:bg-white/10 hover:text-white"
            aria-label={s.label}
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      })}
    </nav>
  )
}
