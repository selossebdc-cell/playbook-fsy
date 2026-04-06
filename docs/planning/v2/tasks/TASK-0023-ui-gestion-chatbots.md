# TASK-0023 — UI — onglet Gestion Chatbots dans app.html

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0023 |
| **US Parent** | US-V2-010 |
| **EPIC** | EPIC-V2-004 |
| **Priorite** | P1 |
| **Estimation** | L (3-4h) |
| **Statut** | pending |
| **Sprint** | Sprint 4 |
| **Couche** | UI |

---

## Objectif technique

Implementer l'onglet Gestion Chatbots dans app.html : selecteur de chatbot, liste FAQ avec CRUD inline, edition du message de bienvenue, regles de comportement, stats en lecture seule. Accessible par admin, client et assistant.

### Ce qui est attendu
- [ ] Onglet "Chatbots" dans la navigation (conditionnel via enabled_modules)
- [ ] Selecteur de chatbot (WhatsApp FSY, Telegram MTM, etc.)
- [ ] Liste FAQ avec : question, reponse, categorie, toggle actif/inactif
- [ ] Boutons : ajouter FAQ, modifier (inline), supprimer, reordonner (fleches)
- [ ] Section "Message de bienvenue" : textarea editable + bouton sauvegarder
- [ ] Section "Regles" : checkboxes (mention-only, escalade) + horaires
- [ ] Section "Stats" : tableau en lecture seule (messages, escalades, sans reponse par jour)
- [ ] Responsive mobile-first
- [ ] Charte CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter

### Ce qui n'est PAS attendu (hors scope)
- Creation de nouveaux chatbots
- Stats en temps reel
- Backend chatbot (n8n)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Acces admin | Catherine voit tous les chatbots |
| Acces client | Aurelia voit les chatbots FSY uniquement |
| Acces assistant | Laurie voit les chatbots du client associe |
| FAQ inline | Edition directe dans la liste (pas de modale) |
| Reordonnement | Fleches haut/bas (pas de drag & drop) |
| Stats | Tableau simple : date, messages, escalades, sans reponse |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0022 (CRUD chatbots) | pending |
| Task prerequise | TASK-0015 (onglets conditionnels) | pending |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — section UI (onglet Chatbots, HTML + CSS + event listeners)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section UI) | UI | ChatbotView | Rendu onglet Gestion Chatbots |

---

## Plan d'implementation

1. **HTML — Structure de l'onglet** :
   - Selecteur chatbot (tabs ou dropdown)
   - Section FAQ : liste avec edition inline
   - Section Message de bienvenue : textarea
   - Section Regles : formulaire avec checkboxes
   - Section Stats : tableau

2. **CSS — Styles** :
   - Lignes FAQ avec alternance de fond
   - Toggle actif/inactif (switch CSS)
   - Fleches de reordonnement
   - Tableau stats sobre

3. **JS — Rendu dynamique** :
   - renderChatbotView(chatbotConfig) : genere tout l'onglet
   - renderFAQList(faqs) : liste avec boutons d'action
   - renderStats(stats) : tableau
   - Formulaire ajout FAQ (inline ou expandable)

4. **JS — Event listeners** :
   - Toggle actif/inactif FAQ → updateFAQ
   - Ajout FAQ → addFAQ → rerender
   - Suppression FAQ → deleteFAQ → rerender
   - Fleches → reorderFAQ → rerender
   - Sauvegarder message bienvenue → updateWelcomeMessage
   - Sauvegarder regles → updateChatbotRules

---

## Definition of Done

- [ ] L'onglet Chatbots apparait dans la navigation (si enabled_modules contient 'chatbots')
- [ ] Le selecteur de chatbot permet de basculer entre WhatsApp et Telegram
- [ ] Les FAQ s'affichent en liste avec edition inline
- [ ] Ajouter, modifier, supprimer, reordonner une FAQ fonctionne
- [ ] Le toggle actif/inactif fonctionne
- [ ] Le message de bienvenue est editable et sauvegarde
- [ ] Les regles sont editables et sauvegardees
- [ ] Les stats s'affichent en lecture seule
- [ ] Le rendu est correct sur mobile
- [ ] Les couleurs respectent la charte CS Consulting

---

## Tests attendus

### Tests manuels
- [ ] Test: Ajouter une FAQ → apparait dans la liste
- [ ] Test: Modifier une FAQ inline → sauvegardee
- [ ] Test: Supprimer une FAQ → disparait de la liste
- [ ] Test: Reordonner avec fleches → ordre mis a jour
- [ ] Test: Toggle inactif → FAQ grisee
- [ ] Test: Modifier message bienvenue → sauvegarde
- [ ] Test: Stats affichees en tableau
- [ ] Test: Connexion Laurie → voit uniquement chatbots FSY

### Cas limites a couvrir
- [ ] Chatbot sans FAQ → message "Aucune FAQ. Ajoutez la premiere question"
- [ ] Chatbot sans stats → message "Aucune statistique disponible"

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
