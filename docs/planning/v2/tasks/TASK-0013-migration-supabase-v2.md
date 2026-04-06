# TASK-0013 — Migration Supabase V2 — nouvelles tables et RLS

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0013 |
| **US Parent** | US-V2-001 |
| **EPIC** | EPIC-V2-001 |
| **Priorite** | P1 |
| **Estimation** | L (3-4h) |
| **Statut** | pending |
| **Sprint** | Sprint 1 |
| **Couche** | Infrastructure |

---

## Objectif technique

Creer les 10 nouvelles tables Supabase V2 et modifier la table profiles existante. Activer le RLS sur toutes les nouvelles tables avec des politiques differenciees par role (admin/client/assistant). Inserer les donnees initiales (chatbot configs de base).

### Ce qui est attendu
- [ ] ALTER TABLE profiles : ajout colonne `role` (text, default 'client'), ajout colonne `enabled_modules` (jsonb, default '[]')
- [ ] CREATE TABLE parcours_templates (id, name, description, offer_type, phases JSONB, created_at)
- [ ] CREATE TABLE parcours_clients (id, profile_id FK, template_id FK, status, progress, created_at)
- [ ] CREATE TABLE parcours_phases (id, parcours_client_id FK CASCADE, phase_number, title, status, tools_status JSONB, playbook_process_id FK optionnelle)
- [ ] CREATE TABLE parcours_emails (id, phase_id FK CASCADE, title, timing, content_summary, status, channel)
- [ ] CREATE TABLE parcours_outils (id, phase_id FK CASCADE, tool_name, acces_status, api_key_received)
- [ ] CREATE TABLE client_kpis (id, profile_id FK, metric_name, value, recorded_at)
- [ ] CREATE TABLE client_kpi_alerts (id, profile_id FK, metric_name, threshold, operator, active)
- [ ] CREATE TABLE chatbot_configs (id, name, platform, client_id FK, welcome_message, rules JSONB)
- [ ] CREATE TABLE chatbot_faq (id, chatbot_id FK CASCADE, question, answer, category, order_num, active)
- [ ] CREATE TABLE chatbot_stats (id, chatbot_id FK CASCADE, messages_count, escalations_count, unanswered_count, recorded_at)
- [ ] RLS actif sur toutes les tables avec politiques par role
- [ ] Donnees initiales : mettre a jour profiles.role pour Catherine (admin), Laurie (assistant)

### Ce qui n'est PAS attendu (hors scope)
- Contenu des templates parcours (fait dans TASK-0016/0017)
- Donnees FAQ (inserees par le portail ou lors de la migration Telegram)
- Code JS/UI dans app.html

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Roles | profiles.role : 'admin', 'client', 'assistant' |
| enabled_modules | JSONB array dans profiles, ex: ['parcours', 'kpis', 'chatbots'] |
| RLS admin | Admin a acces a toutes les donnees de toutes les tables |
| RLS client | Client a acces uniquement a ses propres donnees (profile_id = auth.uid()) |
| RLS assistant | Assistant a acces aux donnees du client associe, sauf donnees financieres |
| FK optionnelle | parcours_phases.playbook_process_id → playbook_processes.id (nullable) |
| CASCADE | Suppression d'un parcours_client supprime ses phases, emails, outils |
| CASCADE | Suppression d'un chatbot_config supprime ses FAQ et stats |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| ADR-0001 | Instance Supabase dcynlifggjiqqihincbp | Meme instance que V1 et portail |

### Code existant pertinent

```sql
-- Tables existantes a ne PAS toucher :
-- playbook_processes, playbook_steps, playbook_owners (V1)
-- profiles, actions, sessions, tutos, contracts, tools, brain_dumps (portail V2)

-- Table profiles existante (structure actuelle) :
-- id (uuid, PK), email (text), full_name (text), avatar_url (text)
-- Colonnes a AJOUTER : role (text), enabled_modules (jsonb)
```

### Packages npm requis

Aucun nouveau package requis (SQL execute dans Supabase Dashboard ou via migration).

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Prerequis | Portail V2 en production | completed |
| Prerequis | Playbook V1 en production | completed |
| Service externe | Supabase Dashboard | disponible |

---

## Fichiers concernes

### Fichiers a creer
- Script SQL de migration (a executer dans Supabase Dashboard)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| Migration SQL | Infrastructure | Schema BDD | Tables, FK, RLS, donnees initiales |

---

## Plan d'implementation

1. **Backup** : Exporter les donnees existantes (Export Supabase ou JSON)

2. **ALTER TABLE profiles** : Ajouter les colonnes role et enabled_modules
   - Action: ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'client';
   - Action: ALTER TABLE profiles ADD COLUMN IF NOT EXISTS enabled_modules jsonb DEFAULT '[]';

3. **Tables parcours** : Creer parcours_templates, parcours_clients, parcours_phases, parcours_emails, parcours_outils
   - Action: CREATE TABLE avec FK et CASCADE

4. **Tables KPIs** : Creer client_kpis, client_kpi_alerts
   - Action: CREATE TABLE avec FK

5. **Tables chatbots** : Creer chatbot_configs, chatbot_faq, chatbot_stats
   - Action: CREATE TABLE avec FK et CASCADE

