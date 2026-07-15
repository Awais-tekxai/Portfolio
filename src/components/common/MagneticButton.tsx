import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { type ReactNode, useRef } from 'react'

import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 })
  const transform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    x.set(dx)
    y.set(dy)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('inline-flex will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
