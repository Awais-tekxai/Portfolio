import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Reveal } from '@/components/common/Reveal'
import { SectionShell } from '@/components/common/SectionShell'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { ProjectModal } from '@/features/projects/ProjectModal'
import { useProjectsQuery } from '@/features/projects/useProjectsQuery'
import type { ProjectItem } from '@/types'

export function ProjectsSection() {
  const { data, isPending, isError } = useProjectsQuery()
  const [active, setActive] = useState<ProjectItem | null>(null)
  const [open, setOpen] = useState(false)

  const projects = useMemo(() => data ?? [], [data])

  const handleOpen = (project: ProjectItem) => {
    setActive(project)
    setOpen(true)
  }

  return (
    <SectionShell id="projects" className="border-t border-white/5 bg-[#020014]/88 py-28 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">Projects</p>
            <h2 className="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">Selected builds with cinematic depth</h2>
            <p className="mt-3 text-sm text-slate-400">
              Selected work spanning multi-role dashboards, real-time features, and production-grade React & Next.js
              applications.
            </p>
          </div>
        </Reveal>

        {isPending && (
          <div className="grid gap-8 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl bg-white/5" />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Unable to load projects. Please refresh.
          </p>
        )}

        {!isPending && !isError && (
          <motion.div layout className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={handleOpen} />
            ))}
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={active}
        open={open && active !== null}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setActive(null)
        }}
      />
    </SectionShell>
  )
}
