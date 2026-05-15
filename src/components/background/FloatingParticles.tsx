import { motion } from 'framer-motion'
import { memo } from 'react'

import { cn } from '@/lib/utils'

const PARTICLE_COUNT = 80

export const FloatingParticles = memo(function FloatingParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const left = `${(i * 37) % 100}%`
        const top = `${(i * 53) % 100}%`
        const duration = 10 + (i % 7)
        const delay = (i % 5) * 0.4
        const variant = i % 4
        return (
          <motion.span
            key={i}
            className={cn(
              'absolute',
              variant === 0 &&
                'h-0.5 w-0.5 rounded-full bg-white/45 shadow-[0_0_6px_rgba(255,255,255,0.35)]',
              variant === 1 && 'h-px w-px rounded-full bg-slate-200/50',
              variant === 2 && 'h-0.5 w-0.5 rounded-full bg-cyan-200/35 blur-[0.5px]',
              variant === 3 && 'h-px w-px rounded-full bg-violet-200/40',
            )}
            style={{ left, top }}
            animate={{ y: [0, -14, 0], opacity: [0.12, 0.55, 0.12] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
          />
        )
      })}
    </div>
  )
})
