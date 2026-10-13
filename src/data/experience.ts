import type { ExperienceItem } from '@/types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'tekxai',
    company: 'Tekxai',
    role: 'Full Stack Developer',
    period: 'March 2025 – Present',
    location: 'Lahore, Pakistan',
    bullets: [
      'Built and maintained multiple interactive, data-intensive dashboards by integrating RESTful APIs, enabling real-time data visualization for end users',
      'Built and maintained backend REST APIs with Node.js and Express, working with SQL databases to support dashboard data, business logic, and reporting workflows',
      'Designed and implemented responsive, accessible user interfaces using React, TypeScript (TSX), Tailwind CSS, and Material UI across desktop and mobile breakpoints',
      'Evaluated, tested, and integrated third-party libraries to accelerate feature delivery, collaborating cross-functionally with backend and product teams to ship on schedule',
    ],
  },
  {
    id: 'vital-nutrients',
    company: 'Vital Nutrients',
    role: 'Frontend Engineer',
    period: 'Sept 2024 – March 2025',
    location: 'Lahore, Pakistan',
    bullets: [
      'Developed and enhanced a React-based CMS and company website, enabling content teams to manage and update the site independently and efficiently',
      'Built and optimized reusable, responsive components with React and Tailwind CSS, working closely with design and content stakeholders to deliver polished, production-ready interfaces',
    ],
  },
]
