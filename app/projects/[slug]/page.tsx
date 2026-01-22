import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getProjectBySlug, getAllProjects } from '@/lib/projects'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/mdx/MDXComponents'
import { ProjectLayout } from '@/components/projects/ProjectLayout'
import type { Language } from '@/lib/i18n/LanguageContext'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  const uniqueSlugs = Array.from(new Set(projects.map((p) => p.slug)))
  return uniqueSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cookieStore = await cookies()
  const lang = (cookieStore.get('lang')?.value as Language) || 'fr'
  const project = await getProjectBySlug(slug, lang)
  if (!project) return {}

  return {
    title: project.meta.title,
    description: project.meta.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const cookieStore = await cookies()
  const lang = (cookieStore.get('lang')?.value as Language) || 'fr'
  const project = await getProjectBySlug(slug, lang)

  if (!project) notFound()

  const dateLocale = lang === 'fr' ? 'fr-FR' : 'en-US'

  return (
    <ProjectLayout headings={project.headings}>
      <article>
        <header className="mb-12">
          <h1 className="font-semibold mb-2">{project.meta.title}</h1>
          <time className="text-sm text-muted">
            {new Date(project.meta.date).toLocaleDateString(dateLocale, {
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
