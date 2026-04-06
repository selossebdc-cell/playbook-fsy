# Scope — Playbook Process Face Soul Yoga

## IN (dans le perimetre MVP)

### F1 — Vue Playbook (gestion des process)

- Selecteur de template (11 templates pre-remplis + "Process vide")
- Categories de templates : Projet, Lancement, Cycle, Cycle continu, Transverse
- Champ nom + date cible (Jour J) avec calcul automatique des dates en retro-planning
- Liste des process actifs avec barre d'avancement globale (%)
- Vue detaillee : etapes avec checkbox, titre/description editables, RACI (4 dropdowns R/A/C/I), timing relatif (J-90, Jour J, J+7...), date absolue calculee, indicateurs visuels (vert/rouge/gris)
- Sections dans les etapes (en-tetes de regroupement : CONCEPTION, PRODUCTION, etc.)
- CRUD etapes : ajouter, supprimer, reordonner (fleches haut/bas)
- Bouton "+ Nouvelle personne" dans les dropdowns RACI
- Bouton Dupliquer un process (copie, remet a zero, demande nouvelle date cible)
- Process termines restent en liste avec badge "Termine"
- Date cible obligatoire (meme pour un process vide)
- Confirmation demandee lors du changement de date cible
- Seul le timing relatif est editable (pas la date absolue directement)
- Timing positif (post-Jour J) autorise

### F2 — Vue Mes Taches (filtree par personne)

- Filtres par personne (R ou A) + "Toutes"
- Agregation des taches de tous les process actifs
- Tri par date, indicateur de retard en rouge
- Navigation vers le process source au clic

### F3 — Vue Timeline (Gantt multi-process)

