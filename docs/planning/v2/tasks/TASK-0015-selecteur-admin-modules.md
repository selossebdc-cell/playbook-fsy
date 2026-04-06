# TASK-0015 — Selecteur multi-clients admin et modules actives

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0015 |
| **US Parent** | US-V2-002 |
| **EPIC** | EPIC-V2-001 |
| **Priorite** | P1 |
| **Estimation** | M (2-3h) |
| **Statut** | pending |
| **Sprint** | Sprint 1 |
| **Couche** | UI |

---

## Objectif technique

Implementer dans app.html le selecteur multi-clients (dropdown dans le header, visible uniquement pour role=admin), le mecanisme de modules actives par client (checkbox enabled_modules), et les onglets conditionnels (visibles selon enabled_modules du profil selectionne).

### Ce qui est attendu
- [ ] Dropdown selecteur de clients dans le header (admin uniquement)
- [ ] Chargement de la liste des profils (getAllProfiles) pour l'admin
- [ ] Basculement entre clients sans reconnexion (changement d'etat UI)
- [ ] Interface pour activer/desactiver les modules par client (checkboxes)
- [ ] Onglets conditionnels : seuls les modules actives sont affiches
- [ ] Le selecteur est invisible pour les roles client et assistant
- [ ] Charte CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter

### Ce qui n'est PAS attendu (hors scope)
- Contenu des onglets V2 (Parcours, KPIs, Chatbots)
- Logique metier des modules
- RLS (fait dans TASK-0014)

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Selecteur admin | Visible uniquement pour profiles.role = 'admin' |
| Basculement | Catherine bascule entre clients en un clic, sans se reconnecter |
| Modules | enabled_modules est un JSONB array dans profiles (ex: ['parcours', 'kpis', 'chatbots']) |
| Onglets conditionnels | Les onglets non actives ne sont pas rendus dans la navigation |
| Modules disponibles | parcours, kpis, chatbots (+ onglets existants toujours visibles) |

### Code existant pertinent

```javascript
// app.html — structure existante
// 9 onglets existants : Actions, Brain Dump, Mes outils, Sessions, Tutos,
// Mon projet, Automatisations, Mon contrat, + liens KPI + Playbook

// Supabase client deja initialise dans app.html
// Auth deja en place (signInWithPassword)
```

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | TASK-0013 (tables V2, enabled_modules) | pending |
| Task prerequise | TASK-0014 (role assistant) | pending |
| Code existant | app.html (portail V2 en production) | disponible |

---

## Fichiers concernes

### Fichiers a modifier
- `app.html` — header (selecteur), navigation (onglets conditionnels), section Application (logique admin)

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| app.html (section UI) | UI | Selecteur admin | Dropdown + onglets conditionnels |
| app.html (section Application) | Application | AdminManager | getAllProfiles, selectClient, toggleModules |
| app.html (section Infrastructure) | Infrastructure | db.profiles | Lecture/maj profiles |

---

## Plan d'implementation

1. **Infrastructure** : Ajouter les operations Supabase pour profiles
   - getAllProfiles() : lecture de tous les profils (admin uniquement)
   - updateModules(profileId, modules) : mise a jour de enabled_modules
   - Fichier: app.html (section Infrastructure)

2. **Application** : Logique admin
   - selectClient(profileId) : change l'etat courant, recharge les donnees
   - toggleModules(profileId, modules) : met a jour enabled_modules
   - getVisibleTabs(enabledModules) : retourne les onglets a afficher
   - Fichier: app.html (section Application)

3. **UI — Selecteur** : Dropdown dans le header
   - Visible uniquement si role = 'admin'
   - Liste des clients (full_name)
   - Evenement change → selectClient
   - Fichier: app.html (header)

4. **UI — Modules** : Interface de configuration
   - Panel accessible depuis le selecteur admin
   - Checkboxes pour chaque module (parcours, kpis, chatbots)
   - Sauvegarde automatique via toggleModules
   - Fichier: app.html (section admin)

5. **UI — Onglets conditionnels** : Filtrage dynamique
   - Lire enabled_modules du profil courant
   - Masquer les onglets V2 non actives
   - Les 9 onglets existants restent toujours visibles
   - Fichier: app.html (navigation)

---

## Definition of Done

- [ ] Catherine voit le selecteur de clients dans le header
- [ ] Catherine peut basculer entre Aurelia, Fred, Taina sans reconnexion
- [ ] Catherine peut activer/desactiver les modules par client
- [ ] Les onglets V2 apparaissent/disparaissent selon enabled_modules
- [ ] Les 9 onglets existants ne sont pas affectes
- [ ] Aurelia et Fred ne voient pas le selecteur
- [ ] Laurie ne voit pas le selecteur
- [ ] Le style respecte la charte CS Consulting

---

## Tests attendus

### Tests manuels
- [ ] Test: Connexion Catherine → selecteur visible dans le header
- [ ] Test: Connexion Aurelia → selecteur absent
- [ ] Test: Connexion Laurie → selecteur absent
- [ ] Test: Catherine selectionne Aurelia → les donnees Aurelia s'affichent
- [ ] Test: Catherine bascule vers Fred → les donnees Fred s'affichent
- [ ] Test: Catherine desactive KPIs pour Fred → l'onglet KPIs disparait pour Fred
- [ ] Test: Les 9 onglets existants restent toujours visibles

### Cas limites a couvrir
- [ ] Client sans enabled_modules (default []) → seuls les onglets V1 visibles
- [ ] Admin sans aucun client dans la base → selecteur vide, message informatif

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-04-05 | Scrum Master | Creation |
