export type SkillIconKey =
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'javascript'
  | 'html'
  | 'css'
  | 'redux'
  | 'nodejs'
  | 'express'
  | 'sql'
  | 'jwt'
  | 'rbac'
  | 'tailwind'
  | 'mui'
  | 'tanstack'
  | 'zustand'
  | 'rhf'
  | 'zod'
  | 'axios'
  | 'tables'
  | 'stripe'
  | 'socketio'
  | 'postman'
  | 'git'
  | 'github'
  | 'vite'
  | 'npm'
  | 'jest'
  | 'docker'
  | 'cicd'
  | 'rest'
  | 'a11y'

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
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Redux Toolkit', icon: 'redux' },
      { name: 'Accessibility', icon: 'a11y' },
    ],
  },
  {
    label: 'Backend & Databases',
    skills: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'REST APIs', icon: 'rest' },
      { name: 'SQL', icon: 'sql' },
      { name: 'JWT Auth', icon: 'jwt' },
      { name: 'RBAC', icon: 'rbac' },
    ],
  },
  {
    label: 'Styling',
    skills: [
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Material UI', icon: 'mui' },
    ],
  },
  {
    label: 'State & Data',
    skills: [
      { name: 'TanStack Query', icon: 'tanstack' },
      { name: 'Zustand', icon: 'zustand' },
      { name: 'React Hook Form', icon: 'rhf' },
      { name: 'Zod', icon: 'zod' },
      { name: 'Axios', icon: 'axios' },
      { name: 'TanStack Table', icon: 'tables' },
    ],
  },
  {
    label: 'Integrations & Tools',
    skills: [
      { name: 'Stripe', icon: 'stripe' },
      { name: 'Socket.io', icon: 'socketio' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Vite', icon: 'vite' },
      { name: 'npm', icon: 'npm' },
    ],
  },
  {
    label: 'Testing & DevOps',
    skills: [
      { name: 'Jest', icon: 'jest' },
      { name: 'Docker', icon: 'docker' },
      { name: 'CI/CD', icon: 'cicd' },
    ],
  },
]

/** Flat list derived from groups (marquee and other consumers) */
export const SKILLS: SkillItem[] = SKILL_GROUPS.flatMap((group) => group.skills)
