# US-0009 — Export et import JSON

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0009 |
| **EPIC** | EPIC-006 |
| **Priorite** | P2 |
| **Estimation** | S |
| **Statut** | draft |

---

## User Story

**En tant que** Catherine,
**je veux** exporter toutes les donnees du playbook en JSON et pouvoir les reimporter,
**afin de** disposer d'un backup en cas de probleme avec Supabase.

---

## Contexte / Valeur

L'export/import JSON est un filet de securite complementaire a Supabase. L'export telecharge un fichier JSON contenant tous les process, etapes et owners. L'import permet de restaurer depuis ce fichier.

---

## Criteres d'acceptation

- [ ] Un bouton "Exporter" telecharge un fichier JSON
- [ ] Le fichier contient tous les process, etapes et owners
- [ ] Le format JSON est conforme a la spec (version, exportedAt, processes, owners)
- [ ] Un bouton "Importer" permet de charger un fichier JSON
- [ ] L'import restaure les donnees en Supabase (upsert)
- [ ] L'import invalide affiche un message d'erreur en francais

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Format JSON avec version, exportedAt, processes (avec steps imbriques), owners |
| RG-02 | Import = bulk upsert dans Supabase |
| RG-03 | Validation du schema avant import |
| RG-04 | Messages d'erreur en francais |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Fichier non-JSON | Message "Le fichier importe n'est pas un JSON valide" |
| JSON schema incorrect | Message "Le fichier importe n'est pas compatible" |
| Aucune donnee a exporter | Export un JSON vide valide |

---

## Dependances

### US prerequises
- US-0002 : Auth Supabase (pour acceder aux donnees)
- US-0004 : CRUD process (donnees existantes)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0011 | Export/Import JSON | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-006](../epics.md#epic-006)
- **Spec** : api.md (Format d'export)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
