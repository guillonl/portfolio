'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="hidden lg:block sticky top-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <span>←</span>
        <span>Index</span>
      </Link>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                'block text-sm transition-colors relative',
                activeId === item.id
                  ? 'text-foreground'
                  : 'text-muted hover:text-foreground'
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute -left-3 top-0 bottom-0 w-px bg-foreground"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
