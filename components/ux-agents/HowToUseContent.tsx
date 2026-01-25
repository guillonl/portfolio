'use client'

import { PageTransition } from './PageTransition'

interface Video {
  title: string
  src: string
}

interface HowToUseContentProps {
  title: string
  paragraphs: string[]
  videos?: Video[]
}

export function HowToUseContent({ title, paragraphs, videos }: HowToUseContentProps) {
  return (
    <PageTransition>
      <article>
        <header className="mb-8">
          <h1 className="font-semibold">{title}</h1>
        </header>
        <div className="space-y-4 text-sm leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-muted">{p}</p>
          ))}
        </div>

        {videos && videos.length > 0 && (
          <div className="mt-10 space-y-8">
            {videos.map((video, i) => (
              <div key={i}>
                <h2 className="font-medium mb-4">{video.title}</h2>
                <video
                  src={video.src}
                  controls
                  className="w-full rounded-lg border border-border"
                  preload="metadata"
                />
              </div>
            ))}
          </div>
        )}
      </article>
    </PageTransition>
  )
}
