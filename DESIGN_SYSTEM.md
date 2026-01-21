# Design System - Portfolio Leo Guillon

Ce document définit les règles UI du portfolio pour garantir une cohérence visuelle à travers toutes les pages et composants.

---

## Principes Fondamentaux

### 1. Minimalisme
- Pas d'éléments décoratifs superflus
- Espaces blancs généreux
- Focus sur le contenu

### 2. Cohérence
- Même traitement visuel pour éléments similaires
- Animations uniformes
- Palette de couleurs restreinte

### 3. Accessibilité
- Contraste suffisant (WCAG AA minimum)
- Tailles de texte lisibles
- États interactifs clairs

---

## Typographie

### Police
- **Famille** : Inter (via next/font)
- **Fallback** : system-ui, sans-serif

### Échelle
| Usage | Taille | Poids | Line Height |
|-------|--------|-------|-------------|
| Corps de texte | 14px (0.875rem) | 400 (normal) | 1.6 |
| Texte petit | 13px (0.8125rem) | 400 (normal) | 1.5 |
| Titres (H1, H2) | 14px (0.875rem) | 600 (semibold) | 1.6 |

### Règles
- **Titres** : Toujours en `font-semibold` (600), jamais plus grand que 14px
- **Corps** : `font-normal` (400)
- **Dates et métadonnées** : Couleur secondaire (`text-muted`)

```css
/* Classes Tailwind */
.titre { @apply font-semibold; }
.corps { @apply text-base leading-relaxed; }
.meta { @apply text-sm text-muted; }
```

---

## Couleurs

### Palette Principale

#### Mode Clair
| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-bg` | #ffffff | Fond principal |
| `--color-bg-secondary` | #fafafa | Fonds secondaires, hover |
| `--color-text` | #171717 | Texte principal |
| `--color-text-secondary` | #666666 | Texte secondaire |
| `--color-text-tertiary` | #999999 | Texte tertiaire |
| `--color-border` | #e5e5e5 | Bordures |

#### Mode Sombre
| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-bg` | #0a0a0a | Fond principal |
| `--color-bg-secondary` | #171717 | Fonds secondaires, hover |
| `--color-text` | #ededed | Texte principal |
| `--color-text-secondary` | #a1a1a1 | Texte secondaire |
| `--color-text-tertiary` | #666666 | Texte tertiaire |
| `--color-border` | #262626 | Bordures |

### Couleurs de Catégories
| Catégorie | Couleur | Usage |
|-----------|---------|-------|
| UI | #8b5cf6 (violet) | Badge, indicateur |
| UX | #10b981 (vert) | Badge, indicateur |
| Code | #f59e0b (ambre) | Badge, indicateur |

### Utilisation
```tsx
// Texte principal
<p className="text-foreground">...</p>

// Texte secondaire
<p className="text-muted">...</p>

// Fond hover
<div className="hover:bg-[var(--color-bg-secondary)]">...</div>

// Catégorie
<span className="text-ui">UI</span>
<span className="text-ux">UX</span>
<span className="text-code">Code</span>
```

---

## Espacement

### Échelle de Base (4px)
| Token | Valeur | Tailwind |
|-------|--------|----------|
| space-1 | 4px | `p-1`, `m-1` |
| space-2 | 8px | `p-2`, `m-2` |
| space-3 | 12px | `p-3`, `m-3` |
| space-4 | 16px | `p-4`, `m-4` |
| space-6 | 24px | `p-6`, `m-6` |
| space-8 | 32px | `p-8`, `m-8` |

### Container
- **Largeur max** : 550px
- **Padding latéral** : 16px (mobile), 16px (desktop)

```tsx
// Container standard
<Container>
  {/* max-width: 550px, padding: 16px */}
</Container>
```

---

## Arrondis (Border Radius)

### Règle Unique
**Tous les éléments interactifs et cards utilisent 4px de border-radius.**

| Élément | Valeur | Tailwind |
|---------|--------|----------|
| Cards | 4px | `rounded-[4px]` |
| Boutons | 4px | `rounded-[4px]` |
| Hover states | 4px | `rounded-[4px]` |
| Badges | 4px | `rounded-[4px]` |
| Inputs | 4px | `rounded-[4px]` |

```tsx
// Exemple card
<div className="rounded-[4px] hover:bg-[var(--color-bg-secondary)]">
  ...
</div>

// Exemple bouton
<button className="rounded-[4px] bg-[var(--color-bg-secondary)]">
  ...
</button>
```

---

## Animations (Framer Motion)

