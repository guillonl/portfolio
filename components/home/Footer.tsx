'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-8 border-t border-border">
      <nav className="flex gap-6 text-sm">
        <a
          href="https://github.com/leoguillon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.github}
        </a>
        <a
          href="https://twitter.com/leoguillon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.twitter}
        </a>
        <a
          href="mailto:hello@leoguillon.com"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.email}
        </a>
      </nav>
    </footer>
  )
}
