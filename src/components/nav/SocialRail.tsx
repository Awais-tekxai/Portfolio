import { Mail } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

import { IconGithub, IconLinkedin } from '@/components/icons/SocialIcons'
import { PROFILE } from '@/data/profile'
import { cn } from '@/lib/utils'
import type { SocialLink } from '@/types'

type RailIcon = ComponentType<SVGProps<SVGSVGElement>>

const iconMap: Record<SocialLink['icon'], RailIcon> = {
  github: IconGithub,
  linkedin: IconLinkedin,
  mail: Mail,
}

const railButtonClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-slate-100 shadow-lg backdrop-blur-md transition hover:border-violet-400/45 hover:bg-white/10 hover:text-white'

export function SocialRail() {
  return (
    <nav
      className={cn(
        'fixed z-[118] flex gap-3',
        'bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 flex-row',
        'sm:bottom-[max(1.75rem,env(safe-area-inset-bottom))]',
        'lg:bottom-auto lg:left-5 lg:top-[38%] lg:flex-col lg:gap-4 lg:translate-x-0 xl:left-6',
      )}
      aria-label="Social links"
    >
      {PROFILE.socials.map((s) => {
        const Icon = iconMap[s.icon]
        const isExternal = s.href.startsWith('http')

        return (
          <a
            key={s.label}
            href={s.href}
            {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
            className={railButtonClass}
            aria-label={s.label}
            title={s.label}
          >
            <Icon className="h-4.5 w-4.5" {...(s.icon === 'mail' ? { strokeWidth: 1.75 } : {})} />
          </a>
        )
      })}
    </nav>
  )
}
