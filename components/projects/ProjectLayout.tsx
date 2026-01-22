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
    <Container className="relative">
      {/* TOC positionné à gauche du Container */}
      <TableOfContents items={headings} />

      {/* Contenu */}
      {children}
    </Container>
  )
}
