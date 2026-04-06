# Domain Specification

## Concepts cles

### Glossaire metier

| Terme | Definition | Exemple |
|-------|------------|---------|
| Process | Instance d'un template de process metier avec une date cible, des etapes et un statut de progression | "Migration Uscreen vers Circle" cree depuis T2, date cible 15/06/2026 |
| Template | Modele de process pre-rempli avec des etapes, des timings relatifs et des RACI par defaut | T7 "Lancer une retraite" (50 etapes, J-270 a J+30) |
| Etape (Step) | Unite de travail dans un process, avec titre, description, RACI, timing relatif et statut | "Creer la page de vente" J-60, R: Laurie, A: Aurelia |
| Section | En-tete de regroupement logique des etapes dans un process | CONCEPTION, PRODUCTION, COMMUNICATION |
| Date cible (Jour J) | Date de reference pour le calcul du retro-planning | 15/12/2026 pour une retraite |
| Timing relatif | Nombre de jours avant (negatif) ou apres (positif) le Jour J | J-90, Jour J, J+7 |
| Retro-planning | Calcul automatique des dates absolues a partir du Jour J et des timings relatifs | Jour J = 15/12 → J-90 = 16/09 |
| RACI | Matrice de responsabilite : Responsible, Accountable, Consulted, Informed | R: Laurie, A: Aurelia, C: Catherine |
| Owner | Personne assignee a un role RACI sur une ou plusieurs etapes | Aurelia, Laurie, Catherine, VA, Automatique, Externe |
| Playbook | L'ensemble des process actifs et termines, formant le referentiel operationnel de FSY | Vue Playbook avec tous les process listes |
| Jalon comm | Etape cle dans un process de lancement qui declenche manuellement le template T6 transverse | "Valider plan comm" dans T3 |
| Categorie | Classification d'un template : Projet, Lancement, Cycle, Cycle continu, Transverse | T7 = Lancement, T9 = Cycle continu |

### Bounded Contexts

```
+--------------------+     +-------------------+     +------------------+
| Process Management |     | Task Aggregation  |     | Timeline/Gantt   |
| - CRUD process     |---->| - Filtre par owner|---->| - Rendu Gantt    |
| - CRUD etapes      |     | - Tri par date    |     | - Multi-process  |
| - Retro-planning   |     | - Navigation      |     | - Marqueurs      |
| - Duplication      |     +-------------------+     +------------------+
+--------------------+
         |
         v
+--------------------+     +-------------------+
| Template Registry  |     | Auth & Persistence|
| - 11 templates     |     | - Supabase Auth   |
| - Categories       |     | - CRUD Supabase   |
| - RACI par defaut  |     | - Export/Import   |
+--------------------+     +-------------------+
```

## Entites

### Process

**Description** : Instance d'un template de process, avec ses etapes, sa date cible et son statut de progression.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| name | string | Oui | Nom du process |
| dateCible | date (ISO) | Oui | Date de reference Jour J |
| templateId | string | Non | ID du template source (null si process vide) |
| category | enum | Oui | Projet, Lancement, Cycle, CycleContinu, Transverse |
| status | enum | Oui | actif, termine |
| steps | Step[] | Oui | Liste ordonnee des etapes |
| createdAt | datetime | Oui | Date de creation |

