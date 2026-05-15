import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ExternalLink, Code2, Sparkles } from 'lucide-react'
import { type MouseEvent, useRef } from 'react'

import { MagneticButton } from '@/components/common/MagneticButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProjectItem } from '@/types'

interface ProjectCardProps {
  project: ProjectItem
  onOpen: (project: ProjectItem) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(50)
  const y = useMotionValue(40)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(124,58,237,0.45), transparent 58%)`

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    x.set(px)
    y.set(py)
    const mx = (e.clientX - rect.left) / rect.width - 0.5
    const my = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-my * 9)
    rotateY.set(mx * 11)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    x.set(50)
    y.set(40)
  }

  return (
    <motion.div ref={ref} layout className="relative" style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ y: -6 }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-80 blur-3xl"
          style={{ backgroundImage: spotlight }}
        />
        <div
          className={cn(
            'relative overflow-hidden rounded-3xl border border-white/10 bg-[#050816]/85 p-6 shadow-[0_0_0_1px_rgba(124,58,237,0.12),0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl',
          )}
        >
          <motion.div className="pointer-events-none absolute inset-0 opacity-80" style={{ backgroundImage: spotlight }} />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90">Featured</p>
                <h3 className="mt-2 font-display text-2xl text-slate-50">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
              </div>
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <MagneticButton strength={0.25}>
                <Button variant="primary" className="rounded-full" type="button" onClick={() => onOpen(project)}>
                  View details
                </Button>
              </MagneticButton>
              {project.links?.live && (
                <Button variant="default" className="rounded-full" asChild>
                  <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    Live <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.links?.github && (
                <Button variant="ghost" className="rounded-full" asChild>
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                    GitHub <Code2 className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
