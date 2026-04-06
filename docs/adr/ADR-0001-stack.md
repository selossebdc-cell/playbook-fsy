# ADR-0001: Stack technique — Fichier HTML unique + Supabase CDN

## Statut

Accepte

## Date

2026-03-18

## Version

V1

## Contexte

Le Playbook Process FSY doit etre deploye simplement sur GitHub Pages, accessible depuis desktop et mobile, partager les donnees entre Aurelia et Laurie, et etre maintenable par Catherine sans build system. Le portail client V2 utilise deja une approche similaire (fichier HTML + Supabase CDN sur la meme instance).

## Decision

Nous utiliserons un fichier HTML unique avec CSS et JavaScript inline, Supabase charge via CDN (jsDelivr), et Google Fonts pour la typographie. Zero dependance npm, zero build.

## Options considerees

### Option 1: Fichier HTML unique + Supabase CDN (retenue)

**Description** : Un seul fichier index.html contenant tout le CSS et le JS, avec Supabase et Google Fonts charges via CDN.

**Avantages** :
- Deploiement trivial (1 fichier sur GitHub Pages)
- Coherence avec le portail client V2 (meme approche, meme instance Supabase)
- Zero configuration, zero build
- Maintenable par Catherine sans tooling

**Inconvenients** :
- Fichier potentiellement volumineux (11 templates = beaucoup de JS)
- Pas de separation en modules (tout dans 1 fichier)
- Pas de TypeScript, pas de linting automatique

### Option 2: Framework SPA (React/Vue) + Supabase

**Description** : Application React ou Vue avec build Vite, deployee en statique.

**Avantages** :
- Meilleure organisation du code (composants, modules)
- TypeScript, linting, tests unitaires
- Ecosysteme riche

**Inconvenients** :
- Build system requis (complexite inutile pour le scope)
- Multiple fichiers a deployer
- Surcharge pour 2-5 utilisateurs
- Catherine devrait maintenir un toolchain

### Option 3: Fichier HTML + localStorage (sans Supabase)

**Description** : Meme approche que l'option 1 mais avec localStorage au lieu de Supabase.

**Avantages** :
- Aucune dependance externe
- Fonctionne offline

**Inconvenients** :
- Pas de partage de donnees entre Aurelia et Laurie (deal-breaker)
- Donnees perdues si le navigateur est nettoye

## Justification

L'option 1 est la plus coherente avec l'ecosysteme existant (portail client V2) et la plus simple pour le scope du MVP. Le partage de donnees entre utilisateurs (Aurelia et Laurie) exclut l'option 3. La complexite d'un framework SPA n'est pas justifiee pour 2-5 utilisateurs et ~400 etapes.

## Consequences

### Positives

- Deploiement et maintenance extremement simples
- Coherence avec les autres outils FSY/CS Consulting
- Meme instance Supabase reutilisee (pas de nouveau compte a gerer)

### Negatives

- Fichier unique peut devenir difficile a maintenir au-dela de ~2000 lignes (mitigation : sections commentees, fonctions nommees)
- Pas de tests unitaires automatises (mitigation : tests manuels decrits dans acceptance.md)

### Neutres

