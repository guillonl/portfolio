'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import fr from './translations/fr.json'
import en from './translations/en.json'

type Language = 'fr' | 'en'
type Translations = typeof fr

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = { fr, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('fr')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
