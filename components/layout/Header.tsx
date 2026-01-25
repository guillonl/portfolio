'use client'

import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { MobileMenu } from '@/components/ux-agents/MobileMenu'

export function Header() {
  const pathname = usePathname()
  const isUxAgentsPage = pathname?.startsWith('/projects/ux-agents')

  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Gauche : Menu mobile (uniquement sur UX Agents) */}
          <div className="flex items-center">
            {isUxAgentsPage && <MobileMenu />}
          </div>

          {/* Droite : Langue + Theme */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  )
}
