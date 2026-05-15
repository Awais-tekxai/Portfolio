import gsap from 'gsap'
import * as LottieReact from 'lottie-react'
import { type ComponentType, useEffect, useRef } from 'react'

import pulse from '@/assets/lottie/pulse.json'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type LottieComponentProps = {
  animationData: unknown
  loop?: boolean
  className?: string
}

function resolveLottieComponent(): ComponentType<LottieComponentProps> {
  const mod = LottieReact as unknown as {
    default?: ComponentType<LottieComponentProps> | { default?: ComponentType<LottieComponentProps> }
  }
  const first = mod.default
  if (typeof first === 'function') return first as ComponentType<LottieComponentProps>
  if (first && typeof first === 'object' && 'default' in first && typeof first.default === 'function') {
    return first.default as ComponentType<LottieComponentProps>
  }
  throw new Error('lottie-react: could not resolve a valid React component export')
}

const LottiePlayer = resolveLottieComponent()

export function LoadingScreen() {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const setLoaderComplete = usePortfolioStore((s) => s.setLoaderComplete)

  useEffect(() => {
    if (reduced) {
      setLoaderComplete(true)
      return
    }
    const el = rootRef.current
    if (!el) return

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setLoaderComplete(true)
      },
    })

    tl.fromTo(
      el.querySelector('[data-loader-line]'),
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.05 },
      0,
    )
      .fromTo(
        el.querySelector('[data-loader-title]'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.15,
      )
      .to(el, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 1.35)
      .set(el, { pointerEvents: 'none', visibility: 'hidden' })

    return () => {
      tl.kill()
    }
  }, [reduced, setLoaderComplete])

  if (reduced) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8 bg-[#020014] px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="h-28 w-28 opacity-90">
          <LottiePlayer animationData={pulse} loop className="h-full w-full" />
        </div>
        <div>
          <p data-loader-title className="font-display text-2xl font-semibold tracking-[0.35em] text-slate-100 sm:text-3xl">
            AWAIS
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.55em] text-slate-500">Calibrating experience</p>
        </div>
      </div>
      <div className="h-px w-[min(420px,80vw)] overflow-hidden rounded-full bg-white/10">
        <div data-loader-line className="h-full w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
      </div>
    </div>
  )
}
