'use client'

import { motion } from 'framer-motion'
import { cn } from '@/_core/lib/utils'
import { ProjectCategory } from '@/_core/types/project'
import { useLanguage } from '@/_core/lib/i18n/LanguageContext'

const categories = ['All', 'UI', 'UX', 'Code'] as const

interface CategoryFilterProps {
  current: ProjectCategory | 'All'
  onChange: (category: ProjectCategory | 'All') => void
}

export function CategoryFilter({ current, onChange }: CategoryFilterProps) {
  const { t } = useLanguage()

  const getLabel = (cat: string) => {
    if (cat === 'All') return t.filter.all
    return cat
  }

  return (
    <div className="flex gap-4 text-sm mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat as ProjectCategory | 'All')}
          className={cn(
            'relative transition-colors',
            current === cat
              ? 'text-foreground'
              : 'text-muted hover:text-foreground'
          )}
        >
          {getLabel(cat)}
          {current === cat && (
            <motion.div
              layoutId="category-indicator"
              className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
