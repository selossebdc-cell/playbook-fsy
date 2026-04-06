# TASK-0009 — Templates T5a-T8 (donnees JS)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0009 |
| **US Parent** | US-0008 |
| **EPIC** | EPIC-005 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Creer les objets JavaScript pour les templates T5a, T5b, T6, T7 et T8.

### Ce qui est attendu
- [ ] Template T5a "Onboarder un nouveau membre Studio B2C" (18 etapes, Jour J a J+30, Cycle)
- [ ] Template T5b "Onboarder une certifiee MTM B2B" (30 etapes, Jour J a J+120, Cycle)
- [ ] Template T6 "Plan de communication lancement" (33 etapes, J-30 a Jour J, Transverse)
- [ ] Template T7 "Lancer une retraite" (50 etapes, J-270 a J+30, Lancement)
- [ ] Template T8 "Gerer une licence annuelle" (28 etapes, J a J+375, Cycle)
- [ ] Memes conventions que TASK-0008 (structure, RACI, terme "automatisation")

### Ce qui n'est PAS attendu (hors scope)
- Templates T1-T4 (TASK-0008)
- Templates T9-T10 (TASK-0010)
- UI de selection

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| RACI global | Aurelia=A, Laurie=R, Catherine=R (auto), VA=R, Externe=C/R, Automatique=R |
| T6 transverse | Declenche manuellement, lie aux lancements (T3, T4, T7) |
| T7 retraite | Template le plus long (50 etapes, J-270 a J+30 = ~9 mois) |
| T8 licence | Cycle annuel, J a J+375 |

### Code existant pertinent

```javascript
// Structure identique a TASK-0008
const TEMPLATES = {
  T1: { /* ... */ },
  T2: { /* ... */ },
  T3: { /* ... */ },
  T4: { /* ... */ },
  // Ajouter ici :
  T5a: { id: 'T5a', name: 'Onboarder un nouveau membre Studio B2C', category: 'Cycle', steps: [...] },
  T5b: { /* ... */ },
  T6: { /* ... */ },
  T7: { /* ... */ },
  T8: { /* ... */ },
};
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0008 (templates T1-T4, meme objet TEMPLATES) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — section Domain, ajout dans l'objet TEMPLATES

---

## Plan d'implementation

1. **T5a - Onboarder Studio B2C** : 18 etapes, sections ACCUEIL / CONFIGURATION / SUIVI
2. **T5b - Onboarder MTM B2B** : 30 etapes, sections ACCUEIL / FORMATION / CERTIFICATION / SUIVI
3. **T6 - Plan comm lancement** : 33 etapes, sections STRATEGIE / CONTENU / DIFFUSION / JOUR J
4. **T7 - Lancer une retraite** : 50 etapes, sections CONCEPTION / LOGISTIQUE / COMMUNICATION / PRE-RETRAITE / RETRAITE / POST-RETRAITE
5. **T8 - Licence annuelle** : 28 etapes, sections SIGNATURE / INTEGRATION / SUIVI TRIMESTRIEL / RENOUVELLEMENT

---

## Definition of Done

- [ ] 5 templates ajoutes a l'objet TEMPLATES
- [ ] T5a : 18 etapes, Jour J a J+30
- [ ] T5b : 30 etapes, Jour J a J+120
- [ ] T6 : 33 etapes, J-30 a Jour J
- [ ] T7 : 50 etapes, J-270 a J+30
- [ ] T8 : 28 etapes, J a J+375
- [ ] "automatisation" utilise (pas "n8n")

---

## Tests attendus

### Tests manuels
- [ ] Test: `TEMPLATES.T5a.steps.length === 18`
- [ ] Test: `TEMPLATES.T5b.steps.length === 30`
- [ ] Test: `TEMPLATES.T6.steps.length === 33`
- [ ] Test: `TEMPLATES.T7.steps.length === 50`
- [ ] Test: `TEMPLATES.T8.steps.length === 28`

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
