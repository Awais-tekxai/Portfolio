import { memo, useMemo } from 'react'

import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const PARTICLE_COUNT = 28

/**
 * CSS-only ambient particles — no Framer Motion (main-thread friendly).
 */
export const FloatingParticles = memo(function FloatingParticles() {
  const reduced = usePrefersReducedMotion()

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        duration: `${9 + (i % 6)}s`,
        delay: `${(i % 5) * -0.55}s`,
        size: i % 3 === 0 ? 'h-1 w-1' : 'h-0.5 w-0.5',
        tone:
          i % 4 === 0
            ? 'bg-white/40'
            : i % 4 === 1
              ? 'bg-cyan-200/35'
              : i % 4 === 2
                ? 'bg-violet-200/35'
                : 'bg-slate-200/30',
      })),
    [],
  )

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn(
            'portfolio-particle absolute rounded-full will-change-transform',
            p.size,
            p.tone,
          )}
          style={{
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
})
