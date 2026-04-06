# US-0003 — Fonctions Domain process et etapes

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0003 |
| **EPIC** | EPIC-002 |
| **Priorite** | P1 |
| **Estimation** | M |
| **Statut** | draft |

---

## User Story

**En tant que** developpeur,
**je veux** des fonctions Domain pures pour le calcul du retro-planning, la progression, les indicateurs visuels et le filtrage,
**afin de** avoir une logique metier fiable et testable separee de l'UI et de l'infrastructure.

---

## Contexte / Valeur

La couche Domain contient toutes les fonctions pures (sans effets de bord). Ces fonctions sont le coeur de la logique metier : calcul de dates absolues, progression, statut visuel des etapes, filtrage par owner, tri, instanciation de templates et duplication.

---

## Criteres d'acceptation

- [ ] calculateAbsoluteDate(dateCible, timing) retourne la bonne date
- [ ] calculateProgress(steps) retourne {done, total, percent}
- [ ] getStepStatus(step, dateCible) retourne 'done', 'overdue' ou 'upcoming'
- [ ] filterTasksByOwner(processes, ownerName) filtre correctement par R ou A
- [ ] sortStepsByDate(steps, dateCible) trie par date absolue
- [ ] instantiateTemplate(template, dateCible) cree un process complet
- [ ] duplicateProcess(process, steps, newDateCible) duplique avec remise a zero
- [ ] Aucune fonction Domain n'appelle Supabase ou ne manipule le DOM

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | dateAbsolue = dateCible + timing (jours calendaires) |
| RG-02 | Pas de jours ouvres, pas de feries |
| RG-03 | Vert = done, Rouge = date passee + non done, Gris = date future + non done |
| RG-04 | Filtrage par owner = etapes ou owner est R ou A |
| RG-05 | Duplication = remise a zero progression, decochage, nouvelle date cible |
| RG-06 | Timing positif (post-Jour J) autorise |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Process sans etapes | Progression = 0/0 = 0% |
| Timing = 0 (Jour J) | Date absolue = date cible |
| Timing positif (+7) | Date absolue = date cible + 7 jours |
| Toutes etapes done | Progression = 100%, statut "termine" |

---

## Strategie de tests

### Tests manuels
- Verifier calcul retro-planning avec dates connues
- Verifier indicateurs visuels sur etapes passees/futures/done

---

## Dependances

### US prerequises
- US-0001 : Setup projet (fichier HTML)

### Dependances techniques
- Aucune (fonctions pures)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0003 | Couche Domain — fonctions pures | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-002](../epics.md#epic-002)
- **ADR** : ADR-0001 — Stack technique
- **Spec** : domain.md (Domain Services, Regles metier transverses)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
