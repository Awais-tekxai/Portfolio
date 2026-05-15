import { lazy, Suspense, useEffect } from 'react'

import { useLenis } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const RobotScene = lazy(async () => {
  const mod = await import('@/components/robot/RobotScene')
  return { default: mod.RobotScene }
})

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0
  return Math.min(1, Math.max(0, n))
}

/**
 * Scroll → `robotJourney` (0→1). RobotFollower slides the mesh center → left.
 * Canvas stays under content (z-2); the mesh must land in the left grid lane only.
 */
export function GlobalRobotCanvas() {
  const lenis = useLenis()
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const fadeOut = activeSection !== 'hero' && activeSection !== 'about'

  useEffect(() => {
    if (!lenis) return

    const setRobotJourney = usePortfolioStore.getState().setRobotJourney

    const update = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        setRobotJourney(0)
        return
      }

      const hero = document.getElementById('hero')
      const about = document.getElementById('about')
      if (!hero || !about) {
        setRobotJourney(0)
        return
      }

      const scroll = lenis.scroll
      const vh = window.innerHeight
      const rect = about.getBoundingClientRect()

      // Scroll distance: mid-hero → About row settles under the navbar
      const start = hero.offsetTop + hero.offsetHeight * 0.42
      const end = about.offsetTop - vh * 0.08
      const span = Math.max(end - start, vh * 0.55)

      let journey = clamp01((scroll - start) / span)

      // Also ease in as About enters the viewport (feels tied to scroll)
      const enter = clamp01((vh * 0.92 - rect.top) / (vh * 0.55))
      journey = Math.max(journey, enter)
      journey = Math.min(journey, 1)

      // Hold final pose while About is on screen — no extra drift downward
      if (rect.top <= vh * 0.18 && rect.bottom > vh * 0.38) {
        journey = 1
      }

      if (rect.top < -rect.height * 0.4) {
        journey = 0
      }

      setRobotJourney(journey)
    }

    lenis.on('scroll', update)
    window.addEventListener('resize', update)
    update()
    return () => {
      lenis.off('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [lenis])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[2] w-full',
        'h-[min(46dvh,480px)] lg:inset-0 lg:h-dvh lg:min-h-0',
        'transition-opacity duration-500',
        fadeOut ? 'opacity-0' : 'opacity-100',
      )}
    >
      <Suspense fallback={null}>
        <RobotScene variant="backdrop" />
      </Suspense>
    </div>
  )
}
