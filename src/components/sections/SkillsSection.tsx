import { motion } from 'framer-motion'

import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { SKILL_GROUPS } from '@/data/skills'
import { useRevealSection } from '@/hooks/useRevealSection'
import { cn } from '@/lib/utils'

function SkillOrb({ label, tone }: { label: string; tone: 'violet' | 'cyan' }) {
  const { ref, inView } = useRevealSection(0.35)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 18 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 18 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={cn(
        'relative flex min-h-[120px] flex-col items-center justify-center rounded-3xl border bg-gradient-to-br px-4 py-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-[0_0_40px_rgba(0,0,0,0.45)]',
        tone === 'violet'
          ? 'border-violet-500/35 from-violet-600/25 via-transparent to-fuchsia-500/10'
          : 'border-cyan-400/35 from-cyan-400/20 via-transparent to-sky-500/10',
      )}
    >
      <span className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_55%)] opacity-60" />
      <span className="relative z-10 max-w-[12rem] text-[11px] leading-relaxed sm:text-xs">{label}</span>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="border-t border-white/5 bg-[#030014]/90 py-28 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">Skills</p>
            <h2 className="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">Stack tuned for velocity and polish</h2>
            <p className="mt-3 text-sm text-slate-400">
              Frontend systems with TypeScript discipline, design systems, and performance-aware delivery.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal delay={0.05}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90">Frontend</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.frontend.map((skill, idx) => (
                <SkillOrb key={skill} label={skill} tone={idx % 2 === 0 ? 'violet' : 'cyan'} />
              ))}
            </div>
          </div>
          <div>
            <Reveal delay={0.08}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90">Tooling</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.tools.map((skill, idx) => (
                <SkillOrb key={skill} label={skill} tone={idx % 2 === 0 ? 'cyan' : 'violet'} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
