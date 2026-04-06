# TASK-0026 — Migration FAQ Telegram MTM vers Supabase

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0026 |
| **US Parent** | US-V2-013 |
| **EPIC** | EPIC-V2-006 |
| **Priorite** | P2 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 6 |
| **Couche** | Infrastructure |

---

## Objectif technique

Auditer les 8 workflows n8n existants du chatbot Telegram MTM, identifier ou sont stockees les FAQ (en dur dans les nodes ou dans un fichier externe), migrer les FAQ vers la table chatbot_faq (avec chatbot_id MTM), et modifier les workflows pour lire les FAQ depuis Supabase. Conserver toutes les fonctionnalites existantes (slash commands, anti-spam).

### Ce qui est attendu
- [ ] Audit des 8 workflows n8n existants : identifier les FAQ (format, emplacement)
- [ ] Creer la config chatbot MTM dans chatbot_configs (platform='telegram')
- [ ] Inserer les FAQ existantes dans chatbot_faq (chatbot_id MTM)
- [ ] Modifier le(s) workflow(s) qui utilisent les FAQ pour lire depuis Supabase
- [ ] Ajouter le fallback JSON (meme pattern que TASK-0025)
- [ ] Verifier que slash commands et anti-spam restent operationnels
- [ ] Tests de non-regression sur le chatbot Telegram

### Ce qui n'est PAS attendu (hors scope)
- Nouvelles fonctionnalites Telegram
- Refactoring des workflows (sauf branchement FAQ)
- Nouveau chatbot

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| FAQ source | A auditer : en dur dans n8n (IF/Switch nodes) ou fichier externe |
| Migration | Toutes les FAQ doivent etre dans chatbot_faq apres migration |
| Non-regression | Slash commands, anti-spam, comportement existant = identique |
| Fallback | Meme pattern que WhatsApp : JSON local sur VPS |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables chatbot_*) | pending |
| Task prerequise | TASK-0025 (pattern fallback JSON) | pending |
| Code existant | 8 workflows n8n Telegram MTM | en production |

---

## Fichiers concernes

### Fichiers a modifier
- Workflow(s) n8n existants (a identifier lors de l'audit)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| Workflows n8n | Infrastructure | Migration FAQ | Passage en dur → Supabase |

---

## Plan d'implementation

1. **Audit** : Examiner les 8 workflows n8n
   - Identifier lesquels contiennent des FAQ
   - Documenter le format actuel (texte en dur, JSON, fichier)
   - Lister les slash commands et regles anti-spam

2. **Creer la config chatbot** : INSERT dans chatbot_configs
   - name: "Telegram MTM", platform: "telegram", client_id: Aurelia

3. **Migrer les FAQ** : INSERT dans chatbot_faq
   - Extraire les questions/reponses des workflows
   - Mapper vers le schema chatbot_faq

4. **Modifier les workflows** : Remplacer la source FAQ
   - Ajouter un node Supabase Select (chatbot_faq WHERE chatbot_id = MTM_ID)
   - Brancher sur le node de matching existant

5. **Fallback** : Ajouter la branche JSON local
   - Meme pattern que TASK-0025

6. **Tests non-regression** : Verifier tout le comportement existant

---

## Definition of Done

- [ ] Toutes les FAQ sont dans chatbot_faq (chatbot_id MTM)
- [ ] Le(s) workflow(s) modifie(s) lisent les FAQ depuis Supabase
- [ ] Le fallback JSON fonctionne si Supabase est down
- [ ] Les slash commands fonctionnent comme avant
- [ ] L'anti-spam fonctionne comme avant
- [ ] Le comportement du chatbot est identique avant/apres migration
- [ ] Les FAQ MTM apparaissent dans le portail (onglet Chatbots)

---

## Tests attendus

### Tests manuels
- [ ] Test: Poser une question FAQ sur Telegram → reponse identique a avant
- [ ] Test: Utiliser un slash command → fonctionne comme avant
- [ ] Test: Modifier une FAQ dans le portail → nouvelle reponse sur Telegram
- [ ] Test: Simuler Supabase down → fallback JSON fonctionne

### Cas limites a couvrir
- [ ] FAQ avec formatage Markdown Telegram → preserver le formatage
- [ ] Workflow sans FAQ (sur les 8) → ne pas modifier

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
