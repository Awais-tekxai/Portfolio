import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { staggerContainer, fadeUp } from '@/components/animations/variants'
import { PROFILE } from '@/data/profile'

const milestones = [
  {
    title: PROFILE.education.degree,
    subtitle: `${PROFILE.education.school} · ${PROFILE.education.period}`,
    detail: PROFILE.education.location,
  },
  ...PROFILE.aboutMilestones.slice(1),
] as const

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      className="border-t border-white/5 bg-transparent py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-[1600px] lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Transparent lane: fixed WebGL (GlobalRobotCanvas) shows through here next to copy */}
          <div
            className="pointer-events-none hidden min-h-[min(72vh,760px)] lg:col-start-1 lg:block"
            aria-hidden
          />

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#020014]/92 via-[#050816]/94 to-[#020014]/92 p-6 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:p-8 lg:col-start-2 lg:max-w-xl lg:justify-self-end">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.28em] text-violet-200/95 sm:text-3xl">
                About me
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">{PROFILE.summary}</p>
            </Reveal>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-12 space-y-6 border-t border-white/10 pt-10"
            >
              {milestones.map((m) => (
                <motion.li key={m.title} variants={fadeUp} className="space-y-1">
                  <p className="font-display text-lg text-slate-100">{m.title}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/85">{m.subtitle}</p>
                  <p className="text-sm text-slate-400">{m.detail}</p>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal className="mt-12 flex justify-end">
              <a
                href={`mailto:${PROFILE.email}?subject=Resume%20request`}
                className="inline-flex items-center gap-2 rounded-full border border-violet-400/35 bg-violet-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-violet-100 transition hover:border-violet-300/55 hover:bg-violet-500/20"
              >
                <FileText className="h-4 w-4 text-violet-200" aria-hidden />
                Resume
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
