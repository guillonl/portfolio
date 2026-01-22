import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ProjectMeta, ProjectCategory, Language } from '@/_core/types/project'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

// Extrait la langue et le slug de base depuis le nom de fichier
// ex: "example-project.fr.mdx" → { slug: "example-project", lang: "fr" }
function parseFileName(file: string): { slug: string; lang: Language } | null {
  const match = file.match(/^(.+)\.(fr|en)\.mdx$/)
  if (match) {
    return { slug: match[1], lang: match[2] as Language }
  }
  // Fallback pour les anciens fichiers sans suffixe de langue (traités comme 'en')
  if (file.endsWith('.mdx')) {
    return { slug: file.replace(/\.mdx$/, ''), lang: 'en' }
  }
  return null
}

export async function getAllProjects(lang?: Language): Promise<ProjectMeta[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const files = fs.readdirSync(projectsDirectory)

  const projects = files
    .map((file) => {
      const parsed = parseFileName(file)
      if (!parsed) return null

      // Si une langue est spécifiée, filtrer
      if (lang && parsed.lang !== lang) return null

      const fullPath = path.join(projectsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: parsed.slug,
        lang: parsed.lang,
        title: data.title,
        date: data.date,
        category: data.category as ProjectCategory,
        description: data.description,
        featured: data.featured ?? false,
      }
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

export async function getProjectsByCategory(
  category?: ProjectCategory
): Promise<ProjectMeta[]> {
  const projects = await getAllProjects()
  if (!category) return projects
  return projects.filter((p) => p.category === category)
}

export interface TocItem {
  id: string
  title: string
}

export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^## (.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1]
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    headings.push({ id, title })
  }

  return headings
}

export async function getProjectBySlug(slug: string, lang: Language = 'fr') {
  // Essayer d'abord avec le suffixe de langue
  let fullPath = path.join(projectsDirectory, `${slug}.${lang}.mdx`)

  // Fallback vers l'ancien format sans suffixe
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  }

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const headings = extractHeadings(content)

  return {
    meta: {
      slug,
      lang,
      title: data.title,
      date: data.date,
      category: data.category as ProjectCategory,
      description: data.description,
      featured: data.featured ?? false,
    },
    content,
    headings,
  }
}

export async function getProjectBySlugAllLangs(slug: string) {
  const fr = await getProjectBySlug(slug, 'fr')
  const en = await getProjectBySlug(slug, 'en')
  return { fr, en }
}
