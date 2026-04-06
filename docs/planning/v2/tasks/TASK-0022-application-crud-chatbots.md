# TASK-0022 — Application + Infrastructure — CRUD chatbots et FAQ

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0022 |
| **US Parent** | US-V2-009 |
| **EPIC** | EPIC-V2-004 |
| **Priorite** | P1 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 4 |
| **Couche** | Application |

---

## Objectif technique

Implementer les couches Application et Infrastructure pour le module Gestion Chatbots : CRUD FAQ, gestion des configs chatbot, mise a jour des messages de bienvenue et regles, lecture des stats.

### Ce qui est attendu
- [ ] Infrastructure : db.chatbots.getConfig(chatbotId) → select chatbot_configs avec FAQ et stats
- [ ] Infrastructure : db.chatbots.getAll(clientId?) → select chatbot_configs filtre par client
- [ ] Infrastructure : db.faq.create(chatbotId, question, answer, category) → insert chatbot_faq
- [ ] Infrastructure : db.faq.update(faqId, fields) → update chatbot_faq
- [ ] Infrastructure : db.faq.delete(faqId) → delete chatbot_faq
- [ ] Infrastructure : db.faq.reorder(chatbotId, faqIds) → update order_num en batch
- [ ] Infrastructure : db.chatbots.updateWelcome(chatbotId, message) → update welcome_message
- [ ] Infrastructure : db.chatbots.updateRules(chatbotId, rules) → update rules JSONB
- [ ] Infrastructure : db.chatbots.getStats(chatbotId) → select chatbot_stats order by recorded_at
- [ ] Application : getChatbotConfig(chatbotId) → config complete
- [ ] Application : addFAQ, updateFAQ, deleteFAQ, reorderFAQ → orchestration CRUD
- [ ] Application : updateWelcomeMessage, updateChatbotRules → orchestration

### Ce qui n'est PAS attendu (hors scope)
- Rendu UI (TASK-0023)
- Backend chatbot n8n (TASK-0024)
- Logique de matching FAQ (cote chatbot)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| FAQ active | active = true par defaut a la creation |
| Ordre | order_num continu, recalcule apres reordonnement |
| Regles JSONB | Format libre : { mentionOnly: bool, escalationEnabled: bool, activeHours: { start, end } } |
| Stats lecture seule | Pas de write depuis le portail, uniquement batch n8n |
| Acces assistant | Laurie voit les chatbots du client associe uniquement |
| Acces admin | Catherine voit tous les chatbots |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables chatbot_*) | pending |
| Task prerequise | TASK-0014 (RLS assistant) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section Infrastructure (db.chatbots, db.faq) et section Application (ChatbotManager)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section Infrastructure) | Infrastructure | db.chatbots, db.faq | CRUD Supabase |
| app.html (section Application) | Application | ChatbotManager | Orchestration |

---

## Definition of Done

- [ ] getChatbotConfig retourne la config complete avec FAQ et stats
- [ ] addFAQ cree une entree FAQ avec ordre correct
- [ ] updateFAQ met a jour les champs specifiques
- [ ] deleteFAQ supprime l'entree
- [ ] reorderFAQ met a jour les order_num en batch
- [ ] updateWelcomeMessage persiste le message
- [ ] updateChatbotRules persiste les regles JSONB
- [ ] getStats retourne l'historique des stats
- [ ] Les erreurs Supabase sont traduites en francais

---

## Tests attendus

### Tests manuels
- [ ] Test: addFAQ → entree creee dans chatbot_faq avec order_num correct
- [ ] Test: deleteFAQ → entree supprimee
- [ ] Test: reorderFAQ → order_num mis a jour
- [ ] Test: updateWelcomeMessage → message mis a jour
- [ ] Test: getStats → historique retourne trie par date

### Cas limites a couvrir
- [ ] FAQ dupliquee (meme question) → message d'erreur
- [ ] Chatbot sans FAQ → retourne liste vide
- [ ] Chatbot sans stats → retourne liste vide

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
