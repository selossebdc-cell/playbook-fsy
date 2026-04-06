# EPICs — Playbook Process FSY

> Genere par l'agent Scrum Master
> Date : 2026-03-18

---

## Vue d'ensemble

| EPIC | Titre | Priorite | US Count | Statut |
|------|-------|----------|----------|--------|
| EPIC-001 | Setup projet et infrastructure | P1 | 2 | draft |
| EPIC-002 | Gestion des process et etapes (F1) | P1 | 3 | draft |
| EPIC-003 | Vue Mes Taches (F2) | P2 | 1 | draft |
| EPIC-004 | Vue Timeline/Gantt (F3) | P2 | 1 | draft |
| EPIC-005 | Templates pre-remplis (F4) | P1 | 1 | draft |
| EPIC-006 | Persistance, Auth et Export/Import (F5) | P1 | 2 | draft |
| EPIC-007 | Integration et assemblage final | P1 | 1 | draft |

---

## EPIC-001 — Setup projet et infrastructure

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-001 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | S |

### Objectif

Mettre en place la structure du fichier HTML unique avec les dependances CDN (Supabase JS, Google Fonts), les design tokens FSY, et le schema Supabase (tables, RLS, donnees initiales). C'est le socle sur lequel tout le reste repose.

### Valeur metier

Fondation technique indispensable. Sans ce socle, aucune fonctionnalite ne peut etre developpee.

### Perimetre

#### Inclus (IN)
- Fichier index.html avec structure HTML de base
- Chargement CDN Supabase JS et Google Fonts
- Design tokens FSY (CSS custom properties)
- Configuration Supabase (tables, RLS, donnees initiales owners)
- Couche Infrastructure (client Supabase, auth service)
- Navigation entre les 3 vues (tabs desktop, bottom nav mobile)

#### Exclus (OUT)
- Logique metier des vues (F1-F4)
- Templates pre-remplis
- Contenu des vues

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0001](us/US-0001-setup-projet.md) | Setup projet et fichier HTML de base | P1 | draft |
| [US-0002](us/US-0002-auth-supabase.md) | Authentification Supabase | P1 | draft |

### Dependances

#### EPICs prerequis
- Aucun (premier EPIC)

#### Dependances techniques
- Instance Supabase dcynlifggjiqqihincbp (existante)
- GitHub Pages (existant)

### Criteres de succes

- [ ] Le fichier index.html se charge correctement dans un navigateur
- [ ] Les design tokens FSY sont appliques (terracotta, creme, teal)
- [ ] La navigation entre les 3 vues fonctionne (desktop et mobile)
- [ ] L'authentification Supabase fonctionne (login/logout)
- [ ] Les tables Supabase sont creees avec RLS

### Risques identifies

| Risque | Impact | Probabilite | Mitigation |
|--------|--------|-------------|------------|
| Instance Supabase partagee avec portail V2 | Moyen | Bas | Prefixe playbook_ sur toutes les tables |

---

## EPIC-002 — Gestion des process et etapes (F1)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-002 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | L |

### Objectif

Implementer la vue Playbook principale : CRUD des process, CRUD des etapes, retro-planning automatique, calcul de progression, duplication, et indicateurs visuels (vert/rouge/gris).

### Valeur metier

Fonctionnalite coeur de l'application. Permet a Aurelia et Laurie de creer, suivre et gerer leurs process operationnels au quotidien.

### Perimetre

#### Inclus (IN)
- Creation d'un process (depuis template ou vide)
- Affichage liste des process avec progression
- CRUD etapes (ajout, edition, suppression, reordonnement)
- Retro-planning automatique (date cible + timing)
- Indicateurs visuels (vert/rouge/gris)
- Changement de date cible avec confirmation
- Duplication de process
- Barre de progression par process
- Gestion des owners (ajout, pastilles colorees)

#### Exclus (OUT)
- Vue Mes Taches (EPIC-003)
- Vue Timeline/Gantt (EPIC-004)
- Contenu des templates (EPIC-005)

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0003](us/US-0003-domain-process.md) | Fonctions Domain process et etapes | P1 | draft |
| [US-0004](us/US-0004-crud-process.md) | CRUD process et etapes (Application + UI) | P1 | draft |
| [US-0005](us/US-0005-owners-raci.md) | Gestion des owners et RACI | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-001 : Infrastructure Supabase et fichier HTML

#### Dependances techniques
- Tables Supabase (playbook_processes, playbook_steps, playbook_owners)

### Criteres de succes

- [ ] Un utilisateur peut creer un process vide avec date cible
- [ ] Les etapes affichent les indicateurs visuels corrects
- [ ] Le retro-planning recalcule les dates lors du changement de date cible
- [ ] La duplication fonctionne (remise a zero, nouvelle date cible)
- [ ] Les owners sont affiches en pastilles colorees

### Risques identifies

| Risque | Impact | Probabilite | Mitigation |
|--------|--------|-------------|------------|
| Complexity of inline UI code | Moyen | Moyen | Sections commentees, fonctions nommees |

---

## EPIC-003 — Vue Mes Taches (F2)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-003 |
| **Priorite** | P2 |
| **Statut** | draft |
| **Estimation globale** | M |

### Objectif

Fournir une vue centree utilisateur qui agregre toutes les taches assignees (R ou A) depuis tous les process actifs, avec filtrage par owner et tri par date.

### Valeur metier

Permet a chaque utilisateur de voir en un coup d'oeil ce qu'il doit faire, sans naviguer dans chaque process. Reduit le temps de pilotage quotidien.

### Perimetre

#### Inclus (IN)
- Agregation des taches de tous les process actifs
- Filtrage par owner (R ou A)
- Tri par date absolue
- Affichage des indicateurs visuels (vert/rouge/gris)
- Lien vers le process parent

