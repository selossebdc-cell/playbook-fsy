# API Specification

## Vue d'ensemble

**Type** : Application web mono-fichier HTML — pas d'API REST exposee.

L'architecture est entierement client-side. Les "API" sont les interfaces internes entre les couches JS et les appels Supabase. Ce document decrit :
1. Le schema de base de donnees Supabase (tables, colonnes, contraintes)
2. Les operations Supabase (CRUD) utilisees par l'application
3. Les interfaces internes entre les couches JS

## Authentification

### Methode

Supabase Auth — email + mot de passe.

### Flow

```
1. Utilisateur saisit email + mot de passe
2. supabase.auth.signInWithPassword({ email, password })
3. Session stockee automatiquement par Supabase (localStorage)
4. Toutes les requetes Supabase utilisent le token de session
5. Logout : supabase.auth.signOut()
```

### Utilisateurs prevus

| Email | Role | Notes |
|-------|------|-------|
| (a definir) | Aurelia | Fondatrice |
| (a definir) | Laurie | Assistante |
| (a definir) | Catherine | Consultante (ponctuel) |

> Les comptes sont crees manuellement dans le dashboard Supabase Auth.
> Pas de self-registration.

## Endpoints

> Note : Cette application est client-side uniquement (pas d'API REST exposee).
> Les "endpoints" sont les tables Supabase et les operations CRUD associees.

## Schema de base de donnees Supabase

### Table `playbook_processes`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| name | text | Non | - | Nom du process |
| date_cible | date | Non | - | Date Jour J |
| template_id | text | Oui | null | ID du template source (T1-T10 ou null) |
| category | text | Non | - | Projet, Lancement, Cycle, CycleContinu, Transverse |
| status | text | Non | 'actif' | actif ou termine |
| created_at | timestamptz | Non | now() | Date de creation |

### Table `playbook_steps`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| process_id | uuid | Non | - | FK → playbook_processes.id (ON DELETE CASCADE) |
| title | text | Non | - | Titre de l'etape |
| description | text | Oui | null | Description detaillee |
| section | text | Oui | null | Nom de la section de regroupement |
| raci_r | text | Non | - | Owner Responsible |
| raci_a | text | Non | - | Owner Accountable |
| raci_c | text | Oui | null | Owner Consulted |
| raci_i | text | Oui | null | Owner Informed |
| timing | integer | Non | - | Jours relatifs au Jour J |
| done | boolean | Non | false | Statut d'accomplissement |
| step_order | integer | Non | - | Ordre d'affichage |
| recurrence | text | Oui | null | Info de recurrence (cycles continus) |

### Table `playbook_owners`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| name | text | Non | - | Nom de l'owner (unique) |
| color | text | Non | - | Couleur hex (#RRGGBB) |

### Donnees initiales `playbook_owners`

```sql
INSERT INTO playbook_owners (name, color) VALUES
  ('Aurelia', '#B55B50'),
  ('Laurie', '#033231'),
  ('Catherine', '#D4956A'),
  ('VA', '#5B8C85'),
  ('Automatique', '#7B68AE'),
  ('Externe', '#C4A35A');
```

### Row Level Security (RLS)

Toutes les tables ont RLS active. Politique simple : les utilisateurs authentifies ont acces a toutes les lignes (pas de multi-tenant).

```sql
-- Politique pour chaque table
CREATE POLICY "Authenticated users full access" ON playbook_processes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON playbook_steps
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access" ON playbook_owners
  FOR ALL USING (auth.role() = 'authenticated');
```

## Operations Supabase (CRUD)

### Processes

```javascript
// Lire tous les process
const { data } = await supabase
  .from('playbook_processes')
  .select('*, playbook_steps(*)')
  .order('created_at', { ascending: false });

// Creer un process
const { data } = await supabase
  .from('playbook_processes')
  .insert({ name, date_cible, template_id, category, status: 'actif' })
  .select()
  .single();

// Mettre a jour la date cible
const { data } = await supabase
  .from('playbook_processes')
  .update({ date_cible: newDate })
  .eq('id', processId)
  .select()
  .single();

// Mettre a jour le statut
const { data } = await supabase
  .from('playbook_processes')
  .update({ status: 'termine' })
  .eq('id', processId);
```

### Steps

```javascript
// Creer des etapes (bulk insert apres creation process)
const { data } = await supabase
  .from('playbook_steps')
  .insert(stepsArray)
  .select();

// Cocher/decocher une etape
const { data } = await supabase
  .from('playbook_steps')
  .update({ done: !currentDone })
  .eq('id', stepId);

// Mettre a jour une etape
const { data } = await supabase
  .from('playbook_steps')
  .update({ title, description, raci_r, raci_a, raci_c, raci_i, timing })
  .eq('id', stepId);

// Supprimer une etape
const { error } = await supabase
  .from('playbook_steps')
  .delete()
  .eq('id', stepId);

// Reordonner (mise a jour de step_order)
const { data } = await supabase
  .from('playbook_steps')
  .update({ step_order: newOrder })
  .eq('id', stepId);
```

### Owners

```javascript
// Lire tous les owners
const { data } = await supabase
  .from('playbook_owners')
  .select('*')
  .order('name');

// Ajouter un owner
const { data } = await supabase
  .from('playbook_owners')
  .insert({ name, color })
  .select()
  .single();
```

### Auth

```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Logout
const { error } = await supabase.auth.signOut();

// Verifier la session
const { data: { session } } = await supabase.auth.getSession();

// Ecouter les changements d'auth
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') { /* show app */ }
  if (event === 'SIGNED_OUT') { /* show login */ }
});
```

## Interfaces internes (couches JS)

### Domain Layer

```javascript
// Fonctions pures — pas d'appels Supabase, pas de DOM

function calculateAbsoluteDate(dateCible, timing) → Date
// Retourne dateCible + timing jours

function calculateProgress(steps) → { done, total, percent }
// Retourne la progression d'un process

function getStepStatus(step, dateCible) → 'done' | 'overdue' | 'upcoming'
// Retourne le statut visuel d'une etape

function filterTasksByOwner(processes, ownerName) → Step[]
// Filtre les etapes ou l'owner est R ou A

function sortStepsByDate(steps, dateCible) → Step[]
// Tri par date absolue calculee

function buildGanttData(processes, owners) → GanttData
// Construit les donnees pour le rendu Gantt

function instantiateTemplate(template, dateCible) → { process, steps }
// Cree un process et ses etapes depuis un template

function duplicateProcess(process, steps, newDateCible) → { process, steps }
// Duplique un process avec remise a zero
```

### Application Layer

```javascript
// Orchestration des cas d'usage — appelle Domain + Infrastructure

async function createProcess(templateId, name, dateCible) → Process
async function updateProcessDate(processId, newDate) → Process
async function toggleStep(stepId) → Step
async function updateStep(stepId, fields) → Step
async function addStep(processId, step) → Step
async function removeStep(stepId) → void
async function reorderStep(stepId, direction) → void
async function addOwner(name) → Owner
async function duplicateProcess(processId, newDateCible) → Process
async function exportData() → JSON
async function importData(jsonBlob) → void
async function login(email, password) → Session
async function logout() → void
```

### Infrastructure Layer

```javascript
// Appels Supabase — implemente les operations de persistance

const db = {
  processes: {
    getAll: async () → Process[],
    create: async (process) → Process,
    update: async (id, fields) → Process,
  },
  steps: {
    bulkCreate: async (steps) → Step[],
    update: async (id, fields) → Step,
    delete: async (id) → void,
  },
  owners: {
    getAll: async () → Owner[],
    create: async (owner) → Owner,
  },
  auth: {
    signIn: async (email, password) → Session,
    signOut: async () → void,
    getSession: async () → Session | null,
  }
};
```

## Export/Import JSON

### Format d'export

```json
{
  "version": 1,
  "exportedAt": "2026-03-18T12:00:00Z",
  "processes": [
    {
      "id": "uuid",
      "name": "...",
      "date_cible": "2026-12-15",
      "template_id": "T7",
      "category": "Lancement",
      "status": "actif",
      "created_at": "...",
      "steps": [
        {
          "id": "uuid",
          "title": "...",
          "description": "...",
          "section": "CONCEPTION",
          "raci_r": "Laurie",
          "raci_a": "Aurelia",
          "raci_c": null,
          "raci_i": null,
          "timing": -90,
          "done": false,
          "step_order": 1,
          "recurrence": null
        }
      ]
    }
  ],
  "owners": [
    { "id": "uuid", "name": "Aurelia", "color": "#B55B50" }
  ]
}
```

## Codes d'erreur

| Contexte | Erreur | Message utilisateur |
|----------|--------|---------------------|
| Auth | Invalid credentials | "Email ou mot de passe incorrect" |
| Auth | Session expired | "Session expiree, veuillez vous reconnecter" |
| Supabase | Network error | "Erreur de connexion. Verifiez votre connexion internet" |
| Supabase | RLS violation | "Acces refuse. Veuillez vous reconnecter" |
| Import | Invalid JSON | "Le fichier importe n'est pas un JSON valide" |
| Import | Schema mismatch | "Le fichier importe n'est pas compatible" |

<!-- V2:START -->

## Schema de base de donnees V2

### Tables existantes modifiees

#### Table `profiles` (existante — modification)

| Colonne | Type | Nullable | Default | Description | V2 |
|---------|------|----------|---------|-------------|-----|
| id | uuid | Non | auth.uid() | PK, lie a Supabase Auth | V1 |
| email | text | Non | - | Email de l'utilisateur | V1 |
| full_name | text | Non | - | Nom complet | V1 |
| role | text | Non | 'client' | admin, client, assistant | **V2: ajout "assistant"** |
| avatar_url | text | Oui | null | URL avatar | V1 |
| enabled_modules | jsonb | Oui | '[]' | Modules actives par client | **V2: nouveau** |

### Nouvelles tables V2

#### Table `parcours_templates`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| name | text | Non | - | Nom du template (ex: "FSY Studio B2C") |
| description | text | Oui | null | Description |
| offer_type | text | Non | - | Type d'offre (fsy_studio, mtm, premium) |
| phases | jsonb | Non | '[]' | Structure des phases du template |
| created_at | timestamptz | Non | now() | Date de creation |

#### Table `parcours_clients`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| profile_id | uuid | Non | - | FK → profiles.id |
| template_id | uuid | Non | - | FK → parcours_templates.id |
| status | text | Non | 'en_cours' | en_cours, termine |
| progress | numeric | Non | 0 | % de progression |
| created_at | timestamptz | Non | now() | Date de creation |

#### Table `parcours_phases`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| parcours_client_id | uuid | Non | - | FK → parcours_clients.id (ON DELETE CASCADE) |
| phase_number | integer | Non | - | Ordre de la phase |
| title | text | Non | - | Nom de la phase |
| status | text | Non | 'pret' | bloque, pret, en_cours, termine |
| tools_status | jsonb | Oui | null | Resume du statut des outils |
| playbook_process_id | uuid | Oui | null | FK optionnelle → playbook_processes.id |

#### Table `parcours_emails`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| phase_id | uuid | Non | - | FK → parcours_phases.id (ON DELETE CASCADE) |
| title | text | Non | - | Titre de l'email/action |
| timing | text | Oui | null | Timing relatif (ex: J+1) |
| content_summary | text | Oui | null | Resume du contenu |
| status | text | Non | 'a_creer' | a_creer, cree, actif, desactive |
| channel | text | Oui | null | Canal (email, sms, whatsapp) |

#### Table `parcours_outils`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| phase_id | uuid | Non | - | FK → parcours_phases.id (ON DELETE CASCADE) |
| tool_name | text | Non | - | Nom de l'outil |
| acces_status | text | Non | 'non_requis' | recu, bloque, non_requis |
| api_key_received | boolean | Non | false | Flag acces API recu |

#### Table `client_kpis`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| profile_id | uuid | Non | - | FK → profiles.id |
| metric_name | text | Non | - | MRR, churn_rate, abonnes_actifs, taux_conversion, pct_automations |
| value | numeric | Non | - | Valeur numerique |
| recorded_at | timestamptz | Non | now() | Date d'enregistrement |

#### Table `client_kpi_alerts`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| profile_id | uuid | Non | - | FK → profiles.id |
| metric_name | text | Non | - | Nom de la metrique surveillee |
| threshold | numeric | Non | - | Valeur seuil |
| operator | text | Non | - | gt (superieur), lt (inferieur) |
| active | boolean | Non | true | Alerte active ou non |

#### Table `chatbot_configs`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| name | text | Non | - | Nom du chatbot (ex: "WhatsApp FSY Studio") |
| platform | text | Non | - | whatsapp, telegram |
| client_id | uuid | Non | - | FK → profiles.id |
| welcome_message | text | Oui | null | Message de bienvenue |
| rules | jsonb | Oui | null | Regles de comportement (mention-only, escalade, horaires) |

#### Table `chatbot_faq`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| chatbot_id | uuid | Non | - | FK → chatbot_configs.id (ON DELETE CASCADE) |
| question | text | Non | - | Question |
| answer | text | Non | - | Reponse |
| category | text | Oui | null | Categorie thematique |
| order_num | integer | Non | 0 | Ordre d'affichage |
| active | boolean | Non | true | Entree active ou non |

#### Table `chatbot_stats`

| Colonne | Type | Nullable | Default | Description |
|---------|------|----------|---------|-------------|
| id | uuid | Non | gen_random_uuid() | PK |
| chatbot_id | uuid | Non | - | FK → chatbot_configs.id (ON DELETE CASCADE) |
| messages_count | integer | Non | 0 | Nombre de messages traites |
| escalations_count | integer | Non | 0 | Nombre d'escalades |
| unanswered_count | integer | Non | 0 | Questions sans reponse |
| recorded_at | timestamptz | Non | now() | Date d'enregistrement |

### Row Level Security V2

```sql
-- Admin : acces a toutes les donnees
CREATE POLICY "Admin full access" ON parcours_clients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Client : acces a ses propres donnees uniquement
CREATE POLICY "Client own data" ON parcours_clients
  FOR ALL USING (profile_id = auth.uid());

-- Assistant : acces aux donnees du client associe (a definir via table d'association ou champ)
CREATE POLICY "Assistant client data" ON parcours_clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'assistant'
      AND profile_id = parcours_clients.profile_id  -- a adapter selon le modele d'association
    )
  );

-- Meme pattern pour : parcours_phases, parcours_emails, parcours_outils,
-- client_kpis, client_kpi_alerts, chatbot_configs, chatbot_faq, chatbot_stats

-- Assistant : pas d'acces aux donnees financieres
CREATE POLICY "No financial data for assistant" ON contracts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role != 'assistant')
  );
```

### Operations Supabase V2

#### Parcours

```javascript
// Lire les templates parcours
const { data } = await supabase
  .from('parcours_templates')
  .select('*')
  .order('name');

// Assigner un parcours a un client
const { data } = await supabase
  .from('parcours_clients')
  .insert({ profile_id, template_id, status: 'en_cours', progress: 0 })
  .select()
  .single();

// Lire le parcours complet d'un client
const { data } = await supabase
  .from('parcours_clients')
  .select(`
    *,
    parcours_phases (
      *,
      parcours_emails (*),
      parcours_outils (*)
    )
  `)
  .eq('profile_id', profileId)
  .single();

// Mettre a jour le statut d'un email
const { data } = await supabase
  .from('parcours_emails')
  .update({ status: newStatus })
  .eq('id', emailId);

// Mettre a jour le statut d'un outil
const { data } = await supabase
  .from('parcours_outils')
  .update({ acces_status: newStatus })
  .eq('id', outilId);
```

#### KPIs

```javascript
// Saisir un KPI
const { data } = await supabase
  .from('client_kpis')
  .insert({ profile_id, metric_name, value, recorded_at: new Date().toISOString() })
  .select()
  .single();

// Lire l'historique des KPIs d'un client
const { data } = await supabase
  .from('client_kpis')
  .select('*')
  .eq('profile_id', profileId)
  .order('recorded_at', { ascending: true });

// Configurer une alerte
const { data } = await supabase
  .from('client_kpi_alerts')
  .upsert({ profile_id, metric_name, threshold, operator, active: true })
  .select()
  .single();

// Lire les alertes actives
const { data } = await supabase
  .from('client_kpi_alerts')
  .select('*')
  .eq('profile_id', profileId)
  .eq('active', true);
```

#### Chatbots

```javascript
// Lire la config d'un chatbot
const { data } = await supabase
  .from('chatbot_configs')
  .select('*, chatbot_faq(*), chatbot_stats(*)')
  .eq('id', chatbotId)
  .single();

// CRUD FAQ
const { data } = await supabase
  .from('chatbot_faq')
  .insert({ chatbot_id, question, answer, category, order_num, active: true })
  .select()
  .single();

const { data } = await supabase
  .from('chatbot_faq')
  .update({ answer: newAnswer })
  .eq('id', faqId);

const { error } = await supabase
  .from('chatbot_faq')
  .delete()
  .eq('id', faqId);

// Mettre a jour le message de bienvenue
const { data } = await supabase
  .from('chatbot_configs')
  .update({ welcome_message: newMessage })
  .eq('id', chatbotId);

// Lire les FAQ actives (utilise par les chatbots n8n)
const { data } = await supabase
  .from('chatbot_faq')
  .select('question, answer, category')
  .eq('chatbot_id', chatbotId)
  .eq('active', true)
  .order('order_num');
```

#### Admin

```javascript
// Lire tous les profils (admin uniquement)
const { data } = await supabase
  .from('profiles')
  .select('id, full_name, email, role, enabled_modules')
  .order('full_name');

// Activer/desactiver des modules pour un client
const { data } = await supabase
  .from('profiles')
  .update({ enabled_modules: ['parcours', 'kpis', 'chatbots'] })
  .eq('id', profileId);
```

### Interfaces internes V2

#### Application Layer V2

```javascript
// Parcours
async function getParcoursTemplates() → ParcoursTemplate[]
async function assignParcours(profileId, templateId) → ParcoursClient
async function getClientParcours(profileId) → ParcoursClient (avec phases, emails, outils)
async function updateEmailStatus(emailId, newStatus) → ParcoursEmail
async function updateToolAccess(outilId, newStatus) → ParcoursOutil
async function recalculateProgress(parcoursClientId) → number

// KPIs
async function recordKPI(profileId, metricName, value) → ClientKPI
async function getKPIHistory(profileId) → ClientKPI[]
async function configureAlert(profileId, metricName, threshold, operator) → ClientKPIAlert
async function checkAlerts(profileId) → { triggered: ClientKPIAlert[], values: ClientKPI[] }

// Chatbots
async function getChatbotConfig(chatbotId) → ChatbotConfig (avec FAQ et stats)
async function addFAQ(chatbotId, question, answer, category) → ChatbotFAQ
async function updateFAQ(faqId, fields) → ChatbotFAQ
async function deleteFAQ(faqId) → void
async function reorderFAQ(chatbotId, faqIds) → void
async function updateWelcomeMessage(chatbotId, message) → void
async function updateChatbotRules(chatbotId, rules) → void

// Admin
async function getAllProfiles() → Profile[]
async function toggleModules(profileId, modules) → Profile
async function selectClient(profileId) → void (UI state change)
```

### Codes d'erreur V2

| Contexte | Erreur | Message utilisateur |
|----------|--------|---------------------|
| Parcours | No template assigned | "Aucun parcours configure pour ce client" |
| Parcours | Template not found | "Template de parcours introuvable" |
| KPI | Invalid metric | "Metrique invalide. Choix : MRR, churn_rate, abonnes_actifs, taux_conversion, pct_automations" |
| KPI | Invalid value | "La valeur doit etre un nombre positif" |
| Chatbot | FAQ duplicate | "Cette question existe deja dans ce chatbot" |
| Admin | Not admin | "Acces refuse. Seul l'administrateur peut acceder a cette fonction" |
| Assistant | Restricted module | "Vous n'avez pas acces a ce module" |
| RLS | Policy violation | "Acces refuse. Verifiez vos permissions" |

<!-- V2:END -->
