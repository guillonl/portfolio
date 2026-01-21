export type ProjectCategory = 'UI' | 'UX' | 'Code'
export type Language = 'fr' | 'en'

export interface ProjectMeta {
  title: string
  slug: string
  lang: Language
  date: string
  category: ProjectCategory
  description: string
  featured?: boolean
}

export interface Project extends ProjectMeta {
  content: string
}
