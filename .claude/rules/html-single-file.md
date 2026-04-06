---
paths:
  - "*.html"
  - "index.html"
  - "app.html"
---

# HTML Single File Rules

> **Justification** : ADR-0001-stack.md, docs/specs/system.md

## Structure du fichier

- Fichier unique `index.html` contenant CSS inline (`<style>`) et JS inline (`<script>`)
- Sections JS delimitees par commentaires : `// === DOMAIN ===`, `// === APPLICATION ===`, `// === INFRASTRUCTURE ===`, `// === UI ===`
- Constantes (config Supabase, templates, couleurs) en debut de section `<script>`
- Fonctions nommees, pas de classes, pas de modules ES

## Design Tokens FSY

- Terracotta : `#B55B50`
- Creme : `#FFFBF7`
- Teal : `#033231`
- Font heading : `Playfair Display SC`
- Font body : `Montserrat`
- Utiliser les CSS custom properties (`--fsy-terracotta`, etc.)

## Dependances CDN

- Supabase JS : `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- Google Fonts : Montserrat + Playfair Display SC
- Zero dependance npm, zero build

## Supabase

- Instance : `dcynlifggjiqqihincbp`
- Auth : `signInWithPassword()` (v2, pas `signIn()`)
- Session : `getSession()` (v2, pas `session()`)
- Pattern async/await : `const { data, error } = await supabase.from(...)`
- Tables prefixees `playbook_` pour eviter les conflits avec le portail client V2

## Code Quality

- JS lisible, fonctions nommees, pas de minification
- Commentaires inline pour expliquer la logique metier
- Pas de magic numbers : utiliser des constantes nommees
- Gestion d'erreurs avec try/catch et messages utilisateur en francais

## V2 — Modules Portail Client (app.html)

- Les modules V2 (Parcours, KPIs, Chatbots, Admin, Assistant) sont des onglets dans `app.html`
- Design tokens V2 CS Consulting : `#C27A5A` (terracotta), `#0f0f0f` (fond sombre), font Inter
- Tables V2 : `parcours_*`, `client_kpi*`, `chatbot_*` — pas de prefixe `playbook_`
- RBAC : 3 roles (admin, client, assistant) via `profiles.role`
- Onglets conditionnels via `enabled_modules` (JSONB array dans profiles)
- RLS obligatoire sur toutes les tables V2 avec policies par role
- `index.html` (Playbook V1) et `app.html` (Portail V2) sont des fichiers distincts — non-regression obligatoire
