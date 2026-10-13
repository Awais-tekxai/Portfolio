import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

import { usePortfolioStore } from '@/store/usePortfolioStore'

export function ScrollProgress() {
  const progress = usePortfolioStore((s) => s.scrollProgress)
  const spring = useSpring(progress, { stiffness: 120, damping: 26, mass: 0.25 })
  const width = useTransform(spring, (p) => `${Math.round(p * 100)}%`)

  useEffect(() => {
    spring.set(progress)
  }, [progress, spring])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-[3px] bg-white/5">
      <motion.div
        style={{ width }}
        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_24px_rgba(124,58,237,0.65)]"
      />
    </div>
  )
}
