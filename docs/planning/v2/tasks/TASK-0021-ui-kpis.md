# TASK-0021 — UI — onglet KPIs dans app.html (formulaire + graphiques + alertes)

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0021 |
| **US Parent** | US-V2-008 |
| **EPIC** | EPIC-V2-003 |
| **Priorite** | P2 |
| **Estimation** | L (3-4h) |
| **Statut** | pending |
| **Sprint** | Sprint 3 |
| **Couche** | UI |

---

## Objectif technique

Implementer l'onglet KPIs dans app.html : formulaire de saisie manuelle, graphiques d'evolution (mini line charts), badges d'alerte, configuration des seuils. L'onglet est masque pour le role assistant.

### Ce qui est attendu
- [ ] Onglet "KPIs" dans la navigation (conditionnel via enabled_modules, masque pour assistant)
- [ ] Formulaire de saisie : dropdown metrique + champ valeur + bouton enregistrer
- [ ] Affichage des 5 metriques avec valeur actuelle + tendance
- [ ] Mini graphiques d'evolution (line charts en canvas ou SVG inline)
- [ ] Badge rouge sur les metriques qui depassent leur seuil d'alerte
- [ ] Section configuration des alertes (seuil + operateur)
- [ ] % automations actives affiche et lie au parcours
- [ ] Responsive mobile-first
- [ ] Charte CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter

### Ce qui n'est PAS attendu (hors scope)
- Librairie chart externe (utiliser canvas/SVG inline)
- Alimentation automatique via webhooks
- Export PDF

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| 5 metriques | MRR (EUR), churn_rate (%), abonnes_actifs (nombre), taux_conversion (%), pct_automations (%) |
| Badge rouge | Visible quand la derniere valeur depasse le seuil configure |
| Assistant | Pas d'acces a cet onglet (role assistant) |
| Admin | Voit les KPIs du client selectionne dans le selecteur |
| Client | Voit ses propres KPIs |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0019 (Domain KPIs) | pending |
| Task prerequise | TASK-0020 (CRUD KPIs) | pending |
| Task prerequise | TASK-0015 (onglets conditionnels) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section UI (onglet KPIs, HTML + CSS + canvas/SVG + event listeners)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section UI) | UI | KPIView | Rendu onglet KPIs |

---

## Plan d'implementation

1. **HTML — Structure de l'onglet** :
   - Grille 2x3 (ou 1 colonne mobile) avec cartes par metrique
   - Chaque carte : label, valeur actuelle, mini graphique, badge alerte
   - Formulaire de saisie en bas ou en modal
   - Section configuration alertes

2. **CSS — Styles** :
   - Cartes KPI avec fond sombre, bordure terracotta
   - Badge rouge (cercle avec "!" ou valeur)
   - Mini graphiques (150x60px)
   - Responsive : cartes empilees sur mobile

3. **JS — Mini graphiques** :
   - drawMiniChart(canvasId, dataPoints) : line chart minimal en canvas
   - Pas de librairie externe — canvas natif
   - Axe temps implicite, pas de labels

4. **JS — Event listeners** :
   - Formulaire saisie → recordKPI → rerender
   - Configuration alerte → configureAlert → rerender

---

## Definition of Done

- [ ] L'onglet KPIs apparait pour admin et client (pas assistant)
- [ ] Le formulaire permet de saisir un KPI et il est enregistre
- [ ] Les 5 metriques s'affichent avec valeur actuelle
- [ ] Les mini graphiques montrent l'evolution dans le temps
- [ ] Les badges rouges apparaissent quand un seuil est depasse
- [ ] La configuration d'alerte fonctionne (seuil + operateur)
- [ ] Le % automations est coherent avec le parcours
- [ ] Le rendu est correct sur mobile
- [ ] Les couleurs respectent la charte CS Consulting

---

## Tests attendus

### Tests manuels
- [ ] Test: Saisir un KPI MRR → valeur affichee, graphique mis a jour
- [ ] Test: Configurer alerte churn > 8%, saisir 10% → badge rouge visible
- [ ] Test: Connexion Laurie (assistant) → onglet KPIs absent
- [ ] Test: Vue mobile → cartes empilees, lisible

### Cas limites a couvrir
- [ ] Aucun KPI enregistre → message "Aucune donnee. Commencez par saisir un KPI"
- [ ] Un seul point de donnee → pas de graphique, juste la valeur

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
