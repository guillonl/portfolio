'use client'

import { useLanguage } from '@/_core/lib/i18n/LanguageContext'

export function Bio() {
  const { t } = useLanguage()

  const linkStyles = "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-70 [&_a]:transition-opacity"

  return (
    <section className="pb-8">
      <h1 className="font-semibold">{t.bio.name}</h1>
      <p
        className={`text-muted leading-relaxed mt-4 ${linkStyles}`}
        dangerouslySetInnerHTML={{ __html: t.bio.role }}
      />
      <p className="text-muted leading-relaxed mt-2">{t.bio.description}</p>
      <p
        className={`text-muted leading-relaxed mt-2 ${linkStyles}`}
        dangerouslySetInnerHTML={{ __html: t.bio.history }}
      />
    </section>
  )
}
