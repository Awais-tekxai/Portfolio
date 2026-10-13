import type { SocialLink } from '@/types'

export const PROFILE = {
  name: 'AWAIS KHALID',
  shortName: 'Awais Khalid',
  role: 'Full Stack Developer',
  taglines: [
    'Building production web apps end-to-end with React, Next.js & Node.js',
    'Multi-tenant SaaS, role-based dashboards, and real-time systems',
    'TypeScript, SQL, Stripe billing, and polished accessible UI',
  ],
  summary:
    'Full Stack Developer with 3 years of experience building and shipping production web applications end-to-end, from React and Next.js frontends to Node.js and Express REST APIs backed by SQL databases. Experienced across multi-tenant SaaS, role-based admin dashboards, and data-intensive interfaces, with a track record of delivering real-time features and secure payment/billing flows. Skilled in TypeScript, Node.js, Express, SQL, TanStack Query, Zustand, Zod-validated forms with React Hook Form, Stripe billing, Socket.io real-time systems, and accessible, responsive UI with Tailwind CSS and Material UI.',
  email: 'awaiskhalid523@gmail.com',
  phone: '+92 308 0488548',
  location: 'Gulberg, Lahore, Pakistan',
  education: {
    degree: 'BS Computer Science (BSCS)',
    school: 'Minhaj University',
    period: '2020 – 2024',
    location: 'Lahore, Pakistan',
  },
  aboutMilestones: [
    {
      title: 'Core focus',
      subtitle: 'End-to-end product delivery',
      detail:
        'Full-stack SaaS, multi-tenant platforms, and role-based dashboards—React/Next.js on the client, Node.js/Express APIs and SQL on the server.',
    },
    {
      title: 'How I work',
      subtitle: 'Quality, collaboration, delivery',
      detail:
        'Clear architecture, secure APIs, accessible UI, and close coordination with design and product teams to ship on schedule.',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Awais-Khalid11', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/awais-khalid-/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:awaiskhalid523@gmail.com', icon: 'mail' },
  ] satisfies SocialLink[],
} as const
