import Lenis from 'lenis'
import { useEffect, useState, type ReactNode } from 'react'

import { LenisContext, type LenisInstance } from '@/components/providers/lenis-context'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null)

  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    const instance = new Lenis({
      smoothWheel: true,
      touchMultiplier: 1.65,
    })

    queueMicrotask(() => {
      setLenis(instance)
    })

    let raf = 0
    const loop = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const setScrollProgress = usePortfolioStore.getState().setScrollProgress
    const onScroll = () => {
      const progress =
        typeof instance.progress === 'number'
          ? instance.progress
          : instance.scroll / Math.max(instance.limit, 1)
      setScrollProgress(clamp01(progress))
    }

    instance.on('scroll', onScroll)
    onScroll()

    return () => {
      cancelAnimationFrame(raf)
      instance.off('scroll', onScroll)
      instance.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      queueMicrotask(() => {
        setLenis(null)
      })
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0
  return Math.min(1, Math.max(0, n))
}
