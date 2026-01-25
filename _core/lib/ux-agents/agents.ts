import { AgentCategory, UXAgent } from './types'

export const AGENT_CATEGORIES: AgentCategory[] = [
  { id: 'analysis', name: { fr: 'Analyse', en: 'Analysis' } },
  { id: 'data-intelligence', name: { fr: 'Data Intelligence', en: 'Data Intelligence' } },
  { id: 'deliverables', name: { fr: 'Livrables', en: 'Deliverables' } },
  { id: 'orchestrators', name: { fr: 'Orchestrateurs', en: 'Orchestrators' } },
  { id: 'workshops', name: { fr: 'Workshops', en: 'Workshops' } },
]

export const AGENTS: UXAgent[] = [
  // Analysis
  {
    slug: 'design-system-auditor',
    name: 'Design System Auditor',
    category: 'analysis',
    githubPath: 'analysis/design-system-auditor.md',
    description: {
      fr: "Analyse les design systems pour identifier les incohérences et proposer des améliorations structurelles.",
      en: "Analyzes design systems to identify inconsistencies and suggest structural improvements."
    }
  },
  {
    slug: 'multi-framework-analyzer',
    name: 'Multi-Framework Analyzer',
    category: 'analysis',
    githubPath: 'analysis/multi-framework-analyzer.md',
    description: {
      fr: "Compare et analyse plusieurs frameworks UI/UX pour guider les choix technologiques.",
      en: "Compares and analyzes multiple UI/UX frameworks to guide technology choices."
    }
  },
  {
    slug: 'ux-auditor-bastien-scapin',
    name: 'UX Auditor Bastien Scapin',
    category: 'analysis',
    githubPath: 'analysis/ux-auditor-bastien-scapin.md',
    description: {
      fr: "Audit UX basé sur les critères ergonomiques de Bastien & Scapin pour évaluer l'utilisabilité.",
      en: "UX audit based on Bastien & Scapin ergonomic criteria to evaluate usability."
    }
  },
  {
    slug: 'ux-auditor-nielsen',
    name: 'UX Auditor Nielsen',
    category: 'analysis',
    githubPath: 'analysis/ux-auditor-nielsen.md',
    description: {
      fr: "Audit UX basé sur les 10 heuristiques de Nielsen pour identifier les problèmes d'interface.",
      en: "UX audit based on Nielsen's 10 heuristics to identify interface issues."
    }
  },

  // Data Intelligence
  {
    slug: 'ab-test-analyst',
    name: 'A/B Test Analyst',
    category: 'data-intelligence',
    githubPath: 'data-intelligence/ab-test-analyst.md',
    description: {
      fr: "Analyse les résultats de tests A/B et formule des recommandations basées sur les données.",
      en: "Analyzes A/B test results and formulates data-driven recommendations."
    }
  },
  {
    slug: 'analytics-interpreter',
    name: 'Analytics Interpreter',
    category: 'data-intelligence',
    githubPath: 'data-intelligence/analytics-interpreter.md',
    description: {
      fr: "Interprète les données analytics pour extraire des insights actionnables.",
      en: "Interprets analytics data to extract actionable insights."
    }
  },
  {
    slug: 'competitive-intelligence-analyst',
    name: 'Competitive Intelligence Analyst',
    category: 'data-intelligence',
    githubPath: 'data-intelligence/competitive-intelligence-analyst.md',
    description: {
      fr: "Analyse la concurrence et identifie les opportunités de différenciation.",
      en: "Analyzes competition and identifies differentiation opportunities."
    }
  },
  {
    slug: 'qualitative-feedback-analyzer',
    name: 'Qualitative Feedback Analyzer',
    category: 'data-intelligence',
    githubPath: 'data-intelligence/qualitative-feedback-analyzer.md',
    description: {
      fr: "Analyse les retours utilisateurs qualitatifs pour identifier les tendances et insights.",
      en: "Analyzes qualitative user feedback to identify trends and insights."
    }
  },
  {
    slug: 'ux-research-scout',
    name: 'UX Research Scout',
    category: 'data-intelligence',
    githubPath: 'data-intelligence/ux-research-scout.md',
    description: {
      fr: "Recherche et synthétise les études UX pertinentes pour informer les décisions.",
      en: "Researches and synthesizes relevant UX studies to inform decisions."
    }
  },

  // Deliverables
  {
    slug: 'accessibility-wcag-checker',
    name: 'Accessibility WCAG Checker',
    category: 'deliverables',
    githubPath: 'deliverables/accessibility-wcag-checker.md',
    description: {
      fr: "Vérifie la conformité WCAG et génère des rapports d'accessibilité détaillés.",
      en: "Checks WCAG compliance and generates detailed accessibility reports."
    }
  },
  {
    slug: 'persona-generator',
    name: 'Persona Generator',
    category: 'deliverables',
    githubPath: 'deliverables/persona-generator.md',
    description: {
      fr: "Génère des personas utilisateurs détaillés basés sur les données de recherche.",
      en: "Generates detailed user personas based on research data."
    }
  },
  {
    slug: 'user-journey-mapper',
    name: 'User Journey Mapper',
    category: 'deliverables',
    githubPath: 'deliverables/user-journey-mapper.md',
    description: {
      fr: "Cartographie les parcours utilisateurs et identifie les points de friction.",
      en: "Maps user journeys and identifies friction points."
    }
  },

  // Orchestrators
  {
    slug: 'conversational-ux-advisor',
    name: 'Conversational UX Advisor',
    category: 'orchestrators',
    githubPath: 'orchestrators/conversational-ux-advisor.md',
    description: {
      fr: "Conseiller UX conversationnel pour une guidance interactive et personnalisée.",
      en: "Conversational UX advisor for interactive and personalized guidance."
    }
  },
  {
    slug: 'ux-workflow-coordinator',
    name: 'UX Workflow Coordinator',
    category: 'orchestrators',
    githubPath: 'orchestrators/ux-workflow-coordinator.md',
    description: {
      fr: "Coordonne les workflows et processus UX pour optimiser la collaboration.",
      en: "Coordinates UX workflows and processes to optimize collaboration."
    }
  },

  // Workshops
  {
    slug: 'design-sprint-conductor',
    name: 'Design Sprint Conductor',
    category: 'workshops',
    githubPath: 'workshops/design-sprint-conductor.md',
    description: {
      fr: "Facilite les Design Sprints de 5 jours pour résoudre rapidement les problèmes.",
      en: "Facilitates 5-day Design Sprints to rapidly solve problems."
    }
  },
  {
    slug: 'design-thinking-facilitator',
    name: 'Design Thinking Facilitator',
    category: 'workshops',
    githubPath: 'workshops/design-thinking-facilitator.md',
    description: {
      fr: "Guide les ateliers de Design Thinking avec une approche centrée utilisateur.",
      en: "Guides Design Thinking workshops with a user-centered approach."
    }
  },
  {
    slug: 'impact-mapping-facilitator',
    name: 'Impact Mapping Facilitator',
    category: 'workshops',
    githubPath: 'workshops/impact-mapping-facilitator.md',
    description: {
      fr: "Facilite les sessions d'Impact Mapping pour aligner objectifs et fonctionnalités.",
      en: "Facilitates Impact Mapping sessions to align goals and features."
    }
  },
  {
    slug: 'lean-ux-canvas-facilitator',
    name: 'Lean UX Canvas Facilitator',
    category: 'workshops',
    githubPath: 'workshops/lean-ux-canvas-facilitator.md',
    description: {
      fr: "Guide la création de Lean UX Canvas pour structurer les hypothèses produit.",
      en: "Guides Lean UX Canvas creation to structure product hypotheses."
    }
  },
  {
    slug: 'story-mapping-facilitator',
    name: 'Story Mapping Facilitator',
    category: 'workshops',
    githubPath: 'workshops/story-mapping-facilitator.md',
    description: {
      fr: "Facilite les ateliers de Story Mapping pour prioriser le backlog produit.",
      en: "Facilitates Story Mapping workshops to prioritize the product backlog."
    }
  },
]

export function getAgentsByCategory(categoryId: string): UXAgent[] {
  return AGENTS.filter(agent => agent.category === categoryId)
}

export function getAgentBySlug(slug: string): UXAgent | undefined {
  return AGENTS.find(agent => agent.slug === slug)
}

export function getCategoryById(categoryId: string): AgentCategory | undefined {
  return AGENT_CATEGORIES.find(c => c.id === categoryId)
}
