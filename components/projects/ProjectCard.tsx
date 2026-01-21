import Link from 'next/link'
import { ProjectMeta } from '@/types/project'
import { cn } from '@/lib/utils'

const categoryColors = {
  UI: 'text-ui',
  UX: 'text-ux',
  Code: 'text-code',
}

interface ProjectCardProps {
  project: ProjectMeta
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block py-3 -mx-2 px-2 rounded-[4px] hover:bg-[var(--color-bg-secondary)] transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={cn('text-sm', categoryColors[project.category])}>
            {project.category}
          </span>
          <span className="text-foreground truncate">{project.title}</span>
        </div>
        <time className="text-sm text-muted shrink-0">
          {new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </time>
      </div>
    </Link>
  )
}
