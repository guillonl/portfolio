'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/_core/lib/utils'
import { useLanguage } from '@/_core/lib/i18n/LanguageContext'
import { AGENT_CATEGORIES, getAgentsByCategory } from '@/_core/lib/ux-agents/agents'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { lang, t } = useLanguage()

  const isActive = (href: string) => pathname === href

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        aria-expanded={isOpen}
        aria-label="Menu navigation"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-current"
        >
          <motion.path
            d={isOpen ? "M4 4L12 12M4 12L12 4" : "M2 4h12M2 8h12M2 12h12"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={false}
            animate={{ d: isOpen ? "M4 4L12 12M4 12L12 4" : "M2 4h12M2 8h12M2 12h12" }}
            transition={{ duration: 0.2 }}
          />
        </svg>
        <span>Menu</span>
      </button>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-16 left-4 right-4 max-h-[70vh] overflow-y-auto bg-[var(--color-bg)] border border-border rounded-[8px] shadow-lg z-50 p-4"
            >
              {/* Back link */}
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
              >
                <span>←</span>
                <span>{t.nav.index}</span>
              </Link>

              <div className="space-y-6">
                {/* How to use */}
                <div>
                  <Link
                    href="/projects/ux-agents/how-to-use"
                    onClick={handleLinkClick}
                    className={cn(
                      'block text-sm transition-colors',
                      isActive('/projects/ux-agents/how-to-use')
                        ? 'text-foreground font-medium'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    {t.uxAgents?.howToUse || 'How to use'}
                  </Link>
                </div>

                {/* Categories and agents */}
                {AGENT_CATEGORIES.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      {category.name[lang]}
                    </h3>

                    <ul className="space-y-1 pl-1">
                      {getAgentsByCategory(category.id).map((agent) => {
                        const href = `/projects/ux-agents/${category.id}/${agent.slug}`
                        return (
                          <li key={agent.slug}>
                            <Link
                              href={href}
                              onClick={handleLinkClick}
                              className={cn(
                                'block text-sm transition-colors py-1',
                                isActive(href)
                                  ? 'text-foreground font-medium'
                                  : 'text-muted hover:text-foreground'
                              )}
                            >
                              {agent.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
