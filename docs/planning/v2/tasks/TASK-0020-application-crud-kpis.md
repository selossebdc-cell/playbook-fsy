# TASK-0020 — Application + Infrastructure — CRUD KPIs Supabase

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0020 |
| **US Parent** | US-V2-007 |
| **EPIC** | EPIC-V2-003 |
| **Priorite** | P2 |
| **Estimation** | S (1-2h) |
| **Statut** | pending |
| **Sprint** | Sprint 3 |
| **Couche** | Application |

---

## Objectif technique

Implementer les couches Application et Infrastructure pour le module KPIs : operations CRUD Supabase pour client_kpis et client_kpi_alerts, orchestration de la saisie avec validation et verification des alertes.

### Ce qui est attendu
- [ ] Infrastructure : db.kpis.record(profileId, metricName, value) → insert client_kpis
- [ ] Infrastructure : db.kpis.getHistory(profileId) → select client_kpis order by recorded_at
- [ ] Infrastructure : db.kpis.getLatest(profileId) → select distinct on metric_name, order by recorded_at desc
- [ ] Infrastructure : db.alerts.configure(profileId, metricName, threshold, operator) → upsert client_kpi_alerts
- [ ] Infrastructure : db.alerts.getActive(profileId) → select client_kpi_alerts where active=true
- [ ] Application : recordKPI(profileId, metricName, value) → valide + persiste + verifie alertes
- [ ] Application : getKPIHistory(profileId) → retourne historique
- [ ] Application : configureAlert(profileId, metricName, threshold, operator) → persiste alerte
- [ ] Application : checkAlerts(profileId) → retourne les alertes declenchees

### Ce qui n'est PAS attendu (hors scope)
- Rendu UI des graphiques (TASK-0021)
- Webhooks Stripe/Circle
- Fonctions Domain pures (TASK-0019)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Saisie | Validation via Domain avant persistance |
| Horodatage | recorded_at = now() par defaut |
| Alerte | Verification apres chaque saisie de KPI |
| Upsert alerte | Une seule alerte par metrique par client |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables client_kpis, client_kpi_alerts) | pending |
| Task prerequise | TASK-0019 (fonctions Domain KPIs) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section Infrastructure (db.kpis, db.alerts) et section Application (KPIManager)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section Infrastructure) | Infrastructure | db.kpis, db.alerts | CRUD Supabase |
| app.html (section Application) | Application | KPIManager | Orchestration |

---

## Definition of Done

- [ ] recordKPI persiste un KPI horodate dans Supabase
- [ ] getKPIHistory retourne l'historique trie par date
- [ ] configureAlert cree ou met a jour une alerte
- [ ] checkAlerts retourne les alertes declenchees avec les valeurs concernees
- [ ] Les erreurs Supabase sont attrapees et traduites en francais
- [ ] Aucune logique metier dans la couche Infrastructure

---

## Tests attendus

### Tests manuels
- [ ] Test: recordKPI('MRR', 5000) → ligne creee dans client_kpis
- [ ] Test: getKPIHistory() → historique trie par date croissante
- [ ] Test: configureAlert('churn_rate', 8, 'gt') → alerte creee
- [ ] Test: recordKPI('churn_rate', 10) + checkAlerts → alerte declenchee

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
