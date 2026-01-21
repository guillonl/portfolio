'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-foreground transition-colors hover:text-muted"
          >
            Home
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
