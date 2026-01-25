import { headers } from 'next/headers'
import { AgentContent } from './types'

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/guillonl/ux-folder-files/main/agents'

export async function fetchAgentContent(githubPath: string, lang: 'fr' | 'en' = 'fr'): Promise<string> {
  // Pour le français, utiliser GitHub directement
  if (lang === 'fr') {
    const response = await fetch(`${GITHUB_BASE_URL}/${githubPath}`, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch agent: ${githubPath}`)
    }

    return response.text()
  }

  // Pour l'anglais
  // Côté serveur, utiliser fetch avec le host de la requête
  if (typeof window === 'undefined') {
    try {
      const headersList = await headers()
      const host = headersList.get('host')
      if (host) {
        const protocol = host.includes('localhost') ? 'http' : 'https'
        const response = await fetch(`${protocol}://${host}/agents-en/${githubPath}`, {
          cache: 'no-store'
        })
        if (response.ok) {
          return response.text()
        }
      }
    } catch {
      // Fallback sur la version française
    }
  } else {
    // Côté client, fetch depuis /agents-en/
    try {
      const response = await fetch(`/agents-en/${githubPath}`)
      if (response.ok) {
        return response.text()
      }
    } catch {
      // Fallback sur la version française
    }
  }

  // Fallback sur GitHub français si pas de traduction anglaise
  const response = await fetch(`${GITHUB_BASE_URL}/${githubPath}`, {
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch agent: ${githubPath}`)
  }

  return response.text()
}

export function parseAgentMarkdown(markdown: string): AgentContent {
  const lines = markdown.split('\n')

  // Extract title (first # heading)
  let title = 'Agent'
  const titleLineIndex = lines.findIndex(line => line.startsWith('# '))
  if (titleLineIndex !== -1) {
    title = lines[titleLineIndex].replace(/^#\s+/, '').trim()
  }

  // Extract description (lines after title until next ## or empty section)
  let description = ''
  if (titleLineIndex !== -1) {
    const descLines: string[] = []
    for (let i = titleLineIndex + 1; i < lines.length; i++) {
      const line = lines[i]
      if (line.startsWith('##') || line.startsWith('```')) break
      if (line.trim()) {
        descLines.push(line.trim())
      }
      if (descLines.length >= 3) break
    }
    description = descLines.join(' ')
  }

  // Limit description to ~200 chars
  if (description.length > 200) {
    description = description.substring(0, 197) + '...'
  }

  return {
    title,
    description,
    prompt: markdown
  }
}
