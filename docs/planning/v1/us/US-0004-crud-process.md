# US-0004 — CRUD process et etapes (Application + UI)

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0004 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | XL |
| **Statut** | draft |

---

## User Story

**En tant que** Laurie ou Aurelia,
**je veux** creer, consulter, modifier et gerer des process avec leurs etapes dans la vue Playbook,
**afin de** structurer et suivre nos operations quotidiennes.

---

## Contexte / Valeur

La vue Playbook est l'ecran principal de l'application. Elle affiche la liste des process avec leur progression, permet de creer de nouveaux process, consulter et editer les etapes, cocher les etapes terminees, ajouter/supprimer/reordonner des etapes, changer la date cible et dupliquer un process.

---

## Criteres d'acceptation

- [ ] La liste des process affiche nom, date cible, barre de progression, statut
- [ ] Un bouton "Nouveau process" permet de creer un process (vide ou depuis template)
- [ ] La date cible est obligatoire lors de la creation
- [ ] Cliquer sur un process affiche ses etapes
- [ ] Les etapes affichent titre, timing, date absolue, RACI, indicateur couleur
- [ ] On peut cocher/decocher une etape
- [ ] On peut editer le titre, la description, le RACI et le timing d'une etape
- [ ] On peut ajouter une nouvelle etape
- [ ] On peut supprimer une etape
- [ ] On peut reordonner les etapes (fleches haut/bas)
- [ ] On peut changer la date cible (avec confirmation)
- [ ] On peut dupliquer un process (remise a zero, nouvelle date cible)
- [ ] Les process termines (100%) ont un badge "Termine"
- [ ] Toutes les operations sont persistees en Supabase

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Date cible obligatoire meme pour process vide |
| RG-02 | Changement date cible = confirmation + recalcul toutes les dates |
| RG-03 | Process termine = 100% etapes cochees, badge "Termine" |
| RG-04 | Duplication = remise a zero, decochage, nouvelle date cible |
| RG-05 | Indicateurs visuels : vert (done), rouge (retard), gris (futur) |
| RG-06 | Reordonnement par fleches haut/bas (pas de drag & drop) |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Process sans etapes | Progression 0%, pas de barre |
| Changement date cible annule | Pas de recalcul |
| Suppression derniere etape | Process vide, progression 0% |

---

## Strategie de tests

### Tests manuels
- Creer un process vide, verifier la liste
- Ajouter des etapes, les cocher, verifier la progression
- Changer la date cible, verifier le recalcul
- Dupliquer, verifier la remise a zero

---

## Dependances

### US prerequises
- US-0001 : Setup projet
- US-0002 : Auth Supabase
- US-0003 : Fonctions Domain

### Dependances techniques
- Tables Supabase (playbook_processes, playbook_steps)
- Fonctions Domain (retro-planning, progression, etc.)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0004 | Couche Application — orchestration process/etapes | 1-2h | pending |
| TASK-0005 | Couche UI — Vue Playbook (liste process + detail etapes) | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-002](../epics.md#epic-002)
- **Spec** : domain.md (Process, Step), api.md (CRUD Supabase)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
