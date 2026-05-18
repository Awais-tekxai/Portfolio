import type { ExperienceItem } from '@/types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'tekxai',
    company: 'Tekxai',
    role: 'Frontend Engineer',
    period: 'March 2025 – Present',
    location: 'Lahore, Pakistan',
    bullets: [
      'Develop interactive, multi-role web applications with React, TypeScript, and modern build tooling (Vite, Next.js)',
      'Integrate REST APIs using TanStack Query, Axios, Zustand, and Zod-validated forms for predictable data flows',
      'Build responsive dashboards with tables, charts, filters, and real-time updates (Socket.io) for operational teams',
      'Research, evaluate, and adopt third-party libraries to improve delivery speed without compromising maintainability',
    ],
  },
  {
    id: 'vital-nutrients',
    company: 'Vital Nutrients',
    role: 'React Developer',
    period: 'Sept 2024 – March 2025',
    location: 'Lahore, Pakistan',
    bullets: [
      'Contributed to React-based CMS development, enabling content teams to manage and publish updates efficiently',
      'Implemented responsive layouts and UI refinements with Tailwind CSS and reusable component patterns',
      'Improved frontend structure and performance for a consistent experience across the application',
    ],
  },
]
