'use client'

import { useState } from 'react'
import { CategoryFilter } from '@/components/projects/CategoryFilter'
import { ProjectList } from '@/components/projects/ProjectList'
import { ProjectMeta, ProjectCategory } from '@/_core/types/project'
import { useLanguage } from '@/_core/lib/i18n/LanguageContext'

interface HomeContentProps {
  projects: ProjectMeta[]
}

export function HomeContent({ projects }: HomeContentProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All')
  const { lang } = useLanguage()

  // Filtrer par langue puis par catégorie
  const projectsByLang = projects.filter((p) => p.lang === lang)
  const filteredProjects =
    filter === 'All'
      ? projectsByLang
      : projectsByLang.filter((p) => p.category === filter)

  return (
    <section>
      <CategoryFilter current={filter} onChange={setFilter} />
      <ProjectList projects={filteredProjects} />
    </section>
  )
}