#### Exclus (OUT)
- Modification des etapes depuis cette vue (redirige vers F1)
- Notifications

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0006](us/US-0006-vue-mes-taches.md) | Vue Mes Taches filtree par owner | P2 | draft |

### Dependances

#### EPICs prerequis
- EPIC-002 : Process et etapes existants

#### Dependances techniques
- Fonctions Domain (filterTasksByOwner, sortStepsByDate)

### Criteres de succes

- [ ] La vue affiche les taches de tous les process actifs
- [ ] Le filtrage par owner fonctionne
- [ ] Le tri par date fonctionne
- [ ] Les indicateurs visuels sont coherents avec la vue Playbook

---

## EPIC-004 — Vue Timeline/Gantt (F3)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-004 |
| **Priorite** | P2 |
| **Statut** | draft |
| **Estimation globale** | L |

### Objectif

Afficher une vision calendaire multi-process avec barres temporelles colorees par owner, marqueurs Jour J, et scroll mobile.

### Valeur metier

Vision strategique long terme (jusqu'a 9 mois). Permet a Aurelia de piloter la croissance et anticiper les periodes de charge.

### Perimetre

#### Inclus (IN)
- Rendu Gantt multi-process
- Barres colorees par owner (R)
- Marqueurs Jour J par process
- Scroll horizontal (desktop et mobile)
- Legende dynamique des owners
- Marqueur "Aujourd'hui"

#### Exclus (OUT)
- Drag & drop (fleches haut/bas uniquement dans F1)
- Zoom dynamique
- Export image du Gantt

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0007](us/US-0007-vue-gantt.md) | Vue Timeline/Gantt multi-process | P2 | draft |

### Dependances

#### EPICs prerequis
- EPIC-002 : Process et etapes

#### Dependances techniques
- Fonctions Domain (buildGanttData)
- Owners avec couleurs

### Criteres de succes

- [ ] Le Gantt affiche les process actifs avec barres colorees
- [ ] Les marqueurs Jour J sont visibles
- [ ] Le scroll fonctionne sur mobile
- [ ] La legende est dynamique

---

## EPIC-005 — Templates pre-remplis (F4)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-005 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | XL |

### Objectif

Integrer les 11 templates pre-remplis (T1-T10, avec T5a/T5b) dans le code JS, avec leurs etapes, timings relatifs et RACI par defaut.

### Valeur metier

Les templates sont le coeur du playbook : ils capitalisent l'expertise de Catherine et permettent a FSY de reutiliser les process sans repartir de zero.

### Perimetre

#### Inclus (IN)
- 11 templates figes dans le code JS (T1-T10, dont T5a et T5b, hors T5c)
- Etapes avec titres, descriptions, sections, timings, RACI
- Fonction d'instanciation (template → process)
- UI de selection de template lors de la creation d'un process

#### Exclus (OUT)
- Modification des templates par l'utilisateur
- Import de templates externes

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0008](us/US-0008-templates.md) | Templates pre-remplis et instanciation | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-002 : CRUD process (pour l'instanciation)

#### Dependances techniques
- Fonction Domain instantiateTemplate

### Criteres de succes

- [ ] Les 11 templates sont disponibles a la selection
- [ ] L'instanciation cree un process complet avec toutes les etapes
- [ ] Les RACI par defaut sont appliques correctement
- [ ] Le process vide est toujours disponible en alternative

---

## EPIC-006 — Persistance, Auth et Export/Import (F5)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-006 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | M |

### Objectif

Assurer la persistance des donnees via Supabase, l'authentification email/mot de passe, et le backup via export/import JSON.

### Valeur metier

Les donnees sont partagees entre Aurelia et Laurie. L'export JSON est un filet de securite en cas de probleme Supabase.

### Perimetre

#### Inclus (IN)
- Operations CRUD Supabase (processes, steps, owners)
- Login/logout Supabase Auth
- Gestion de session (persistence localStorage)
- Export JSON (toutes les donnees)
- Import JSON (restauration)

#### Exclus (OUT)
- Sync temps reel (refresh manuel)
- Self-registration
- Changement de mot de passe dans l'app

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0002](us/US-0002-auth-supabase.md) | Authentification Supabase | P1 | draft |
| [US-0009](us/US-0009-export-import.md) | Export et import JSON | P2 | draft |

### Dependances

#### EPICs prerequis
- EPIC-001 : Setup Supabase

#### Dependances techniques
- Instance Supabase dcynlifggjiqqihincbp
- Tables playbook_*

### Criteres de succes

- [ ] Les donnees persistent entre les sessions
- [ ] L'export JSON telecharge un fichier complet
- [ ] L'import JSON restaure les donnees
- [ ] L'authentification fonctionne pour les 3 utilisateurs

---

## EPIC-007 — Integration et assemblage final

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-007 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | M |

### Objectif

Assembler toutes les couches (Domain, Application, Infrastructure, UI) dans le fichier index.html unique et final. Verifier que tout fonctionne ensemble, responsive, imprimable.

### Valeur metier

Delivrer une application fonctionnelle et deployable sur GitHub Pages.

### Perimetre

#### Inclus (IN)
- Assemblage de toutes les sections dans index.html
- Navigation complete entre les 3 vues
- Responsive (desktop + mobile)
- CSS @media print
- Tests manuels de bout en bout

#### Exclus (OUT)
- Nouvelles fonctionnalites
- Deploiement sur GitHub Pages (fait manuellement)

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| [US-0010](us/US-0010-app-assembly.md) | Assemblage final de l'application | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006

### Criteres de succes

- [ ] L'application se charge et est fonctionnelle
- [ ] Les 3 vues sont accessibles et fonctionnelles
- [ ] Responsive desktop et mobile
- [ ] Imprimable via CSS @media print

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
