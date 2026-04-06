# System Specification

## Vue d'ensemble

Le Playbook Process Face Soul Yoga est une application web mono-fichier HTML qui permet de creer, suivre et reutiliser des process metier avec retro-planning automatique, assignation RACI, suivi de progression et vision Gantt multi-process. Les donnees sont partagees entre utilisateurs via Supabase.

### Contexte

Catherine Selosse (CS Consulting Strategique) accompagne Aurelia, fondatrice de Face Soul Yoga, dans sa transformation digitale. FSY se restructure en 3 entites (FSY Studio B2C, Master The Method B2B, Aurelia Del Sol Premium) et migre de plateforme (Uscreen/Kajabi vers Circle). Aucun process operationnel n'est documente. Aurelia passe 80% de son temps en operationnel au lieu de piloter.

### Objectifs

1. Structurer les operations : documenter et suivre chaque process metier avec des etapes claires, des responsables RACI et des deadlines
2. Gagner en autonomie : Laurie et Aurelia gerent leurs process sans Catherine au quotidien
3. Anticiper : vision calendaire long terme (retro-planning jusqu'a 9 mois)
4. Reutiliser : chaque process documente devient un template reutilisable
5. Reduire le temps operationnel d'Aurelia de 80% a moins de 30% en 6 mois
6. Piloter la croissance : process de retention, upsell et animation communaute

## Architecture haut niveau

```
+---------------------------------------------------+
|          Fichier HTML unique (index.html)          |
|                                                    |
|  +---------------------------------------------+  |
|  |  UI Layer (HTML + CSS inline)                |  |
|  |  - Navigation (tabs desktop / bottom mobile) |  |
|  |  - Vue Playbook (F1)                         |  |
|  |  - Vue Mes Taches (F2)                       |  |
|  |  - Vue Timeline/Gantt (F3)                   |  |
|  |  - Auth (login/logout)                       |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  Application Layer (JS inline)               |  |
|  |  - ProcessManager (CRUD process/etapes)      |  |
|  |  - RetroPlanner (calcul dates)               |  |
|  |  - TaskAggregator (vue Mes Taches)           |  |
|  |  - GanttRenderer (timeline)                  |  |
|  |  - TemplateRegistry (11 templates)           |  |
|  |  - OwnerManager (gestion des owners)         |  |
|  |  - ExportImport (JSON backup)                |  |
|  +---------------------------------------------+  |
|  +---------------------------------------------+  |
|  |  Infrastructure Layer (JS inline)            |  |
|  |  - SupabaseClient (persistance)              |  |
|  |  - AuthService (email + mdp)                 |  |
|  +---------------------------------------------+  |
+---------------------------------------------------+
         |                          |
         v                          v
  +-------------+          +------------------+
  | Supabase    |          | Google Fonts CDN |
  | (CDN)       |          | Playfair Display |
  | - Auth      |          | Montserrat       |
  | - Database  |          +------------------+
  | - Instance: |
  | dcynlifg... |
  +-------------+
```

### Composants principaux

| Composant | Responsabilite | Technologies |
|-----------|---------------|--------------|
| UI Layer | Rendu des 3 vues, navigation, formulaires | HTML, CSS inline, responsive |
| Application Layer | Logique metier, calculs retro-planning, CRUD | JavaScript vanilla |
| Infrastructure Layer | Persistance Supabase, authentification | Supabase JS CDN |
| Templates Registry | 11 templates pre-remplis figes dans le code | JavaScript (objets JS) |

## Contraintes non-fonctionnelles

### Performance

- Temps de chargement initial : < 1 seconde
- Fluide avec 10-15 process et ~400 etapes
- Pas de pagination requise (volume faible)

### Securite

- Authentification : Supabase Auth (email + mot de passe)
- Autorisation : meme acces pour tous les utilisateurs (pas de roles differencies)
- Chiffrement : HTTPS (GitHub Pages SSL)
- Pas de donnees sensibles stockees

### Scalabilite

- Utilisateurs cibles : 2-5 simultanement (Aurelia, Laurie, Catherine, VA, Externe)
- Volume de donnees : < 1 Mo (quelques dizaines de process, ~400 etapes)
- Strategie de scaling : non applicable (usage interne FSY)

## Dependances externes

| Service | Usage | Criticite |
|---------|-------|-----------|
| Supabase (instance dcynlifggjiqqihincbp) | Persistance des process, etapes, owners + Auth email/mdp | Haute |
| Google Fonts CDN | Polices Playfair Display SC et Montserrat | Basse |
| GitHub Pages | Hebergement statique du fichier HTML | Haute |

## Hypotheses

1. Fichier unique HTML maintenu malgre Supabase (la lib Supabase est chargee en CDN externe)
2. Jours calendaires pour le retro-planning (pas de jours ouvres ni gestion feries)
3. Plusieurs instances du meme template sont possibles, chaque instance est independante
4. "Autre" est un owner generique permanent, les ajouts sont en complement
5. Pas de suppression d'un owner ajoute par erreur dans le MVP
6. Palette de 6-8 couleurs max pour le Gantt
7. Navigation : tabs en haut desktop, bottom nav mobile
8. Les 3 vues sont imprimables via CSS @media print
9. Date cible obligatoire meme pour un process vide
10. Header en texte "Face Soul Yoga -- Playbook", pas de logo
11. Timing positif (post-Jour J) autorise dans les etapes
12. Seul le timing relatif est editable (pas la date absolue directement)
13. Confirmation demandee lors du changement de date cible
14. Templates figes dans le code pour le MVP (non modifiables par l'utilisateur)
15. Navigation clavier : boutons, checkboxes, inputs, dropdowns

## Risques identifies

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Taille du fichier HTML depasse 60 Ko avec les 11 templates | Moyen | Priorite de degradation : F1 > F2 > F4 > F3 (simplifier Gantt en premier) |
| Supabase CDN indisponible | Haut | Export/Import JSON en backup local |
| Pas de sync temps reel entre utilisateurs | Moyen | Refresh manuel suffit pour 2-5 utilisateurs |
| Gantt illisible avec beaucoup d'owners | Moyen | Palette limitee a 6-8 couleurs + legende dynamique |
| Performance avec ~400 etapes | Bas | Volume faible, JS vanilla performant |

<!-- V2:START -->

## Extension V2 — Portail Client integre

### Contexte V2

Le Portail Client V2 (espace.csbusiness.fr/app.html) et le Playbook sont en production avec Supabase (dcynlifggjiqqihincbp). Les donnees client sont eclatees dans 5+ fichiers HTML non lies, les dashboards KPI sont hardcodes, les chatbots ont leurs FAQ en dur dans n8n, et Laurie ne peut rien modifier sans Catherine.

### Objectifs V2

7. Centraliser : un seul endroit (Portail V2 app.html) pour le parcours client, les KPIs et les chatbots
8. Lier les donnees : quand un email passe en "actif", le % d'automation se recalcule dans les KPIs
9. Autonomiser Laurie/Aurelia : elles editent les FAQ chatbot, mettent a jour les statuts outils, sans code ni n8n
10. Templater les parcours : un parcours type (FSY Studio, MTM, etc.) est reutilisable pour d'autres clients
11. Mesurer : KPIs horodates pour voir l'evolution (MRR, churn, abonnes, conversions)
12. Alerter : notifications configurables dans le portail (badge rouge quand un KPI depasse son seuil)

### Architecture haut niveau V2

```
+------------------------------------------------------------------+
|              app.html (Portail Client V2)                        |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |  UI Layer                                                   |  |
|  |  - Onglets conditionnels (enabled_modules par profil)       |  |
|  |  - Selecteur multi-clients (admin uniquement)               |  |
|  |  - Onglets existants : Actions, Brain Dump, Mes outils,    |  |
|  |    Sessions, Tutos, Mon projet, Automatisations, Mon contrat|  |
|  |  - NOUVEAUX : Parcours Client (F6), KPIs (F7),             |  |
|  |    Gestion Chatbots (F8)                                    |  |
|  +------------------------------------------------------------+  |
|  +------------------------------------------------------------+  |
|  |  Application Layer                                          |  |
|  |  - ParcoursManager (templates, phases, emails, outils)      |  |
|  |  - KPIManager (saisie, historique, alertes)                 |  |
|  |  - ChatbotManager (FAQ CRUD, config, stats)                 |  |
|  |  - AdminManager (selecteur clients, modules actives)        |  |
|  +------------------------------------------------------------+  |
|  +------------------------------------------------------------+  |
|  |  Infrastructure Layer                                       |  |
|  |  - SupabaseClient (persistance, RLS par role)               |  |
|  |  - AuthService (signInWithPassword, roles admin/client/     |  |
|  |    assistant)                                                |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
         |                    |                    |
         v                    v                    v
  +-------------+    +-----------------+    +------------------+
  | Supabase    |    | VPS OVH         |    | WhatsApp/Telegram|
  | (CDN)       |    | n8n workflows   |    | API              |
  | - Auth      |    | - Chatbot WA    |    | - WA Business    |
  | - Database  |    | - Chatbot TG    |    | - TG Bot API     |
  | - RLS       |    | - Stats batch   |    +------------------+
  | dcynlifg... |    | - FAQ fallback  |
  +-------------+    +-----------------+
```

### Composants V2

| Composant | Responsabilite | Technologies |
|-----------|---------------|--------------|
| Module Parcours (F6) | Afficher/gerer les phases du parcours client par offre, outils, emails, progression | HTML/CSS/JS vanilla inline |
| Module KPIs (F7) | Saisie manuelle, historique horodate, alertes configurables (badge rouge) | HTML/CSS/JS vanilla inline |
| Module Chatbots (F8) | CRUD FAQ, messages bienvenue, regles comportement, stats lecture seule | HTML/CSS/JS vanilla inline |
| Chatbot WhatsApp FSY (F9) | FAQ auto depuis Supabase, escalade Laurie, fallback JSON | Workflow n8n sur VPS OVH |
| Chatbot Telegram MTM (F10) | Migration FAQ vers Supabase, garde fonctionnalites existantes | Workflows n8n existants (8) |
| Vue Admin (F11) | Selecteur multi-clients, modules actives par client | HTML/CSS/JS vanilla inline |
| Role Assistant (F12) | Acces restreint Laurie (pas de donnees financieres) | RLS Supabase + UI conditionnelle |

### Contraintes non-fonctionnelles V2

#### Performance V2

- Chargement initial < 3 secondes sur mobile 4G
- Stats chatbot en batch quotidien (pas de temps reel)

#### Securite V2

- Authentification : Supabase Auth (signInWithPassword)
- Autorisation : RBAC avec 3 roles (admin, client, assistant) via profiles.role
- RLS actif sur toutes les nouvelles tables
- Isolation des donnees par client (profiles.id = auth.uid())
- Role assistant : acces restreint (pas de donnees financieres)

#### Resilience V2

- Chatbots fonctionnels meme si portail down (workflow n8n independant)
- Fallback FAQ : snapshot auto 1x/jour via n8n (export FAQ vers JSON local sur VPS)
- Si Supabase down + snapshot absent : message d'erreur generique + escalade vers Laurie

### Dependances externes V2

| Service | Usage | Criticite | Fallback |
|---------|-------|-----------|----------|
| Supabase (dcynlifggjiqqihincbp) | BDD, auth, RLS, FAQ chatbot | Critique | Snapshot JSON VPS pour chatbots |
| n8n (VPS OVH srv921609.hstgr.cloud) | Workflows chatbot WA + TG, batch stats | Critique | FAQ JSON local |
| WhatsApp Business API | Chatbot FSY Studio (~300 membres) | Important | Escalade manuelle vers Laurie |
| Telegram Bot API | Chatbot MTM (existant, 8 workflows) | Important | Workflows n8n existants |
| GitHub Pages | Hebergement frontend statique | Critique | Aucun |
| Stripe / Circle | Webhooks prevus pour KPIs (hors scope MVP) | Nice-to-have | Saisie manuelle |

### Hypotheses V2

16. Structure mixte pour templates parcours : JSONB pour les templates, tables relationnelles pour les instances clients
17. Stats chatbot en batch quotidien via n8n (pas de temps reel)
18. WhatsApp Business API en mode 1:1 (a verifier avec Aurelia si groupes/Communities necessaires)
19. RLS actif sur les tables existantes (a verifier et activer si necessaire)

### Risques V2

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Credentials WhatsApp non fournis | Haut | Prioriser la recuperation, fallback FAQ locale |
| Complexite integration onglets app.html | Moyen | Architecture modulaire, onglets conditionnels |
| RLS insuffisant sur tables existantes | Haut | Audit et activation avant deploiement |
| FAQ Telegram format actuel inconnu | Moyen | Migration dans tous les cas vers chatbot_faq |
| Scope creep V2 | Haut | Validation stricte via Gate 1, matrice de priorisation |

<!-- V2:END -->
