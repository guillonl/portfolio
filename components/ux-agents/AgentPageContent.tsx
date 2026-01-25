'use client'

import { PromptBlock } from './PromptBlock'
import { DownloadButton } from './DownloadButton'
import { PageTransition } from './PageTransition'

interface AgentPageContentProps {
  title: string
  description: string
  prompt: string
  slug: string
}

export function AgentPageContent({ title, description, prompt, slug }: AgentPageContentProps) {
  return (
    <PageTransition>
    <article>
      <header className="mb-8">
        <h1 className="font-semibold mb-4">{title}</h1>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </header>

      <div className="space-y-4">
        <div className="flex justify-end">
          <DownloadButton filename={slug} content={prompt} />
        </div>
        <PromptBlock content={prompt} />
      </div>
    </article>
    </PageTransition>
  )
}