- La cle anon Supabase est exposee dans le code (par design — c'est le modele de securite Supabase avec RLS)

## Implementation

### Actions requises

1. Creer le fichier `index.html` avec la structure HTML de base
2. Configurer les tables Supabase (`playbook_processes`, `playbook_steps`, `playbook_owners`)
3. Activer RLS sur toutes les tables
4. Creer les comptes utilisateurs dans Supabase Auth
5. Deployer sur GitHub Pages avec CNAME custom (optionnel)

### Fichiers impactes

- `index.html` (fichier unique de l'application)
- Dashboard Supabase (tables, RLS, auth)

## Contraintes architecturales

### Structure du fichier unique

| Section | Contenu | Convention |
|---------|---------|------------|
| `<head>` | Meta, Google Fonts, CSS inline | Design tokens FSY en CSS custom properties |
| `<body>` | HTML des 3 vues + login | IDs semantiques, sections commentees |
| `<script>` CDN | Supabase JS | Charge avant le script principal |
| `<script>` principal | JS inline (Domain, Application, Infrastructure, UI) | Sections commentees, fonctions nommees |

### Regles de dependance

- Domain (fonctions pures) → aucune dependance externe
- Application → Domain uniquement
- Infrastructure → Supabase CDN
- UI → Application + DOM

### Patterns structurels imposes

- Fonctions nommees (pas de classes, pas de modules ES)
- Sections commentees pour delimiter les couches
- Constantes en haut du script (couleurs, templates, config Supabase)
- Gestion d'erreurs avec try/catch et messages utilisateur

## Configuration de reference

> Source de verite : `docs/specs/stack-reference.md`

### Supabase JS CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

Version verifiee : 2.99.2 (npm registry, 2026-03-18).

### Initialisation Supabase

```javascript
const SUPABASE_URL = 'https://dcynlifggjiqqihincbp.supabase.co';
const SUPABASE_ANON_KEY = '<ANON_KEY>';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display+SC&display=swap" rel="stylesheet">
```

### Design Tokens

```css
:root {
  --fsy-terracotta: #B55B50;
  --fsy-creme: #FFFBF7;
  --fsy-teal: #033231;
  --font-heading: 'Playfair Display SC', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

## References

- Supabase JS v2 docs : https://supabase.com/docs/reference/javascript/installing
- GitHub Pages : https://pages.github.com/
- Portail client V2 (meme approche) : `03-developpement/portail-client-v2/`

---

<!-- V2:START -->

## Extension V2 — Modules Portail Client

### Contexte V2

Le Portail Client V2 (app.html) est deja en production avec la meme instance Supabase. La V2 ajoute 3 modules (Parcours Client, KPIs, Chatbots) en onglets dans app.html, plus une vue admin multi-clients et un role assistant. Les chatbots WhatsApp et Telegram s'executent sur le VPS OVH via n8n et lisent les FAQ depuis Supabase.

### Decision V2

Nous conserverons l'architecture fichier unique HTML + Supabase CDN pour les modules V2 integres dans app.html. Les chatbots WhatsApp et Telegram restent sur le VPS OVH (workflows n8n) et lisent les FAQ depuis Supabase, avec un fallback JSON quotidien.

### Ajouts V2

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Modules V2 | Onglets conditionnels dans app.html | Decision D13 — single-page, modules actives par client |
| Auth V2 | Supabase Auth existant + RBAC (admin/client/assistant) | Roles dans profiles.role, RLS par politique |
| Chatbot WhatsApp | Workflow n8n sur VPS, lit FAQ via Supabase API | Separation backend/frontend, fallback JSON |
| Chatbot Telegram | Workflows n8n existants (8), migration FAQ vers Supabase | Garde l'existant, centralise les FAQ |
| Fallback chatbot | Snapshot JSON 1x/jour sur VPS via n8n | Resilience si Supabase down |
| Charte V2 | CS Consulting (#C27A5A, #0f0f0f, Inter) | Differente du design FSY Playbook V1 |
| Tables V2 | 10 nouvelles tables Supabase (parcours_*, client_kpi*, chatbot_*) | Voir docs/specs/api.md |

### Configuration de reference V2

> Source de verite : `docs/specs/stack-reference.md`

#### Supabase JS CDN

Version verifiee : 2.101.1 (npm registry, 2026-04-05).

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

#### Design Tokens V2 (CS Consulting)

```css
:root {
  --cs-terracotta: #C27A5A;
  --cs-fond-sombre: #0f0f0f;
  --font-body-v2: 'Inter', sans-serif;
}
```

### Fichiers impactes V2

- `app.html` (portail V2 existant — ajout onglets F6, F7, F8, F11, F12)
- `index.html` (playbook V1 — inchange, non-regression)
- Dashboard Supabase (10 nouvelles tables, RLS V2)
- Workflows n8n (chatbot WhatsApp + Telegram, batch stats, fallback JSON)

<!-- V2:END -->

## Historique des revisions

| Date | Auteur | Description |
|------|--------|-------------|
| 2026-03-18 | Architect (factory-spec) | Creation |
| 2026-04-05 | Architect (factory-spec) | Extension V2 — Modules Portail Client, RBAC, Chatbots |
