'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import JSZip from 'jszip'
import { cn } from '@/_core/lib/utils'
import { useLanguage } from '@/_core/lib/i18n/LanguageContext'
import { AGENT_CATEGORIES, getAgentsByCategory } from '@/_core/lib/ux-agents/agents'
import { fetchAgentContent } from '@/_core/lib/ux-agents/fetchAgent'

export function AgentSidebar() {
  const pathname = usePathname()
  const { lang, t } = useLanguage()
  const [downloading, setDownloading] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href

  const downloadCategory = async (categoryId: string) => {
    if (downloading) return
    setDownloading(categoryId)

    try {
      const zip = new JSZip()
      const agents = getAgentsByCategory(categoryId)

      for (const agent of agents) {
        const content = await fetchAgentContent(agent.githubPath, lang)
        zip.file(`${agent.slug}.md`, content)
      }

      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${categoryId}-agents.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <nav className="hidden lg:block absolute top-0 left-[calc(-50vw+50%+32px)] w-[180px]">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <span>←</span>
        <span>{t.nav.index}</span>
      </Link>

      <div className="space-y-6">
        {/* How to use link */}
        <div>
          <Link
            href="/projects/ux-agents/how-to-use"
            className={cn(
              'block text-sm transition-colors relative',
              isActive('/projects/ux-agents/how-to-use')
                ? 'text-foreground'
                : 'text-muted hover:text-foreground'
            )}
          >
            {isActive('/projects/ux-agents/how-to-use') && (
              <motion.div
                layoutId="sidebar-indicator"
                className="absolute -left-3 top-0 bottom-0 w-px bg-foreground"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            {t.uxAgents?.howToUse || 'How to use'}
          </Link>
        </div>

        {/* Categories and agents */}
        {AGENT_CATEGORIES.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between group mb-2">
              <h3 className="text-sm font-semibold text-foreground">
                {category.name[lang]}
              </h3>
              <button
                onClick={() => downloadCategory(category.id)}
                className={cn(
                  'opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-foreground text-muted',
                  downloading === category.id && 'opacity-100 animate-pulse'
                )}
                title={`Download all ${category.name[lang]} agents`}
                disabled={downloading !== null}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-current"
                >
                  <path
                    d="M8 10L4 6h2.5V2h3v4H12L8 10z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M3 14h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <ul className="space-y-1 pl-1">
              {getAgentsByCategory(category.id).map((agent) => {
                const href = `/projects/ux-agents/${category.id}/${agent.slug}`
                return (
                  <li key={agent.slug}>
                    <Link
                      href={href}
                      className={cn(
                        'block text-sm transition-colors relative',
                        isActive(href)
                          ? 'text-foreground'
                          : 'text-muted hover:text-foreground'
                      )}
                    >
                      {isActive(href) && (
                        <motion.div
                          layoutId="sidebar-indicator"
                          className="absolute -left-3 top-0 bottom-0 w-px bg-foreground"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      {agent.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
