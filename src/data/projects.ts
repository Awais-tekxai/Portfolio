import type { ProjectItem } from '@/types'

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ice-league',
    title: 'Liberty Ice League',
    description:
      'Developed Liberty Ice League, a React + TypeScript SPA for managing recreational ice hockey leagues end to end. The application serves six user roles with dedicated dashboards for scheduling games, managing teams and players, live match scoring, referee penalty tracking, and league finances.',
    features: [
      'Six role-based dashboards tailored to admins, captains, players, referees, scorekeepers, and finance workflows',
      'Game scheduling with AI-assisted planning and reporting tools for league administrators',
      'Live match scoring, penalty tracking, and season-long team and player management',
      'League payment and financial modules connected to backend services via REST APIs and TanStack Query',
      'Real-time messaging with Socket.io for coordination between staff and participants',
      'Zod-validated forms, Zustand for state, and Tailwind CSS for a responsive admin and player experience',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'Zod',
      'Tailwind CSS',
      'Socket.io',
      'REST APIs',
    ],
    links: { live: 'https://app.libertyiceleague.com/' },
  },
  {
    id: 'ai-roleplay-lms',
    title: 'AI Roleplay LMS',
    description:
      'AI Roleplay LMS is a multi-role enterprise learning platform built with Next.js and TypeScript. It combines course delivery with AI voice and camera roleplay for sales and support training, alongside tools instructors and managers need to run programs at scale.',
    features: [
      'Role-based dashboards for administrators, instructors, learners, and managers',
      'AI voice and camera roleplay modules for realistic sales and customer-support scenarios',
      'Course builder with SCORM support, structured paths, and learner progress tracking',
      'Gamification, leaderboards, and team analytics for engagement and performance review',
      'TanStack Query for server state; type-safe forms and consistent API integration',
      'Responsive UI designed for enterprise training environments',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Tailwind CSS',
      'SCORM',
      'REST APIs',
      'Role-based auth',
    ],
  },
  {
    id: 'ngw',
    title: 'NGW',
    description:
      'Developed the web frontend for an AI-based health and nutrition platform using React, TypeScript, and Vite. The product includes food logging, meal recommendations, activity and sleep tracking, and a public landing experience, with operational dashboards for administrative and hospital users.',
    features: [
      'Responsive interfaces for logging meals, viewing recommendations, and tracking wellness metrics',
      'Public landing page with animation-driven sections and clear product storytelling',
      'Protected routes and role-based dashboards for Super Admin, Admin, and Hospital users',
      'Forms, data tables, filters, and Recharts visualizations for analytics and reporting',
      'REST API integration with Axios and TanStack Query; Socket.io for live updates where required',
      'Zustand for client state and Tailwind CSS for a cohesive, production-ready design system',
    ],
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'Tailwind CSS',
      'Recharts',
      'Socket.io',
      'Axios',
    ],
    links: { live: 'https://app.noguesswork.com/' },
  },
]
