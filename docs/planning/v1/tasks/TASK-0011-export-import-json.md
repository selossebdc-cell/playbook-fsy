# TASK-0011 — Export/Import JSON

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0011 |
| **US Parent** | US-0009 |
| **EPIC** | EPIC-006 |
| **Priorite** | P2 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Implementer l'export et l'import JSON des donnees du playbook (process, etapes, owners) comme filet de securite complementaire a Supabase.

### Ce qui est attendu
- [ ] Fonction `exportData()` — telecharge un fichier JSON avec toutes les donnees
- [ ] Fonction `importData(jsonBlob)` — restaure les donnees depuis un fichier JSON
- [ ] Boutons "Exporter" et "Importer" dans l'UI (menu ou header)
- [ ] Validation du schema JSON avant import
- [ ] Messages d'erreur en francais

### Ce qui n'est PAS attendu (hors scope)
- Export/import selectif (tout ou rien)
- Sync temps reel

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Format | JSON avec version, exportedAt, processes (steps imbriques), owners |
| Import | Bulk upsert dans Supabase |
| Validation | Verifier version et structure avant import |
| Erreurs | "Le fichier importe n'est pas un JSON valide", "Le fichier importe n'est pas compatible" |

### Code existant pertinent

```javascript
// Format JSON attendu (api.md)
{
  "version": 1,
  "exportedAt": "2026-03-18T12:00:00Z",
  "processes": [{ id, name, date_cible, template_id, category, status, steps: [...] }],
  "owners": [{ id, name, color }]
}

// Infrastructure (TASK-0002)
const db = {
  processes: { getAll, create, update },
  steps: { bulkCreate, update, delete },
  owners: { getAll, create }
};
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0002 (Infrastructure Supabase) | pending |
| Task prerequise | TASK-0004 (Application) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` — sections Application (export/import) et UI (boutons + file input)

---

## Plan d'implementation

1. **exportData** : Charger toutes les donnees, construire le JSON, declencher le telechargement
2. **importData** : Lire le fichier, valider le schema, upsert dans Supabase
3. **UI boutons** : Ajouter "Exporter" et "Importer" (avec input file cache)
4. **Validation** : Verifier la structure et la version du JSON

---

## Definition of Done

- [ ] Le bouton "Exporter" telecharge un fichier JSON valide
- [ ] Le fichier contient tous les process (avec steps) et owners
- [ ] Le bouton "Importer" ouvre un selecteur de fichier
- [ ] L'import restaure les donnees en Supabase
- [ ] Les erreurs sont affichees en francais
- [ ] Un JSON invalide affiche un message d'erreur

---

## Tests attendus

### Tests manuels
- [ ] Test: Exporter — fichier telechargeable avec donnees completes
- [ ] Test: Importer le fichier exporte — donnees restaurees
- [ ] Test: Importer un fichier non-JSON — message d'erreur
- [ ] Test: Importer un JSON avec mauvaise structure — message d'erreur

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