**Regles metier** :
- La date cible est obligatoire, meme pour un process vide
- Le changement de date cible requiert une confirmation utilisateur
- Toutes les dates des etapes sont recalculees lors du changement de date cible
- Un process est "termine" quand 100% de ses etapes sont cochees
- Un process termine reste dans la liste avec un badge "Termine" (pas d'archivage)
- La duplication d'un process remet a zero la progression, decoche toutes les etapes, et demande une nouvelle date cible

**Relations** :
- Contient 0..N Step (composition)
- Derive de 0..1 Template

### Step (Etape)

**Description** : Unite de travail au sein d'un process, avec responsabilites RACI et timing relatif.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| title | string | Oui | Titre de l'etape |
| desc | string | Non | Description detaillee |
| section | string | Non | Nom de la section de regroupement (en-tete) |
| raci | RACI | Oui | Matrice de responsabilite |
| timing | integer | Oui | Nombre de jours relatif au Jour J (negatif = avant, 0 = Jour J, positif = apres) |
| done | boolean | Oui | Statut d'accomplissement |
| order | integer | Oui | Ordre d'affichage dans le process |
| recurrence | string | Non | Information de recurrence (pour cycles continus) |

**Regles metier** :
- Le timing est un entier relatif au Jour J (ex: -90, 0, +7)
- La date absolue est calculee : dateCible + timing jours
- Seul le timing relatif est editable (pas la date absolue)
- Le timing positif (post-Jour J) est autorise
- Le titre et la description sont editables
- Le RACI est editable via 4 dropdowns (R, A, C optionnel, I optionnel)
- Les etapes peuvent etre ajoutees, supprimees et reordonnees (fleches haut/bas)
- Indicateur visuel : vert (fait), rouge (en retard = date passee + non coche), gris (futur)

**Relations** :
- Appartient a 1 Process (composition)
- Reference 1..4 Owner via RACI

### Owner

**Description** : Personne ou role assignable dans les matrices RACI.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| name | string | Oui | Nom de l'owner |
| color | string | Oui | Couleur attribuee pour le Gantt (hex) |

**Regles metier** :
- Liste initiale par defaut : Aurelia, Laurie, Catherine, VA, Automatique, Externe
- L'ajout de nouveaux owners est libre via "+ Nouvelle personne"
- Pas de suppression d'owner dans le MVP
- Chaque owner a une couleur attribuee pour l'identification dans le Gantt
- Palette limitee a 6-8 couleurs
- Les owners sont affiches en pastilles avec initiales colorees
- La liste des owners est persistee en Supabase

### Template

**Description** : Modele de process pre-rempli avec etapes, timings et RACI par defaut. Fige dans le code JS.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | string | Oui | Identifiant (T1 a T10) |
| name | string | Oui | Nom descriptif |
| category | enum | Oui | Projet, Lancement, Cycle, CycleContinu, Transverse |
| steps | TemplateStep[] | Oui | Etapes pre-remplies avec RACI et timing |
| description | string | Non | Description du template |

**Regles metier** :
- 11 templates pre-remplis (T1 a T10, dont T5a et T5b, hors T5c)
- Templates figes dans le code (non modifiables par l'utilisateur dans le MVP)
- Un process vide (sans template) est egalement disponible
- Lors de l'instanciation, les etapes du template sont copiees dans le process
- Les regles RACI globales s'appliquent : Aurelia = A strategique, Laurie = R operationnel, Catherine = R automatisations uniquement, VA = R execution technique, Externe = C/R production, Automatique = R etapes auto (Laurie = A)

**Liste des templates** :

| ID | Nom | Categorie | Nb etapes | Timing |
|----|-----|-----------|-----------|--------|
| T1 | Creer un espace Circle | Projet | 30 | J-21 a Jour J |
| T2 | Migrer un contenu existant vers Circle | Projet | 35 | J-90 a J+30 |
| T3 | Lancer une formation en ligne | Lancement | 42 | J-120 a J+120 |
| T4 | Lancer un challenge recrutement | Lancement | 29 | J-60 a J+15 |
| T5a | Onboarder un nouveau membre Studio B2C | Cycle | 18 | Jour J a J+30 |
| T5b | Onboarder une certifiee MTM B2B | Cycle | 30 | Jour J a J+120 |
| T6 | Plan de communication lancement | Transverse | 33 | J-30 a Jour J |
| T7 | Lancer une retraite | Lancement | 50 | J-270 a J+30 |
| T8 | Gerer une licence annuelle | Cycle | 28 | J a J+375 |
| T9 | Animer et retenir les abonnees Studio B2C | CycleContinu | 17 | Cycle mensuel |
| T10 | Animer la communaute certifiees MTM | CycleContinu | 16 | Cycle trimestriel |

## Agregats

### Process Aggregate

**Racine** : Process

**Composants** :
- Process
- Step (collection ordonnee)

**Invariants** :
- Un process a toujours une date cible (jamais null)
- L'ordre des etapes est continu (pas de trous dans les numeros d'ordre)
- La progression est toujours coherente : nombre d'etapes done / total
- Le statut "termine" est automatiquement mis a jour quand progression = 100%

### Owner Registry Aggregate

**Racine** : OwnerList (collection)

**Composants** :
- Owner

**Invariants** :
- Les 6 owners par defaut sont toujours presents
- Les couleurs sont uniques par owner
- La liste ne peut que croitre (pas de suppression MVP)

## Value Objects

| Value Object | Attributs | Validation |
|--------------|-----------|------------|
| RACI | r: string (owner), a: string (owner), c: string? (owner), i: string? (owner) | R et A sont obligatoires, C et I sont optionnels. Tous doivent etre des owners existants |
| Timing | value: integer | Entier relatif (negatif, zero ou positif). Pas de limite min/max |
| DateAbsolue | date: Date | Calculee = dateCible + timing. Non editable directement |
| Progression | done: integer, total: integer, percent: number | percent = Math.round(done / total * 100). 0 <= done <= total |
| Color | hex: string | Format hexadecimal (#RRGGBB). Palette de 6-8 couleurs |

## Domain Events

| Event | Declencheur | Donnees | Consommateurs |
|-------|-------------|---------|---------------|
| ProcessCreated | Creation d'un process depuis template ou vide | Process complet | UI (refresh liste), Supabase (persist) |
| ProcessDateChanged | Modification date cible (apres confirmation) | processId, oldDate, newDate | RetroPlanner (recalcul), UI (refresh), Supabase |
| StepToggled | Cocher/decocher une etape | stepId, processId, done | ProgressCalculator, UI (refresh barre), Supabase |
| StepUpdated | Modification titre/desc/RACI/timing | stepId, champs modifies | UI (refresh), Supabase |
| StepAdded | Ajout d'une nouvelle etape | Step, processId | UI (refresh), Supabase |
| StepRemoved | Suppression d'une etape | stepId, processId | ProgressCalculator, UI, Supabase |
| StepReordered | Deplacement haut/bas d'une etape | stepId, processId, newOrder | UI (refresh), Supabase |
| OwnerAdded | Ajout d'un nouvel owner | Owner | OwnerRegistry, UI (refresh dropdowns), Supabase |
| ProcessDuplicated | Duplication d'un process | sourceId, newProcess | UI (refresh liste), Supabase |
| DataExported | Export JSON | JSON blob | Navigateur (download) |
| DataImported | Import JSON | JSON blob | Supabase (bulk upsert), UI (refresh) |

## Domain Services

| Service | Responsabilite | Entites concernees |
|---------|---------------|-------------------|
| RetroPlanner | Calcul des dates absolues a partir de la date cible et des timings relatifs | Process, Step |
| ProgressCalculator | Calcul de la progression (%) par process | Process, Step |
| TaskAggregator | Agregation des taches de tous les process actifs, filtrage par owner (R ou A) | Process, Step, Owner |
| GanttDataBuilder | Construction des donnees pour le rendu Gantt (lignes, dots, barres) | Process, Step, Owner |
| TemplateInstantiator | Creation d'un process a partir d'un template (copie etapes, applique RACI) | Template, Process, Step |
| ProcessDuplicator | Duplication d'un process avec remise a zero | Process, Step |
| ExportImportService | Serialisation/deserialisation JSON des donnees | Process, Step, Owner |

## Regles metier transverses

1. **Retro-planning automatique** : Pour chaque etape, dateAbsolue = dateCible + timing (en jours calendaires). Les jours ouvres et feries ne sont pas pris en compte.
2. **Indicateurs visuels** : Vert = etape accomplie (done=true). Rouge = en retard (date passee + done=false). Gris = a venir (date future + done=false).
3. **RACI global** : Aurelia = A (decisions strategiques uniquement). Laurie = R (lead operationnel, execution). Catherine = R (automatisations uniquement, ponctuel). VA = R (execution technique ponctuelle). Externe = C/R (production de contenu). Automatique = R (etapes automatisees, Laurie = A).
4. **Communication hybride** : Jalons comm integres dans les templates de lancement (T3, T4, T7) avec 2-3 etapes cles. T6 dedie "Plan de communication lancement" est un template transverse declenche manuellement.
5. **Terme "automatisation"** : Utiliser "automatisation" dans les templates, jamais "n8n" ni outil specifique. Catherine choisit l'outil au moment de l'implementation.
6. **Export/Import JSON** : Complement de securite en plus de Supabase. L'export telecharge toutes les donnees, l'import restaure depuis un fichier.

## Architecture logicielle

### Style architectural

Architecture simple en couches (Layered) adaptee a un fichier HTML unique. Pas de clean architecture formelle (trop de ceremonie pour un fichier unique), mais separation logique claire entre UI, logique metier et infrastructure.

### Layers et responsabilites

| Layer | Dossier | Responsabilite | Dependances autorisees |
|-------|---------|----------------|----------------------|
| Domain | Section JS "Domain" (inline) | Entites (Process, Step, Owner), Value Objects, Domain Services, regles metier | Aucune dependance externe |
| Application | Section JS "Application" (inline) | Orchestration des cas d'usage, coordination entre Domain et Infrastructure | Domain uniquement |
| Infrastructure | Section JS "Infrastructure" (inline) | SupabaseClient (persistance), AuthService (login/logout) | Domain + Application |
| UI/Presentation | Section HTML/CSS/JS "UI" (inline) | Rendu des vues, gestion des evenements, navigation | Application |

> Note : Comme l'application est un fichier HTML unique, les "layers" sont des sections logiques commentees dans le fichier, pas des dossiers physiques.

### Regles de dependance (BLOQUANT)

- Domain N'IMPORTE JAMAIS Infrastructure ni UI
- Application N'IMPORTE JAMAIS Infrastructure ni UI directement
- Infrastructure IMPLEMENTE les fonctions de persistance utilisees par Application
- Les fonctions Domain sont pures (pas d'appels Supabase, pas de manipulation DOM)

### Relations entre Bounded Contexts

| Context Source | Context Cible | Type de relation |
|---------------|---------------|-----------------|
| Process Management | Task Aggregation | Upstream (fournit les process/etapes) |
| Process Management | Timeline/Gantt | Upstream (fournit les process/etapes) |
| Template Registry | Process Management | Upstream (fournit les templates pour instanciation) |
| Auth & Persistence | Tous | Shared Kernel (auth et persistance transverses) |

<!-- V2:START -->

| Parcours Client | KPI Management | Upstream (fournit les stats emails actifs pour % automation) |
| Parcours Client | Process Management | Downstream (FK optionnelle phase → process du playbook) |
| Chatbot Management | Auth & Persistence | Downstream (lit FAQ depuis Supabase, fallback JSON) |
| Admin Management | Auth & Persistence | Upstream (gere les roles et modules actives) |

## Entites V2

### ParcoursTemplate

**Description** : Modele de parcours client reutilisable entre clients (ex: "FSY Studio B2C").

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| name | string | Oui | Nom du template (ex: "FSY Studio B2C") |
| description | string | Non | Description du parcours |
| offer_type | string | Oui | Type d'offre (FSY Studio, MTM, Premium) |
| phases | JSONB | Oui | Structure des phases du template |

**Regles metier** :
- Un template peut etre assigne a plusieurs clients
- La structure JSONB contient les phases avec leurs emails et outils types
- Seul Catherine (admin) peut creer/modifier les templates

### ParcoursClient

**Description** : Instance d'un parcours template assignee a un client specifique.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| profile_id | UUID | Oui | FK → profiles.id |
| template_id | UUID | Oui | FK → parcours_templates.id |
| status | string | Oui | en_cours, termine |
| progress | number | Oui | % de progression calcule |
| created_at | timestamptz | Oui | Date de creation |

**Regles metier** :
- Un client peut avoir un seul parcours actif par offre
- La progression se recalcule automatiquement quand un email change de statut

### ParcoursPhase

**Description** : Phase du parcours client (ex: "Decouverte", "Onboarding", "Retention").

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| parcours_client_id | UUID | Oui | FK → parcours_clients.id |
| phase_number | integer | Oui | Ordre de la phase |
| title | string | Oui | Nom de la phase |
| status | string | Oui | bloque, pret, en_cours, termine |
| tools_status | JSONB | Non | Resume du statut des outils |
| playbook_process_id | UUID | Non | FK optionnelle → playbook_processes.id |

**Regles metier** :
- Quand un outil passe de "bloque" a "recu", les phases dependantes passent de "bloque" a "pret"
- Le lien FK vers playbook_processes permet un lien cliquable dans l'UI
- Le statut d'une phase depend de ses emails et outils

### ParcoursEmail

**Description** : Email ou action dans une phase du parcours.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| phase_id | UUID | Oui | FK → parcours_phases.id |
| title | string | Oui | Titre de l'email/action |
| timing | string | Non | Timing relatif (ex: J+1, J+7) |
| content_summary | string | Non | Resume du contenu |
| status | enum | Oui | a_creer, cree, actif, desactive |
| channel | string | Non | Canal (email, sms, whatsapp) |

**Regles metier** :
- Le % d'automation = nb emails actifs / nb emails total
- Ce ratio alimente le KPI "% automations actives"

### ParcoursOutil

**Description** : Outil associe a une phase du parcours avec statut d'acces API.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| phase_id | UUID | Oui | FK → parcours_phases.id |
| tool_name | string | Oui | Nom de l'outil |
| acces_status | enum | Oui | recu, bloque, non_requis |
| api_key_received | boolean | Non | Flag acces API recu |

**Regles metier** :
- Quand un outil passe de "bloque" a "recu", les phases dependantes sont mises a jour automatiquement

### ClientKPI

**Description** : Metrique business horodatee pour un client.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| profile_id | UUID | Oui | FK → profiles.id |
| metric_name | string | Oui | MRR, churn_rate, abonnes_actifs, taux_conversion, pct_automations |
| value | numeric | Oui | Valeur numerique |
| recorded_at | timestamptz | Oui | Date d'enregistrement |

**Regles metier** :
- Le % automations actives est lie au parcours (nb emails actifs / total)
- Saisie manuelle via formulaire dans le portail (MVP)
- Historique conserve pour graphiques d'evolution

### ClientKPIAlert

**Description** : Seuil d'alerte configurable par metrique.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| profile_id | UUID | Oui | FK → profiles.id |
| metric_name | string | Oui | Nom de la metrique surveillee |
| threshold | numeric | Oui | Valeur seuil |
| operator | enum | Oui | gt (superieur), lt (inferieur) |
| active | boolean | Oui | Alerte active ou non |

**Regles metier** :
- Quand un KPI depasse le seuil, un badge rouge apparait dans le portail
- Alertes portail uniquement (pas d'email/WhatsApp)

### ChatbotConfig

**Description** : Configuration d'un chatbot (WhatsApp ou Telegram).

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| name | string | Oui | Nom du chatbot |
| platform | enum | Oui | whatsapp, telegram |
| client_id | UUID | Oui | FK → profiles.id |
| welcome_message | text | Non | Message de bienvenue |
| rules | JSONB | Non | Regles de comportement (mode mention-only, escalade, horaires) |

### ChatbotFAQ

**Description** : Entree FAQ d'un chatbot.

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| chatbot_id | UUID | Oui | FK → chatbot_configs.id |
| question | text | Oui | Question |
| answer | text | Oui | Reponse |
| category | string | Non | Categorie thematique |
| order | integer | Oui | Ordre d'affichage |
| active | boolean | Oui | Entree active ou non |

**Regles metier** :
- Les FAQ sont lues par les chatbots depuis Supabase (filtre par chatbot_id)
- Modification d'une FAQ = prise en compte au prochain message chatbot
- Fallback : snapshot JSON quotidien sur VPS

### ChatbotStats

**Description** : Statistiques d'utilisation d'un chatbot (batch quotidien).

**Attributs** :

| Attribut | Type | Obligatoire | Description |
|----------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| chatbot_id | UUID | Oui | FK → chatbot_configs.id |
| messages_count | integer | Oui | Nombre de messages traites |
| escalations_count | integer | Oui | Nombre d'escalades |
| unanswered_count | integer | Oui | Questions sans reponse |
| recorded_at | timestamptz | Oui | Date d'enregistrement |

**Regles metier** :
- Stats en lecture seule dans le portail
- Alimentees par batch quotidien via n8n

## Agregats V2

### Parcours Client Aggregate

**Racine** : ParcoursClient

**Composants** :
- ParcoursClient
- ParcoursPhase (collection ordonnee)
- ParcoursEmail (collection par phase)
- ParcoursOutil (collection par phase)

**Invariants** :
- La progression est toujours coherente : nb phases terminees / total
- Le % automation = nb emails actifs / nb emails total
- Quand un outil passe a "recu", les phases dependantes se mettent a jour

### KPI Aggregate

**Racine** : ClientKPI (par profile_id)

**Composants** :
- ClientKPI (collection horodatee)
- ClientKPIAlert (collection par metrique)

**Invariants** :
- Un KPI est toujours horodate (recorded_at obligatoire)
- Le badge rouge apparait quand la derniere valeur depasse le seuil configure

### Chatbot Aggregate

**Racine** : ChatbotConfig

**Composants** :
- ChatbotConfig
- ChatbotFAQ (collection ordonnee)
- ChatbotStats (collection horodatee)

**Invariants** :
- Un chatbot a toujours un nom et une plateforme
- Les FAQ ont un ordre continu
- Le fallback JSON est genere quotidiennement

## Value Objects V2

| Value Object | Attributs | Validation |
|--------------|-----------|------------|
| EmailStatus | status: enum | a_creer, cree, actif, desactive — transitions libres |
| ToolAccess | acces_status: enum | recu, bloque, non_requis |
| KPIValue | metric_name: string, value: numeric, recorded_at: datetime | value >= 0, recorded_at obligatoire |
| AlertConfig | threshold: numeric, operator: enum | operator in (gt, lt), threshold > 0 |
| Role | role: enum | admin, client, assistant |
| EnabledModules | modules: string[] | JSONB array dans profiles, onglets visibles |

## Domain Events V2

| Event | Declencheur | Donnees | Consommateurs |
|-------|-------------|---------|---------------|
| EmailStatusChanged | Changement de statut d'un email dans le parcours | emailId, oldStatus, newStatus | ProgressCalculator (% automation), UI, Supabase |
| ToolAccessChanged | Changement de statut d'acces d'un outil | outilId, phaseId, newStatus | PhaseStatusUpdater (bloque → pret), UI, Supabase |
| KPIRecorded | Saisie d'un nouveau KPI | profileId, metricName, value, recordedAt | AlertChecker, UI (graphique), Supabase |
| AlertTriggered | Un KPI depasse le seuil configure | profileId, metricName, value, threshold | UI (badge rouge) |
| FAQUpdated | Modification d'une entree FAQ | chatbotId, faqId | Chatbot n8n (prochain message), Supabase |
| ClientSelected | Catherine change de client dans le selecteur admin | adminId, selectedClientId | UI (rechargement des donnees du client) |
| ModulesToggled | Catherine active/desactive des modules pour un client | profileId, enabledModules | UI (onglets conditionnels), Supabase |

## Domain Services V2

| Service | Responsabilite | Entites concernees |
|---------|---------------|-------------------|
| ParcoursProgressCalculator | Calcul de la progression globale et par phase + % automation | ParcoursClient, ParcoursPhase, ParcoursEmail |
| PhaseStatusUpdater | Mise a jour automatique du statut des phases quand un outil change | ParcoursPhase, ParcoursOutil |
| KPIAlertChecker | Verification des seuils d'alerte apres chaque saisie de KPI | ClientKPI, ClientKPIAlert |
| ChatbotFAQManager | CRUD FAQ avec reordonnancement | ChatbotConfig, ChatbotFAQ |
| AdminClientSelector | Selection et basculement entre clients pour la vue admin | profiles (admin), tous les modules |
| ModuleAccessManager | Gestion des modules actives par client (enabled_modules) | profiles |
| RoleAccessChecker | Verification des droits d'acces par role (admin/client/assistant) | profiles |

## Regles metier transverses V2

7. **Roles RBAC** : admin (Catherine) = tous les clients, tous les modules. client (Aurelia, Fred, Taina) = son profil uniquement, modules actives. assistant (Laurie) = Chatbots, Outils, Parcours, Actions du client associe — pas de donnees financieres.
8. **Modules conditionnels** : Les onglets du portail sont visibles selon le champ enabled_modules (JSONB array) dans profiles. Catherine active/desactive les modules par client.
9. **Lien Parcours/Playbook** : FK optionnelle parcours_phases.playbook_process_id → lien cliquable dans l'UI vers le process correspondant du playbook.
10. **% automation** : nb emails actifs / nb emails total dans le parcours. Ce ratio alimente le KPI "pct_automations".
11. **Fallback chatbot** : Si Supabase est inaccessible, le chatbot utilise le snapshot JSON local sur le VPS, genere quotidiennement par n8n. Si le snapshot est aussi absent : message d'erreur generique + escalade vers Laurie.
12. **Charte graphique V2** : CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter. Differente du design FSY du Playbook V1.

## Bounded Contexts V2

```
+--------------------+     +-------------------+     +------------------+
| Parcours Client    |     | KPI Management    |     | Chatbot Mgmt     |
| - Templates        |---->| - Saisie manuelle |     | - CRUD FAQ       |
| - Phases/Emails    |     | - Historique      |     | - Configs        |
| - Outils           |     | - Alertes         |     | - Stats (r/o)    |
| - Progression      |     +-------------------+     +------------------+
+--------------------+              |                        |
         |                          v                        v
         v                 +-----------------+     +------------------+
+--------------------+     | Admin Mgmt      |     | Chatbot Backend  |
| Process Management |     | - Multi-clients  |     | - WA workflow    |
| (Playbook V1)      |     | - Modules toggle |     | - TG workflow    |
| - FK optionnelle   |     | - Roles RBAC     |     | - FAQ Supabase   |
+--------------------+     +-----------------+     | - Fallback JSON  |
                                    |              +------------------+
                                    v
                           +-------------------+
                           | Auth & Persistence|
                           | - Supabase Auth   |
                           | - RLS par role    |
                           | - Profiles+roles  |
                           +-------------------+
```

<!-- V2:END -->
