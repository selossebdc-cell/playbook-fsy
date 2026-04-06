# TASK-0006 — Couche UI — Vue Mes Taches

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0006 |
| **US Parent** | US-0006 |
| **EPIC** | EPIC-003 |
| **Priorite** | P2 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer la vue "Mes Taches" qui agrege les etapes de tous les process actifs, filtre par owner (R ou A), et trie par date absolue.

### Ce qui est attendu
- [ ] Vue avec liste des taches agregees de tous les process actifs
- [ ] Dropdown ou boutons filtre par owner
- [ ] Tri par date absolue (echeances proches en premier)
- [ ] Chaque tache affiche : titre, nom process parent, date absolue, indicateur couleur
- [ ] Checkbox pour cocher/decocher depuis cette vue
- [ ] Message "Aucune tache assignee" si aucun resultat
- [ ] Responsive (mobile + desktop)

### Ce qui n'est PAS attendu (hors scope)
- Navigation vers le process parent (detail)
- Modification de l'etape depuis cette vue (sauf cocher/decocher)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Filtrage | Owner est R (raci_r) ou A (raci_a) |
| Process exclus | Process au statut "termine" |
| Tri | Par date absolue ascendante (echeances proches d'abord) |
| Indicateurs | Identiques a la vue Playbook (vert/rouge/gris) |

### Code existant pertinent

```javascript
// Section Domain (TASK-0003)
function filterTasksByOwner(processes, ownerName) { /* retourne [{step, process}] */ }
function sortStepsByDate(steps, dateCible) { /* retourne steps triees */ }
function getStepStatus(step, dateCible) { /* retourne 'done'|'overdue'|'upcoming' */ }
function calculateAbsoluteDate(dateCible, timing) { /* retourne Date */ }

// Section Application (TASK-0004)
async function toggleStep(stepId) { /* coche/decoche */ }
let appState = { processes: [], owners: [] };
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0003 (Domain) | pending |
| Task prerequise | TASK-0004 (Application) | pending |
| Task prerequise | TASK-0005 (UI Playbook — pour coherence visuelle) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section "Mes Taches" du body (HTML) + section UI du script (JS)

---

## Plan d'implementation

1. **HTML structure** : Conteneurs `#tasks-filter` et `#tasks-list`
2. **Filtre owner** : Dropdown avec tous les owners depuis appState.owners
3. **renderTasksList** : Filtrer, trier et afficher les taches
4. **Event handlers** : Changement de filtre → re-render, checkbox → toggleStep

---

## Definition of Done

- [ ] La vue affiche les taches de tous les process actifs
- [ ] Le filtre par owner fonctionne
- [ ] Le tri par date fonctionne
- [ ] Les indicateurs visuels sont coherents
- [ ] On peut cocher/decocher depuis cette vue
- [ ] Message si aucune tache

---

## Tests attendus

### Tests manuels
- [ ] Test: Selectionner un owner — seules ses taches s'affichent
- [ ] Test: Selectionner "Tous" — toutes les taches s'affichent
- [ ] Test: Cocher une tache — elle passe en vert
- [ ] Test: Process termine — ses taches ne s'affichent pas

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
