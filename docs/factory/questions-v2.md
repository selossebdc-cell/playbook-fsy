# Questions de Clarification — Extension Portail V2 (Parcours + KPIs + Chatbots)

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **Projet** | Extension Portail Client V2 |
| **Date** | 2026-04-06 |
| **Agent** | Analyst |
| **Statut** | Complete |

---

## Resume des questions

| Statut | Nombre |
|--------|--------|
| REPONDUES | 11 |
| EN ATTENTE | 0 |
| BLOQUANTES | 0 |
| HYPOTHESES | 4 |

---

## Questions ouvertes

| # | Priorite | Question | Reponse | Statut |
|---|----------|----------|---------|--------|
| Q1 | BLOQ | Architecture modules (onglets app.html vs fichiers separes) | Onglets dans app.html, modules actives par client | REPONDU |
| Q2 | BLOQ | Systeme auth du portail V2 | Supabase Auth (signInWithPassword) | REPONDU |
| Q3 | BLOQ | Provider WhatsApp Business API | Aurelia a deja WhatsApp Business, utiliser son API directement | REPONDU |
| Q4 | BLOQ | Role Laurie dans Supabase | Nouveau role "assistant" — acces Chatbots/Outils/Parcours/Actions, pas donnees financieres | REPONDU |
| Q5 | BLOQ | Lien Parcours Client / Playbook Process | Lies des le depart — une phase du parcours peut referencer un process du playbook | REPONDU |
| Q6 | BLOQ | Vue admin multi-clients | Selecteur de clients, modules actives par client (Catherine coche quels modules pour qui) | REPONDU |
| Q7 | BLOQ | FAQ Telegram en dur ou externe | Incertain — a verifier dans les workflows n8n | REPONDU |
| Q8 | OPT | KPIs saisie manuelle ou semi-auto | Manuel pour le MVP (formulaire dans le portail) | REPONDU |
| Q9 | OPT | Alertes KPI : portail ou aussi email/WhatsApp | Portail uniquement (badge rouge) | REPONDU |
| Q10 | OPT | Structure templates parcours (JSONB vs relationnel) | Mixte : JSONB pour templates, tables relationnelles pour instances clients | HYPOTHESE |
| Q11 | OPT | Stats chatbot : temps reel ou batch | Batch quotidien via n8n | HYPOTHESE |
| Q12 | OPT | WhatsApp = 1:1 ou groupe | A verifier avec Aurelia — WhatsApp Business API supporte les groupes via Communities | HYPOTHESE |
| Q13 | OPT | Charte graphique nouveaux modules | CS Consulting (#C27A5A, fond sombre #0f0f0f) | REPONDU |
| Q14 | OPT | RLS actif sur tables existantes | A verifier et activer si necessaire | HYPOTHESE |
| Q15 | OPT | Fallback FAQ chatbot si Supabase down | Snapshot auto 1x/jour (n8n exporte FAQ vers JSON local sur VPS) | REPONDU |

---

## Reponses collectees

### Q1 — Architecture modules

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Question** : Les modules Parcours/KPIs/Chatbots vont-ils dans app.html ou dans des fichiers separes ?

**Reponse** : Onglets dans app.html. Comme ce sont des options/developpements sur mesure suivant les clients, les garder en onglets dans l'app. Modules actives par client (Catherine coche quels modules sont visibles pour chaque client).

**Impact** : Architecture single-page, ajout d'onglets conditionnels dans app.html. Table profiles doit stocker les modules actifs par client.

---

### Q2 — Systeme auth

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Supabase Auth (signInWithPassword). Les anciens portails chiffres AES sont un systeme parallele.

**Impact** : On s'appuie sur Supabase Auth + RLS. Le role admin (Catherine) bypass les RLS avec policy specifique.

---

### Q3 — WhatsApp Business API

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Aurelia a deja WhatsApp Business. On utilise son API WhatsApp Business directement. A verifier les credentials API avec Aurelia/Laurie.

**Impact** : Le workflow n8n se connecte a l'API WhatsApp Business d'Aurelia. Besoin des credentials (token, phone number ID).

---

### Q4 — Role Laurie

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Nouveau role "assistant". Acces : Chatbots, Outils, Parcours, Actions. Pas d'acces aux donnees financieres ni aux autres clients.

**Impact** : Ajouter valeur "assistant" dans le champ role de profiles. RLS policies specifiques. UI conditionnel.

---

### Q5 — Lien Parcours / Playbook

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Lies des le depart. Une phase du parcours peut referencer un process du playbook.

**Impact** : Table parcours_phases doit avoir un champ optionnel playbook_process_id (FK vers playbook_processes). L'UI affiche un lien cliquable vers le process correspondant.

---

### Q6 — Vue admin multi-clients

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Selecteur de clients + modules actives par client. Catherine se connecte une fois, voit tous les clients, bascule en un clic.

**Impact** : Ajout selecteur dans le header du portail (visible uniquement pour role=admin). Champ enabled_modules (JSONB array) dans profiles.

---

### Q7 — FAQ Telegram

| Champ | Valeur |
|-------|--------|
| **Priorite** | BLOQUANTE |
| **Statut** | REPONDU |

**Reponse** : Incertain si en dur ou externe. A verifier dans les workflows n8n existants.

**Impact** : Prevoir migration dans tous les cas. Le chatbot Telegram lira chatbot_faq filtre par chatbot_id.

---

### Q8-Q15 — Questions optionnelles

Toutes repondues ou avec hypothese acceptee. Voir tableau ci-dessus.

---

## Tracabilite

| Question | Document impacte | Section |
|----------|-----------------|---------|
| Q1 | docs/scope.md | Architecture, IN |
| Q2 | docs/brief.md | Contraintes techniques |
| Q3 | docs/scope.md | Integrations externes |
| Q4 | docs/scope.md | Roles et permissions |
| Q5 | docs/scope.md | Module Parcours Client |
| Q6 | docs/scope.md | Vue admin |
| Q7 | docs/scope.md | Module Chatbots |
| Q8-Q15 | docs/brief.md | Hypotheses |

---

## Historique des sessions

| Session | Date | Questions posees | Repondues |
|---------|------|------------------|-----------|
| 1 | 2026-04-06 | 15 | 11 + 4 hypotheses |

---

*Phase BREAK | Spec-to-Code Factory | 2026-04-06*