- Mode "Tous les process" : Gantt multi-lignes (1 ligne par process, dots colores par owner R, barre d'avancement)
- Mode "Un seul process" : timeline horizontale classique
- Marqueurs "Aujourd'hui" (rouge) et "Jour J" (terracotta)
- Mois sur la frise, legende dynamique, tooltips au survol
- Scroll horizontal sur mobile (meme rendu que desktop, tactile)

### F4 — Templates de process pre-remplis (11 templates)

#### Projets
- **T1** : Creer un espace Circle (30 etapes, J-21 a Jour J)
- **T2** : Migrer un contenu existant vers Circle (35 etapes, J-90 a J+30)

#### Lancements
- **T3** : Lancer une formation en ligne (42 etapes, J-120 a J+120)
- **T4** : Lancer un challenge recrutement (29 etapes, J-60 a J+15)
- **T7** : Lancer une retraite (50 etapes, J-270 a J+30)

#### Cycles (declenches par evenement)
- **T5a** : Onboarder un nouveau membre Studio B2C (18 etapes, Jour J a J+30)
- **T5b** : Onboarder une certifiee MTM B2B (30 etapes, Jour J a J+120)
- **T8** : Gerer une licence annuelle (28 etapes, cycle J a J+375)

#### Cycles continus (recurrents)
- **T9** : Animer et retenir les abonnees Studio B2C (17 etapes, cycle mensuel)
- **T10** : Animer la communaute certifiees MTM (16 etapes, cycle trimestriel)

#### Transverse
- **T6** : Plan de communication lancement (33 etapes, J-30 a Jour J) — declenche depuis les jalons comm des autres templates

Chaque template inclut :
- Etapes detaillees avec RACI complet (R, A, C optionnel, I optionnel)
- Sections de regroupement (en-tetes)
- Timing relatif par rapport au Jour J
- Jalons comm (dans T1, T3, T4, T7) qui declenchent T6
- Respect des regles RACI globales (section 13 des requirements)

### F5 — Persistance et auth

- Supabase des le MVP (instance dcynlifggjiqqihincbp, meme que portail V2)
- Auth email + mot de passe (Supabase Auth)
- Export/Import JSON en complement (backup)
- Meme acces pour tous les utilisateurs (pas de roles differencies)

### Donnees manipulees

- **Process** : id, name, dateCible, template, category, steps[], createdAt, status (actif|termine)
- **Step** : id, title, desc (optionnel), section (optionnel), raci {r, a, c?, i?}, timing (integer relatif), recurrence (optionnel), done, order
- **Owners** : liste dynamique ['Aurelia', 'Laurie', 'Catherine', 'VA', 'Automatique', 'Externe'] + ajout libre, persistee en Supabase, affichage en pastilles initiales colorees

### Communication hybride (section 14)

- Jalons comm integres dans les templates de lancement (T3, T4, T7) : 2-3 etapes cles (valider plan comm, teasing, annonce officielle)
- T6 dedie "Plan de communication lancement" : template transverse declenche manuellement depuis un jalon comm
- Emails specifiques a un process (ex: emails migration T2) restent dans le process concerne

### Integrations externes

| Service | Usage | Type |
|---------|-------|------|
| Google Fonts | Playfair Display SC + Montserrat | CDN (lecture seule) |
| GitHub Pages | Hebergement statique | Deploiement |
| Supabase | Persistance + auth | CDN (instance dcynlifggjiqqihincbp) |

### UX / Design

- Navigation : tabs en haut (desktop), bottom nav (mobile)
- Design system FSY : terracotta #B55B50, creme #FFFBF7, teal #033231
- Header texte : "Face Soul Yoga — Playbook" (pas de logo)
- Palette 6-8 couleurs pour les owners dans le Gantt
- 3 vues imprimables via CSS @media print
- Bouton Imprimer la vue courante

<!-- V2:START -->

### F6 — Module Parcours Client (onglet dans app.html)

- Afficher les phases du parcours client par offre (ex: FSY Studio = 9 phases)
- Chaque phase contient des emails/actions avec statut (a_creer / cree / actif / desactive)
- Chaque phase a des outils associes avec statut d'acces API (recu / bloque / non_requis)
- Progression calculee automatiquement (% emails actifs, % phases completees)
- Templates de parcours reutilisables entre clients (JSONB pour templates, tables relationnelles pour instances)
- Lien FK optionnel phase → process du playbook (parcours_phases.playbook_process_id) — lien cliquable dans l'UI
- Vue admin (Catherine) : tous les clients via selecteur. Vue client : son parcours uniquement
- Mise a jour d'un statut outil → les phases dependantes passent automatiquement de "bloque" a "pret"

### F7 — Module KPIs (onglet dans app.html)

- Metriques business par client : MRR, churn rate, abonnes actifs, taux conversion, % automations actives
- Saisie manuelle via formulaire dans le portail (MVP — pas d'alimentation automatique)
- Donnees horodatees (historique pour graphiques d'evolution via client_kpis.recorded_at)
- Liees au parcours (ex: nb emails actifs / nb emails total = % automation)
- Alertes configurables : seuils par metrique (ex: churn >8%), operateur (gt/lt), affichage badge rouge dans le portail
- Interface prevoir pour webhooks Stripe/Circle a terme (hors implementation MVP)

### F8 — Module Gestion Chatbots (onglet dans app.html)

- Interface CRUD pour gerer les FAQ (question + reponse + categorie + ordre + actif/inactif)
- Messages de bienvenue editables par chatbot (WhatsApp FSY, Telegram MTM)
- Regles de comportement editables (mode mention-only, escalade, horaires) — stockees en JSONB dans chatbot_configs.rules
- Stats chatbot en lecture seule : messages traites, escalades, questions sans reponse (batch quotidien via n8n)
- Acces : Catherine (tous les chatbots), Aurelia + Laurie (chatbots FSY uniquement)

### F9 — Chatbot WhatsApp FSY (backend n8n)

- Communaute ~300 membres FSY Studio
- Lit les FAQ depuis Supabase (table chatbot_faq filtree par chatbot_id)
- FAQ auto, message de bienvenue, rappel dimanche soir
- Escalade vers Laurie si question non trouvee
- Fallback : snapshot auto 1x/jour (n8n exporte FAQ vers JSON local sur VPS)
- API WhatsApp Business d'Aurelia (credentials a recuperer)

### F10 — Chatbot Telegram MTM (migration backend)

- Deja construit (8 workflows n8n), a rebrancher sur Supabase pour les FAQ
- Lit chatbot_faq filtre par chatbot_id
- Garde les fonctionnalites existantes (slash commands, anti-spam)
- FAQ Telegram : a verifier si en dur ou externe dans les workflows n8n existants — migration dans tous les cas

### F11 — Vue admin multi-clients

- Selecteur de clients dans le header du portail (visible uniquement pour role=admin)
- Catherine se connecte une seule fois, voit tous les clients, bascule en un clic
- Modules actives par client : champ enabled_modules (JSONB array) dans profiles — Catherine coche quels modules sont visibles pour chaque client

### F12 — Role assistant (Laurie)

- Nouvelle valeur "assistant" dans profiles.role
- Acces : Chatbots, Outils, Parcours, Actions du client associe
- Pas d'acces : donnees financieres (contrats, KPIs financiers), profils des autres clients
- RLS policies specifiques par module

### Donnees V2 manipulees

#### Tables Supabase existantes (portail V2)

- `profiles` : id, email, full_name, role (admin/client/assistant), avatar_url, **enabled_modules (JSONB array)**
- `actions`, `sessions`, `tutos`, `contracts`, `tools`, `brain_dumps` : existantes

#### Tables Supabase existantes (playbook)

- `playbook_processes`, `playbook_steps`, `playbook_owners` : existantes

#### Nouvelles tables V2

- `parcours_templates` : id, name, description, offer_type, phases (JSONB)
- `parcours_clients` : id, profile_id, template_id, status, progress, created_at
- `parcours_phases` : id, parcours_client_id, phase_number, title, status, tools_status, **playbook_process_id (FK optionnelle vers playbook_processes)**
- `parcours_emails` : id, phase_id, title, timing, content_summary, status (a_creer/cree/actif/desactive), channel
- `parcours_outils` : id, phase_id, tool_name, acces_status (recu/bloque/non_requis), api_key_received
- `client_kpis` : id, profile_id, metric_name, value, recorded_at
- `client_kpi_alerts` : id, profile_id, metric_name, threshold, operator (gt/lt), active
- `chatbot_configs` : id, name, platform (whatsapp/telegram), client_id, welcome_message, rules (JSONB)
- `chatbot_faq` : id, chatbot_id, question, answer, category, order, active
- `chatbot_stats` : id, chatbot_id, messages_count, escalations_count, unanswered_count, recorded_at

### Integrations externes V2

| Service | Usage | Type | Criticite | Fallback |
|---------|-------|------|-----------|----------|
| Supabase | BDD, auth, RLS, realtime (FAQ chatbot) | CDN (instance dcynlifggjiqqihincbp) | Critique | Snapshot JSON VPS pour chatbots |
| GitHub Pages | Hebergement frontend statique | Deploiement | Critique | Aucun |
| n8n | Workflows chatbot WhatsApp + Telegram, batch stats | VPS OVH (srv921609.hstgr.cloud) | Critique | FAQ JSON local |
| WhatsApp Business API | Chatbot FSY Studio (~300 membres) | API d'Aurelia | Important | Escalade manuelle vers Laurie |
| Telegram Bot API | Chatbot MTM (existant, 8 workflows) | API Telegram | Important | Workflows n8n existants |
| Stripe | Webhooks prevus pour KPIs (hors scope MVP) | API | Nice-to-have | Saisie manuelle |
| Circle | Webhooks prevus pour engagement (hors scope MVP) | API | Nice-to-have | Saisie manuelle |

### UX / Design V2

- Charte CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter
- Onglets conditionnels dans app.html (visibles selon enabled_modules du profil)
- Selecteur de clients dans le header (role admin uniquement)
- Badge rouge pour les alertes KPI
- Badges "nouveau" automatiques via created_at vs localStorage (existant)
- Responsive mobile-first (Aurelia sur iPhone)

<!-- V2:END -->

## OUT (hors perimetre — explicitement exclu)

### Exclusions V1

- Notifications email ou push (V2 : rappels automatiques aux personnes en retard)
- Commentaires sur les etapes
- Pieces jointes / upload de fichiers
- Synchronisation temps reel entre utilisateurs (refresh manuel)
- Historique des modifications (audit trail)
- Integration calendrier (Google Calendar, Fantastical)
- Mode sombre
- Multi-langue (francais uniquement)
- Drag & drop pour le reordonnancement (fleches haut/bas suffisent)
- T5c Onboarding Aurelia Del Sol Premium (a definir ulterieurement)
- Suppression d'un owner ajoute par erreur
- Modification de la date absolue directement (seul le timing relatif est editable)
- Archivage des process termines (badge "Termine" suffit)
- Tests automatises
- Minification du code

<!-- V2:START -->

### Exclusions V2

- Alimentation automatique des KPIs via Stripe/Circle webhooks (prevoir l'interface, pas l'implementation)
- Drag & drop des phases du parcours
- Notifications push mobile
- Export PDF des parcours
- Creation de chatbot depuis le portail (on configure les existants, on n'en cree pas de nouveaux)
- Paiement en ligne depuis le portail
- Stats chatbot en temps reel (batch quotidien via n8n)
- Alertes par email ou WhatsApp (portail uniquement, badge rouge)
- WhatsApp groupes/Communities (a verifier avec Aurelia, MVP en 1:1)

<!-- V2:END -->

## Decisions d'architecture

### Decisions V1

| Decision | Choix | Justification |
|----------|-------|---------------|
| Format | Fichier HTML unique (CSS + JS inline) | Simplicite de deploiement GitHub Pages, coherence avec portail V2 |
| Persistance | Supabase (CDN) — instance dcynlifggjiqqihincbp | Partage des donnees entre Aurelia et Laurie, meme instance que portail V2 |
| Auth | Supabase Auth email + mot de passe | Coherence avec portail client V2 |
| Hebergement | GitHub Pages | Gratuit, custom domain, SSL |
| Dependances | Zero npm — CDN uniquement (Supabase, Google Fonts) | Fichier unique, zero build |
| Gantt mobile | Scroll horizontal (pas de vue liste alternative) | Decision utilisateur validee |
| Export | JSON en complement de Supabase | Double securite (backup) |
| Templates | Figes dans le code JS (11 templates, non modifiables par l'utilisateur) | Simplicite MVP — retravailles avec Catherine |
| Owners | Liste dynamique avec ajout libre, pas de suppression MVP | Simplicite |
| Calendrier | Jours calendaires uniquement (pas d'ouvres, pas de feries) | Decision utilisateur validee |
| Degradation | F1 > F2 > F4 > F3 si depassement de taille | Gantt simplifie en premier |

<!-- V2:START -->

### Decisions V2

| Decision | Choix | Justification |
|----------|-------|---------------|
| Architecture modules | Onglets dans app.html (pas de fichiers separes) | Modules conditionnels par client, single-page |
| Auth V2 | Supabase Auth (signInWithPassword) | Meme systeme que V1, anciens portails AES = parallele |
| Role assistant | Nouvelle valeur "assistant" dans profiles.role | Laurie : acces restreint sans donnees financieres |
| Lien Parcours/Playbook | FK optionnelle parcours_phases.playbook_process_id | Lie des le depart — lien cliquable vers le process |
| Vue admin | Selecteur multi-clients + enabled_modules par profil | Catherine bascule sans se reconnecter |
| KPIs MVP | Saisie manuelle (formulaire portail) | Pas d'integration Stripe/Circle automatique pour le MVP |
| Alertes | Badge rouge dans le portail uniquement | Pas d'alertes email/WhatsApp |
| Charte V2 | CS Consulting (#C27A5A, #0f0f0f, Inter) | Coherence portail V2 — differente du design FSY Playbook V1 |
| WhatsApp | API Business d'Aurelia existante | Pas de nouveau provider a configurer |
| Fallback chatbot | Snapshot JSON 1x/jour sur VPS via n8n | Resilience si Supabase down |
| Stats chatbot | Batch quotidien via n8n | Pas de temps reel |
| Templates parcours | JSONB pour templates, tables relationnelles pour instances | Mixte — flexibilite + intégrité referentielle |

<!-- V2:END -->

## Limites connues

<!-- V2:START -->

### Contraintes techniques V2

| # | Limite | Description | Mitigation |
|---|--------|-------------|------------|
| L3 | Credentials WhatsApp | Token et phone number ID a recuperer aupres d'Aurelia/Laurie | Bloquant pour F9, a traiter en priorite |
| L4 | FAQ Telegram format actuel | A verifier si en dur dans n8n ou externe | Migration dans tous les cas vers chatbot_faq |
| L5 | RLS tables existantes | A verifier et activer si necessaire | Audit des policies existantes |
| L6 | Pas de stats temps reel chatbot | Batch quotidien = decalage max 24h | Acceptable pour le MVP |

### Contraintes business V2

| # | Limite | Description | Impact |
|---|--------|-------------|--------|
| B2 | KPIs manuels | Saisie par Catherine/Aurelia, pas d'alimentation auto | Risque de donnees non a jour |
| B3 | WhatsApp 1:1 uniquement | Groupes/Communities a verifier avec Aurelia | Fonctionnalite potentiellement limitee |

<!-- V2:END -->

## Risques lies au scope

| Risque | Probabilite | Impact | Mitigation |
|--------|-------------|--------|------------|
| Scope creep | Moyenne | Haut | Validation stricte via Gate 1 |
| Dependance externe indisponible | Basse | Haut | Fallback prevu |
| Credentials WhatsApp non fournis | Moyenne | Haut | Prioriser la recuperation, fallback FAQ locale |
| Complexite integration onglets app.html | Moyenne | Moyen | Architecture modulaire, onglets conditionnels |
| RLS insuffisant sur tables existantes | Basse | Haut | Audit et activation avant deploiement |

## Matrice de priorisation V2

| Priorite | Description | Fonctionnalites |
|----------|-------------|-----------------|
| **P1 - Must Have** | Indispensable pour la V2 | F6 (Parcours), F8 (Gestion Chatbots), F11 (Vue admin), F12 (Role assistant) |
| **P2 - Should Have** | Important mais pas bloquant | F7 (KPIs), F9 (WhatsApp FSY), F10 (Telegram migration) |
| **P3 - Nice to Have** | Si le temps le permet | Stats chatbot, alertes KPI avancees |

## References

- **Brief** : [docs/brief.md](brief.md)
- **Acceptance** : [docs/acceptance.md](acceptance.md)
- **Requirements V1** : [input/requirements.md](../input/requirements.md)
- **Requirements V2** : [input/requirements-2.md](../input/requirements-2.md)

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-31 | Analyst | Creation V1 — Playbook Process FSY (F1-F5) |
| 2026-04-06 | Analyst | Extension V2 — Parcours Client (F6), KPIs (F7), Chatbots (F8-F10), Admin (F11), Role assistant (F12) |

---

*Phase BREAK | Spec-to-Code Factory | V2 2026-04-06*
