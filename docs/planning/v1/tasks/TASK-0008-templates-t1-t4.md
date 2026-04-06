# TASK-0008 — Templates T1-T4 (donnees JS)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0008 |
| **US Parent** | US-0008 |
| **EPIC** | EPIC-005 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Creer les objets JavaScript pour les templates T1 a T4 avec toutes leurs etapes, timings, sections et RACI par defaut. Les templates sont figes dans le code (constantes JS).

### Ce qui est attendu
- [ ] Template T1 "Creer un espace Circle" (30 etapes, J-21 a Jour J, Projet)
- [ ] Template T2 "Migrer un contenu existant vers Circle" (35 etapes, J-90 a J+30, Projet)
- [ ] Template T3 "Lancer une formation en ligne" (42 etapes, J-120 a J+120, Lancement)
- [ ] Template T4 "Lancer un challenge recrutement" (29 etapes, J-60 a J+15, Lancement)
- [ ] Chaque etape : title, description (optionnel), section, timing, raci (R, A, C?, I?)
- [ ] RACI global respecte : Aurelia=A, Laurie=R, Catherine=R (auto), VA=R, Externe=C/R, Automatique=R
- [ ] Terme "automatisation" utilise (jamais "n8n")

### Ce qui n'est PAS attendu (hors scope)
- Templates T5a a T10 (TASK-0009 et TASK-0010)
- UI de selection de template (TASK-0010)
- Le contenu exact des etapes n'est pas specifie dans les specs — creer des etapes realistes et coherentes avec le metier FSY

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Templates figes | Constantes JS, non modifiables par l'utilisateur |
| RACI global | Aurelia=A strategique, Laurie=R operationnel, Catherine=R auto, VA=R technique, Externe=C/R contenu, Automatique=R (Laurie=A) |
| Terme | "automatisation" (jamais "n8n" ni outil specifique) |
| Sections | Regroupement logique (CONCEPTION, PRODUCTION, COMMUNICATION, etc.) |
| Timing | Entier relatif (negatif avant Jour J, 0 = Jour J, positif apres) |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Constantes JS en haut du script | Templates declares comme constantes |

### Code existant pertinent

Aucun template existant. Structure attendue :

```javascript
const TEMPLATES = {
  T1: {
    id: 'T1',
    name: 'Creer un espace Circle',
    category: 'Projet',
    description: 'Template pour creer un nouvel espace dans Circle',
    steps: [
      { title: '...', desc: '...', section: 'CONCEPTION', timing: -21, raci: { r: 'Laurie', a: 'Aurelia', c: null, i: null } },
      // ...
    ]
  },
  // T2, T3, T4...
};
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0001 (setup projet) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — debut de la section Domain (constantes templates)

---

## Plan d'implementation

1. **T1 - Creer un espace Circle** : 30 etapes, sections CONCEPTION / CONFIGURATION / CONTENU / TESTS / LANCEMENT
2. **T2 - Migrer un contenu existant** : 35 etapes, sections AUDIT / PREPARATION / MIGRATION / VERIFICATION / POST-MIGRATION
3. **T3 - Lancer une formation en ligne** : 42 etapes, sections CONCEPTION / PRODUCTION / COMMUNICATION / PRE-LANCEMENT / LANCEMENT / POST-LANCEMENT
4. **T4 - Lancer un challenge recrutement** : 29 etapes, sections CONCEPTION / PREPARATION / COMMUNICATION / LANCEMENT / SUIVI

---

## Definition of Done

- [ ] 4 templates definis en constantes JS
- [ ] T1 : 30 etapes avec timings J-21 a Jour J
- [ ] T2 : 35 etapes avec timings J-90 a J+30
- [ ] T3 : 42 etapes avec timings J-120 a J+120
- [ ] T4 : 29 etapes avec timings J-60 a J+15
- [ ] Toutes les etapes ont title, timing, raci (R+A obligatoires)
- [ ] Le terme "automatisation" est utilise (pas "n8n")
- [ ] Les sections sont coherentes avec le contexte FSY

---

## Tests attendus

### Tests manuels
- [ ] Test: `TEMPLATES.T1.steps.length === 30`
- [ ] Test: `TEMPLATES.T2.steps.length === 35`
- [ ] Test: `TEMPLATES.T3.steps.length === 42`
- [ ] Test: `TEMPLATES.T4.steps.length === 29`
- [ ] Test: Toutes les etapes ont raci.r et raci.a non-null

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
