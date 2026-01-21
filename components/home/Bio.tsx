'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Bio() {
  const { t } = useLanguage()

  return (
    <section className="py-8">
      <h1 className="font-semibold">{t.bio.name}</h1>
      <p className="text-muted leading-relaxed mt-4">{t.bio.description}</p>
    </section>
  )
}
