import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

import { pageTransition } from '@/components/animations/variants'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="relative z-[8] min-h-dvh"
    >
      {children}
    </motion.div>
  )
}
