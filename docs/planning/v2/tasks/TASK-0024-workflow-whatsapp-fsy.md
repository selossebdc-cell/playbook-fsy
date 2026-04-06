# TASK-0024 — Workflow n8n — WhatsApp FAQ Supabase + escalade

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0024 |
| **US Parent** | US-V2-011 |
| **EPIC** | EPIC-V2-005 |
| **Priorite** | P2 |
| **Estimation** | L (4-5h) |
| **Statut** | pending |
| **Sprint** | Sprint 5 |
| **Couche** | Infrastructure |

---

## Objectif technique

Creer le workflow n8n principal pour le chatbot WhatsApp FSY Studio : reception des messages WhatsApp, recherche dans les FAQ Supabase, reponse automatique, escalade vers Laurie si question non trouvee, message de bienvenue pour les nouveaux contacts.

### Ce qui est attendu
- [ ] Workflow n8n : trigger WhatsApp Business API → reception message
- [ ] Node Supabase : lecture FAQ active (chatbot_faq WHERE chatbot_id = X AND active = true)
- [ ] Logique de matching : recherche par mots-cles dans les questions FAQ
- [ ] Reponse automatique si match trouve
- [ ] Message de bienvenue si premier contact (lecture chatbot_configs.welcome_message)
- [ ] Escalade vers Laurie (message WhatsApp ou notification) si pas de match
- [ ] Rappel dimanche soir : workflow planifie (schedule trigger)
- [ ] Lecture des regles depuis chatbot_configs.rules (mention-only, horaires)

### Ce qui n'est PAS attendu (hors scope)
- NLP avance / IA pour le matching (recherche par mots-cles simple)
- Stats (TASK-0025)
- Fallback JSON (TASK-0025)
- WhatsApp groupes/Communities

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Source FAQ | Table chatbot_faq filtre par chatbot_id, active = true, order by order_num |
| Matching | Recherche simple par mots-cles dans la question (case insensitive) |
| Escalade | Si aucun match : message a Laurie avec la question posee + nom du contact |
| Bienvenue | Message envoye au premier contact (detection via historique ou flag) |
| Rappel | Dimanche soir, message programme configure dans les regles |
| Horaires | Si rules.activeHours defini, ne repondre que pendant ces horaires |
| Mention-only | Si rules.mentionOnly = true, ne repondre que quand le bot est mentionne |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables chatbot_*) | pending |
| Task prerequise | TASK-0022 (donnees FAQ inserees via portail) | pending |
| Service externe | WhatsApp Business API | credentials a recuperer (BLOQUANT) |
| Service externe | VPS OVH n8n (srv921609.hstgr.cloud) | disponible |

### Point bloquant

Les credentials WhatsApp Business API (token, phone number ID) doivent etre recuperes aupres d'Aurelia ou Laurie. Sans ces credentials, cette task ne peut pas etre completee.

---

## Fichiers concernes

### Fichiers a creer
- Workflow JSON n8n : `chatbot-whatsapp-fsy.json` (a importer dans n8n)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| Workflow n8n | Infrastructure | Chatbot Backend | Externe a app.html, sur VPS |

---

## Plan d'implementation

1. **Trigger WhatsApp** : Node WhatsApp Business trigger (webhook)
   - Configure avec le token et phone number ID d'Aurelia
   - Filtre les messages entrants

2. **Lecture FAQ Supabase** : Node Supabase Select
   - Table chatbot_faq, filtre chatbot_id + active = true
   - Ordered by order_num

3. **Matching** : Node Code (JavaScript)
   - Normaliser la question (lowercase, trim)
   - Rechercher les mots-cles dans les questions FAQ
   - Retourner la meilleure correspondance ou null

4. **Reponse / Escalade** : Switch node
   - Si match → envoyer la reponse FAQ via WhatsApp
   - Si pas de match → envoyer un message a Laurie + reponse "Je transmets"

5. **Message de bienvenue** : Branch conditionnel
   - Verifier si premier contact (champ metadata ou historique)
   - Si oui → envoyer welcome_message

6. **Rappel dimanche** : Workflow separe avec Schedule Trigger (dimanche 19h)

7. **Regles** : Lecture chatbot_configs.rules au debut du workflow
   - Si mention-only → verifier la mention
   - Si activeHours → verifier l'heure

---

## Definition of Done

- [ ] Le workflow est deploye sur le VPS n8n
- [ ] Le chatbot repond aux questions FAQ
- [ ] L'escalade vers Laurie fonctionne
- [ ] Le message de bienvenue est envoye au premier contact
- [ ] Le rappel dimanche soir fonctionne
- [ ] Les regles (mention-only, horaires) sont respectees
- [ ] La modification d'une FAQ dans le portail est prise en compte au prochain message

---

## Tests attendus

### Tests manuels
- [ ] Test: Envoyer une question referencee → reponse FAQ
- [ ] Test: Envoyer une question non referencee → escalade vers Laurie
- [ ] Test: Premier contact → message de bienvenue
- [ ] Test: Modifier une FAQ dans le portail → nouvelle reponse au prochain message
- [ ] Test: Dimanche soir → rappel envoye

### Cas limites a couvrir
- [ ] Message vide → ignorer
- [ ] Supabase inaccessible → fallback (TASK-0025)
- [ ] FAQ desactivee dans le portail → pas de reponse pour cette question

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
