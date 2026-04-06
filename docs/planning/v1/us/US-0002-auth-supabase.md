# US-0002 — Authentification Supabase

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | US-0002 |
| **EPIC** | EPIC-001 / EPIC-006 |
| **Priorite** | P1 |
| **Estimation** | M |
| **Statut** | draft |

---

## User Story

**En tant que** utilisateur (Aurelia, Laurie ou Catherine),
**je veux** me connecter avec mon email et mot de passe,
**afin de** acceder aux donnees du playbook de maniere securisee.

---

## Contexte / Valeur

L'application utilise Supabase Auth pour l'authentification. Les comptes sont crees manuellement dans le dashboard Supabase. Pas de self-registration. La session est persistee via localStorage par Supabase.

---

## Criteres d'acceptation

- [ ] Un formulaire login (email + mot de passe) s'affiche si l'utilisateur n'est pas connecte
- [ ] La connexion via supabase.auth.signInWithPassword fonctionne
- [ ] La session est persistee (pas de re-login a chaque visite)
- [ ] Un bouton logout est visible et fonctionnel
- [ ] Les erreurs sont affichees en francais ("Email ou mot de passe incorrect")
- [ ] L'application n'est visible qu'apres authentification

---

## Regles metier

| Regle | Description |
|-------|-------------|
| RG-01 | Auth par email + mot de passe uniquement |
| RG-02 | Comptes crees manuellement dans Supabase (pas de self-registration) |
| RG-03 | Meme acces pour tous les utilisateurs (pas de roles) |
| RG-04 | Session persistee via localStorage (Supabase natif) |
| RG-05 | Messages d'erreur en francais |

---

## Edge cases

| Cas | Comportement attendu |
|-----|---------------------|
| Mauvais identifiants | Message "Email ou mot de passe incorrect" |
| Session expiree | Redirection vers login avec message "Session expiree" |
| Supabase indisponible | Message "Erreur de connexion" |

---

## Strategie de tests

### Tests manuels
- Login avec identifiants valides
- Login avec identifiants invalides
- Logout et re-login
- Fermer et rouvrir le navigateur (persistence session)

---

## Impacts

### Securite
- [ ] Authentification requise: oui (Supabase Auth)
- [ ] HTTPS: oui (GitHub Pages SSL)

---

## Dependances

### US prerequises
- US-0001 : Setup projet (Supabase JS charge)

### Dependances techniques
- Supabase Auth (instance dcynlifggjiqqihincbp)

---

## Tasks associees

| Task ID | Titre | Estimation | Statut |
|---------|-------|------------|--------|
| TASK-0002 | Couche Infrastructure — client Supabase et auth | 1-2h | pending |

---

## References

- **EPIC** : [EPIC-001](../epics.md#epic-001)
- **ADR** : ADR-0001 — Stack technique

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