### Principes
- **Subtiles** : Pas d'animations ostentatoires
- **Rapides** : Durées courtes (150-300ms)
- **Purposeful** : Chaque animation a une raison

### Animations Standards

#### Hover Scale (boutons, icônes)
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  ...
</motion.div>
```

#### Entrée/Sortie (listes)
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.2 }}
>
  ...
</motion.div>
```

#### Indicateur de sélection (navigation, filtres)
```tsx
<motion.div
  layoutId="indicator"
  className="..."
  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
/>
```

### Transitions CSS
Pour les états simples (hover, focus), préférer les transitions CSS :
```css
transition-colors /* Pour les changements de couleur */
transition-all    /* Pour plusieurs propriétés */
```

### Durées
| Type | Durée | Usage |
|------|-------|-------|
| Fast | 150ms | Hovers simples |
| Base | 200ms | Transitions standards |
| Slow | 300ms | Animations complexes |

---

## Composants

### Header
- **Page d'accueil** : Vide à gauche, ThemeToggle à droite
- **Pages projet** : Icône retour (←) avec fond grisé à gauche, ThemeToggle à droite

```tsx
// Icône retour
<motion.div
  className="w-8 h-8 rounded-[4px] bg-[var(--color-bg-secondary)]"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <ArrowLeft />
</motion.div>
```

### Project Card
```tsx
<Link className="py-3 px-2 rounded-[4px] hover:bg-[var(--color-bg-secondary)] transition-colors">
  <Category /> {/* text-ui/ux/code */}
  <Title />    {/* text-foreground */}
  <Date />     {/* text-muted */}
</Link>
```

### Category Filter
```tsx
<button className="relative text-sm">
  {label}
  {isActive && (
    <motion.div
      layoutId="category-indicator"
      className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
    />
  )}
</button>
```

### Table of Contents (Navigation Latérale)
- Visible uniquement sur desktop (lg:)
- Position sticky
- Indicateur animé pour section active
- Lien "← Index" en haut

---

## États Interactifs

### Hover
- **Texte** : `text-muted` → `text-foreground`
- **Fond** : transparent → `bg-[var(--color-bg-secondary)]`
- **Boutons** : `scale: 1.05`

### Active/Selected
- **Texte** : `text-foreground` (pas muted)
- **Indicateur** : Ligne animée (layoutId)

### Focus
- Utiliser les styles par défaut du navigateur ou outline personnalisé
- Ne jamais supprimer complètement l'indicateur de focus

---

## Layout

### Structure Générale
```
┌─────────────────────────────────────┐
│  Header (py-8)                      │
├─────────────────────────────────────┤
│  Main Content                       │
│  ┌───────────────────────────────┐  │
│  │  Container (max-w-550px)      │  │
│  │  px-4 (16px padding)          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Layout Page Projet (Desktop)
```
┌─────────────────────────────────────────┐
│  Header                                 │
├─────────────────────────────────────────┤
│  ┌──────────┬─────────────────────────┐ │
│  │  TOC     │  Content                │ │
│  │  (200px) │  (max-w-550px)          │ │
│  │  sticky  │                         │ │
│  └──────────┴─────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Checklist de Cohérence

Avant de commit, vérifier :

- [ ] Tous les arrondis sont à 4px (`rounded-[4px]`)
- [ ] Les textes utilisent les bonnes couleurs (`foreground`, `muted`)
- [ ] Les hovers ont un fond `bg-secondary` ou un changement de couleur
- [ ] Les animations utilisent les patterns Framer Motion définis
- [ ] Les tailles de texte respectent l'échelle (14px base, 13px small)
- [ ] Les titres sont en `font-semibold`, pas en taille plus grande
- [ ] Le container est bien à 550px max
- [ ] Les espacements suivent l'échelle 4px

---

## Exemples de Code

### Nouveau Composant Interactif
```tsx
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  isActive?: boolean
  children: React.ReactNode
}

export function InteractiveElement({ isActive, children }: Props) {
  return (
    <motion.button
      className={cn(
        'px-3 py-2 rounded-[4px] transition-colors',
        isActive
          ? 'text-foreground bg-[var(--color-bg-secondary)]'
          : 'text-muted hover:text-foreground hover:bg-[var(--color-bg-secondary)]'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
```

### Nouvelle Card
```tsx
export function Card({ title, meta }: CardProps) {
  return (
    <div className="p-4 rounded-[4px] hover:bg-[var(--color-bg-secondary)] transition-colors">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted mt-1">{meta}</p>
    </div>
  )
}
```

---

*Dernière mise à jour : 21 janvier 2026*
