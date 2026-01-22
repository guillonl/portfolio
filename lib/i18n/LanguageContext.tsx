'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import fr from './translations/fr.json'
import en from './translations/en.json'

export type Language = 'fr' | 'en'
type Translations = typeof fr

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = { fr, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr')

  useEffect(() => {
    const savedLang = getCookie('lang') as Language | undefined
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLangState(savedLang)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    setCookie('lang', newLang, { maxAge: 60 * 60 * 24 * 365 })
  }

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
