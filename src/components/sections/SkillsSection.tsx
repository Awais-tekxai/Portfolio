import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { SkillsMarquee } from '@/components/skills/SkillsMarquee'

export function SkillsSection() {
  return (
    <SectionShell id="skills" className="section-cv border-t border-white/5 bg-[#030014]/94 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 social-rail-inset">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">Skills</p>
            <h2 className="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">Stack tuned for velocity and polish</h2>
            <p className="mt-3 text-sm text-slate-400">
              Frontend, backend, and tooling from shipping multi-tenant SaaS, role-based dashboards, Stripe billing, and
              real-time production systems.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <SkillsMarquee />
      </Reveal>
    </SectionShell>
  )
}
