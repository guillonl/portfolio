'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const router = useRouter()

  const handleToggle = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr'
    setLang(newLang)
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      className="text-muted hover:text-foreground transition-colors text-sm w-6 flex justify-center"
      aria-label="Toggle language"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {lang}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
