import { motion } from 'framer-motion'

import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { EXPERIENCE } from '@/data/experience'
import { fadeUp, staggerContainer } from '@/components/animations/variants'

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      className="relative border-t border-white/5 bg-[#020014]/90 py-28 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.14),transparent_55%)] before:content-['']"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">Experience</p>
            <h2 className="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">Immersive product work, end to end</h2>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative space-y-10 pl-6 sm:pl-10"
        >
          <div className="absolute left-2 top-2 bottom-4 w-px bg-gradient-to-b from-violet-500/70 via-cyan-400/40 to-transparent sm:left-3" />
          {EXPERIENCE.map((job, index) => (
            <motion.article
              key={job.id}
              variants={fadeUp}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_60px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:p-8"
            >
              <span className="absolute -left-[26px] top-8 hidden h-3 w-3 rounded-full border border-cyan-300/60 bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.9)] sm:block" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/90">
                    {String(index + 1).padStart(2, '0')} — {job.company}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-slate-50">{job.role}</h3>
                  <p className="text-sm text-slate-400">
                    {job.period} · {job.location}
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}
