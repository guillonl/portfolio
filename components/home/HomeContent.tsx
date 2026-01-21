'use client'

import { useState } from 'react'
import { CategoryFilter } from '@/components/projects/CategoryFilter'
import { ProjectList } from '@/components/projects/ProjectList'
import { ProjectMeta, ProjectCategory } from '@/types/project'

interface HomeContentProps {
  projects: ProjectMeta[]
}

export function HomeContent({ projects }: HomeContentProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter)

  return (
    <section>
      <CategoryFilter current={filter} onChange={setFilter} />
      <ProjectList projects={filteredProjects} />
    </section>
  )
}
