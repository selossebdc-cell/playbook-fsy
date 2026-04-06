# EPICs V2 — Extension Portail Client V2 (Parcours Client + KPIs + Chatbots)

> Genere par l'agent Scrum Master
> Date : 2026-04-05

---

## Vue d'ensemble

| EPIC | Titre | Sprint | Priorite | US Count | Statut |
|------|-------|--------|----------|----------|--------|
| EPIC-V2-001 | Infrastructure V2 : tables Supabase, RLS, roles, vue admin | Sprint 1 | P1 | 3 | draft |
| EPIC-V2-002 | Module Parcours Client (F6) | Sprint 2 | P1 | 3 | draft |
| EPIC-V2-003 | Module KPIs (F7) | Sprint 3 | P2 | 2 | draft |
| EPIC-V2-004 | Module Gestion Chatbots — portail (F8) | Sprint 4 | P1 | 2 | draft |
| EPIC-V2-005 | Chatbot WhatsApp FSY — backend n8n (F9) | Sprint 5 | P2 | 2 | draft |
| EPIC-V2-006 | Migration Telegram MTM + App Assembly (F10) | Sprint 6 | P2 | 2 | draft |

---

## EPIC-V2-001 — Infrastructure V2 : tables Supabase, RLS, roles, vue admin

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-001 |
| **Sprint** | Sprint 1 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | L |
| **Fonctionnalites** | F11, F12 |

### Objectif

Mettre en place le socle V2 : nouvelles tables Supabase pour parcours, KPIs et chatbots, les politiques RLS par role (admin/client/assistant), le champ enabled_modules dans profiles, le selecteur multi-clients admin, et le role assistant pour Laurie.

### Valeur metier

Fondation obligatoire pour tous les modules V2. Sans ce socle, aucun onglet V2 ne peut etre developpe. Le role assistant permet a Laurie d'etre autonome sans acces aux donnees financieres.

### Perimetre

#### Inclus (IN)
- Migration Supabase : 10 nouvelles tables (parcours_*, client_kpis, client_kpi_alerts, chatbot_*)
- Modification table profiles (ajout role "assistant", ajout enabled_modules JSONB)
- RLS par role sur toutes les nouvelles tables + tables existantes
- Selecteur multi-clients dans le header app.html (role admin uniquement)
- Modules actives par client (checkbox enabled_modules)
- Onglets conditionnels dans app.html (visibles selon enabled_modules)
- Role assistant : acces restreint, pas de donnees financieres

#### Exclus (OUT)
- Contenu des modules (Parcours, KPIs, Chatbots)
- Chatbot backend (n8n)

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-001 | Tables Supabase V2 et RLS par role | P1 | draft |
| US-V2-002 | Vue admin multi-clients et modules actives | P1 | draft |
| US-V2-003 | Role assistant (Laurie) | P1 | draft |

### Dependances

#### EPICs prerequis
- Playbook V1 en production (EPIC-001 a EPIC-007 completed)
- Portail V2 app.html en production

#### Dependances techniques
- Instance Supabase dcynlifggjiqqihincbp (existante)
- Table profiles existante (a modifier)
- Comptes Supabase Auth existants (Catherine, Aurelia, Fred, Taina, Laurie)

### Criteres de succes

- [ ] Les 10 nouvelles tables sont creees avec RLS actif
- [ ] Le champ role accepte "admin", "client", "assistant"
- [ ] Le champ enabled_modules fonctionne et conditionne les onglets
- [ ] Catherine voit le selecteur multi-clients et peut basculer
- [ ] Laurie n'a pas acces aux onglets Contrats et KPIs financiers
- [ ] Les donnees des clients sont isolees (RLS)

### Risques identifies

| Risque | Impact | Probabilite | Mitigation |
|--------|--------|-------------|------------|
| RLS mal configure → fuite de donnees | Haut | Bas | Tests manuels avec chaque role |
| Migration profiles casse l'existant | Haut | Bas | Backup avant migration, ALTER TABLE non destructif |

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0013 | Migration Supabase V2 — nouvelles tables et RLS | Infrastructure | L |
| TASK-0014 | Role assistant et RLS restrictif | Infrastructure | M |
| TASK-0015 | Selecteur multi-clients admin et modules actives | UI | M |

---

## EPIC-V2-002 — Module Parcours Client (F6)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-002 |
| **Sprint** | Sprint 2 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | XL |
| **Fonctionnalites** | F6 |

### Objectif

