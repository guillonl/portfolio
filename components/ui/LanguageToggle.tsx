'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LanguageToggle() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    // Simuler chargement (sera remplacé par vraie logique i18n)
    await new Promise((r) => setTimeout(r, 200))
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      className="text-muted hover:text-foreground transition-colors text-sm w-6 flex justify-center"
      aria-label="Toggle language"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="text-muted"
          >
            ··
          </motion.span>
        ) : (
          <motion.span
            key={lang}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {lang}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
