# TASK-0017 — Application + Infrastructure — CRUD parcours Supabase

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0017 |
| **US Parent** | US-V2-005 |
| **EPIC** | EPIC-V2-002 |
| **Priorite** | P1 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 2 |
| **Couche** | Application |

---

## Objectif technique

Implementer les couches Application et Infrastructure pour le module Parcours Client : orchestration des cas d'usage et operations CRUD Supabase pour les tables parcours_templates, parcours_clients, parcours_phases, parcours_emails, parcours_outils.

### Ce qui est attendu
- [ ] Infrastructure : objet `db.parcours` avec toutes les operations CRUD
- [ ] Application : getParcoursTemplates() → ParcoursTemplate[]
- [ ] Application : assignParcours(profileId, templateId) → ParcoursClient
- [ ] Application : getClientParcours(profileId) → ParcoursClient (avec phases, emails, outils)
- [ ] Application : updateEmailStatus(emailId, newStatus) → recalcul progression
- [ ] Application : updateToolAccess(outilId, newStatus) → mise a jour phases dependantes
- [ ] Application : recalculateProgress(parcoursClientId) → number

### Ce qui n'est PAS attendu (hors scope)
- Rendu UI (TASK-0018)
- Fonctions Domain pures (TASK-0016)
- Templates parcours pre-remplis (donnees a inserer manuellement)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Assignation | Un client peut avoir un seul parcours actif par offre |
| Progression | Se recalcule automatiquement quand un email change de statut |
| Outil change | Quand un outil passe de "bloque" a "recu", les phases dependantes se mettent a jour |
| Lecture parcours | Select avec jointures parcours_phases, parcours_emails, parcours_outils |

### Code existant pertinent

```javascript
// Pattern CRUD existant dans app.html (portail V2)
// Suivre le meme pattern que les operations existantes (actions, sessions, etc.)
const { data, error } = await supabase
  .from('table')
  .select('*')
  .eq('profile_id', profileId);
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables Supabase V2) | pending |
| Task prerequise | TASK-0016 (fonctions Domain parcours) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section Infrastructure (db.parcours) et section Application (ParcoursManager)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section Infrastructure) | Infrastructure | db.parcours | CRUD Supabase pour les tables parcours_* |
| app.html (section Application) | Application | ParcoursManager | Orchestration cas d'usage parcours |

---

## Plan d'implementation

1. **Infrastructure — db.parcours** :
   - templates.getAll() → select parcours_templates
   - clients.create(profileId, templateId) → insert parcours_clients + phases + emails + outils
   - clients.getByProfile(profileId) → select avec jointures
   - emails.updateStatus(emailId, status) → update parcours_emails
   - outils.updateAccess(outilId, status) → update parcours_outils
   - clients.updateProgress(id, progress) → update parcours_clients.progress

2. **Application — ParcoursManager** :
   - getParcoursTemplates() → appelle db.parcours.templates.getAll()
   - assignParcours(profileId, templateId) → appelle Domain.instantiateParcoursTemplate + db.parcours.clients.create
   - getClientParcours(profileId) → appelle db.parcours.clients.getByProfile
   - updateEmailStatus(emailId, newStatus) → appelle db + Domain.calculateParcoursProgress + db.updateProgress
   - updateToolAccess(outilId, newStatus) → appelle db + Domain.updatePhasesOnToolChange + db.updatePhaseStatus

---

## Definition of Done

- [ ] db.parcours.templates.getAll() retourne les templates
- [ ] db.parcours.clients.create() cree un parcours avec phases, emails, outils
- [ ] db.parcours.clients.getByProfile() retourne le parcours complet avec jointures
- [ ] assignParcours() cree un parcours depuis un template
- [ ] updateEmailStatus() recalcule la progression automatiquement
- [ ] updateToolAccess() met a jour les phases dependantes
- [ ] Les erreurs Supabase sont attrapees et traduites en francais
- [ ] Aucune logique metier dans la couche Infrastructure

---

## Tests attendus

### Tests manuels
- [ ] Test: getParcoursTemplates() retourne la liste des templates
- [ ] Test: assignParcours() cree un parcours complet dans Supabase
- [ ] Test: getClientParcours() retourne les phases avec emails et outils
- [ ] Test: updateEmailStatus('actif') → progression recalculee
- [ ] Test: updateToolAccess('recu') → phase passe de 'bloque' a 'pret'

### Cas limites a couvrir
- [ ] Client sans parcours → retourne null, pas d'erreur
- [ ] Template inexistant → message d'erreur francais

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
