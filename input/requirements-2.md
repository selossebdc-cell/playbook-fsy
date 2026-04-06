# Requirements V2 — Extension Portail Client V2 : Parcours Client + KPIs + Chatbots

## 1. Contexte & Probleme

Le Portail Client V2 (espace.csbusiness.fr/app.html) est en production avec Supabase (dcynlifggjiqqihincbp, eu-north-1). 5 clients actifs (Fred, Aurelia, Laurie, Taina, Catherine admin), 9 onglets. Le Playbook Process (espace.csbusiness.fr/playbook.html) est egalement en production avec le meme Supabase.

**Le probleme** : les donnees client sont eclatees dans 5+ fichiers HTML statiques non lies. Les dashboards KPI sont hardcodes (localStorage). Les chatbots (Telegram MTM, WhatsApp FSY) ont leurs FAQ codees en dur dans les workflows n8n. Laurie (assistante FSY) ne peut rien modifier sans passer par Catherine. Quand on met a jour un statut dans le parcours client, rien ne bouge dans les KPIs ni dans les outils lies.

## 2. Objectifs metier

1. **Centraliser** : un seul endroit (Portail V2) pour voir le parcours client, les KPIs et les chatbots
2. **Lier les donnees** : quand un email passe en "actif", le % d'automation se recalcule dans les KPIs
3. **Autonomiser Laurie/Aurelia** : elles editent les FAQ chatbot, mettent a jour les statuts outils, sans code ni n8n
4. **Templater** : un parcours type (FSY Studio, MTM, etc.) est reutilisable pour d'autres clients
5. **Mesurer** : KPIs horodates pour voir l'evolution (MRR, churn, abonnes, conversions)
6. **Alerter** : notifications configurables (ex: churn >8%, paiement en retard)

## 3. Utilisateurs / Personas

| Persona | Profil | Frequence d'usage | Device principal |
|---------|--------|-------------------|-----------------|
| **Catherine** (admin) | Consultante, configure les parcours templates, voit tous les clients | Quotidien | Desktop |
| **Aurelia** (cliente FSY) | Fondatrice FSY, voit ses KPIs, ses parcours, edite les FAQ chatbot | 2-3x/semaine | iPhone (mobile-first) |
| **Laurie** (assistante FSY) | Edite FAQ, met a jour statuts outils, gere les reponses chatbot | Quotidien | Desktop + mobile |
| **Fred** (client) | Voit son parcours et KPIs (pas de chatbot) | 1x/semaine | Desktop |
| **Taina** (cliente) | Voit son parcours et KPIs (pas de chatbot) | 1x/semaine | Desktop |

## 4. Parcours utilisateurs

### US-1 : Catherine configure un parcours template
Catherine cree un parcours type "FSY Studio B2C" avec 9 phases et les emails/actions associes. Elle peut ensuite l'assigner a un client. Le template est reutilisable.

### US-2 : Laurie met a jour un statut outil
Laurie se connecte au portail, va dans l'onglet Outils d'Aurelia, change le statut de "Brevo" de "bloque" a "acces recu". Les phases du parcours qui dependaient de Brevo passent automatiquement de "bloque" a "pret".

### US-3 : Aurelia consulte ses KPIs
Aurelia ouvre le portail sur son iPhone, va dans KPIs, voit son MRR, son churn, ses abonnes actifs, et le % d'automatisations en place.

### US-4 : Laurie edite une FAQ chatbot
Laurie va dans l'onglet Chatbots, modifie la reponse a "Comment acceder aux videos ?" pour le chatbot WhatsApp FSY. Le chatbot utilise la nouvelle reponse immediatement (lecture Supabase en temps reel).

### US-5 : Catherine navigue entre ses clients (vue admin)
Catherine se connecte une seule fois avec son compte admin. Elle voit un selecteur de clients (dropdown ou liste). Elle clique sur "Aurelia" et voit immediatement le portail d'Aurelia (parcours, KPIs, chatbots, actions, sessions) — sans saisir le mot de passe ni l'email d'Aurelia. Elle peut basculer vers Fred, Taina, etc. en un clic. C'est SON compte admin qui donne acces a tous les profils.

