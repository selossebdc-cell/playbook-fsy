# US-0008 — Templates pre-remplis et instanciation

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0008 |
| **EPIC** | EPIC-005 |
| **Priorite** | P1 |
| **Estimation** | XL |
| **Statut** | draft |

---

## User Story

**En tant que** Laurie,
**je veux** choisir parmi 11 templates pre-remplis lors de la creation d'un process,
**afin de** demarrer avec des etapes, timings et RACI pre-configures au lieu de tout creer a la main.

---

## Contexte / Valeur

Les 11 templates sont le coeur du playbook. Ils capitalisent l'expertise de Catherine en operations FSY. Chaque template contient des etapes avec titres, descriptions, sections, timings relatifs et RACI par defaut. L'instanciation copie toutes les etapes dans un nouveau process.

---

## Criteres d'acceptation

- [ ] Les 11 templates (T1-T10, dont T5a et T5b) sont disponibles a la selection
- [ ] Un process vide (sans template) est toujours disponible
- [ ] Chaque template affiche son nom, sa categorie et son nombre d'etapes
- [ ] L'instanciation cree un process avec toutes les etapes du template
- [ ] Les RACI par defaut du template sont appliques
- [ ] Les timings relatifs sont copies
- [ ] La date cible est demandee lors de l'instanciation
- [ ] Les templates sont figes dans le code (non modifiables par l'utilisateur)
- [ ] Le terme "automatisation" est utilise (jamais "n8n")

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | 11 templates figes (T1-T10 + T5a/T5b, hors T5c) |
| RG-02 | Templates non modifiables par l'utilisateur |
| RG-03 | Process vide toujours disponible |
| RG-04 | Date cible obligatoire a l'instanciation |
| RG-05 | RACI global : Aurelia=A, Laurie=R, Catherine=R (auto), VA=R, Externe=C/R, Automatique=R |
| RG-06 | Utiliser "automatisation" dans les templates, jamais "n8n" |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Template avec 50 etapes (T7) | Toutes les etapes sont copiees |
| Instanciation du meme template 2 fois | 2 process independants |
| Template cycle continu (T9, T10) | Etapes avec recurrence mentionnee |

---

## Dependances

### US prerequises
- US-0003 : Fonctions Domain (instantiateTemplate)
- US-0004 : CRUD process (creation)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0008 | Templates T1-T4 (donnees JS) | 1-2h | pending |
| TASK-0009 | Templates T5a-T8 (donnees JS) | 1-2h | pending |
| TASK-0010 | Templates T9-T10 + UI selection | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-005](../epics.md#epic-005)
- **Spec** : domain.md (Template, TemplateInstantiator)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
