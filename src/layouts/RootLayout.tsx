import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

import { FloatingParticles } from '@/components/background/FloatingParticles'
import { GlobalRobotCanvas } from '@/components/robot/GlobalRobotCanvas'
import { PageTransition } from '@/components/animations/PageTransition'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { LoadingScreen } from '@/components/loading/LoadingScreen'
import { DynamicNavbar } from '@/components/nav/DynamicNavbar'
import { SocialRail } from '@/components/nav/SocialRail'
import { ScrollProgress } from '@/components/nav/ScrollProgress'
import { useThrottleCallback } from '@/hooks/useThrottle'
import { useLenis } from '@/hooks/useLenis'
import { useSectionSpy } from '@/hooks/useSectionSpy'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { useEffect } from 'react'

export function RootLayout() {
  const location = useLocation()
  const lenis = useLenis()
  const loaderComplete = usePortfolioStore((s) => s.loaderComplete)
  const setPointerNorm = usePortfolioStore((s) => s.setPointerNorm)

  const onMove = useThrottleCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    setPointerNorm(x, y)
  }, 16)

  useEffect(() => {
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [onMove])

  useSectionSpy()

  useEffect(() => {
    if (!loaderComplete) return
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)')
    const apply = () => {
      document.body.classList.toggle('is-cinematic-cursor', mq.matches)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.body.classList.remove('is-cinematic-cursor')
    }
  }, [loaderComplete])

  useEffect(() => {
    if (!lenis) return
    void lenis.scrollTo(0, { immediate: true })
  }, [location.pathname, lenis])

  return (
    <div className="relative min-h-dvh bg-[radial-gradient(ellipse_120%_90%_at_50%_-15%,rgba(76,29,149,0.22),transparent_52%),#000000] text-slate-50">
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="relative h-full w-full">
          <FloatingParticles />
        </div>
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[400] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to content
      </a>
      <LoadingScreen />
      <ScrollProgress />
      <SocialRail />
      <DynamicNavbar />
      <CustomCursor />
      <main id="main-content" className="relative snap-y snap-proximity">
        {/* Outside PageTransition: ancestor `filter` on motion breaks WebGL compositing */}
        {location.pathname === '/' ? <GlobalRobotCanvas /> : null}
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}
