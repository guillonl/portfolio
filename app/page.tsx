import { Container } from '@/components/ui/Container'
import { HomeContent } from '@/components/home/HomeContent'
import { getAllProjects } from '@/lib/projects'

export default async function HomePage() {
  const projects = await getAllProjects()

  return (
    <Container>
      {/* Bio */}
      <section className="py-8">
        <h1 className="font-semibold">Leo Guillon</h1>
        <p className="text-muted leading-relaxed mt-4">
          Designer and developer crafting digital experiences.
          Currently focused on design systems and interactive interfaces.
        </p>
      </section>

      {/* Projects */}
      <section className="py-8">
        <HomeContent projects={projects} />
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <nav className="flex gap-6 text-sm">
          <a
            href="https://github.com/leoguillon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/leoguillon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            Twitter
          </a>
          <a
            href="mailto:hello@leoguillon.com"
            className="text-muted hover:text-foreground transition-colors"
          >
            Email
          </a>
        </nav>
      </footer>
    </Container>
  )
}
