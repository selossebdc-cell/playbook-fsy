# TASK-0018 — UI — onglet Parcours Client dans app.html

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0018 |
| **US Parent** | US-V2-006 |
| **EPIC** | EPIC-V2-002 |
| **Priorite** | P1 |
| **Estimation** | L (3-4h) |
| **Statut** | pending |
| **Sprint** | Sprint 2 |
| **Couche** | UI |

---

## Objectif technique

Implementer l'onglet Parcours Client dans app.html : affichage des phases avec emails et outils, progression visuelle, interactions pour changer les statuts, lien vers le playbook, interface de creation/assignation de templates (admin).

### Ce qui est attendu
- [ ] Onglet "Parcours" dans la navigation app.html (conditionnel via enabled_modules)
- [ ] Vue admin : liste des templates + bouton assigner a un client
- [ ] Vue client : son parcours avec phases, emails, outils
- [ ] Chaque phase : titre, numero, statut (pastille coloree), barre de progression
- [ ] Chaque email : titre, timing, statut (dropdown a_creer/cree/actif/desactive), canal
- [ ] Chaque outil : nom, statut d'acces (dropdown recu/bloque/non_requis), flag API
- [ ] Progression globale calculee et affichee (barre + %)
- [ ] % automations actives affiche
- [ ] Lien cliquable vers le process du playbook (si FK presente)
- [ ] Mise a jour en temps reel de la progression quand un statut change
- [ ] Responsive mobile-first
- [ ] Charte CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter

### Ce qui n'est PAS attendu (hors scope)
- Drag & drop des phases
- Export PDF
- Logique metier (TASK-0016)
- CRUD Supabase (TASK-0017)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Couleurs statut email | a_creer = gris, cree = bleu, actif = vert, desactive = orange |
| Couleurs statut outil | recu = vert, bloque = rouge, non_requis = gris |
| Couleurs statut phase | bloque = rouge, pret = bleu, en_cours = orange, termine = vert |
| Lien playbook | Si parcours_phases.playbook_process_id != null → lien cliquable vers playbook.html#processId |
| Admin vs client | Admin voit le selecteur de templates + tous les parcours. Client voit son parcours uniquement |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0015 (selecteur admin, onglets conditionnels) | pending |
| Task prerequise | TASK-0016 (fonctions Domain parcours) | pending |
| Task prerequise | TASK-0017 (CRUD parcours) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section UI (onglet Parcours, HTML + CSS + event listeners)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section UI) | UI | ParcoursView | Rendu de l'onglet Parcours Client |

---

## Plan d'implementation

1. **HTML — Structure de l'onglet** :
   - Container du parcours avec accordeons par phase
   - Barre de progression globale
   - Section admin : creation/assignation template
   - Fichier: app.html (body)

2. **CSS — Styles** :
   - Cartes de phase avec statut colore
   - Lignes d'emails et outils avec dropdowns
   - Barre de progression (terracotta)
   - Responsive mobile (accordeons empiles)
   - Fichier: app.html (style inline)

3. **JS — Rendu dynamique** :
   - renderParcours(parcoursClient) : genere le HTML des phases
   - renderPhase(phase) : genere les emails et outils d'une phase
   - renderProgressBar(percent) : barre de progression animee
   - Fichier: app.html (section UI)

4. **JS — Event listeners** :
   - Changement statut email → updateEmailStatus → rerender
   - Changement statut outil → updateToolAccess → rerender
   - Clic lien playbook → ouverture dans nouvel onglet
   - Assignation template (admin) → assignParcours → rerender
   - Fichier: app.html (section UI)

---

## Definition of Done

- [ ] L'onglet Parcours apparait dans la navigation (si enabled_modules contient 'parcours')
- [ ] Les phases s'affichent en accordeons avec statut colore
- [ ] Les emails et outils sont editables via dropdowns
- [ ] La progression se met a jour en temps reel
- [ ] Le % automations actives est affiche
- [ ] Le lien vers le playbook fonctionne
- [ ] L'interface admin permet d'assigner un template
- [ ] Le client voit uniquement son parcours
- [ ] Le rendu est correct sur mobile (iPhone)
- [ ] Les couleurs respectent la charte CS Consulting

---

## Tests attendus

### Tests manuels
- [ ] Test: L'onglet apparait quand enabled_modules contient 'parcours'
- [ ] Test: L'onglet est masque quand enabled_modules ne contient pas 'parcours'
- [ ] Test: Les phases s'affichent avec les bons statuts et couleurs
- [ ] Test: Changer un email de "a_creer" a "actif" → progression augmente
- [ ] Test: Changer un outil de "bloque" a "recu" → phase passe de "bloque" a "pret"
- [ ] Test: Cliquer le lien playbook → ouverture du process dans playbook.html
- [ ] Test: Vue mobile (iPhone) → layout correct, accordeons fonctionnels

### Cas limites a couvrir
- [ ] Aucun parcours assigne → message "Aucun parcours configure pour ce client"
- [ ] Phase sans outils → pas de section outils affichee
- [ ] Phase sans emails → pas de section emails affichee

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
