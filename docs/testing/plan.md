# Test Plan

## Vue d'ensemble

**Projet** : Playbook Process Face Soul Yoga
**Version** : 1.0.0
**Date** : 2026-03-18

## Strategie de test

### Niveaux de test

| Niveau | Scope | Responsable | Automatise |
|--------|-------|-------------|------------|
| Unit | Fonctions Domain (pures) | Developer | Oui (bash) |
| Integration | Structure HTML + sections | Developer | Oui (bash) |
| E2E | User flows complets | QA (manuel) | Non |
| Performance | Taille fichier | Developer | Oui (bash) |

### Couverture cible

| Metrique | Cible | Minimum acceptable |
|----------|-------|-------------------|
| Fonctions Domain | 100% | 100% |
| Templates | 11/11 | 11/11 |
| Sections architecturales | 4/4 | 4/4 |
| Indicateurs visuels | 3/3 | 3/3 |

## Environnements de test

| Env | URL | Donnees | Usage |
|-----|-----|---------|-------|
| Local | file://index.html | Supabase dev | Dev |
| GitHub Pages | selossebdc-cell.github.io | Supabase prod | Production |

## Cas de test par fonctionnalite

### F1 — Vue Playbook

| ID | Description | Priorite | Automatise |
|----|-------------|----------|------------|
| TC-001 | Creer un process vide avec nom et date | Haute | Non |
| TC-002 | Creer un process depuis template T1 (30 etapes) | Haute | Non |
| TC-003 | Cocher/decocher une etape | Haute | Non |
| TC-004 | Indicateurs couleur (vert/rouge/gris) | Haute | Non |
| TC-005 | Editer une etape (titre, timing, RACI) | Haute | Non |
| TC-006 | Ajouter/supprimer une etape | Moyenne | Non |
| TC-007 | Reordonner les etapes (fleches) | Moyenne | Non |
| TC-008 | Dupliquer un process | Moyenne | Non |
| TC-009 | Changer la date cible (avec confirmation) | Haute | Non |
| TC-010 | Badge "Termine" quand 100% | Moyenne | Non |

**Preconditions** :
- Utilisateur connecte
- Au moins 1 process existant (pour TC-003 a TC-010)

### F2 — Vue Mes Taches

| ID | Description | Priorite | Automatise |
|----|-------------|----------|------------|
| TC-011 | Afficher toutes les taches des process actifs | Haute | Non |
| TC-012 | Filtrer par owner | Haute | Non |
| TC-013 | Cocher depuis cette vue | Haute | Non |
| TC-014 | Process termine exclu | Moyenne | Non |
| TC-015 | Message "Aucune tache assignee" si vide | Basse | Non |

### F3 — Vue Timeline/Gantt

| ID | Description | Priorite | Automatise |
|----|-------------|----------|------------|
| TC-016 | Afficher les process avec barres colorees | Haute | Non |
| TC-017 | Marqueur Jour J visible | Haute | Non |
| TC-018 | Marqueur Aujourd'hui visible | Haute | Non |
| TC-019 | Scroll horizontal sur mobile | Haute | Non |
| TC-020 | Legende dynamique | Moyenne | Non |

### F4 — Templates

| ID | Description | Priorite | Automatise |
|----|-------------|----------|------------|
| TC-021 | 11 templates disponibles a la selection | Haute | Oui |
| TC-022 | T1 = 30 etapes | Haute | Oui |
| TC-023 | T7 = 50 etapes (le plus long) | Haute | Oui |
| TC-024 | Option "Process vide" disponible | Haute | Non |
| TC-025 | Pas de terme "n8n" | Haute | Oui |

### F5 — Persistance et Auth

| ID | Description | Priorite | Automatise |
|----|-------------|----------|------------|
| TC-026 | Login avec identifiants valides | Haute | Non |
| TC-027 | Login avec identifiants invalides — message francais | Haute | Non |
| TC-028 | Logout puis login — donnees presentes | Haute | Non |
| TC-029 | Export JSON | Haute | Non |
| TC-030 | Import JSON valide | Haute | Non |
| TC-031 | Import JSON invalide — message erreur | Moyenne | Non |

## Tests de non-regression

| Suite | Fichiers | Declencheur |
|-------|----------|-------------|
| Structure | tests/run-all.sh | Chaque commit |

## Tests de performance

| Scenario | Seuil acceptable |
|----------|-----------------|
| Taille index.html | < 100 Ko |
| Chargement page | < 3s (connexion standard) |

## Tests de securite

| Type | Verification | Frequence |
|------|-------------|-----------|
| XSS | escapeHtml utilise pour les entrees utilisateur | Revue de code |
| Secrets | Pas de cle API en clair (ANON_KEY placeholder) | Chaque commit |
| Donnees personnelles | Pas d'emails/noms reels | Chaque commit |

## Criteres d'acceptation

### Pour Gate 4 (Build -> QA)

- [x] Tous les tests structure passent
- [x] 11 templates presents
- [x] 8 fonctions Domain presentes
- [x] 4 sections architecturales presentes
- [x] Pas de donnees personnelles
- [x] Pas de terme "n8n"
- [x] Taille < 100 Ko

### Pour release

- [ ] Tests E2E manuels passes (TC-001 a TC-031)
- [ ] Responsive verifie (mobile + desktop)
- [ ] CSS @media print fonctionnel

## Execution

### Commandes

```bash
# Tous les tests
bash tests/run-all.sh
```

## Reporting

| Rapport | Format | Destination |
|---------|--------|-------------|
| Resultats | Console (PASS/FAIL) | Terminal |

## Risques et mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Supabase indisponible | App inaccessible | Message d'erreur clair, export JSON comme backup |
| Fichier trop volumineux | Performance degradee | Objectif < 100 Ko |
| CDN indisponible | Supabase JS non charge | Message d'erreur au chargement |

---

*Plan de test genere le 2026-03-18*
