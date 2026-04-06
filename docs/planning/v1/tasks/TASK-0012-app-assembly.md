# TASK-0012 — App Assembly (Integration Finale)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire pour assembler l'application est inclus ci-dessous.
>
> **Note** : Cette task est TOUJOURS la derniere du pipeline.
> Elle assemble les artefacts generes par les tasks precedentes.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0012 |
| **US Parent** | US-0010 |
| **EPIC** | EPIC-007 |
| **Priorite** | P1 (bloquant pour Gate 4) |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Verifier et assembler toutes les couches du fichier index.html en une application fonctionnelle et deployable. S'assurer que tout fonctionne ensemble.

### Ce qui est attendu
- [ ] Le fichier index.html contient toutes les couches assemblees et fonctionnelles
- [ ] Les 4 sections commentees sont presentes et ordonnees : Domain, Application, Infrastructure, UI
- [ ] Les 3 vues sont accessibles et fonctionnelles (Playbook, Mes Taches, Timeline)
- [ ] L'authentification fonctionne (login/logout/session)
- [ ] Les 11 templates sont disponibles a la selection
- [ ] Les operations CRUD fonctionnent avec persistance Supabase
- [ ] L'export/import JSON fonctionne
- [ ] Le responsive fonctionne (desktop + mobile)
- [ ] CSS @media print fonctionnel
- [ ] Aucune erreur dans la console du navigateur

### Ce qui n'est PAS attendu (hors scope)
- Refactoriser le code existant
- Ajouter de nouvelles fonctionnalites
- Deploiement sur GitHub Pages

---

## Contexte complet

### Sections a assembler

| Section | Source | Contenu |
|---------|--------|---------|
| Domain (constantes) | TASK-0008, TASK-0009, TASK-0010 | Objet TEMPLATES (11 templates) |
| Domain (fonctions) | TASK-0003 | 8 fonctions pures |
| Application | TASK-0004, TASK-0011 | Use cases + export/import |
| Infrastructure | TASK-0002 | Client Supabase + auth + db |
| UI | TASK-0005, TASK-0006, TASK-0007, TASK-0010 | 3 vues + login + navigation |

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Fichier unique | Tout dans index.html, zero npm |
| Ordre sections | Domain → Application → Infrastructure → UI |
| Dependances | Domain pas de ref Supabase/DOM, Application pas de ref DOM |
| Header | "Face Soul Yoga -- Playbook" |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Fichier HTML unique | Verifier que tout est dans 1 fichier |

### Code existant pertinent

Toutes les sections individuelles creees par TASK-0001 a TASK-0011.

### Packages npm requis

Aucun nouveau package requis.

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0001 a TASK-0011 | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `index.html` (verification et ajustements d'integration)

---

## Plan d'implementation

1. **Verification structure** : S'assurer que les 4 sections sont presentes et ordonnees
2. **Verification integration** : Tester que les fonctions Domain sont appelees par Application, Application par UI
3. **Verification responsive** : Tester desktop et mobile
4. **Verification impression** : Tester CSS @media print
5. **Verification console** : Aucune erreur JS dans la console
6. **Corrections d'integration** : Corriger les eventuels bugs d'assemblage
7. **Test bout en bout** : Scenario complet (login → creer process → cocher etapes → exporter)

---

## Definition of Done

- [ ] index.html contient toutes les couches assemblees
- [ ] Les 3 vues sont fonctionnelles (Playbook, Mes Taches, Timeline)
- [ ] L'authentification fonctionne
- [ ] Les 11 templates sont disponibles
- [ ] CRUD process/etapes/owners fonctionne
- [ ] Export/import JSON fonctionne
- [ ] Responsive desktop + mobile
- [ ] CSS @media print fonctionnel
- [ ] Aucune erreur console
- [ ] Le fichier fait moins de 100 Ko (objectif)

---

## Tests attendus

### Tests d'integration (manuels)
- [ ] Test: Scenario complet : login → creer process T7 → cocher 3 etapes → verifier progression → exporter JSON
- [ ] Test: Vue Mes Taches affiche les taches du process cree
- [ ] Test: Vue Gantt affiche le process cree avec barres colorees
- [ ] Test: Dupliquer le process → nouveau process avec 0% progression
- [ ] Test: Import du JSON exporte → donnees restaurees
- [ ] Test: Logout → login → les donnees sont toujours la
- [ ] Test: Sur mobile (ou devtools) — navigation bottom nav fonctionne

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| Fichier index.html existe | Oui | Oui |
| Taille | < 100 Ko | Non (objectif) |
| 4 sections commentees | Presentes | Oui |
| 11 templates dans TEMPLATES | Oui | Oui |
| 8 fonctions Domain | Presentes | Oui |
| Objet db Infrastructure | Present | Oui |

---

## Notes d'implementation

### Attention
- Ne PAS modifier les fonctionnalites existantes
- Ne PAS ajouter de nouvelles fonctionnalites
- Se limiter a la verification et aux corrections d'integration

### Validation
- Lancer l'application dans le navigateur
- Tester chaque vue
- Verifier la console (aucune erreur)
- Tester sur mobile (responsive)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation (app-assembly) |