Implementer l'onglet Parcours Client dans app.html : affichage des phases par offre, statut emails/outils, progression automatique, templates de parcours reutilisables, lien FK vers le playbook.

### Valeur metier

Donne a Catherine une vision claire de la progression du parcours de chaque client (emails automatises, outils connectes, phases completees). Permet a Aurelia de suivre sa propre progression.

### Perimetre

#### Inclus (IN)
- CRUD templates de parcours (admin)
- Assignation d'un parcours a un client
- Affichage des phases avec emails/actions et statuts
- Affichage des outils avec statut d'acces API
- Calcul automatique de la progression (% emails actifs)
- Lien FK optionnel phase → process du playbook (cliquable)
- Mise a jour automatique des phases quand un outil passe de "bloque" a "recu"
- Vue admin (tous les clients) vs vue client (son parcours)

#### Exclus (OUT)
- Drag & drop des phases
- Export PDF des parcours
- Alimentation automatique depuis APIs externes

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-004 | Domain et Application — logique parcours client | P1 | draft |
| US-V2-005 | Infrastructure — CRUD parcours Supabase | P1 | draft |
| US-V2-006 | UI — onglet Parcours Client dans app.html | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-V2-001 : Tables Supabase V2, RLS, selecteur admin

#### Dependances techniques
- Tables parcours_* creees (TASK-0013)
- Selecteur multi-clients (TASK-0015)
- Tables playbook_processes existantes (lien FK)

### Criteres de succes

- [ ] Catherine peut creer un template de parcours en moins de 5 minutes
- [ ] Le parcours assigne s'affiche avec phases, emails et outils
- [ ] La progression se recalcule quand un email passe en "actif"
- [ ] Le lien vers le playbook fonctionne (FK cliquable)
- [ ] Un outil qui passe a "recu" met a jour les phases dependantes
- [ ] Le client voit uniquement son parcours (RLS)

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0016 | Domain — logique parcours (progression, statuts, outils) | Domain | M |
| TASK-0017 | Application + Infrastructure — CRUD parcours Supabase | Application | M |
| TASK-0018 | UI — onglet Parcours Client dans app.html | UI | L |

---

## EPIC-V2-003 — Module KPIs (F7)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-003 |
| **Sprint** | Sprint 3 |
| **Priorite** | P2 |
| **Statut** | draft |
| **Estimation globale** | L |
| **Fonctionnalites** | F7 |

### Objectif

Implementer l'onglet KPIs dans app.html : saisie manuelle des metriques business, historique horodate, alertes configurables avec badge rouge, graphiques d'evolution.

### Valeur metier

Permet a Catherine de suivre les indicateurs cles de chaque client (MRR, churn, abonnes, conversions, % automations). Les alertes previennent les derives. Le lien avec le parcours (% automations) cree une coherence entre les modules.

### Perimetre

#### Inclus (IN)
- Formulaire de saisie manuelle des KPIs (5 metriques)
- Historique horodate (client_kpis.recorded_at)
- Graphiques d'evolution (mini line charts)
- Alertes configurables (seuil + operateur gt/lt)
- Badge rouge quand un seuil est depasse
- Lien automatique % automations ← parcours
- Interface prevoir pour webhooks Stripe/Circle (stub)

#### Exclus (OUT)
- Alimentation automatique via Stripe/Circle (MVP)
- Alertes par email/WhatsApp
- Export PDF des KPIs

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-007 | Domain et Application — KPIs et alertes | P2 | draft |
| US-V2-008 | UI — onglet KPIs dans app.html | P2 | draft |

### Dependances

#### EPICs prerequis
- EPIC-V2-001 : Tables client_kpis, client_kpi_alerts
- EPIC-V2-002 : Parcours client (pour % automations)

#### Dependances techniques
- Tables client_kpis et client_kpi_alerts (TASK-0013)
- Module Parcours pour calcul % automations (TASK-0016)

### Criteres de succes

- [ ] Catherine peut saisir un KPI manuellement pour un client
- [ ] L'historique est horodate et visible sous forme de graphique
- [ ] Le % automations actives correspond au parcours (nb emails actifs / total)
- [ ] Les alertes configurees declenchent un badge rouge quand le seuil est depasse
- [ ] Laurie (assistant) n'a pas acces a cet onglet

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0019 | Domain — logique KPIs, alertes, lien parcours | Domain | M |
| TASK-0020 | Application + Infrastructure — CRUD KPIs Supabase | Application | S |
| TASK-0021 | UI — onglet KPIs dans app.html (formulaire + graphiques + alertes) | UI | L |

