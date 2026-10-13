import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Not found | Awais Khalid'
  }, [])

  return (
    <div className="flex min-h-[72dvh] flex-col items-center justify-center px-6 pb-24 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-semibold uppercase tracking-[0.55em] text-cyan-300/90">Lost signal</p>
        <h1 className="mt-4 font-display text-6xl text-slate-50">404</h1>
        <p className="mt-3 max-w-md text-sm text-slate-400">This route drifts in deep space. Return to the main experience.</p>
        <Button asChild variant="primary" className="mt-8 rounded-full px-8">
          <Link to="/">Back home</Link>
        </Button>
      </motion.div>
    </div>
  )
}
