import { cookies } from 'next/headers'
import type { Language } from '@/_core/lib/i18n/LanguageContext'
import { HowToUseContent } from '@/components/ux-agents/HowToUseContent'

// Force dynamic rendering to read cookies on each request
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'UX Agents - How to Use',
}

const content = {
  fr: {
    title: "Comment l'utiliser",
    paragraphs: [
      "Ces agents IA sont conçus pour assister les designers et product managers dans leurs tâches quotidiennes.",
      "Vous pouvez les utiliser comme sous-agents dans Claude Skills pour automatiser vos workflows UX.",
      "Ils peuvent également être ajoutés directement dans vos conversations ou projets ChatGPT."
    ],
    videos: [
      {
        title: "Comment l'ajouter en Skills",
        src: "/videos/claude.mp4"
      },
      {
        title: "Comment le mettre dans un projet ChatGPT",
        src: "/videos/Chatgpt.mp4"
      }
    ]
  },
  en: {
    title: 'How to use',
    paragraphs: [
      'These AI agents are designed to assist designers and product managers in their daily tasks.',
      'You can use them as sub-agents in Claude Skills to automate your UX workflows.',
      'They can also be added directly to your ChatGPT conversations or projects.'
    ],
    videos: [
      {
        title: "How to add as a Skill",
        src: "/videos/claude.mp4"
      },
      {
        title: "How to add to a ChatGPT project",
        src: "/videos/Chatgpt.mp4"
      }
    ]
  }
}

export default async function HowToUsePage() {
  const cookieStore = await cookies()
  const lang = (cookieStore.get('lang')?.value as Language) || 'fr'
  const t = content[lang]

  return <HowToUseContent title={t.title} paragraphs={t.paragraphs} videos={t.videos} />
}
