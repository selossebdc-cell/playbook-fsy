# US-0005 — Gestion des owners et RACI

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0005 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | S |
| **Statut** | draft |

---

## User Story

**En tant que** Laurie,
**je veux** gerer les owners (personnes responsables) et assigner les roles RACI sur chaque etape,
**afin de** savoir clairement qui est responsable de quoi.

---

## Contexte / Valeur

Les owners sont les personnes assignables dans les matrices RACI. 6 owners par defaut (Aurelia, Laurie, Catherine, VA, Automatique, Externe) + ajout libre. Chaque owner a une couleur pour le Gantt. Les RACI (R, A, C, I) sont editables par etape via dropdowns.

---

## Criteres d'acceptation

- [ ] Les 6 owners par defaut sont presents des le demarrage
- [ ] Chaque owner a une couleur attribuee (pastille coloree)
- [ ] On peut ajouter un nouvel owner via "+ Nouvelle personne"
- [ ] Les dropdowns RACI (R, A, C, I) sont disponibles sur chaque etape
- [ ] R et A sont obligatoires, C et I sont optionnels
- [ ] Les owners sont persistees en Supabase (table playbook_owners)
- [ ] Pas de suppression d'owner dans le MVP

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | 6 owners par defaut : Aurelia, Laurie, Catherine, VA, Automatique, Externe |
| RG-02 | Palette limitee a 6-8 couleurs |
| RG-03 | R et A obligatoires, C et I optionnels |
| RG-04 | Pas de suppression d'owner (MVP) |
| RG-05 | Owners affiches en pastilles avec initiales colorees |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Ajout owner avec nom vide | Empeche, message "Nom obligatoire" |
| Ajout owner avec nom existant | Empeche, message "Ce nom existe deja" |
| Plus de 8 owners | Couleurs recyclees (modulo palette) |

---

## Dependances

### US prerequises
- US-0001 : Setup projet
- US-0002 : Auth Supabase

### Dependances techniques
- Table playbook_owners
- Donnees initiales (INSERT des 6 owners)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0004 | Couche Application — orchestration process/etapes (inclut owners) | 1-2h | pending |
| TASK-0005 | Couche UI — Vue Playbook (inclut RACI dropdowns) | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-002](../epics.md#epic-002)
- **Spec** : domain.md (Owner, RACI), api.md (playbook_owners)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
