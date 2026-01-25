import { Container } from '@/components/ui/Container'
import { AgentSidebar } from '@/components/ux-agents/AgentSidebar'

export default function UXAgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="relative">
      <AgentSidebar />
      {children}
    </Container>
  )
}
