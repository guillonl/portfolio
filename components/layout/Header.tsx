'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith('/projects/')

  return (
    <header className="py-8">
      <Container>
        <nav className="flex items-center justify-between">
          {isProjectPage ? (
            <Link href="/">
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-[4px] bg-[var(--color-bg-secondary)] text-muted hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </motion.div>
            </Link>
          ) : (
            <div />
          )}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
