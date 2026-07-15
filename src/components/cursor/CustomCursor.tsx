import { motion, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[250] hidden mix-blend-screen lg:block">
      <motion.div
        style={{ translateX: x, translateY: y }}
        className={cn(
          'absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_40px_rgba(34,211,238,0.35)] will-change-transform',
        )}
      />
      <motion.div
        style={{ translateX: x, translateY: y }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.9)] will-change-transform"
      />
    </div>
  )
}
