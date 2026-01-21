import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { ProjectLayout } from '@/components/projects/ProjectLayout'
import { cn } from '@/lib/utils'

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
    <ProjectLayout headings={project.headings}>
      <article>
        <header className="mb-12">
          <h1 className="font-semibold mb-2">
            {project.meta.title}
          </h1>
          <time className="text-sm text-muted">
            {new Date(project.meta.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-base prose-p:text-sm prose-p:leading-relaxed">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>
      </article>
    </ProjectLayout>
  )
}
