# US-0006 — Vue Mes Taches filtree par owner

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0006 |
| **EPIC** | EPIC-003 |
| **Priorite** | P2 |
| **Estimation** | M |
| **Statut** | draft |

---

## User Story

**En tant que** Laurie ou Aurelia,
**je veux** voir toutes mes taches (ou je suis R ou A) aggregees depuis tous les process actifs, triees par date,
**afin de** savoir ce que je dois faire sans naviguer dans chaque process.

---

## Contexte / Valeur

La vue Mes Taches permet un pilotage quotidien efficace. Elle agrege les etapes de tous les process actifs, filtre par owner selectionne (R ou A), trie par date absolue, et affiche les indicateurs visuels.

---

## Criteres d'acceptation

- [ ] La vue affiche toutes les etapes de tous les process actifs
- [ ] Un dropdown ou des boutons permettent de filtrer par owner
- [ ] Le filtre par defaut est l'utilisateur connecte (si possible) ou "Tous"
- [ ] Les etapes sont triees par date absolue (les plus proches en premier)
- [ ] Chaque etape affiche : titre, nom du process parent, date absolue, indicateur couleur
- [ ] On peut cocher/decocher une etape depuis cette vue
- [ ] Les indicateurs visuels sont coherents (vert/rouge/gris)

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Filtrage par owner = etapes ou l'owner est R ou A |
| RG-02 | Process termines exclus de l'aggregation |
| RG-03 | Tri par date absolue ascendant (echeances les plus proches d'abord) |
| RG-04 | Indicateurs visuels identiques a la vue Playbook |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Aucune tache pour l'owner | Message "Aucune tache assignee" |
| Aucun process actif | Message "Aucun process actif" |
| Owner avec 100+ taches | Affichage liste scrollable |

---

## Dependances

### US prerequises
- US-0003 : Fonctions Domain (filterTasksByOwner, sortStepsByDate)
- US-0004 : CRUD process/etapes (donnees existantes)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0006 | Couche UI — Vue Mes Taches | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-003](../epics.md#epic-003)
- **Spec** : domain.md (TaskAggregator), system.md (Vue Mes Taches)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