### US-6 : Catherine voit la progression d'un client
Catherine ouvre le profil d'Aurelia via le selecteur, voit que le parcours FSY Studio est a 35% (phases 1-3 completees, phases 4-9 en cours). Elle voit les blocages (acces Circle manquant) et les prochaines actions.

## 5. Fonctionnalites attendues

### F1 : Module Parcours Client
- Afficher les phases du parcours client par offre (ex: FSY Studio = 9 phases)
- Chaque phase contient des emails/actions avec statut (a_creer / cree / actif / desactive)
- Chaque phase a des outils associes avec statut d'acces API (recu / bloque / non_requis)
- Progression calculee automatiquement (% emails actifs, % phases completees)
- Templates de parcours reutilisables entre clients
- Vue admin (Catherine) : tous les clients. Vue client : son parcours uniquement.

### F2 : Module KPIs
- Metriques business par client : MRR, churn rate, abonnes actifs, taux conversion, % automations actives
- Donnees horodatees (historique pour graphiques d'evolution)
- Liees au parcours (ex: nb emails actifs / nb emails total = % automation)
- Alertes configurables (seuils : ex churn >8% = alerte rouge)
- A terme : alimentation automatique via webhooks Stripe/Circle (hors scope MVP, prevoir l'interface)

### F3 : Module Gestion Chatbots
- Interface CRUD pour gerer les FAQ (question + reponse + categorie + ordre)
- Messages de bienvenue editables par chatbot (WhatsApp FSY, Telegram MTM)
- Regles de comportement editables (mode mention-only, escalade, horaires)
- Stats chatbot en lecture seule : messages traites, escalades, questions sans reponse
- Acces : Catherine (tous), Aurelia + Laurie (chatbots FSY uniquement)

### F4 : Chatbot WhatsApp FSY (backend)
- Communaute ~300 membres FSY Studio
- Lit les FAQ depuis Supabase (table chatbot_faq)
- FAQ auto, message de bienvenue, rappel dimanche soir
- Escalade vers Laurie si question non trouvee
- Fallback n8n si Supabase inaccessible

### F5 : Chatbot Telegram MTM (migration backend)
- Deja construit (8 workflows n8n), a rebrancher sur Supabase pour les FAQ
- Meme principe : lit chatbot_faq filtre par chatbot_id
- Garde les fonctionnalites existantes (slash commands, anti-spam)

## 6. Donnees manipulees

### Tables Supabase existantes (portail V2)
- `profiles` : id, email, full_name, role (admin/client), avatar_url
- `actions` : id, profile_id, title, status, due_date, created_at
- `sessions` : id, profile_id, date, title, notes, number
- `tutos` : id, profile_id, title, url, category
- `contracts` : id, profile_id, type, amount, start_date, end_date, payments
- `tools` : id, profile_id, name, url, category
- `brain_dumps` : id, profile_id, content, created_at

### Tables Supabase existantes (playbook)
- `playbook_processes` : id, title, template_id, date_cible, client_id
- `playbook_steps` : id, process_id, title, owner, timing, done
- `playbook_owners` : id, name, color

### Nouvelles tables a creer
- `parcours_templates` : id, name, description, offer_type, phases (JSONB)
- `parcours_clients` : id, profile_id, template_id, status, progress, created_at
- `parcours_phases` : id, parcours_client_id, phase_number, title, status, tools_status
- `parcours_emails` : id, phase_id, title, timing, content_summary, status (a_creer/cree/actif), channel
- `parcours_outils` : id, phase_id, tool_name, acces_status (recu/bloque/non_requis), api_key_received
- `client_kpis` : id, profile_id, metric_name, value, recorded_at
- `client_kpi_alerts` : id, profile_id, metric_name, threshold, operator (gt/lt), active
- `chatbot_configs` : id, name, platform (whatsapp/telegram), client_id, welcome_message, rules (JSONB)
- `chatbot_faq` : id, chatbot_id, question, answer, category, order, active
- `chatbot_stats` : id, chatbot_id, messages_count, escalations_count, unanswered_count, recorded_at

## 7. Contraintes non-fonctionnelles

- **Performance** : chargement initial <3s sur mobile 4G
- **Mobile-first** : Aurelia utilise principalement son iPhone, responsive obligatoire
- **Securite** : RLS Supabase pour isoler les donnees par client (profiles.id = auth.uid()). Admin (Catherine) a acces a tous les profils.
- **Resilience** : les chatbots doivent fonctionner meme si le portail est down (fallback FAQ en dur dans n8n)
- **Disponibilite** : le portail est heberge sur GitHub Pages (statique), Supabase gere la disponibilite backend
- **Compatibilite** : Chrome, Safari (iOS), Firefox — derniere version

## 8. Hors-scope explicite

- Alimentation automatique des KPIs via Stripe/Circle webhooks (prevoir l'interface, pas l'implementation)
- Drag & drop des phases du parcours
- Notifications push mobile
- Multi-langue (francais uniquement)
- Export PDF des parcours
- Creation de chatbot depuis le portail (on configure les existants, on n'en cree pas de nouveaux)
- Paiement en ligne depuis le portail

## 9. Criteres d'acceptation

1. Catherine peut creer un parcours template et l'assigner a un client en moins de 5 minutes
2. Catherine peut basculer entre les profils clients via un selecteur sans se reconnecter
3. Laurie peut modifier une FAQ chatbot et le chatbot utilise la nouvelle reponse au prochain message
4. Aurelia voit ses KPIs a jour sur son iPhone (responsive)
5. La progression du parcours se recalcule automatiquement quand un email passe en "actif"
6. Une alerte s'affiche si un KPI depasse son seuil (ex: churn >8%)
7. Le chatbot WhatsApp repond aux FAQ depuis Supabase
8. Le chatbot Telegram MTM continue de fonctionner apres migration des FAQ vers Supabase
9. Les donnees sont isolees par client (RLS) — Aurelia ne voit pas les donnees de Fred

## 10. Integrations externes

| Systeme | Type | Usage |
|---------|------|-------|
| **Supabase** | Backend | BDD, auth, RLS, temps reel (realtime subscriptions pour chatbot FAQ) |
| **GitHub Pages** | Hebergement | Frontend statique (espace.csbusiness.fr) |
| **n8n** | Workflows | Chatbot WhatsApp + Telegram, heberge sur VPS OVH |
| **WhatsApp Business API** | Messaging | Chatbot FSY Studio (via n8n) — a configurer (pas encore en place) |
| **Telegram Bot API** | Messaging | Chatbot MTM (deja en place, 8 workflows n8n) |
| **Stripe** | Paiement | Webhooks prevus pour alimentation KPIs (hors scope MVP, prevoir interface) |
| **Circle** | Plateforme | Webhooks prevus pour tracking engagement (hors scope MVP) |

## 11. Stack / Preferences techniques

- **Frontend** : HTML/CSS/JS vanilla (Lovable), pas de framework. Fichier unique app.html ou modules JS simples charges par script src.
- **Backend** : Supabase (dcynlifggjiqqihincbp, eu-north-1). CDN `@supabase/supabase-js@2`.
- **Hebergement frontend** : GitHub Pages (espace.csbusiness.fr)
- **Hebergement chatbots** : VPS OVH (srv921609.hstgr.cloud), workflows n8n
- **Charte graphique** : terracotta #C27A5A, fond sombre #0f0f0f, font Inter
- **Pas de build** : zero npm, zero bundler, zero framework JS

## 12. Qualite attendue

- **Tests** : tests manuels (pas de tests automatises dans le MVP)
- **Code** : fonctions pures pour la logique metier (Domain), separation 4 couches (Domain/Application/Infrastructure/UI)
- **Securite** : RLS sur toutes les nouvelles tables, pas de secrets dans le code
- **Documentation** : README avec architecture et instructions de deploiement
- **Accessibilite** : labels sur les formulaires, contraste suffisant, navigation clavier basique
