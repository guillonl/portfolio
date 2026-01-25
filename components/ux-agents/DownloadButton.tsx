'use client'

import { useLanguage } from '@/_core/lib/i18n/LanguageContext'

interface DownloadButtonProps {
  filename: string
  content: string
}

export function DownloadButton({ filename, content }: DownloadButtonProps) {
  const { t } = useLanguage()

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-[8px] border border-border bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border)] transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-current"
      >
        <path
          d="M8 10L4 6h2.5V2h3v4H12L8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M3 14h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {t.uxAgents?.download || 'Download .md'}
    </button>
  )
}
