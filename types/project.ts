export type ProjectCategory = 'UI' | 'UX' | 'Code'

export interface ProjectMeta {
  title: string
  slug: string
  date: string
  category: ProjectCategory
  description: string
  featured?: boolean
}

export interface Project extends ProjectMeta {
  content: string
}
