import type { SocialLink } from '@/types'

export const PROFILE = {
  name: 'AWAIS KHALID',
  shortName: 'Awais Khalid',
  role: 'Frontend Engineer / React Developer',
  taglines: [
    'Building immersive frontend experiences',
    'Crafting scalable modern web applications',
    'React developer focused on performance and interaction',
  ],
  summary:
    'Frontend Engineer experienced in React.js, Next.js, TypeScript, Tailwind CSS, Material UI, and scalable frontend systems. I build dashboards, CMS platforms, and data-driven interfaces with a focus on performance, accessibility, and polished UX.',
  email: 'awaiskhalid523@gmail.com',
  phone: '+92 308 0488548',
  location: 'Gulberg, Lahore, Pakistan',
  education: {
    degree: 'BSCS',
    school: 'Minhaj University',
    period: '2020 – 2024',
    location: 'Lahore, Pakistan',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/Awais-Khalid11', icon: 'code' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/awais-khalid-/', icon: 'user' },
    { label: 'Email', href: 'mailto:awaiskhalid523@gmail.com', icon: 'mail' },
  ] satisfies SocialLink[],
} as const
