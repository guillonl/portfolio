'use client'

interface PromptBlockProps {
  content: string
}

export function PromptBlock({ content }: PromptBlockProps) {
  return (
    <div className="rounded-[8px] border border-border bg-[var(--color-bg-secondary)] overflow-hidden">
      <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
        <code>{content}</code>
      </pre>
    </div>
  )
}
