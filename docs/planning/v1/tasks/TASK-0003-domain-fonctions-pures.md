# TASK-0003 — Couche Domain — fonctions pures

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0003 |
| **US Parent** | US-0003 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer toutes les fonctions pures de la couche Domain dans le fichier index.html. Ces fonctions n'ont aucune dependance externe (pas de Supabase, pas de DOM).

### Ce qui est attendu
- [ ] `calculateAbsoluteDate(dateCible, timing)` — retourne Date
- [ ] `calculateProgress(steps)` — retourne {done, total, percent}
- [ ] `getStepStatus(step, dateCible)` — retourne 'done' | 'overdue' | 'upcoming'
- [ ] `filterTasksByOwner(processes, ownerName)` — retourne Step[]
- [ ] `sortStepsByDate(steps, dateCible)` — retourne Step[] triees
- [ ] `buildGanttData(processes, owners)` — retourne donnees Gantt
- [ ] `instantiateTemplate(template, dateCible)` — retourne {process, steps}
- [ ] `duplicateProcess(process, steps, newDateCible)` — retourne {process, steps}
- [ ] Aucune fonction n'appelle Supabase ni ne manipule le DOM

### Ce qui n'est PAS attendu (hors scope)
- Appels Supabase (Infrastructure)
- Manipulation DOM (UI)
- Templates pre-remplis (TASK-0008 a TASK-0010)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Retro-planning | dateAbsolue = dateCible + timing (jours calendaires, pas d'ouvres) |
| Indicateurs | Vert = done, Rouge = date passee + non done, Gris = date future + non done |
| Filtrage owner | Etapes ou l'owner est R (raci_r) ou A (raci_a) |
| Progression | percent = Math.round(done / total * 100), 0 si total = 0 |
| Duplication | Remise a zero (done=false pour toutes les etapes), nouveau UUID, nouvelle date cible |
| Timing | Entier relatif : negatif = avant Jour J, 0 = Jour J, positif = apres |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Fonctions nommees, pas de classes, pas de modules ES | Ecrire des fonctions simples |

### Code existant pertinent

```html
<!-- Section Domain dans index.html (TASK-0001) -->
// === SECTION: DOMAIN ===
// (vide, a remplir)
```

### Packages npm requis

Aucun nouveau package requis.

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0001 (setup projet) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Domain du script

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| `index.html` (section Domain) | Domain | Fonctions pures | Logique metier sans effets de bord |

---

## Plan d'implementation

1. **calculateAbsoluteDate** : Ajouter `timing` jours a `dateCible`
   - Input: `dateCible` (string ISO ou Date), `timing` (integer)
   - Output: Date

2. **calculateProgress** : Compter les steps done vs total
   - Input: `steps` (array avec `done` boolean)
   - Output: `{ done: number, total: number, percent: number }`

3. **getStepStatus** : Determiner le statut visuel
   - Input: `step` (avec `done`, `timing`), `dateCible` (Date)
   - Output: `'done'` | `'overdue'` | `'upcoming'`
   - Logique: si done → 'done', sinon si date passee → 'overdue', sinon → 'upcoming'

4. **filterTasksByOwner** : Filtrer les etapes par owner R ou A
   - Input: `processes` (array), `ownerName` (string)
   - Output: array de {step, process} ou l'owner est raci_r ou raci_a

5. **sortStepsByDate** : Trier par date absolue
   - Input: `steps` (array), `dateCible` (Date)
   - Output: array triee par date absolue ascendante

6. **buildGanttData** : Construire les donnees pour le Gantt
   - Input: `processes` (array), `owners` (array)
   - Output: structure avec lignes par process, dots/barres par etape

7. **instantiateTemplate** : Creer un process depuis un template
   - Input: `template` (objet avec steps), `dateCible` (Date), `name` (string)
   - Output: `{ process, steps }` avec nouveaux UUIDs

8. **duplicateProcess** : Dupliquer avec remise a zero
   - Input: `process`, `steps`, `newDateCible` (Date)
   - Output: `{ process, steps }` avec done=false, nouveaux UUIDs

---

## Definition of Done

- [ ] Toutes les 8 fonctions sont implementees
- [ ] Aucune fonction ne reference `supabase`, `document`, `window` ou `DOM`
- [ ] calculateAbsoluteDate fonctionne avec des timings negatifs, zero et positifs
- [ ] calculateProgress retourne 0% pour un process sans etapes
- [ ] getStepStatus retourne 'overdue' pour une etape passee non cochee
- [ ] filterTasksByOwner filtre par raci_r ET raci_a
- [ ] Les fonctions utilisent des UUIDs generes via `crypto.randomUUID()`

---

## Tests attendus

### Tests manuels (console navigateur)
- [ ] Test: `calculateAbsoluteDate('2026-12-15', -90)` retourne le 16 septembre 2026
- [ ] Test: `calculateProgress([{done:true},{done:false},{done:true}])` retourne {done:2, total:3, percent:67}
- [ ] Test: `getStepStatus({done:false, timing:-1}, '2026-03-18')` retourne 'overdue'
- [ ] Test: `getStepStatus({done:true, timing:-1}, '2026-03-18')` retourne 'done'
- [ ] Test: `getStepStatus({done:false, timing:30}, '2026-03-18')` retourne 'upcoming'

### Cas limites a couvrir
- [ ] Process sans etapes (progression 0/0 = 0%)
- [ ] Timing = 0 (Jour J)
- [ ] Timing positif (+7)
- [ ] Owner non trouve (retourne liste vide)

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| 8 fonctions presentes | Oui | Oui |
| Aucune reference Supabase | 0 occurrence | Oui |
| Aucune reference DOM | 0 occurrence document/window | Oui |

---

## Notes d'implementation

### Patterns a suivre
- Fonctions nommees avec `function` (pas de classes)
- Generer les UUIDs avec `crypto.randomUUID()`
- Utiliser `new Date(dateCible)` pour les calculs de dates
- Utiliser `Math.round()` pour les pourcentages

### A eviter
- Ne pas utiliser de librairies de dates (Moment, date-fns)
- Ne pas muter les objets en entree (retourner de nouveaux objets)
- Ne pas appeler Supabase ni manipuler le DOM

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
