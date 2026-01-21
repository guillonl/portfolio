# Documentation du Projet Portfolio

Ce document retrace le processus de création du portfolio de Leo Guillon, depuis la conception initiale jusqu'à l'implémentation finale. Il servira de base pour un article projet.

---

## Contexte Initial

**Objectif** : Créer un portfolio minimaliste en code, déployable sur Vercel avec nom de domaine personnalisé.

**Motivations** :
- Plus de contrôle qu'un outil no-code
- Lieu d'expérimentation UI/UX
- Partage de ressources avec la communauté (ex: ux-folder-files)
- Possibilité de créer des projets ensemble et les documenter

---

## Inspirations

### benji.org
- Layout ultra-minimaliste, centré, content-first
- Typographie simple avec hiérarchie claire
- Palette neutre (noir/blanc) avec accents subtils
- Micro-interactions délicates

### jakub.kr
- Système de filtrage par catégories (All, Writing, Tips, Components)
- Organisation chronologique des projets
- Cards avec hover states et shadows subtiles

---

## Questions & Réponses avec l'Utilisateur

### Q1: Quelle stack technique préfères-tu ?
**Options** : Next.js + Tailwind / Astro + Tailwind / HTML/CSS/JS vanilla
**Réponse** : Next.js + Tailwind

### Q2: Comment gérer le contenu des projets ?
**Options** : Fichiers Markdown / JSON/YAML / Hardcodé en HTML
**Réponse** : Fichiers Markdown (MDX)

### Q3: Quelles pages initiales ?
**Options** : Home + Projects / + About / + Resources
**Réponse** : Home + Projects

### Q4: Thème clair, sombre, ou les deux ?
**Options** : Clair uniquement / Sombre uniquement / Les deux (toggle)
**Réponse** : Les deux (toggle)

### Q5: Catégories de projets pour le filtrage ?
**Options** : UI / UX / Code / Design / Dev / Resources / Components / Writing / Experiments
**Réponse** : UI / UX / Code

### Q6: Métadonnées pour chaque projet ?
**Options** : Titre + Date + Catégorie / + Description / + Image preview
**Réponse** : Titre + Date + petites illustrations de catégorie (à travailler ensemble)

### Q7: Organisation des ressources communautaires ?
**Options** : Dossier /public/resources / Liens vers repos externes / Les deux
**Réponse** : Dossier /public/resources

---

## Décisions Techniques

### Stack Finale
- **Framework** : Next.js 14+ (App Router)
- **Styling** : Tailwind CSS + CSS Variables (design tokens)
- **Animations** : Framer Motion
- **Contenu** : MDX avec gray-matter (frontmatter)
- **Thème** : next-themes (clair/sombre)
- **Typographie** : Inter 14px via next/font

### Design Tokens
```css
/* Container */
--container-max: 550px;
--container-padding: 16px;

/* Catégories */
--color-ui: #8b5cf6;    /* Violet */
--color-ux: #10b981;    /* Vert */
--color-code: #f59e0b;  /* Ambre */
```

### Pourquoi ces choix ?

**Next.js plutôt qu'Astro** : Plus flexible pour les futures expérimentations, meilleure intégration Vercel, écosystème React plus large.

**MDX plutôt que JSON** : Plus facile à écrire et lire, possibilité d'inclure des composants React dans le contenu.

**Framer Motion plutôt que CSS animations** : AnimatePresence pour gérer les entrées/sorties lors du filtrage, layoutId pour transitions fluides.

**State local plutôt qu'URL params** : UX plus fluide sans refresh de page, animations possibles lors des changements de filtre.

---

## Évolution du Projet

### Version 1 - Architecture Initiale
- Page Home séparée de page Projects
- Filtrage via URL params (navigation complète)
- Pas d'animations

**Structure** :
```
/              → Bio + liens
/projects      → Liste avec filtres
/projects/[slug] → Détail projet
```

### Version 2 - Restructuration (demande utilisateur)
- Projets intégrés directement dans la Home
- Filtrage via state local (pas de refresh)
- Animations Framer Motion
- Réseaux sociaux en bas de page
- Header simplifié (juste "Home" + toggle thème)

**Nouvelle structure** :
```
/              → Bio + Filtres + Projets + Footer
/projects/[slug] → Détail projet
```

---

## Structure des Fichiers

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout + ThemeProvider
│   ├── page.tsx                # Home (bio + projets + footer)
│   ├── globals.css             # Styles + tokens
│   └── projects/
│       └── [slug]/page.tsx     # Page projet individuel
├── components/
│   ├── ui/
│   │   ├── Container.tsx       # Container 550px
│   │   └── ThemeToggle.tsx     # Switch thème
│   ├── layout/
│   │   └── Header.tsx          # Home + ThemeToggle
│   ├── home/
│   │   └── HomeContent.tsx     # Client component avec state filtres
│   └── projects/
│       ├── ProjectCard.tsx     # Item projet
│       ├── ProjectList.tsx     # Liste animée
│       └── CategoryFilter.tsx  # Filtres state local
├── content/
│   └── projects/               # Fichiers MDX
├── lib/
│   ├── projects.ts             # Utilitaires fetch projets
│   └── utils.ts                # cn(), formatDate()
├── public/
│   └── resources/              # Fichiers téléchargeables
├── types/
│   └── project.ts              # Types TypeScript
└── DOCUMENTATION.md            # Ce fichier
```

---

## Format des Projets (MDX)

```mdx
---
title: "Nom du projet"
date: "2024-01-15"
category: "UI"
description: "Description courte du projet"
featured: true
---

Contenu du projet en Markdown...

## Section 1
Texte...

## Section 2
Texte...
```

---

## Commandes Utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer le build
npm start

# Lint
npm run lint
```

---

## Comment Reprendre la Conversation

Si tu dois reprendre ce projet à zéro ou continuer le développement, voici les points clés :

### Contexte
- Portfolio minimaliste pour Leo Guillon
- Inspiré de benji.org (style) et jakub.kr (filtrage)
- Lieu d'expérimentation UI/UX

### Stack
- Next.js 14 + Tailwind + MDX + Framer Motion
- Container 550px, Inter 14px
- Thème clair/sombre avec toggle

### Structure actuelle
- Home = bio + projets filtrés + réseaux sociaux
- Filtrage client-side sans refresh (state local)
- Pages détail projet en /projects/[slug]

### Conventions
- Projets en MDX dans /content/projects/
- Catégories : UI (violet), UX (vert), Code (ambre)
- Ressources dans /public/resources/

### Ce qui reste à faire
- Ajouter des projets réels
- Créer les illustrations de catégories
- Personnaliser le contenu (bio, liens sociaux)
- Déployer sur Vercel + connecter le domaine

---

## Réflexions pour l'Article

### Ce qui a bien fonctionné
1. **Questionnement structuré** : Poser des questions précises avec options aide à définir rapidement la direction
2. **Itération** : Commencer simple puis enrichir selon les retours
3. **Documentation en temps réel** : Garder trace des décisions facilite la reprise

### Points d'amélioration
1. **Anticiper les besoins d'animation** : Aurait pu intégrer Framer Motion dès le début
2. **Structure flexible** : La restructuration Home/Projects montre l'importance de garder le code modulaire

### Apprentissages
- L'architecture initiale n'est jamais définitive
- Les animations ne sont pas un "nice to have" mais un élément UX important
- La documentation pendant le développement > documentation après coup

---

*Dernière mise à jour : 21 janvier 2026*
