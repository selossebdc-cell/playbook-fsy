# TASK-0016 — Domain — logique parcours (progression, statuts, outils)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0016 |
| **US Parent** | US-V2-004 |
| **EPIC** | EPIC-V2-002 |
| **Priorite** | P1 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 2 |
| **Couche** | Domain |

---

## Objectif technique

Implementer les fonctions Domain pures pour le module Parcours Client : calcul de progression, gestion des statuts de phase, mise a jour automatique des phases quand un outil change de statut, calcul du % d'automations actives.

### Ce qui est attendu
- [ ] `calculateParcoursProgress(phases, emails)` → { done, total, percent }
- [ ] `calculateAutomationPercent(emails)` → number (nb actifs / nb total)
- [ ] `getPhaseStatus(phase, emails, outils)` → 'bloque' | 'pret' | 'en_cours' | 'termine'
- [ ] `updatePhasesOnToolChange(phases, outilId, newStatus)` → Phase[] (bloque → pret si outil recu)
- [ ] `getEmailStatusColor(status)` → string (couleur CSS)
- [ ] `getToolStatusColor(status)` → string (couleur CSS)
- [ ] `instantiateParcoursTemplate(template, profileId)` → { parcoursClient, phases, emails, outils }

### Ce qui n'est PAS attendu (hors scope)
- Appels Supabase (couche Application/Infrastructure)
- Rendu UI
- Templates parcours pre-remplis (donnees)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Progression | nb phases terminees / nb phases total |
| % automation | nb emails actifs / nb emails total |
| Phase bloque | Au moins un outil de la phase a acces_status = 'bloque' |
| Phase pret | Tous les outils de la phase sont 'recu' ou 'non_requis', aucun email n'est 'actif' |
| Phase en_cours | Au moins un email est 'actif' ou 'cree' |
| Phase termine | Tous les emails sont 'actif' ou 'desactive' |
| Outil bloque → recu | Les phases dependantes passent de 'bloque' a 'pret' |
| Statut email | a_creer, cree, actif, desactive — transitions libres |
| Statut outil | recu, bloque, non_requis |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables Supabase) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section Domain (fonctions pures JS)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section Domain) | Domain | ParcoursProgressCalculator | Calculs purs, pas de Supabase, pas de DOM |
| app.html (section Domain) | Domain | PhaseStatusUpdater | Mise a jour statuts phases |

---

## Plan d'implementation

1. **Fonctions de calcul** : calculateParcoursProgress, calculateAutomationPercent
   - Fonctions pures, pas d'effets de bord
   - Fichier: app.html (section Domain)

2. **Fonctions de statut** : getPhaseStatus, getEmailStatusColor, getToolStatusColor
   - Logique de determination du statut d'une phase
   - Fichier: app.html (section Domain)

3. **Mise a jour phases** : updatePhasesOnToolChange
   - Quand un outil passe de "bloque" a "recu", verifier si tous les outils de la phase sont OK
   - Si oui, passer la phase de "bloque" a "pret"
   - Fichier: app.html (section Domain)

4. **Instanciation template** : instantiateParcoursTemplate
   - Creer un ParcoursClient avec ses phases, emails et outils depuis le template JSONB
   - Fichier: app.html (section Domain)

---

## Definition of Done

- [ ] Toutes les fonctions sont pures (pas d'appels Supabase, pas de DOM)
- [ ] calculateParcoursProgress retourne le bon pourcentage
- [ ] calculateAutomationPercent retourne nb actifs / nb total
- [ ] getPhaseStatus retourne le bon statut selon les regles
- [ ] updatePhasesOnToolChange met a jour correctement les phases dependantes
- [ ] instantiateParcoursTemplate cree la bonne structure depuis un template JSONB
- [ ] Les fonctions gerent les cas limites (listes vides, aucun outil, aucun email)

---

## Tests attendus

### Tests manuels
- [ ] Test: 3 emails actifs sur 10 → calculateAutomationPercent retourne 30
- [ ] Test: Phase avec 1 outil bloque → getPhaseStatus retourne 'bloque'
- [ ] Test: Phase avec tous les outils recus, 0 emails actifs → getPhaseStatus retourne 'pret'
- [ ] Test: Outil passe de bloque a recu, dernier outil bloque de la phase → phase passe a 'pret'

### Cas limites a couvrir
- [ ] Phase sans outils → jamais 'bloque'
- [ ] Phase sans emails → progression 0, statut 'pret' par defaut
- [ ] Tous les emails en 'desactive' → phase 'termine'

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
