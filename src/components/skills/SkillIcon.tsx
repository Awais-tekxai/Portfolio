import {
  Bot,
  Boxes,
  ChartLine,
  CreditCard,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Table2,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import type { SimpleIcon } from 'simple-icons'
import {
  siAxios,
  siFramer,
  siMui,
  siNextdotjs,
  siOpenapiinitiative,
  siReact,
  siReactquery,
  siSocketdotio,
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
  tailwind: siTailwindcss,
  vite: siVite,
  framer: siFramer,
  mui: siMui,
  tanstack: siReactquery,
  zod: siZod,
  axios: siAxios,
  socketio: siSocketdotio,
  rest: siOpenapiinitiative,
}

const LUCIDE_ICONS: Partial<Record<SkillIconKey, LucideIcon>> = {
  zustand: Boxes,
  recharts: ChartLine,
  rbac: ShieldCheck,
  dashboard: LayoutDashboard,
  scorm: GraduationCap,
  realtime: MessageSquare,
  scoring: Trophy,
  tables: Table2,
  payments: CreditCard,
  health: HeartPulse,
  ai: Bot,
}

const LUCIDE_COLORS: Partial<Record<SkillIconKey, string>> = {
  zustand: '#8B5CF6',
  recharts: '#22D3EE',
  rbac: '#A78BFA',
  dashboard: '#C4B5FD',
  scorm: '#38BDF8',
  realtime: '#34D399',
  scoring: '#FBBF24',
  tables: '#94A3B8',
  payments: '#4ADE80',
  health: '#F472B6',
  ai: '#E879F9',
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
