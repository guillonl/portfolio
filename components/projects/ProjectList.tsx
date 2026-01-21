'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ProjectMeta } from '@/types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
  projects: ProjectMeta[]
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-muted py-8"
      >
        No projects in this category.
      </motion.p>
    )
  }

  return (
    <div className="divide-y divide-border">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
