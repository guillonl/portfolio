import { Container } from '@/components/ui/Container'
import { Bio } from '@/components/home/Bio'
import { HomeContent } from '@/components/home/HomeContent'
import { Footer } from '@/components/home/Footer'
import { getAllProjects } from '@/_core/lib/projects'

export default async function HomePage() {
  // Charger tous les projets (les deux langues)
  const projects = await getAllProjects()

  return (
    <Container>
      <Bio />

      <section className="py-8">
        <HomeContent projects={projects} />
      </section>

      <Footer />
    </Container>
  )
}
