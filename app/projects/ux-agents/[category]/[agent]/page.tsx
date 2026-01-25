import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getAgentBySlug, AGENT_CATEGORIES, AGENTS } from '@/_core/lib/ux-agents/agents'
import { fetchAgentContent } from '@/_core/lib/ux-agents/fetchAgent'
import { AgentPageContent } from '@/components/ux-agents/AgentPageContent'
import type { Language } from '@/_core/lib/i18n/LanguageContext'

// Force dynamic rendering to read cookies on each request
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ category: string; agent: string }>
}

export async function generateStaticParams() {
  return AGENTS.map((agent) => ({
    category: agent.category,
    agent: agent.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { agent: agentSlug } = await params
  const agent = getAgentBySlug(agentSlug)
  if (!agent) return {}

  return {
    title: `${agent.name} | UX Agents`,
    description: `AI agent: ${agent.name}`,
  }
}

export default async function AgentPage({ params }: Props) {
  const { category, agent: agentSlug } = await params
  const cookieStore = await cookies()
  const lang = (cookieStore.get('lang')?.value as Language) || 'fr'

  const validCategory = AGENT_CATEGORIES.find(c => c.id === category)
  if (!validCategory) notFound()

  const agent = getAgentBySlug(agentSlug)
  if (!agent || agent.category !== category) notFound()

  let prompt: string
  try {
    prompt = await fetchAgentContent(agent.githubPath, lang)
  } catch {
    notFound()
  }

  return (
    <AgentPageContent
      title={agent.name}
      description={agent.description[lang]}
      prompt={prompt}
      slug={agent.slug}
    />
  )
}
