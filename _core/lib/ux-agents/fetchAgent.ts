import { AgentContent } from './types'

const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/guillonl/ux-folder-files/main/agents'

// Version serveur : utilise fs pour lire les fichiers locaux
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

  // Pour l'anglais côté serveur, lire via filesystem
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'public', 'agents-en', githubPath)
      const content = await fs.readFile(filePath, 'utf-8')
      return content
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
