# TASK-0010 — Templates T9-T10 + UI selection

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0010 |
| **US Parent** | US-0008 |
| **EPIC** | EPIC-005 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Creer les templates T9 et T10 (cycles continus), et implementer l'UI de selection de template lors de la creation d'un process.

### Ce qui est attendu
- [ ] Template T9 "Animer et retenir les abonnees Studio B2C" (17 etapes, cycle mensuel, CycleContinu)
- [ ] Template T10 "Animer la communaute certifiees MTM" (16 etapes, cycle trimestriel, CycleContinu)
- [ ] UI de selection de template dans le modal de creation de process
- [ ] Affichage : nom du template, categorie, nombre d'etapes
- [ ] Option "Process vide" toujours disponible
- [ ] Integration avec la fonction `createProcess` (TASK-0004)

### Ce qui n'est PAS attendu (hors scope)
- Templates T1-T8 (TASK-0008 et TASK-0009)
- Modification des templates par l'utilisateur

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| T9 | Cycle mensuel — etapes avec recurrence "mensuel" |
| T10 | Cycle trimestriel — etapes avec recurrence "trimestriel" |
| Process vide | Toujours disponible en alternative aux templates |
| Date cible | Obligatoire meme avec un template |

### Code existant pertinent

```javascript
// TEMPLATES (TASK-0008 + TASK-0009) — T1 a T8 deja definis
const TEMPLATES = { T1: {...}, T2: {...}, ..., T8: {...} };

// Modal creation (TASK-0005) — a enrichir avec le selecteur de template
function renderNewProcessModal() { /* ... */ }

// Application (TASK-0004)
async function createProcess(templateId, name, dateCible) { /* ... */ }
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0008 (templates T1-T4) | pending |
| Task prerequise | TASK-0009 (templates T5a-T8) | pending |
| Task prerequise | TASK-0005 (UI modal creation) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Domain (templates T9, T10) + section UI (selecteur template)

---

## Plan d'implementation

1. **T9** : 17 etapes, sections CONTENU / ANIMATION / SUIVI MENSUEL, champ recurrence="mensuel"
2. **T10** : 16 etapes, sections CONTENU / EVENEMENT / SUIVI TRIMESTRIEL, champ recurrence="trimestriel"
3. **UI selecteur** : Liste de cards ou radio buttons dans le modal de creation
4. **Integration** : Passer le templateId selectionne a `createProcess()`

---

## Definition of Done

- [ ] T9 et T10 ajoutes a TEMPLATES
- [ ] T9 : 17 etapes, cycle mensuel
- [ ] T10 : 16 etapes, cycle trimestriel
- [ ] Le modal de creation affiche la liste des 11 templates + "Process vide"
- [ ] La selection d'un template cree un process avec toutes ses etapes
- [ ] La selection "Process vide" cree un process sans etapes

---

## Tests attendus

### Tests manuels
- [ ] Test: `TEMPLATES.T9.steps.length === 17`
- [ ] Test: `TEMPLATES.T10.steps.length === 16`
- [ ] Test: Creer un process depuis T1 — 30 etapes creees
- [ ] Test: Creer un process vide — 0 etapes
- [ ] Test: Le selecteur affiche 11 templates + 1 option vide

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
