# TASK-0019 — Domain — logique KPIs, alertes, lien parcours

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0019 |
| **US Parent** | US-V2-007 |
| **EPIC** | EPIC-V2-003 |
| **Priorite** | P2 |
| **Estimation** | M (2h) |
| **Statut** | pending |
| **Sprint** | Sprint 3 |
| **Couche** | Domain |

---

## Objectif technique

Implementer les fonctions Domain pures pour le module KPIs : validation des metriques, verification des seuils d'alerte, calcul du % automations depuis le parcours, formatage des donnees pour graphiques.

### Ce qui est attendu
- [ ] `validateKPIValue(metricName, value)` → boolean + message d'erreur
- [ ] `checkAlert(kpiValue, alert)` → boolean (true si seuil depasse)
- [ ] `checkAllAlerts(kpis, alerts)` → { triggered: Alert[], values: KPI[] }
- [ ] `getAutomationPercentFromParcours(emails)` → number (reutilise TASK-0016)
- [ ] `formatKPIForChart(kpis)` → { labels: string[], datasets: object[] } (format chart)
- [ ] `getKPIMetricConfig(metricName)` → { label, unit, color, format }
- [ ] `METRICS_LIST` : constante avec les 5 metriques disponibles

### Ce qui n'est PAS attendu (hors scope)
- Appels Supabase
- Rendu des graphiques (librairie chart)
- Webhooks Stripe/Circle

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Metriques | MRR (EUR), churn_rate (%), abonnes_actifs (nombre), taux_conversion (%), pct_automations (%) |
| Valeur | Toujours >= 0 |
| Alerte gt | Badge rouge si valeur > seuil (ex: churn > 8%) |
| Alerte lt | Badge rouge si valeur < seuil (ex: MRR < 5000) |
| % automations | Lie au parcours : nb emails actifs / nb emails total |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0016 (calculateAutomationPercent) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section Domain (fonctions pures JS)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section Domain) | Domain | KPIAlertChecker | Calculs purs |

---

## Definition of Done

- [ ] Toutes les fonctions sont pures (pas de Supabase, pas de DOM)
- [ ] validateKPIValue rejette les valeurs negatives et les metriques inconnues
- [ ] checkAlert retourne true quand le seuil est depasse (gt et lt)
- [ ] formatKPIForChart produit un format exploitable pour un graphique ligne
- [ ] METRICS_LIST contient les 5 metriques avec labels et unites

---

## Tests attendus

### Tests manuels
- [ ] Test: checkAlert({ value: 10 }, { threshold: 8, operator: 'gt' }) → true
- [ ] Test: checkAlert({ value: 5 }, { threshold: 8, operator: 'gt' }) → false
- [ ] Test: validateKPIValue('MRR', -100) → false
- [ ] Test: validateKPIValue('unknown_metric', 10) → false

### Cas limites a couvrir
- [ ] Aucune alerte configuree → checkAllAlerts retourne triggered: []
- [ ] Aucun KPI enregistre → formatKPIForChart retourne labels: [], datasets: []

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