6. **RLS** : Activer RLS et creer les politiques
   - Admin : acces a tout
   - Client : profile_id = auth.uid()
   - Assistant : acces via association (a definir)

7. **Donnees initiales** : Mettre a jour les roles dans profiles
   - Catherine = admin
   - Laurie = assistant
   - Aurelia, Fred, Taina = client (deja par defaut)

---

## Definition of Done

- [ ] Les 10 nouvelles tables sont creees sans erreur
- [ ] La table profiles a les colonnes role et enabled_modules
- [ ] Le RLS est actif sur toutes les nouvelles tables
- [ ] Les politiques RLS differenciees par role fonctionnent
- [ ] Catherine (admin) peut lire toutes les donnees
- [ ] Un client ne peut lire que ses propres donnees
- [ ] Les FK CASCADE fonctionnent (suppression en cascade)
- [ ] La FK optionnelle vers playbook_processes fonctionne
- [ ] Aucune regression sur les tables existantes (V1 + portail)
- [ ] Les roles sont correctement assignes dans profiles

---

## Tests attendus

### Tests manuels
- [ ] Test: Verifier que toutes les tables apparaissent dans le dashboard Supabase
- [ ] Test: INSERT dans parcours_clients avec un profile_id existant → OK
- [ ] Test: INSERT dans parcours_phases avec playbook_process_id null → OK
- [ ] Test: INSERT dans parcours_phases avec playbook_process_id valide → OK
- [ ] Test: DELETE un parcours_client → les phases, emails, outils sont supprimes en cascade
- [ ] Test: Connexion en tant que client → ne voit que ses donnees
- [ ] Test: Connexion en tant qu'admin → voit toutes les donnees

### Cas limites a couvrir
- [ ] Colonne role deja existante dans profiles (IF NOT EXISTS)
- [ ] FK vers un playbook_process qui n'existe plus (SET NULL ou erreur ?)

---

## Notes d'implementation

### Attention
- Utiliser ALTER TABLE ... ADD COLUMN IF NOT EXISTS pour eviter les erreurs si la colonne existe deja
- Ne pas supprimer les politiques RLS existantes sur les tables V1
- Backup avant toute modification de la table profiles

### SQL de migration complet

```sql
-- 1. Modification table profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'client';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS enabled_modules jsonb DEFAULT '[]';

-- 2. Tables Parcours
CREATE TABLE parcours_templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  offer_type text NOT NULL,
  phases jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE parcours_clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES profiles(id),
  template_id uuid NOT NULL REFERENCES parcours_templates(id),
  status text NOT NULL DEFAULT 'en_cours',
  progress numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE parcours_phases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  parcours_client_id uuid NOT NULL REFERENCES parcours_clients(id) ON DELETE CASCADE,
  phase_number integer NOT NULL,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'pret',
  tools_status jsonb,
  playbook_process_id uuid REFERENCES playbook_processes(id) ON DELETE SET NULL
);

CREATE TABLE parcours_emails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id uuid NOT NULL REFERENCES parcours_phases(id) ON DELETE CASCADE,
  title text NOT NULL,
  timing text,
  content_summary text,
  status text NOT NULL DEFAULT 'a_creer',
  channel text
);

CREATE TABLE parcours_outils (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id uuid NOT NULL REFERENCES parcours_phases(id) ON DELETE CASCADE,
  tool_name text NOT NULL,
  acces_status text NOT NULL DEFAULT 'non_requis',
  api_key_received boolean NOT NULL DEFAULT false
);

-- 3. Tables KPIs
CREATE TABLE client_kpis (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES profiles(id),
  metric_name text NOT NULL,
  value numeric NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE client_kpi_alerts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES profiles(id),
  metric_name text NOT NULL,
  threshold numeric NOT NULL,
  operator text NOT NULL,
  active boolean NOT NULL DEFAULT true
);

-- 4. Tables Chatbots
CREATE TABLE chatbot_configs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  platform text NOT NULL,
  client_id uuid NOT NULL REFERENCES profiles(id),
  welcome_message text,
  rules jsonb
);

CREATE TABLE chatbot_faq (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id uuid NOT NULL REFERENCES chatbot_configs(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  order_num integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true
);

CREATE TABLE chatbot_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id uuid NOT NULL REFERENCES chatbot_configs(id) ON DELETE CASCADE,
  messages_count integer NOT NULL DEFAULT 0,
  escalations_count integer NOT NULL DEFAULT 0,
  unanswered_count integer NOT NULL DEFAULT 0,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

-- 5. RLS
ALTER TABLE parcours_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcours_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcours_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcours_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcours_outils ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_kpi_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_stats ENABLE ROW LEVEL SECURITY;

-- RLS policies — voir TASK-0014 pour le detail par role
CREATE POLICY "Admin full access" ON parcours_templates
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin full access" ON parcours_clients
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Client own data" ON parcours_clients
  FOR ALL USING (profile_id = auth.uid());
-- (autres politiques dans TASK-0014)

-- 6. Donnees initiales — roles
-- Catherine admin (adapter l'UUID)
-- UPDATE profiles SET role = 'admin' WHERE email = 'catherine@csbusiness.fr';
-- UPDATE profiles SET role = 'assistant' WHERE full_name = 'Laurie';
```

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
