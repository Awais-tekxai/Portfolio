import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { useLenis } from '@/hooks/useLenis'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
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
 * Scroll → `robotJourney` (0→1). Canvas stays under content (z-2).
 * Render loop pauses once the hero/about scene is off-screen.
 */
export function GlobalRobotCanvas() {
  const lenis = useLenis()
  const activeSection = usePortfolioStore((s) => s.activeSection)
  const sceneActive = activeSection === 'hero' || activeSection === 'about'
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Unmount WebGL shortly after fade-out to free GPU; remount when returning
  useEffect(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (sceneActive) {
      setMounted(true)
      return
    }
    hideTimer.current = setTimeout(() => setMounted(false), 480)
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [sceneActive])

  useEffect(() => {
    if (!lenis) return

    const setRobotJourney = usePortfolioStore.getState().setRobotJourney
    let lastJourney = usePortfolioStore.getState().robotJourney
    let rafScheduled = false
    let pendingScroll = 0

    const compute = (scroll: number) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        if (lastJourney !== 0) {
          lastJourney = 0
          setRobotJourney(0)
        }
        return
      }

      const hero = document.getElementById('hero')
      const about = document.getElementById('about')
      if (!hero || !about) {
        if (lastJourney !== 0) {
          lastJourney = 0
          setRobotJourney(0)
        }
        return
      }

      const vh = window.innerHeight
      const rect = about.getBoundingClientRect()

      const start = hero.offsetTop + hero.offsetHeight * 0.42
      const end = about.offsetTop - vh * 0.08
      const span = Math.max(end - start, vh * 0.55)

      let journey = clamp01((scroll - start) / span)
      const enter = clamp01((vh * 0.92 - rect.top) / (vh * 0.55))
      journey = Math.max(journey, enter)
      journey = Math.min(journey, 1)

      if (rect.top <= vh * 0.18 && rect.bottom > vh * 0.38) {
        journey = 1
      }

      if (rect.top < -rect.height * 0.4) {
        journey = 0
      }

      if (Math.abs(journey - lastJourney) < 0.008) return
      lastJourney = journey
      setRobotJourney(journey)
    }

    const update = ({ scroll }: { scroll: number }) => {
      pendingScroll = scroll
      if (rafScheduled) return
      rafScheduled = true
      requestAnimationFrame(() => {
        rafScheduled = false
        compute(pendingScroll)
      })
    }

    const onResize = () => compute(lenis.scroll)

    lenis.on('scroll', update)
    window.addEventListener('resize', onResize, { passive: true })
    compute(lenis.scroll)
    return () => {
      lenis.off('scroll', update)
      window.removeEventListener('resize', onResize)
    }
  }, [lenis])

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 z-[2] w-full',
        'top-[calc(4.75rem+env(safe-area-inset-top,0px))] h-[min(34dvh,300px)]',
        'sm:h-[min(38dvh,340px)]',
        'lg:top-0 lg:inset-0 lg:h-dvh lg:min-h-0',
        'transition-opacity duration-500',
        sceneActive ? 'opacity-100' : 'opacity-0',
      )}
      aria-hidden={!sceneActive}
    >
      {mounted ? (
        <Suspense fallback={null}>
          <RobotScene
            variant="backdrop"
            active={sceneActive}
            dprCap={isDesktop ? (reducedMotion ? 1 : 1.25) : 1}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
