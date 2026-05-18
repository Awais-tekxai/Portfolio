export type SectionId = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'contact'

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  features: string[]
  stack: string[]
  links?: { live?: string }
}
