# TASK-0002 — Couche Infrastructure — client Supabase et auth

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0002 |
| **US Parent** | US-0002 |
| **EPIC** | EPIC-001 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer la couche Infrastructure dans le fichier index.html : initialisation du client Supabase, service d'authentification (login/logout/session), et toutes les operations CRUD pour les tables playbook_processes, playbook_steps, playbook_owners. Implementer egalement le formulaire de login dans la couche UI.

### Ce qui est attendu
- [ ] Initialisation du client Supabase (URL + ANON_KEY)
- [ ] Objet `db` avec toutes les operations CRUD (processes, steps, owners)
- [ ] Service auth (signIn, signOut, getSession, onAuthStateChange)
- [ ] Formulaire de login HTML/CSS (email + mot de passe)
- [ ] Bouton logout dans le header
- [ ] Gestion de session (afficher login ou app selon l'etat)
- [ ] Messages d'erreur en francais

### Ce qui n'est PAS attendu (hors scope)
- Self-registration
- Changement de mot de passe
- Logique metier (Domain)
- Contenu des vues (Playbook, Mes Taches, Timeline)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Auth | Email + mot de passe uniquement, via Supabase Auth |
| Session | Persistee via localStorage (natif Supabase) |
| Acces | Meme acces pour tous (pas de roles) |
| Erreurs | En francais : "Email ou mot de passe incorrect", "Session expiree", "Erreur de connexion" |
| RLS | Toutes les tables avec RLS activee, politique authenticated full access |
| Prefixe | Tables prefixees `playbook_` (partage instance avec portail V2) |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Supabase CDN + instance dcynlifggjiqqihincbp | URL et ANON_KEY a configurer |

### Code existant pertinent

```html
<!-- Deja present dans index.html (TASK-0001) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Section Infrastructure commentee (vide) -->
// === SECTION: INFRASTRUCTURE ===
```

### Packages npm requis

Aucun nouveau package requis (Supabase JS deja charge en CDN).

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0001 (setup projet) | pending |
| Service externe | Supabase Auth | disponible |
| Service externe | Tables Supabase | a creer dans dashboard |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Infrastructure du script + formulaire login dans le body

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| `index.html` (section Infrastructure) | Infrastructure | SupabaseClient, AuthService | Operations de persistance et auth |
| `index.html` (body) | UI | Login form | Formulaire de connexion |

---

## Plan d'implementation

1. **Initialisation Supabase** : Configurer le client avec URL et ANON_KEY
   - Fichier: `index.html` (section Infrastructure)
   - Action: ajouter `const supabase = supabase.createClient(URL, KEY)`

2. **Objet db** : Implementer toutes les operations CRUD
   - Fichier: `index.html` (section Infrastructure)
   - Action: creer l'objet `db` avec processes, steps, owners, auth

3. **Formulaire login** : Creer le HTML du formulaire
   - Fichier: `index.html` (body, avant la navigation)
   - Action: ajouter le formulaire avec CSS inline

4. **Logique auth** : Gerer login/logout et etat de session
   - Fichier: `index.html` (section UI)
   - Action: ajouter les event listeners et la gestion d'etat

5. **Messages d'erreur** : Afficher les erreurs en francais
   - Fichier: `index.html` (section UI)
   - Action: mapper les erreurs Supabase vers des messages francais

---

## Definition of Done

- [ ] Le client Supabase est initialise sans erreur
- [ ] Le formulaire de login s'affiche quand l'utilisateur n'est pas connecte
- [ ] La connexion avec des identifiants valides affiche l'application
- [ ] La connexion avec des identifiants invalides affiche un message d'erreur en francais
- [ ] Le bouton logout deconnecte et affiche le formulaire de login
- [ ] La session persiste apres refresh de la page
- [ ] L'objet `db` est fonctionnel (toutes les operations CRUD)
- [ ] Aucune donnee personnelle reelle dans le code

---

## Tests attendus

### Tests manuels
- [ ] Test: Charger la page — le formulaire login s'affiche
- [ ] Test: Login avec identifiants valides — l'app s'affiche
- [ ] Test: Login avec identifiants invalides — message d'erreur
- [ ] Test: Cliquer logout — retour au formulaire login
- [ ] Test: Refresh apres login — la session persiste
- [ ] Test: Appeler db.owners.getAll() dans la console — retourne les owners

### Cas limites a couvrir
- [ ] Supabase indisponible — message "Erreur de connexion"
- [ ] Session expiree — redirection vers login

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| Supabase initialise | createClient appele | Oui |
| Objet db complet | processes, steps, owners, auth | Oui |
| Formulaire login | elements email + password + bouton | Oui |
| Messages francais | au moins 3 messages d'erreur | Oui |

---

## Notes d'implementation

### Attention
- La cle ANON_KEY est publique par design (securite via RLS), mais utiliser un placeholder `<ANON_KEY>` dans le code committe. La vraie cle sera ajoutee au deploiement.
- Utiliser `supabase.auth.signInWithPassword` (v2), pas `signIn` (v1)
- Utiliser `supabase.auth.getSession` (v2), pas `session()` (v1)

### Patterns a suivre

```javascript
// Pattern CRUD Supabase v2
const { data, error } = await supabase
  .from('playbook_processes')
  .select('*, playbook_steps(*)')
  .order('created_at', { ascending: false });
if (error) throw error;
```

### A eviter
- Ne pas stocker de tokens manuellement (Supabase gere via localStorage)
- Ne pas utiliser de callbacks (utiliser async/await)
- Ne pas logger de tokens ou mots de passe

### Tables Supabase a creer (dans le dashboard)

```sql
-- playbook_processes
CREATE TABLE playbook_processes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  date_cible date NOT NULL,
  template_id text,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'actif',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- playbook_steps
CREATE TABLE playbook_steps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  process_id uuid NOT NULL REFERENCES playbook_processes(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  section text,
  raci_r text NOT NULL,
  raci_a text NOT NULL,
  raci_c text,
  raci_i text,
  timing integer NOT NULL,
  done boolean NOT NULL DEFAULT false,
  step_order integer NOT NULL,
  recurrence text
);

-- playbook_owners
CREATE TABLE playbook_owners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  color text NOT NULL
);

-- RLS
ALTER TABLE playbook_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbook_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbook_owners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users full access" ON playbook_processes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON playbook_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users full access" ON playbook_owners FOR ALL USING (auth.role() = 'authenticated');

-- Donnees initiales owners
INSERT INTO playbook_owners (name, color) VALUES
  ('Aurelia', '#B55B50'),
  ('Laurie', '#033231'),
  ('Catherine', '#D4956A'),
  ('VA', '#5B8C85'),
  ('Automatique', '#7B68AE'),
  ('Externe', '#C4A35A');
```

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
