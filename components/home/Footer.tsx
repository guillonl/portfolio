'use client'

import { useLanguage } from '@/_core/lib/i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-8 border-t border-border">
      <nav className="flex gap-6 text-sm">
        <a
          href="https://github.com/guillonl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.github}
        </a>
        <a
          href="https://substack.com/@leoguillon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.substack}
        </a>
        <a
          href="https://www.linkedin.com/in/leoguillon/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {t.footer.linkedin}
        </a>
      </nav>
    </footer>
  )
}
