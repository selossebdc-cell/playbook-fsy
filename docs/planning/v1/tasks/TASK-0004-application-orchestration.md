# TASK-0004 — Couche Application — orchestration process/etapes

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0004 |
| **US Parent** | US-0004 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer la couche Application qui orchestre les cas d'usage en coordonnant les fonctions Domain et les operations Infrastructure (Supabase). Chaque fonction Application est un use case complet.

### Ce qui est attendu
- [ ] `createProcess(templateId, name, dateCible)` — cree un process (vide ou depuis template)
- [ ] `updateProcessDate(processId, newDate)` — met a jour la date cible et recalcule
- [ ] `toggleStep(stepId)` — coche/decoche une etape
- [ ] `updateStep(stepId, fields)` — met a jour une etape
- [ ] `addStep(processId, step)` — ajoute une etape
- [ ] `removeStep(stepId)` — supprime une etape
- [ ] `reorderStep(stepId, direction)` — deplace une etape (haut/bas)
- [ ] `addOwner(name)` — ajoute un nouvel owner
- [ ] `duplicateProcess(processId, newDateCible)` — duplique avec remise a zero
- [ ] `loadAllData()` — charge tous les process, steps et owners depuis Supabase
- [ ] Etat applicatif en memoire (currentProcesses, currentOwners)

### Ce qui n'est PAS attendu (hors scope)
- Rendu UI (pas de manipulation DOM)
- Export/import JSON (TASK-0011)
- Templates pre-remplis (TASK-0008 a TASK-0010)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Date cible | Obligatoire meme pour process vide |
| Changement date | Recalcul automatique de toutes les dates des etapes |
| Statut termine | Automatique quand progression = 100% |
| Duplication | Remise a zero progression, decochage, nouvelle date cible |
| Ajout owner | Couleur attribuee automatiquement depuis la palette |
| Reordonnement | Mettre a jour step_order pour l'etape deplacee et celle echangee |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Fonctions nommees, pas de classes | Ecrire des fonctions async |

### Code existant pertinent

```javascript
// Section Domain (TASK-0003) — fonctions pures disponibles
function calculateAbsoluteDate(dateCible, timing) { /* ... */ }
function calculateProgress(steps) { /* ... */ }
function instantiateTemplate(template, dateCible) { /* ... */ }
function duplicateProcess(process, steps, newDateCible) { /* ... */ }

// Section Infrastructure (TASK-0002) — operations CRUD
const db = {
  processes: { getAll, create, update },
  steps: { bulkCreate, update, delete },
  owners: { getAll, create },
  auth: { signIn, signOut, getSession }
};
```

### Packages npm requis

Aucun nouveau package requis.

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0002 (infrastructure Supabase) | pending |
| Task prerequise | TASK-0003 (fonctions Domain) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Application du script

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| `index.html` (section Application) | Application | Use Cases | Orchestration Domain + Infrastructure |

---

## Plan d'implementation

1. **Etat applicatif** : Variables globales pour stocker les donnees en memoire
   - `let appState = { processes: [], owners: [], currentProcessId: null }`

2. **loadAllData** : Charger tous les process (avec steps) et owners depuis Supabase
   - Appeler `db.processes.getAll()` et `db.owners.getAll()`
   - Stocker dans `appState`

3. **createProcess** : Creer un process vide ou depuis template
   - Si templateId, appeler `instantiateTemplate()` (Domain)
   - Persister via `db.processes.create()` + `db.steps.bulkCreate()`

4. **updateProcessDate** : Changer la date cible
   - Persister via `db.processes.update()`
   - Les dates absolues des etapes sont recalculees a l'affichage (pas de stockage)

5. **toggleStep** : Cocher/decocher
   - Persister via `db.steps.update()`
   - Verifier si le process est 100% termine, mettre a jour le statut

6. **updateStep, addStep, removeStep, reorderStep** : CRUD etapes
   - Persister via `db.steps`
   - Mettre a jour `appState`

7. **addOwner** : Ajouter un owner avec couleur auto
   - Palette : `['#B55B50','#033231','#D4956A','#5B8C85','#7B68AE','#C4A35A','#E8A87C','#85CDCA']`
   - Couleur = palette[index % palette.length]
   - Persister via `db.owners.create()`

8. **duplicateProcess** : Dupliquer avec remise a zero
   - Appeler `duplicateProcess()` (Domain)
   - Persister le nouveau process et ses etapes

---

## Definition of Done

- [ ] Toutes les 10 fonctions sont implementees
- [ ] Les fonctions appellent les fonctions Domain pour la logique metier
- [ ] Les fonctions appellent `db.*` pour la persistance
- [ ] L'etat applicatif (`appState`) est mis a jour apres chaque operation
- [ ] Le statut "termine" est automatiquement mis a jour quand progression = 100%
- [ ] `loadAllData()` charge et stocke toutes les donnees

---

## Tests attendus

### Tests manuels (console navigateur)
- [ ] Test: `await loadAllData()` — appState.processes et appState.owners sont remplis
- [ ] Test: `await createProcess(null, 'Test', '2026-06-15')` — cree un process vide
- [ ] Test: `await addOwner('Nouveau')` — ajoute un owner avec couleur
- [ ] Test: `await toggleStep(stepId)` — le done bascule en Supabase

### Cas limites a couvrir
- [ ] createProcess sans templateId — cree un process vide sans etapes
- [ ] removeStep sur la derniere etape — process vide, progression 0%
- [ ] addOwner avec nom existant — erreur Supabase (UNIQUE constraint)

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| 10 fonctions presentes | Oui | Oui |
| Utilisation fonctions Domain | au moins 3 appels | Oui |
| Utilisation db.* | au moins 5 appels | Oui |
| appState defini | Oui | Oui |

---

## Notes d'implementation

### Patterns a suivre
- Toutes les fonctions sont `async` (appels Supabase)
- Try/catch autour de chaque appel Supabase
- Retourner les donnees mises a jour apres chaque operation
- Mettre a jour appState apres chaque mutation

### A eviter
- Ne pas manipuler le DOM dans la couche Application
- Ne pas dupliquer la logique metier (utiliser les fonctions Domain)
- Ne pas gerer l'affichage d'erreurs (c'est le role de la couche UI)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
