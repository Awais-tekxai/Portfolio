import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { ProjectItem } from '@/types'

interface ProjectModalProps {
  project: ProjectItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Highlights</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300/80" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
