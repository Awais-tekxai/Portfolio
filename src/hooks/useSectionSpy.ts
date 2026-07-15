import { useEffect } from 'react'

import { useLenis } from '@/hooks/useLenis'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import type { SectionId } from '@/types'

const ORDER: SectionId[] = ['hero', 'about', 'skills', 'experience', 'projects', 'contact']

export function useSectionSpy() {
  const setActive = usePortfolioStore((s) => s.setActiveSection)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const compute = () => {
      const mid = window.innerHeight * 0.38
      let best: SectionId = 'hero'
      let bestScore = Number.POSITIVE_INFINITY

      for (const id of ORDER) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const anchor = rect.top + Math.min(rect.height * 0.2, 120)
        const score = Math.abs(anchor - mid)
        if (score < bestScore) {
          bestScore = score
          best = id
        }
      }
      setActive(best)
    }

    lenis.on('scroll', compute)
    compute()
    return () => {
      lenis.off('scroll', compute)
    }
  }, [lenis, setActive])
}
