import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import type { SectionId } from '@/types'

interface SectionShellProps {
  id: SectionId
  children: ReactNode
  className?: string
  /** Boost scene reactivity while pointer is inside section */
  sceneBoost?: number
}

export function SectionShell({ id, children, className, sceneBoost = 0.72 }: SectionShellProps) {
  const setIntensity = usePortfolioStore((s) => s.setSceneIntensity)

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-24 snap-start sm:scroll-mt-28', className)}
      onMouseEnter={() => setIntensity(sceneBoost)}
      onMouseLeave={() => setIntensity(0.34)}
    >
      {children}
    </section>
  )
}
