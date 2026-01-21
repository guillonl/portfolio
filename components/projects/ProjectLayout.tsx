'use client'

import { ReactNode } from 'react'
import { TableOfContents } from './TableOfContents'
import { TocItem } from '@/lib/projects'

interface ProjectLayoutProps {
  children: ReactNode
  headings: TocItem[]
}

export function ProjectLayout({ children, headings }: ProjectLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
        {/* Navigation latérale */}
        <aside className="hidden lg:block">
          <TableOfContents items={headings} />
        </aside>

        {/* Contenu principal */}
        <main className="max-w-[550px]">
          {children}
        </main>
      </div>
    </div>
  )
}
