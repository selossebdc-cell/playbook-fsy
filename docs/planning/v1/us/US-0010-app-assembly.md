# US-0010 — Assemblage final de l'application

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0010 |
| **EPIC** | EPIC-007 |
| **Priorite** | P1 |
| **Estimation** | M |
| **Statut** | draft |

---

## User Story

**En tant que** Catherine,
**je veux** un fichier index.html unique et fonctionnel contenant toutes les couches assemblees,
**afin de** deployer l'application sur GitHub Pages et la livrer a FSY.

---

## Contexte / Valeur

L'assemblage final integre toutes les couches (Domain, Application, Infrastructure, UI) dans un seul fichier index.html. C'est la derniere etape avant le deploiement.

---

## Criteres d'acceptation

- [ ] Le fichier index.html contient toutes les couches assemblees
- [ ] Les 3 vues sont accessibles et fonctionnelles (Playbook, Mes Taches, Timeline)
- [ ] L'authentification fonctionne
- [ ] Les operations CRUD fonctionnent avec Supabase
- [ ] Les 11 templates sont disponibles
- [ ] L'export/import JSON fonctionne
- [ ] Le responsive fonctionne (desktop + mobile)
- [ ] CSS @media print est fonctionnel
- [ ] Aucune erreur dans la console du navigateur

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Fichier HTML unique, zero dependance npm |
| RG-02 | 4 sections commentees : Domain, Application, Infrastructure, UI |
| RG-03 | Regles de dependance inter-couches respectees |

---

## Dependances

### US prerequises
- US-0001 a US-0009 : Toutes les US precedentes

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0012 | App Assembly (integration finale) | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-007](../epics.md#epic-007)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
