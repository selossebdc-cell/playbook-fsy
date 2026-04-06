# US-0007 — Vue Timeline/Gantt multi-process

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0007 |
| **EPIC** | EPIC-004 |
| **Priorite** | P2 |
| **Estimation** | L |
| **Statut** | draft |

---

## User Story

**En tant que** Aurelia,
**je veux** une vue Timeline/Gantt affichant tous mes process sur un axe temporel avec des barres colorees par owner,
**afin de** anticiper les periodes de charge et piloter la croissance.

---

## Contexte / Valeur

La vue Gantt offre une vision strategique long terme (jusqu'a 9 mois). Elle affiche chaque process comme un ensemble de barres colorees (par owner R) sur un axe temporel, avec des marqueurs Jour J et un marqueur "Aujourd'hui".

---

## Criteres d'acceptation

- [ ] La vue affiche tous les process actifs sur un axe temporel horizontal
- [ ] Chaque etape est representee par un dot ou une barre coloree selon l'owner R
- [ ] Un marqueur Jour J est visible par process
- [ ] Un marqueur "Aujourd'hui" est visible
- [ ] Le scroll horizontal fonctionne sur desktop et mobile
- [ ] Une legende dynamique affiche les owners et leurs couleurs
- [ ] Les process termines sont inclus (avec opacite reduite)

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Couleur des barres = couleur de l'owner R de chaque etape |
| RG-02 | Palette de 6-8 couleurs max |
| RG-03 | Legende dynamique (n'affiche que les owners presents) |
| RG-04 | Pas de drag & drop |
| RG-05 | Scroll horizontal pour les periodes longues |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Aucun process | Message "Aucun process a afficher" |
| Process avec 1 seule etape | Un seul dot |
| Etapes a J+375 | Le Gantt s'etend suffisamment |
| Beaucoup d'owners (>8) | Couleurs recyclees, legende adaptee |

---

## Dependances

### US prerequises
- US-0003 : Fonctions Domain (buildGanttData)
- US-0005 : Owners avec couleurs

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0007 | Domain — buildGanttData + UI Vue Gantt | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-004](../epics.md#epic-004)
- **Spec** : domain.md (GanttDataBuilder), system.md (Vue Timeline/Gantt)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
