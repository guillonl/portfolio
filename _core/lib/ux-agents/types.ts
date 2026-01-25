export type AgentCategoryId =
  | 'analysis'
  | 'data-intelligence'
  | 'deliverables'
  | 'orchestrators'
  | 'workshops'

export interface AgentCategory {
  id: AgentCategoryId
  name: {
    fr: string
    en: string
  }
}

export interface UXAgent {
  slug: string
  name: string
  category: AgentCategoryId
  githubPath: string
  description: {
    fr: string
    en: string
  }
}

export interface AgentContent {
  title: string
  description: string
  prompt: string
}
