import { useQuery } from '@tanstack/react-query'

import type { ProjectItem } from '@/types'

async function loadProjects(): Promise<ProjectItem[]> {
  const { PROJECTS } = await import('@/data/projects')
  await new Promise((resolve) => setTimeout(resolve, 140))
  return PROJECTS
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: loadProjects,
  })
}
