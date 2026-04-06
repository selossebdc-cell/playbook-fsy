# TASK-0005 — Couche UI — Vue Playbook (liste process + detail etapes)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0005 |
| **US Parent** | US-0004 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer la vue Playbook dans la couche UI du fichier index.html. Cette vue comprend la liste des process avec progression, le detail des etapes d'un process selectionne, et tous les formulaires d'edition.

### Ce qui est attendu
- [ ] Liste des process (nom, date cible, barre de progression, badge statut)
- [ ] Bouton "Nouveau process" avec dialog/modal (nom, date cible, selection template)
- [ ] Detail des etapes d'un process selectionne
- [ ] Checkboxes pour cocher/decocher les etapes
- [ ] Indicateurs visuels couleur (vert/rouge/gris) par etape
- [ ] Edition inline ou modal des etapes (titre, description, timing, RACI)
- [ ] Boutons ajout/suppression/reordonnement (fleches haut/bas) des etapes
- [ ] Formulaire changement de date cible avec confirmation
- [ ] Bouton dupliquer un process
- [ ] Dropdowns RACI (R, A, C, I) avec liste des owners
- [ ] Pastilles colorees des owners (initiales)
- [ ] Sections d'etapes (en-tetes de regroupement)
- [ ] Affichage date absolue calculee par etape

### Ce qui n'est PAS attendu (hors scope)
- Vue Mes Taches (TASK-0006)
- Vue Gantt (TASK-0007)
- Export/Import (TASK-0011)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Date cible | Obligatoire a la creation |
| Changement date | Confirmation obligatoire avant recalcul |
| Progression | Barre visuelle + pourcentage |
| Termine | Badge "Termine" quand 100% |
| Indicateurs | Vert (done), rouge (retard = date passee + non done), gris (futur) |
| Reordonnement | Fleches haut/bas (pas de drag & drop) |
| RACI | R et A obligatoires, C et I optionnels |
| Owners | Pastilles avec initiales colorees |
| Sections | En-tetes de regroupement logique |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Fichier HTML unique, JS inline | Pas de composants, fonctions nommees |

### Code existant pertinent

```javascript
// Section Application (TASK-0004) — use cases disponibles
async function createProcess(templateId, name, dateCible) { /* ... */ }
async function toggleStep(stepId) { /* ... */ }
async function updateStep(stepId, fields) { /* ... */ }
async function addStep(processId, step) { /* ... */ }
async function removeStep(stepId) { /* ... */ }
async function reorderStep(stepId, direction) { /* ... */ }
async function updateProcessDate(processId, newDate) { /* ... */ }
async function duplicateProcess(processId, newDateCible) { /* ... */ }
async function addOwner(name) { /* ... */ }

// Section Domain (TASK-0003) — fonctions pures
function calculateAbsoluteDate(dateCible, timing) { /* ... */ }
function calculateProgress(steps) { /* ... */ }
function getStepStatus(step, dateCible) { /* ... */ }

// Etat applicatif
let appState = { processes: [], owners: [], currentProcessId: null };
```

### Packages npm requis

Aucun nouveau package requis.

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0003 (Domain) | pending |
| Task prerequise | TASK-0004 (Application) | pending |
| Task prerequise | TASK-0001 (setup, navigation) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Playbook du body (HTML) + section UI du script (JS)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| `index.html` (body, section Playbook) | UI | HTML structure | Markup des elements visuels |
| `index.html` (section UI du script) | UI | Rendu + events | Fonctions de rendu et event listeners |

---

## Plan d'implementation

1. **HTML structure Playbook** : Creer les conteneurs pour la liste et le detail
   - Fichier: `index.html` (body, dans la section Playbook)
   - Conteneurs : `#process-list`, `#process-detail`, `#new-process-modal`

2. **Fonction renderProcessList** : Afficher la liste des process
   - Generer le HTML pour chaque process (nom, date, barre progression, badge)
   - Ajouter un event listener click pour selectionner un process
   - Bouton "Nouveau process" en haut

3. **Fonction renderProcessDetail** : Afficher les etapes du process selectionne
   - Generer le HTML pour chaque etape (checkbox, titre, date, RACI, indicateur)
   - Regrouper par section (en-tetes)
   - Boutons edit, delete, fleches haut/bas par etape
   - Bouton "Ajouter une etape" en bas

4. **Fonction renderNewProcessModal** : Modal de creation de process
   - Champs : nom, date cible, selection template (dropdown)
   - Bouton "Creer"

5. **Event handlers** : Connecter les interactions UI aux use cases Application
   - Click checkbox → toggleStep
   - Click edit → ouvrir edition inline
   - Click delete → removeStep (avec confirm)
   - Click fleche → reorderStep
   - Click "Ajouter etape" → addStep
   - Click "Dupliquer" → duplicateProcess
   - Click "Changer date" → updateProcessDate (avec confirm)

6. **CSS pour la vue Playbook** : Styles inline pour les composants
   - Barres de progression, pastilles owners, indicateurs couleur
   - Responsive (cards sur mobile, liste sur desktop)

---

## Definition of Done

- [ ] La liste des process s'affiche avec progression
- [ ] On peut creer un process vide
- [ ] On peut selectionner un process et voir ses etapes
- [ ] On peut cocher/decocher les etapes
- [ ] Les indicateurs visuels (vert/rouge/gris) sont corrects
- [ ] On peut editer une etape (titre, timing, RACI)
- [ ] On peut ajouter et supprimer des etapes
- [ ] On peut reordonner les etapes (fleches)
- [ ] On peut changer la date cible (avec confirmation)
- [ ] On peut dupliquer un process
- [ ] Les owners sont affiches en pastilles colorees
- [ ] Les sections d'etapes sont visibles
- [ ] Responsive (mobile + desktop)

---

## Tests attendus

### Tests manuels
- [ ] Test: Creer un process vide — il apparait dans la liste
- [ ] Test: Cliquer sur un process — les etapes s'affichent
- [ ] Test: Cocher une etape — l'indicateur passe au vert, la progression augmente
- [ ] Test: Decocher — l'indicateur revient a gris ou rouge
- [ ] Test: Editer le titre d'une etape — le changement persiste apres refresh
- [ ] Test: Supprimer une etape — elle disparait
- [ ] Test: Fleche haut/bas — l'etape change de position
- [ ] Test: Dupliquer — nouveau process avec progression 0%
- [ ] Test: Changer date cible — confirmation demandee, dates recalculees

### Cas limites a couvrir
- [ ] Process sans etapes — message "Aucune etape"
- [ ] Derniere etape cochee — badge "Termine" apparait
- [ ] Reordonner la premiere etape vers le haut — rien ne se passe

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| Elements HTML process-list | present | Oui |
| Elements HTML process-detail | present | Oui |
| Fonction renderProcessList | presente | Oui |
| Fonction renderProcessDetail | presente | Oui |
| Indicateurs couleur | 3 classes CSS (done/overdue/upcoming) | Oui |

---

## Notes d'implementation

### Attention
- Toujours re-render apres une mutation (toggleStep, updateStep, etc.)
- Utiliser `innerHTML` pour le rendu (pas de virtual DOM)
- Echapper les entrees utilisateur (XSS) dans les titres et descriptions

### Patterns a suivre
- Fonctions de rendu nommees `render[Composant]()`
- Deleguer les events via event delegation sur les conteneurs parents
- Utiliser des data-attributes (`data-step-id`, `data-process-id`) pour identifier les elements

### A eviter
- Ne pas creer de composants web (pas de custom elements)
- Ne pas utiliser de framework de templating
- Ne pas manipuler les donnees directement (utiliser les fonctions Application)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
