import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

/**
 * Lightweight cinematic cursor — direct DOM transforms (no Framer Motion).
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let targetX = -100
    let targetY = -100
    let ringX = -100
    let ringY = -100
    let raf = 0
    let running = true

    const move = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      // Dot snaps instantly for crisp feel
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      if (!running) return
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[250] hidden mix-blend-screen lg:block">
      <div
        ref={ringRef}
        className={cn(
          'absolute left-0 top-0 h-8 w-8 rounded-full border border-cyan-300/50 bg-cyan-300/10',
          'shadow-[0_0_40px_rgba(34,211,238,0.35)] will-change-transform',
        )}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.9)] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  )
}
