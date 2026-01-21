import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ProjectMeta, ProjectCategory } from '@/types/project'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export async function getAllProjects(): Promise<ProjectMeta[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const files = fs.readdirSync(projectsDirectory)

  const projects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category as ProjectCategory,
        description: data.description,
        featured: data.featured ?? false,
      }
    })
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

export async function getProjectBySlug(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const headings = extractHeadings(content)

  return {
    meta: {
      slug,
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
