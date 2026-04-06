# TASK-0007 — Domain buildGanttData + UI Vue Gantt

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0007 |
| **US Parent** | US-0007 |
| **EPIC** | EPIC-004 |
| **Priorite** | P2 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer la vue Timeline/Gantt qui affiche tous les process actifs sur un axe temporel horizontal avec des barres/dots colorees par owner (R).

### Ce qui est attendu
- [ ] Axe temporel horizontal (mois/semaines)
- [ ] Une ligne par process
- [ ] Dots ou barres colorees par etape, couleur = owner R
- [ ] Marqueur Jour J par process
- [ ] Marqueur "Aujourd'hui" (ligne verticale rouge)
- [ ] Legende dynamique (owners presents uniquement)
- [ ] Scroll horizontal (desktop + mobile touch)
- [ ] Process termines avec opacite reduite

### Ce qui n'est PAS attendu (hors scope)
- Drag & drop
- Zoom dynamique
- Export image du Gantt

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Couleur barre | Couleur de l'owner R (raci_r) de chaque etape |
| Palette | 6-8 couleurs max, recyclees si >8 owners |
| Legende | Dynamique, n'affiche que les owners presents dans les process visibles |
| Scroll | Horizontal obligatoire pour periodes longues (jusqu'a 9 mois) |

### Code existant pertinent

```javascript
// Section Domain (TASK-0003)
function buildGanttData(processes, owners) { /* retourne structure Gantt */ }
function calculateAbsoluteDate(dateCible, timing) { /* retourne Date */ }

// Etat applicatif
let appState = { processes: [], owners: [] };

// Couleurs owners (table playbook_owners)
// Aurelia=#B55B50, Laurie=#033231, Catherine=#D4956A, VA=#5B8C85, Automatique=#7B68AE, Externe=#C4A35A
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0003 (Domain — buildGanttData) | pending |
| Task prerequise | TASK-0004 (Application — appState) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section "Timeline" du body (HTML) + section UI du script (JS) + CSS inline

---

## Plan d'implementation

1. **HTML structure** : Conteneur `#gantt-container` avec overflow-x scroll
2. **CSS Gantt** : Grille CSS pour l'axe temporel, barres, marqueurs
3. **renderGantt** : Calculer la plage temporelle, positionner les barres
4. **Marqueurs** : Jour J (triangle ou ligne par process), Aujourd'hui (ligne rouge)
5. **Legende** : Generer dynamiquement depuis les owners presents

---

## Definition of Done

- [ ] Le Gantt affiche les process actifs avec barres colorees
- [ ] Les marqueurs Jour J sont visibles
- [ ] Le marqueur "Aujourd'hui" est visible
- [ ] Le scroll horizontal fonctionne sur mobile et desktop
- [ ] La legende est dynamique
- [ ] Les process termines sont en opacite reduite

---

## Tests attendus

### Tests manuels
- [ ] Test: Creer 2 process avec dates differentes — les 2 s'affichent
- [ ] Test: Ajouter un owner — la legende se met a jour
- [ ] Test: Process termine — il s'affiche avec opacite reduite
- [ ] Test: Scroll sur mobile — le Gantt defiles horizontalement

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
