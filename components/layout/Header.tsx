'use client'

import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'

export function Header() {
  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-end gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