---

## EPIC-V2-004 — Module Gestion Chatbots — portail (F8)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-004 |
| **Sprint** | Sprint 4 |
| **Priorite** | P1 |
| **Statut** | draft |
| **Estimation globale** | L |
| **Fonctionnalites** | F8 |

### Objectif

Implementer l'onglet Gestion Chatbots dans app.html : CRUD FAQ, messages de bienvenue, regles de comportement, stats en lecture seule. Laurie et Aurelia doivent pouvoir modifier les FAQ sans toucher a n8n.

### Valeur metier

Autonomise Laurie et Aurelia pour la gestion des FAQ chatbot (ajout de questions, modification des reponses, activation/desactivation). Plus besoin de Catherine pour chaque changement.

### Perimetre

#### Inclus (IN)
- CRUD FAQ (question, reponse, categorie, ordre, actif/inactif)
- Reordonnement des FAQ
- Messages de bienvenue editables par chatbot
- Regles de comportement editables (JSONB)
- Stats chatbot en lecture seule (messages, escalades, sans reponse)
- Acces : Catherine (tous), Aurelia + Laurie (chatbots FSY)

#### Exclus (OUT)
- Creation de nouveaux chatbots depuis le portail
- Stats en temps reel
- Backend chatbot (n8n — EPIC-V2-005)

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-009 | Application + Infrastructure — CRUD chatbots Supabase | P1 | draft |
| US-V2-010 | UI — onglet Gestion Chatbots dans app.html | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-V2-001 : Tables chatbot_*, RLS

#### Dependances techniques
- Tables chatbot_configs, chatbot_faq, chatbot_stats (TASK-0013)
- Role assistant pour Laurie (TASK-0014)

### Criteres de succes

- [ ] Laurie peut ajouter, modifier, supprimer et reordonner une FAQ
- [ ] Le message de bienvenue est editable
- [ ] Les regles de comportement sont editables (JSONB)
- [ ] Les stats s'affichent en lecture seule
- [ ] Laurie voit uniquement les chatbots FSY
- [ ] Catherine voit tous les chatbots

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0022 | Application + Infrastructure — CRUD chatbots et FAQ | Application | M |
| TASK-0023 | UI — onglet Gestion Chatbots dans app.html | UI | L |

---

## EPIC-V2-005 — Chatbot WhatsApp FSY — backend n8n (F9)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-005 |
| **Sprint** | Sprint 5 |
| **Priorite** | P2 |
| **Statut** | draft |
| **Estimation globale** | L |
| **Fonctionnalites** | F9 |

### Objectif

Creer le workflow n8n pour le chatbot WhatsApp FSY Studio : lecture FAQ depuis Supabase, message de bienvenue, rappel dimanche soir, escalade vers Laurie, fallback JSON, batch stats quotidien.

### Valeur metier

Automatise la FAQ de la communaute FSY Studio (~300 membres). Laurie n'a plus a repondre aux questions repetitives. Les modifications de FAQ dans le portail (EPIC-V2-004) sont prises en compte immediatement.

### Perimetre

#### Inclus (IN)
- Workflow n8n : trigger WhatsApp → lecture FAQ Supabase → reponse
- Message de bienvenue configurable depuis Supabase
- Escalade vers Laurie si question non trouvee
- Fallback : snapshot JSON quotidien des FAQ sur VPS
- Batch stats quotidien (messages, escalades, sans reponse) → chatbot_stats
- Rappel dimanche soir (workflow planifie)

#### Exclus (OUT)
- WhatsApp groupes/Communities (1:1 uniquement)
- Stats en temps reel
- Notifications push

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-011 | Workflow n8n WhatsApp FAQ + escalade | P2 | draft |
| US-V2-012 | Fallback JSON + batch stats quotidien | P2 | draft |

### Dependances

#### EPICs prerequis
- EPIC-V2-004 : FAQ dans Supabase (chatbot_faq)

#### Dependances techniques
- API WhatsApp Business d'Aurelia (credentials a recuperer — BLOQUANT)
- VPS OVH n8n (srv921609.hstgr.cloud)
- Tables chatbot_configs, chatbot_faq, chatbot_stats

### Criteres de succes

- [ ] Le chatbot repond aux questions FAQ depuis Supabase
- [ ] L'escalade vers Laurie fonctionne si question non trouvee
- [ ] Le fallback JSON fonctionne si Supabase est down
- [ ] Les stats sont ecrites quotidiennement dans chatbot_stats
- [ ] La modification d'une FAQ dans le portail est prise en compte au prochain message

