import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'

import { GridBackground } from '@/components/background/GridBackground'
import { MagneticButton } from '@/components/common/MagneticButton'
import { SectionShell } from '@/components/common/SectionShell'
import { staggerContainer, fadeUp } from '@/components/animations/variants'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/data/profile'
import { useLenis } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const lenis = useLenis()
  const tagline = useMemo(() => PROFILE.taglines[0], [])
  const { firstName, lastName } = useMemo(() => {
    const parts = PROFILE.name.trim().split(/\s+/)
    return { firstName: parts[0] ?? PROFILE.name, lastName: parts.slice(1).join(' ') }
  }, [])

  const scrollHint = () => {
    const target = document.getElementById('about')
    if (target) lenis?.scrollTo(target, { offset: -88, duration: 1.1 })
  }

  return (
    <SectionShell
      id="hero"
      className={cn(
        'relative min-h-[100dvh] overflow-x-clip overflow-y-visible pt-20 pb-32 sm:pt-24 sm:pb-36 lg:py-28',
        'max-lg:pt-[calc(4.75rem+env(safe-area-inset-top,0px)+min(34dvh,300px))]',
        'sm:max-lg:pt-[calc(4.75rem+env(safe-area-inset-top,0px)+min(38dvh,340px))]',
      )}
    >
      <GridBackground />

      {/* Name (left) + designation (right); 3D scene is the global canvas layer */}
      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-5 sm:px-8',
          'social-rail-inset lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:pr-10 lg:pt-8 xl:pr-14',
        )}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="min-w-0 max-w-xl overflow-visible lg:w-[min(44%,28rem)] lg:flex-shrink-0"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.45em] text-violet-300/95">
            Hello! I&apos;m
          </motion.p>
          <motion.div variants={fadeUp} className="mt-3 space-y-1 overflow-visible">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-slate-50">
              {firstName}
            </h1>
            {lastName ? (
              <h1 className="font-display inline-block pr-[0.07em] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-gradient">
                {lastName}
              </h1>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-lg lg:mt-12 lg:w-[min(40%,26rem)] lg:flex-shrink-0 lg:text-right"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/90">
            Based in Lahore
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-2xl font-semibold leading-snug text-slate-100 sm:text-3xl lg:ml-auto lg:max-w-md"
          >
            {PROFILE.role}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base lg:ml-auto lg:max-w-md">
            {tagline}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 lg:justify-end">
            <MagneticButton>
              <Button variant="primary" size="lg" className="rounded-full" onClick={scrollHint}>
                Explore work
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.28}>
              <Button variant="default" size="lg" className="rounded-full" asChild>
                <a href={`mailto:${PROFILE.email}`}>Email me</a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.button
            variants={fadeUp}
            type="button"
            onClick={scrollHint}
            className="group mt-10 flex w-full flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500 lg:hidden"
            aria-label="Scroll to about section"
          >
            <span className="transition group-hover:text-cyan-300">Scroll</span>
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-5 w-5 text-cyan-300/80" />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollHint}
        className="group absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500 lg:flex"
        aria-label="Scroll to about section"
      >
        <span className="transition group-hover:text-cyan-300">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="h-5 w-5 text-cyan-300/80" />
        </motion.span>
      </button>
    </SectionShell>
  )
}
