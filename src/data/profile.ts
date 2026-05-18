import type { SocialLink } from '@/types'

export const PROFILE = {
  name: 'AWAIS KHALID',
  shortName: 'Awais Khalid',
  role: 'Frontend Engineer / React Developer',
  taglines: [
    'Building scalable frontend experiences with React & TypeScript',
    'Production-ready dashboards, real-time UI, and polished interactions',
    'Focused on clarity, performance, and maintainable architecture',
  ],
  summary:
    'Frontend Engineer with hands-on experience delivering React.js and Next.js applications for multi-role products, admin dashboards, and data-intensive interfaces. I integrate REST APIs using TanStack Query, structure client state with Zustand, and enforce reliability through Zod-validated forms and strong TypeScript practices. Comfortable implementing protected routing, analytics views, real-time features with Socket.io, and responsive UI with Tailwind CSS and Material UI—from initial build through production release.',
  email: 'awaiskhalid523@gmail.com',
  phone: '+92 308 0488548',
  location: 'Gulberg, Lahore, Pakistan',
  education: {
    degree: 'BSCS',
    school: 'Minhaj University',
    period: '2020 – 2024',
    location: 'Lahore, Pakistan',
  },
  aboutMilestones: [
    {
      title: 'Core focus',
      subtitle: 'Product-grade interfaces',
      detail:
        'Role-based dashboards, complex forms, tables, charts, and workflow-driven experiences—built with React, TypeScript, and modern frontend tooling.',
    },
    {
      title: 'How I work',
      subtitle: 'Quality, collaboration, delivery',
      detail:
        'Clear component architecture, API-first integration, accessible layouts, and close coordination with design and backend teams to ship on schedule.',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Awais-Khalid11', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/awais-khalid-/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:awaiskhalid523@gmail.com', icon: 'mail' },
  ] satisfies SocialLink[],
} as const
