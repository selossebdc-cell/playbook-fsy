# TASK-0014 — Role assistant et RLS restrictif

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0014 |
| **US Parent** | US-V2-003 |
| **EPIC** | EPIC-V2-001 |
| **Priorite** | P1 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 1 |
| **Couche** | Infrastructure |

---

## Objectif technique

Implementer les politiques RLS completes pour le role "assistant" (Laurie) sur toutes les tables V2 et les tables existantes. L'assistant a acces aux modules Chatbots, Outils, Parcours, Actions du client associe, mais pas aux donnees financieres (contracts, KPIs financiers).

### Ce qui est attendu
- [ ] Politiques RLS pour le role assistant sur toutes les tables V2
- [ ] Politique RLS restrictive sur `contracts` (pas d'acces assistant)
- [ ] Politique RLS restrictive sur `client_kpis` (assistant voit uniquement pct_automations, pas MRR/churn)
- [ ] Mecanisme d'association assistant-client (champ ou table d'association)
- [ ] Verification que l'admin garde acces a tout
- [ ] Verification que le client garde acces a ses donnees uniquement

### Ce qui n'est PAS attendu (hors scope)
- Code UI pour le role assistant (TASK-0015)
- Logique metier des modules
- Creation de nouveaux comptes Supabase Auth

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| assistant modules | Chatbots, Outils, Parcours, Actions du client associe |
| assistant exclusions | Pas d'acces : contracts, KPIs financiers (MRR, churn_rate) |
| assistant isolation | Ne voit que les donnees du client auquel elle est associee |
| admin | Acces a tout, tous les clients |
| client | Acces a ses propres donnees uniquement |

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables V2) | pending |
| Service externe | Supabase Dashboard | disponible |

---

## Fichiers concernes

### Fichiers a creer
- Script SQL RLS complet (a executer dans Supabase Dashboard)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| Migration SQL | Infrastructure | RLS policies | Securite par role |

---

## Plan d'implementation

1. **Definir l'association assistant-client** : Ajouter un champ `associated_client_id` dans profiles (pour les assistants) OU creer une table d'association
   - Recommandation : champ `associated_client_id uuid REFERENCES profiles(id)` dans profiles (plus simple)

2. **Politiques admin** : CREATE POLICY sur toutes les tables V2
   - FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))

3. **Politiques client** : CREATE POLICY sur les tables V2 liees a profile_id
   - FOR ALL USING (profile_id = auth.uid())

4. **Politiques assistant** : CREATE POLICY sur les tables autorisees
   - Chatbot_configs, chatbot_faq, chatbot_stats : acces via client_id = associated_client_id
   - Parcours_clients, parcours_phases, etc. : acces via profile_id = associated_client_id
   - Actions : acces via profile_id = associated_client_id
   - Contracts : DENY (pas de politique pour assistant)
   - client_kpis : filtre sur metric_name != 'MRR' AND metric_name != 'churn_rate' (ou deny complet)

5. **Politique restrictive contracts** : Bloquer l'assistant
   - DROP POLICY existante si elle donne acces a tous
   - CREATE POLICY "No assistant access" ON contracts FOR SELECT USING (role != 'assistant')

6. **Tests** : Verifier avec chaque role via Supabase Dashboard

---

## Definition of Done

- [ ] L'assistant ne peut pas lire la table contracts
- [ ] L'assistant ne peut pas lire les KPIs financiers (MRR, churn)
- [ ] L'assistant peut lire/ecrire les FAQ chatbot du client associe
- [ ] L'assistant peut lire le parcours du client associe
- [ ] L'assistant ne voit pas les donnees des autres clients
- [ ] L'admin garde acces a toutes les tables et tous les clients
- [ ] Le client garde acces uniquement a ses donnees
- [ ] Aucune regression sur les politiques existantes

---

## Tests attendus

### Tests manuels
- [ ] Test: Connexion Laurie (assistant) → pas d'acces a contracts
- [ ] Test: Connexion Laurie → lecture FAQ chatbot FSY → OK
- [ ] Test: Connexion Laurie → lecture parcours Aurelia → OK
- [ ] Test: Connexion Laurie → lecture parcours Fred → REFUSE
- [ ] Test: Connexion Catherine (admin) → acces a tout → OK
- [ ] Test: Connexion Aurelia (client) → acces a ses donnees uniquement → OK

### Cas limites a couvrir
- [ ] Assistant sans associated_client_id → aucune donnee visible
- [ ] Assistant essaie d'acceder via URL directe → refuse par RLS

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
