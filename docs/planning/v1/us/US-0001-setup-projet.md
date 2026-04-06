# US-0001 — Setup projet et fichier HTML de base

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0001 |
| **EPIC** | EPIC-001 |
| **Priorite** | P1 |
| **Estimation** | M |
| **Statut** | draft |

---

## User Story

**En tant que** developpeur,
**je veux** un fichier index.html structure avec les dependances CDN, les design tokens FSY et la navigation entre les 3 vues,
**afin de** disposer du socle technique pour implementer toutes les fonctionnalites.

---

## Contexte / Valeur

Le projet est un fichier HTML unique sans build system. Tout le CSS et le JS sont inline. Ce setup initial pose les fondations : structure HTML, chargement des CDN (Supabase JS, Google Fonts), design tokens FSY (terracotta, creme, teal), et squelette de navigation (tabs desktop, bottom nav mobile).

---

## Criteres d'acceptation

- [ ] Le fichier index.html contient la structure HTML de base avec head, body, script CDN
- [ ] Supabase JS v2 est charge via CDN jsDelivr
- [ ] Google Fonts (Playfair Display SC, Montserrat) sont chargees
- [ ] Les design tokens FSY sont definis en CSS custom properties
- [ ] La navigation affiche 3 onglets : Playbook, Mes Taches, Timeline
- [ ] Navigation tabs en haut sur desktop, bottom nav sur mobile
- [ ] Le fichier contient les 4 sections commentees : Domain, Application, Infrastructure, UI
- [ ] Le fichier se charge sans erreur dans un navigateur moderne

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Fichier HTML unique, zero dependance npm, zero build |
| RG-02 | Supabase JS charge en CDN (pas de npm install) |
| RG-03 | Design tokens FSY : terracotta #B55B50, creme #FFFBF7, teal #033231 |
| RG-04 | Fonts : Playfair Display SC (headings), Montserrat (body) |
| RG-05 | Navigation desktop = tabs en haut, mobile = bottom nav |
| RG-06 | Header texte "Face Soul Yoga -- Playbook", pas de logo |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| CDN indisponible | Message d'erreur si Supabase JS ne charge pas |
| Ecran tres petit (< 320px) | Bottom nav reste lisible |

---

## Maquettes / Wireframes

- Pas de maquette formelle. Layout decrit dans system.md (architecture haut niveau).

---

## Strategie de tests

### Tests unitaires
- Pas de tests automatises (zero build)

### Tests manuels
- Verifier le chargement dans Chrome, Safari, Firefox
- Verifier responsive (desktop + mobile)
- Verifier que les CDN sont charges (console sans erreur)

---

## Impacts

### Securite
- [ ] Authentification requise: non (setup uniquement)
- [ ] Donnees sensibles: non

### Performance
- [ ] Temps de chargement < 1 seconde

---

## Dependances

### US prerequises
- Aucune (premiere US)

### Dependances techniques
- CDN jsDelivr (Supabase JS)
- Google Fonts CDN
- Instance Supabase dcynlifggjiqqihincbp

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0001 | Setup projet et configuration | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-001](../epics.md#epic-001)
- **ADR** : ADR-0001 — Stack technique (fichier HTML unique + Supabase CDN)

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
