import {
  Accessibility,
  Boxes,
  ShieldCheck,
  Table2,
  type LucideIcon,
} from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
  siAxios,
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siGithubactions,
  siHtml5,
  siJavascript,
  siJest,
  siJsonwebtokens,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siOpenapiinitiative,
  siPostgresql,
  siPostman,
  siReact,
  siReacthookform,
  siReactquery,
  siRedux,
  siSocketdotio,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  siZod,
} from 'simple-icons'

import type { SkillIconKey } from '@/data/skills'
import { cn } from '@/lib/utils'

const BRAND_ICONS: Partial<Record<SkillIconKey, SimpleIcon>> = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  html: siHtml5,
  css: siCss,
  redux: siRedux,
  nodejs: siNodedotjs,
  express: siExpress,
  sql: siPostgresql,
  jwt: siJsonwebtokens,
  tailwind: siTailwindcss,
  mui: siMui,
  tanstack: siReactquery,
  rhf: siReacthookform,
  zod: siZod,
  axios: siAxios,
  stripe: siStripe,
  socketio: siSocketdotio,
  postman: siPostman,
  git: siGit,
  github: siGithub,
  vite: siVite,
  npm: siNpm,
  jest: siJest,
  docker: siDocker,
  cicd: siGithubactions,
  rest: siOpenapiinitiative,
}

const LUCIDE_ICONS: Partial<Record<SkillIconKey, LucideIcon>> = {
  zustand: Boxes,
  rbac: ShieldCheck,
  tables: Table2,
  a11y: Accessibility,
}

const LUCIDE_COLORS: Partial<Record<SkillIconKey, string>> = {
  zustand: '#8B5CF6',
  rbac: '#A78BFA',
  tables: '#94A3B8',
  a11y: '#38BDF8',
}

function BrandSvg({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill={`#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  )
}

interface SkillIconProps {
  iconKey: SkillIconKey
  className?: string
}

export function SkillIcon({ iconKey, className }: SkillIconProps) {
  const brand = BRAND_ICONS[iconKey]
  if (brand) {
    return <BrandSvg icon={brand} className={cn('h-6 w-6', className)} />
  }

  const Lucide = LUCIDE_ICONS[iconKey]
  const color = LUCIDE_COLORS[iconKey] ?? '#C4B5FD'
  if (Lucide) {
    return <Lucide className={cn('h-6 w-6', className)} style={{ color }} strokeWidth={1.75} aria-hidden />
  }

  return null
}

export function skillIconAccent(iconKey: SkillIconKey): string {
  const brand = BRAND_ICONS[iconKey]
  if (brand) return `#${brand.hex}`
  return LUCIDE_COLORS[iconKey] ?? '#7C3AED'
}
