import type { ProjectItem } from '@/types'

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ice-league',
    title: 'Ice League',
    description:
      'Role-based sports management platform with dedicated dashboards for admins, captains, players, referees, and scorekeepers.',
    features: [
      'Payments and league administration',
      'Team management and player assignments',
      'Match handling with referee and scorekeeper tooling',
      'In-app chat for coordination',
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'Dashboards'],
    links: { live: '#', github: '#' },
  },
  {
    id: 'broxton-lms',
    title: 'Broxton LMS',
    description:
      'Modern learning management system built with Next.js featuring authentication, role-based dashboards, and course management.',
    features: [
      'Secure authentication flows',
      'Admin and instructor tooling',
      'Structured learning paths and progress tracking',
    ],
    stack: ['Next.js', 'React', 'Auth', 'Dashboards'],
    links: { live: '#', github: '#' },
  },
  {
    id: 'noguesswork',
    title: 'NoGuessWork',
    description:
      'AI-powered virtual try-on experience that helps users preview products before purchase.',
    features: [
      'Confidence-building product previews',
      'Conversion-focused UX patterns',
      'Reduced returns through clearer expectations',
    ],
    stack: ['React', 'AI', 'E-commerce UX'],
    links: { live: '#', github: '#' },
  },
]
