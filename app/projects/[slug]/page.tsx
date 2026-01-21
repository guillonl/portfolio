import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const categoryColors = {
  UI: 'bg-ui/10 text-ui',
  UX: 'bg-ux/10 text-ux',
  Code: 'bg-code/10 text-code',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.meta.title,
    description: project.meta.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <Container>
      <article className="py-8">
        <Link
          href="/projects"
          className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block"
        >
          &larr; Back to projects
        </Link>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={cn(
                'inline-block px-2 py-1 text-xs rounded',
                categoryColors[project.meta.category]
              )}
            >
              {project.meta.category}
            </span>
            <time className="text-sm text-muted">
              {new Date(project.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className="text-2xl font-medium tracking-tight">
            {project.meta.title}
          </h1>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={project.content} />
        </div>
      </article>
    </Container>
  )
}