### Risques identifies

| Risque | Impact | Probabilite | Mitigation |
|--------|--------|-------------|------------|
| Credentials WhatsApp non fournis | Haut — bloquant | Moyen | Prioriser la recuperation aupres d'Aurelia/Laurie |

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0024 | Workflow n8n — WhatsApp FAQ Supabase + escalade | Infrastructure | L |
| TASK-0025 | Fallback JSON + batch stats quotidien n8n | Infrastructure | M |

---

## EPIC-V2-006 — Migration Telegram MTM + App Assembly (F10)

### Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | EPIC-V2-006 |
| **Sprint** | Sprint 6 |
| **Priorite** | P2 |
| **Statut** | draft |
| **Estimation globale** | L |
| **Fonctionnalites** | F10 |

### Objectif

Migrer les FAQ du chatbot Telegram MTM existant (8 workflows n8n) vers Supabase (chatbot_faq), tout en gardant les fonctionnalites existantes. Assembler et tester l'ensemble des modules V2 dans app.html.

### Valeur metier

Unifie la gestion des FAQ (WhatsApp + Telegram) dans le portail. L'assembly final garantit que tous les modules V2 fonctionnent ensemble sans regression sur le portail V2 et le playbook V1.

### Perimetre

#### Inclus (IN)
- Audit FAQ Telegram existantes (format actuel dans n8n)
- Migration FAQ vers table chatbot_faq (chatbot_id MTM)
- Modification des 8 workflows n8n pour lire les FAQ depuis Supabase
- Conservation des fonctionnalites existantes (slash commands, anti-spam)
- App Assembly : integration de tous les modules V2 dans app.html
- Tests de non-regression (V1 + portail existant)

#### Exclus (OUT)
- Nouvelles fonctionnalites Telegram
- Refactoring des workflows existants (sauf branchement FAQ)

### User Stories associees

| US ID | Titre | Priorite | Statut |
|-------|-------|----------|--------|
| US-V2-013 | Migration FAQ Telegram vers Supabase | P2 | draft |
| US-V2-014 | App Assembly V2 et tests de non-regression | P1 | draft |

### Dependances

#### EPICs prerequis
- EPIC-V2-001 a EPIC-V2-005 (tous)

#### Dependances techniques
- 8 workflows n8n existants (Telegram)
- Tables chatbot_faq remplies (TASK-0013)
- Tous les modules V2 implementes

### Criteres de succes

- [ ] Le chatbot Telegram lit les FAQ depuis Supabase
- [ ] Slash commands et anti-spam toujours operationnels
- [ ] Le comportement est identique avant/apres migration
- [ ] Tous les onglets V2 fonctionnent ensemble dans app.html
- [ ] Aucune regression sur le portail V2 existant (9 onglets)
- [ ] Aucune regression sur le Playbook V1 (F1-F5)

### Tasks associees

| Task ID | Titre | Couche | Estimation |
|---------|-------|--------|------------|
| TASK-0026 | Migration FAQ Telegram MTM vers Supabase | Infrastructure | M |
| TASK-0027 | App Assembly V2 — integration et non-regression | UI | L |

---

## Dependances entre EPICs

```
EPIC-V2-001 (Infra V2)
    |
    +---> EPIC-V2-002 (Parcours F6)
    |         |
    |         +---> EPIC-V2-003 (KPIs F7)
    |
    +---> EPIC-V2-004 (Chatbots portail F8)
              |
              +---> EPIC-V2-005 (WhatsApp F9)
              |
              +---> EPIC-V2-006 (Telegram F10 + Assembly)
```

---

## Planning des sprints

| Sprint | Duree estimee | EPICs | Livrables |
|--------|--------------|-------|-----------|
| Sprint 1 | 1 semaine | EPIC-V2-001 | Tables Supabase V2, RLS, roles, selecteur admin |
| Sprint 2 | 1 semaine | EPIC-V2-002 | Onglet Parcours Client operationnel |
| Sprint 3 | 1 semaine | EPIC-V2-003 | Onglet KPIs operationnel |
| Sprint 4 | 1 semaine | EPIC-V2-004 | Onglet Gestion Chatbots operationnel |
| Sprint 5 | 1 semaine | EPIC-V2-005 | Chatbot WhatsApp FSY en production |
| Sprint 6 | 1 semaine | EPIC-V2-006 | Migration Telegram + App Assembly final |

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation V2 |
