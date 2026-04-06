# Playbook Process Face Soul Yoga

## Projet
Application web (fichier HTML unique) pour gerer les process operationnels de Face Soul Yoga.
11 templates RACI pre-remplis, Supabase pour la persistance, auth email + mot de passe.
Utilisateurs : Aurelia (fondatrice, mobile-first), Laurie (assistante, desktop), Catherine (consultante, ponctuel).

## Stack
- HTML / CSS / JavaScript vanilla (fichier unique `index.html`)
- Supabase CDN v2 (`@supabase/supabase-js@2`, instance `dcynlifggjiqqihincbp`)
- Google Fonts (Playfair Display SC, Montserrat)
- GitHub Pages (hebergement)
- Zero dependance npm, zero build

## Architecture
Fichier HTML unique avec 4 couches logiques (sections commentees) :
- **Domain** : fonctions pures (calculs retro-planning, progression, filtrage)
- **Application** : orchestration des cas d'usage
- **Infrastructure** : appels Supabase (persistance, auth)
- **UI** : rendu HTML, gestion evenements, navigation

Tables Supabase : `playbook_processes`, `playbook_steps`, `playbook_owners` (prefixe `playbook_` pour eviter conflits avec portail V2).

## Design Tokens FSY
- Terracotta : `#B55B50`
- Creme : `#FFFBF7`
- Teal : `#033231`
- Fonts : Playfair Display SC (headings), Montserrat (body)

## Pipeline
Ce projet utilise la methode Spec-to-Code Factory (BREAK > MODEL > ACT > DEBRIEF).
Invariants : No Spec No Code, No Task No Commit.

## Conventions
- Commits : `TASK-XXXX: description`
- Fichiers specs : `docs/specs/`
- Fichiers planning : `docs/planning/`
- ADR : `docs/adr/`
- Stack reference (source de verite versions) : `docs/specs/stack-reference.md`

## Fonctionnalites (F1-F5)
- **F1** : Vue Playbook (CRUD process/etapes, retro-planning, RACI, duplication)
- **F2** : Vue Mes Taches (filtrage par owner, tri par date)
- **F3** : Vue Timeline/Gantt (multi-process, marqueurs, scroll mobile)
- **F4** : Templates (11 templates figes T1-T10)
- **F5** : Persistance Supabase + Auth + Export/Import JSON

## Limites connues
- Tests manuels uniquement (pas de tests automatises)
- Pas de sync temps reel (refresh manuel)
- Pas de notifications
- Pas de drag & drop (fleches haut/bas)
- Francais uniquement
