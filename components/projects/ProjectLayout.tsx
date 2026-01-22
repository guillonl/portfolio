'use client'

import { ReactNode } from 'react'
import { TableOfContents } from './TableOfContents'
import { Container } from '@/components/ui/Container'
import { TocItem } from '@/lib/projects'

interface ProjectLayoutProps {
  children: ReactNode
  headings: TocItem[]
}

export function ProjectLayout({ children, headings }: ProjectLayoutProps) {
  return (
    <>
      {/* Navigation latérale fixe - n'affecte pas le flow */}
      <TableOfContents items={headings} />

      {/* Contenu centré exactement comme la home */}
      <Container>
        {children}
      </Container>
    </>
  )
}
