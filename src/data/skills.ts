export type SkillIconKey =
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'tailwind'
  | 'vite'
  | 'framer'
  | 'mui'
  | 'tanstack'
  | 'zustand'
  | 'zod'
  | 'rest'
  | 'axios'
  | 'socketio'
  | 'recharts'
  | 'rbac'
  | 'dashboard'
  | 'scorm'
  | 'realtime'
  | 'scoring'
  | 'tables'
  | 'payments'
  | 'health'
  | 'ai'

export interface SkillItem {
  name: string
  icon: SkillIconKey
}

export interface SkillGroup {
  label: string
  skills: SkillItem[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    label: 'State & APIs',
    skills: [
      { name: 'TanStack Query', icon: 'tanstack' },
      { name: 'Zustand', icon: 'zustand' },
      { name: 'Zod', icon: 'zod' },
      { name: 'Axios', icon: 'axios' },
      { name: 'Socket.io', icon: 'socketio' },
      { name: 'REST APIs', icon: 'rest' },
    ],
  },
  {
    label: 'UI & motion',
    skills: [
      { name: 'Framer Motion', icon: 'framer' },
      { name: 'Material UI', icon: 'mui' },
      { name: 'Recharts', icon: 'recharts' },
    ],
  },
  {
    label: 'Product systems',
    skills: [
      { name: 'Multi-role dashboards', icon: 'dashboard' },
      { name: 'SCORM & LMS', icon: 'scorm' },
      { name: 'Real-time messaging', icon: 'realtime' },
      { name: 'Live scoring UI', icon: 'scoring' },
      { name: 'Admin tables & filters', icon: 'tables' },
      { name: 'Payment modules', icon: 'payments' },
      { name: 'Health tracking UI', icon: 'health' },
      { name: 'AI training flows', icon: 'ai' },
      { name: 'RBAC & auth', icon: 'rbac' },
    ],
  },
]

/** Flat list derived from groups (marquee and other consumers) */
export const SKILLS: SkillItem[] = SKILL_GROUPS.flatMap((group) => group.skills)
