# TASK-0025 — Fallback JSON + batch stats quotidien n8n

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0025 |
| **US Parent** | US-V2-012 |
| **EPIC** | EPIC-V2-005 |
| **Priorite** | P2 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 5 |
| **Couche** | Infrastructure |

---

## Objectif technique

Creer deux workflows n8n complementaires : (1) snapshot quotidien des FAQ Supabase vers un fichier JSON local sur le VPS (fallback si Supabase down), et (2) batch quotidien qui calcule les stats chatbot et les ecrit dans chatbot_stats. Modifier le workflow principal WhatsApp pour utiliser le fallback JSON si Supabase est inaccessible.

### Ce qui est attendu
- [ ] Workflow n8n "FAQ Snapshot" : Schedule Trigger (1x/jour 6h) → lecture FAQ Supabase → ecriture JSON local VPS
- [ ] Fichier JSON local : `/home/n8n/fallback/faq-{chatbot_id}.json`
- [ ] Workflow n8n "Stats Batch" : Schedule Trigger (1x/jour 23h) → comptage messages/escalades/sans reponse → insert chatbot_stats
- [ ] Modification du workflow WhatsApp (TASK-0024) : try Supabase, catch → lire JSON local
- [ ] Si JSON local aussi absent : message d'erreur generique + escalade vers Laurie

### Ce qui n'est PAS attendu (hors scope)
- Stats en temps reel
- Fallback pour autre chose que les FAQ
- Notifications push

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Snapshot | 1x/jour, tous les chatbots actifs |
| Format JSON | Array d'objets { question, answer, category } |
| Stats batch | Comptage des messages du jour passes dans le workflow principal |
| Fallback | Supabase inaccessible → JSON local. JSON absent → message erreur + escalade Laurie |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0024 (workflow WhatsApp) | pending |
| Service externe | VPS OVH (systeme de fichiers local) | disponible |

---

## Fichiers concernes

### Fichiers a creer
- Workflow JSON n8n : `faq-snapshot-daily.json`
- Workflow JSON n8n : `stats-batch-daily.json`

### Fichiers a modifier
- Workflow `chatbot-whatsapp-fsy.json` (TASK-0024) : ajouter branche fallback

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| Workflows n8n | Infrastructure | Resilience + Monitoring | Fallback et stats |

---

## Definition of Done

- [ ] Le snapshot JSON est genere quotidiennement sur le VPS
- [ ] Le chatbot WhatsApp utilise le JSON local si Supabase est down
- [ ] Si JSON absent + Supabase down → message erreur generique + escalade Laurie
- [ ] Les stats quotidiennes sont ecrites dans chatbot_stats
- [ ] Les stats sont visibles dans le portail (TASK-0023)

---

## Tests attendus

### Tests manuels
- [ ] Test: Executer le workflow snapshot → fichier JSON cree sur le VPS
- [ ] Test: Simuler Supabase down → chatbot repond depuis le JSON local
- [ ] Test: Simuler Supabase down + JSON absent → message erreur + escalade
- [ ] Test: Executer le workflow stats → ligne creee dans chatbot_stats
- [ ] Test: Verifier les stats dans le portail apres le batch

### Cas limites a couvrir
- [ ] Chatbot sans FAQ → JSON vide (array vide)
- [ ] Aucun message dans la journee → stats avec compteurs a 0

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
