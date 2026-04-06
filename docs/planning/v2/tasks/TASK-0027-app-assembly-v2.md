# TASK-0027 — App Assembly V2 — integration et non-regression

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0027 |
| **US Parent** | US-V2-014 |
| **EPIC** | EPIC-V2-006 |
| **Priorite** | P1 |
| **Estimation** | L (3-4h) |
| **Statut** | pending |
| **Sprint** | Sprint 6 |
| **Couche** | UI |

---

## Objectif technique

Assembler tous les modules V2 dans app.html, verifier que tous les onglets fonctionnent ensemble, executer les tests de non-regression sur le portail V2 existant (9 onglets) et le Playbook V1 (F1-F5). Deployer sur GitHub Pages.

### Ce qui est attendu
- [ ] Integration de tous les modules V2 dans app.html (sections Domain, Application, Infrastructure, UI)
- [ ] Navigation fluide entre tous les onglets (existants + V2)
- [ ] Onglets conditionnels fonctionnels (enabled_modules)
- [ ] Selecteur multi-clients admin fonctionnel
- [ ] Role assistant correctement restreint
- [ ] Tests de non-regression sur les 9 onglets existants
- [ ] Tests de non-regression sur le Playbook V1 (playbook.html)
- [ ] Responsive mobile-first valide sur tous les onglets
- [ ] Chargement < 3 secondes sur mobile 4G
- [ ] Deploiement sur GitHub Pages (espace.csbusiness.fr)

### Ce qui n'est PAS attendu (hors scope)
- Nouvelles fonctionnalites
- Refactoring du code existant

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Non-regression portail | 9 onglets existants (Actions, Brain Dump, Mes outils, Sessions, Tutos, Mon projet, Automatisations, Mon contrat + liens KPI/Playbook) |
| Non-regression playbook | F1-F5 fonctionnent identiquement |
| Badges "nouveau" | Continuent de fonctionner (created_at vs localStorage) |
| Auth existante | Login/logout avec les comptes existants |
| Charte | CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 a TASK-0026 (toutes les tasks V2) | pending |
| Code existant | app.html en production | disponible |
| Code existant | playbook.html en production | disponible |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — assemblage final de tous les modules V2

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html | Toutes | App Assembly | Integration finale |

---

## Plan d'implementation

1. **Verification de la structure** : S'assurer que les sections commentees sont propres
   - // === SECTION: DOMAIN ===
   - // === SECTION: APPLICATION ===
   - // === SECTION: INFRASTRUCTURE ===
   - // === SECTION: UI ===

2. **Integration des modules** : Verifier que chaque module est dans la bonne section
   - Domain V2 : fonctions parcours + KPIs
   - Application V2 : ParcoursManager + KPIManager + ChatbotManager + AdminManager
   - Infrastructure V2 : db.parcours + db.kpis + db.alerts + db.chatbots + db.faq
   - UI V2 : onglets Parcours + KPIs + Chatbots + selecteur admin

3. **Tests non-regression** :
   - Ouvrir chaque onglet existant, verifier le fonctionnement
   - Creer/modifier/supprimer des actions → OK
   - Verifier les sessions, tutos, contrats → OK
   - Verifier les badges "nouveau" → OK
   - Playbook : creer un process, cocher des etapes, changer date → OK

4. **Tests V2** :
   - Parcours : assigner, modifier statuts, verifier progression
   - KPIs : saisir, configurer alertes, verifier badges
   - Chatbots : CRUD FAQ, modifier message bienvenue
   - Admin : selecteur, modules actives
   - Assistant : acces restreint

5. **Tests responsive** :
   - iPhone : tous les onglets V2
   - Desktop : tous les onglets V2

6. **Performance** :
   - DevTools Network : chargement < 3 secondes
   - Profiling : pas de freeze UI

7. **Deploiement** :
   - Push sur GitHub → GitHub Pages → espace.csbusiness.fr

---

## Definition of Done

- [ ] Tous les modules V2 sont integres dans app.html
- [ ] Les 9 onglets existants fonctionnent identiquement (non-regression)
- [ ] Le Playbook V1 (playbook.html) fonctionne identiquement
- [ ] Les 3 nouveaux onglets (Parcours, KPIs, Chatbots) fonctionnent
- [ ] Le selecteur admin fonctionne
- [ ] Les onglets conditionnels fonctionnent
- [ ] Le role assistant est correctement restreint
- [ ] Les badges "nouveau" fonctionnent
- [ ] L'auth existante n'est pas cassee
- [ ] Responsive mobile valide
- [ ] Chargement < 3 secondes
- [ ] Deploye sur espace.csbusiness.fr

---

## Tests attendus

### Checklist de non-regression

#### Portail V2 existant
- [ ] Test: Onglet Actions → CRUD fonctionnel
- [ ] Test: Onglet Brain Dump → fonctionnel
- [ ] Test: Onglet Mes outils → fonctionnel
- [ ] Test: Onglet Sessions → fonctionnel
- [ ] Test: Onglet Tutos → fonctionnel
- [ ] Test: Onglet Mon projet → fonctionnel
- [ ] Test: Onglet Automatisations → fonctionnel
- [ ] Test: Onglet Mon contrat → fonctionnel
- [ ] Test: Liens KPI et Playbook → fonctionnels
- [ ] Test: Badges "nouveau" → fonctionnels
- [ ] Test: Login/logout → fonctionnel

#### Playbook V1
- [ ] Test: Creer un process depuis template → OK
- [ ] Test: Cocher des etapes → progression mise a jour
- [ ] Test: Vue Mes Taches → filtrage par owner OK
- [ ] Test: Vue Gantt → affichage correct
- [ ] Test: Export/Import JSON → fonctionnel

#### Modules V2
- [ ] Test: Onglet Parcours → assigner, modifier, progression
- [ ] Test: Onglet KPIs → saisir, alertes, graphiques
- [ ] Test: Onglet Chatbots → CRUD FAQ, message bienvenue
- [ ] Test: Selecteur admin → bascule entre clients
- [ ] Test: Role assistant → acces restreint verifie

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
