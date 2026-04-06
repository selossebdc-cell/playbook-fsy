# Brief — Playbook Process Face Soul Yoga

## Resume executif

**Contexte** : Catherine Selosse (CS Consulting Strategique) accompagne Aurelia, fondatrice de Face Soul Yoga, dans sa transformation digitale. FSY se restructure en 3 entites (FSY Studio B2C, Master The Method B2B, Aurelia Del Sol Premium) et migre de plateforme (Uscreen/Kajabi vers Circle). Aucun process operationnel n'est documente.

**Probleme** : Les taches sont dispersees, la vision calendaire est absente ("une retraite, il faut l'avoir 9 mois avant"), et Aurelia passe 80% de son temps en operationnel au lieu de piloter. Aurelia et Laurie n'ont aucun outil pour suivre les process complexes, savoir qui fait quoi, visualiser les echeances, reutiliser les process existants, ou communiquer sur l'avancement.

**Solution** : Un Playbook Process interactif — fichier HTML unique heberge sur GitHub Pages — qui permet de creer, suivre et reutiliser des process metier avec retro-planning automatique, assignation RACI, suivi de progression, et vision Gantt multi-process. Les donnees sont partagees entre utilisateurs via Supabase.

**Utilisateurs** : Aurelia (fondatrice, mobile-first, decisions strategiques), Laurie (assistante operationnelle, lead execution), Catherine (automatisations ponctuelles), VA et Externes (contributions ponctuelles).

**Valeur** : Passer d'un fonctionnement ad hoc a des process structures, delegables et reutilisables, pour reduire le temps operationnel d'Aurelia de 80% a moins de 30% en 6 mois.

<!-- V2:START -->

**Extension V2** : Le Portail Client V2 (espace.csbusiness.fr/app.html) et le Playbook sont en production avec Supabase (dcynlifggjiqqihincbp). Les donnees client sont eclatees dans 5+ fichiers HTML non lies, les dashboards KPI sont hardcodes, les chatbots ont leurs FAQ en dur dans n8n, et Laurie ne peut rien modifier sans Catherine.

**Solution V2** : Integrer 3 nouveaux modules en onglets dans app.html (Parcours Client, KPIs, Chatbots), avec donnees liees entre elles, role "assistant" pour Laurie, vue admin multi-clients pour Catherine, et chatbots WhatsApp/Telegram lisant les FAQ depuis Supabase.

<!-- V2:END -->

## Objectifs metier

1. **Structurer les operations** : documenter et suivre chaque process metier (migration, lancement, onboarding, retention) avec des etapes claires, des responsables RACI et des deadlines
2. **Gagner en autonomie** : Laurie et Aurelia gerent leurs process sans avoir besoin de Catherine au quotidien
3. **Anticiper** : vision calendaire long terme (retro-planning jusqu'a 9 mois) pour ne plus subir les echeances
4. **Reutiliser** : chaque process documente devient un template reutilisable (ex: lancer une formation 2x/an avec le meme playbook)
5. **Reduire le temps operationnel d'Aurelia** : de 80% a moins de 30% en 6 mois grace a des process delegables et suivis
6. **Piloter la croissance** : process de retention, upsell et animation communaute pour maximiser la LTV des membres

<!-- V2:START -->

7. **Centraliser** : un seul endroit (Portail V2 app.html) pour voir le parcours client, les KPIs et les chatbots
8. **Lier les donnees** : quand un email passe en "actif", le % d'automation se recalcule dans les KPIs
9. **Autonomiser Laurie/Aurelia** : elles editent les FAQ chatbot, mettent a jour les statuts outils, sans code ni n8n
10. **Templater les parcours** : un parcours type (FSY Studio, MTM, etc.) est reutilisable pour d'autres clients
11. **Mesurer** : KPIs horodates pour voir l'evolution (MRR, churn, abonnes, conversions)
12. **Alerter** : notifications configurables dans le portail (badge rouge quand un KPI depasse son seuil)

<!-- V2:END -->

## Personas

| Persona | Profil | Frequence | Device principal |
|---------|--------|-----------|-----------------|
| **Aurelia** (fondatrice) | 35 ans, tech-friendly (Claude, Canva), mobile-first. Donne les inputs strategiques et creatifs, valide (A). Fait elle-meme uniquement : decisions strategiques, tournage videos, lives, stories perso, accueil retraites | Quotidien | iPhone |
| **Laurie** (assistante) | Structuree, lead operationnel, gere tout le technique et l'execution. Responsible (R) de la majorite des etapes. Informe Aurelia | Quotidien | Desktop + mobile |
| **Catherine** (consultante/admin) | Uniquement les automatisations/liaisons inter-outils (webhooks, connexions API). Intervient une seule fois au setup initial, puis autonomie totale. En V2 : role admin, voit tous les clients, configure les parcours templates et les modules actifs par client | Ponctuel (Playbook) / Quotidien (Admin V2) | Desktop |
| **VA** (ponctuel) | Virtual assistant Upwork, taches specifiques (migration videos, upload) | Ponctuel | Desktop |
| **Externe** (ponctuel) | Videaste, graphiste, monteur — production de contenu | Ponctuel | — |

<!-- V2:START -->

### Personas V2 supplementaires

| Persona | Profil | Frequence | Device principal |
|---------|--------|-----------|-----------------|
| **Fred** (client) | Voit son parcours et KPIs (pas de chatbot) | 1x/semaine | Desktop |
| **Taina** (cliente) | Voit son parcours et KPIs (pas de chatbot) | 1x/semaine | Desktop |

### Roles Supabase V2

| Role | Acces | RLS |
|------|-------|-----|
| **admin** (Catherine) | Tous les clients, tous les modules, selecteur multi-clients | Bypass via policy specifique |
| **client** (Aurelia, Fred, Taina) | Son profil uniquement, modules actives par Catherine | profiles.id = auth.uid() |
| **assistant** (Laurie) | Chatbots, Outils, Parcours, Actions du client associe — pas de donnees financieres (contrats, KPIs financiers) | Policy restrictive par module |

<!-- V2:END -->

## Hypotheses explicites

### Hypotheses acceptees

| # | Hypothese | Statut | Source |
|---|-----------|--------|--------|
| H1 | Fichier unique HTML maintenu malgre Supabase (la lib Supabase est chargee en CDN externe, ce qui assouplit la contrainte 60 Ko) | Acceptee | Q2 |
| H2 | Jours calendaires pour le retro-planning (pas de jours ouvres ni gestion feries) | Acceptee | Q3 |
| H3 | Plusieurs instances du meme template sont possibles, chaque instance est independante | Acceptee | Q4 |
| H4 | "Autre" est un owner generique permanent, les ajouts sont en complement | Acceptee | Q5 |
| H5 | Pas de suppression d'un owner ajoute par erreur dans le MVP | Acceptee | Q6 |
| H6 | Palette de 6-8 couleurs max pour le Gantt (lisibilite avec beaucoup d'owners) | Acceptee | Q8 |
| H7 | Navigation : tabs en haut desktop, bottom nav mobile | Acceptee | Q10 |
| H8 | Les 3 vues sont imprimables via CSS @media print | Acceptee | Q11 |
| H9 | Date cible obligatoire meme pour un process vide | Acceptee | Q12 |
| H10 | Header en texte "Face Soul Yoga — Playbook", pas de logo | Acceptee | Q14 |
| H11 | Timing positif (post-Jour J) autorise dans les etapes | Acceptee | Q15 |
| H12 | Seul le timing relatif est editable (pas la date absolue directement) | Acceptee | Q18 |
| H13 | Confirmation demandee lors du changement de date cible | Acceptee | Q19 |
| H14 | Templates figes dans le code pour le MVP (non modifiables par l'utilisateur) | Acceptee | Q22 |
| H15 | Navigation clavier : boutons, checkboxes, inputs, dropdowns | Acceptee | Q23 |

### Decisions prises lors du challenge

| # | Decision | Impact | Source |
|---|----------|--------|--------|
| D1 | Supabase des le MVP (meme instance que portail client V2 : dcynlifggjiqqihincbp) — remplace localStorage | Partage des donnees entre Aurelia et Laurie, auth email+mdp | Q7, Q17, Q24 |
| D2 | Auth email + mot de passe (meme approche que portail client V2) | Un seul mode d'authentification | Q25 |
| D3 | Fichier unique + CDN Supabase (comme portail V2) | Architecture coherente avec les autres projets | Q26 |
| D4 | Scroll horizontal sur mobile pour le Gantt (meme rendu que desktop, tactile) | Pas de vue liste alternative sur mobile | Q9 |
| D5 | Process termines restent dans la liste avec badge "Termine", pas d'archivage MVP | Simplification | Q16 |
| D6 | Export/Import JSON en complement de Supabase (backup) | Double securite des donnees | Q21 |
| D7 | Bouton Dupliquer un process : copie, remet a zero, demande nouvelle date cible | Reutilisation facilitee | Q27 |
| D8 | Meme acces pour tous, pas de vue admin separee pour Catherine | Pas de multi-tenant MVP | Q28 |
| D9 | 11 templates pre-remplis (T1 a T10 + T5c en attente) — retravailles un par un avec Catherine | Challenger l'existant au lieu de reprendre tel quel | Q1 |
| D10 | Le terme "automatisation" est utilise dans les templates (pas "n8n" ni outil specifique) — Catherine choisit l'outil au moment de l'implementation | Flexibilite technique | Req. section 13 |
| D11 | Communication hybride : jalons comm dans chaque process (2-3 etapes cles) + T6 dedie transverse pour les micro-etapes | Reutilisabilite du plan comm sans duplication | Req. section 14 |
| D12 | RACI avec roles clairs : Aurelia = A strategique, Laurie = R operationnel, Catherine = R automatisations uniquement, VA = R execution technique, Externe = C/R production, Automatique = R etapes auto (Laurie = A) | Delegation claire | Req. section 13 |

### Hypotheses a verifier

| # | Hypothese | Risque |
|---|-----------|--------|
| HV1 | Repo GitHub dedie playbook-fsy avec URL custom possible (GitHub Pages) | A definir : repo exact et URL |

<!-- V2:START -->

### Hypotheses V2 acceptees

| # | Hypothese | Statut | Source |
|---|-----------|--------|--------|
| H16 | Structure mixte pour templates parcours : JSONB pour les templates, tables relationnelles pour les instances clients | Acceptee | Q10 |
| H17 | Stats chatbot en batch quotidien via n8n (pas de temps reel) | Acceptee | Q11 |
| H18 | WhatsApp Business API en mode 1:1 (a verifier avec Aurelia si groupes/Communities necessaires) | Acceptee | Q12 |
| H19 | RLS actif sur les tables existantes (a verifier et activer si necessaire) | Acceptee | Q14 |

### Decisions V2 prises lors du challenge

| # | Decision | Impact | Source |
|---|----------|--------|--------|
| D13 | Modules en onglets dans app.html (pas de fichiers separes) — modules actives par client via champ enabled_modules dans profiles | Architecture single-page, onglets conditionnels | Q1 |
| D14 | Auth = Supabase Auth (signInWithPassword), anciens portails chiffres AES = systeme parallele | RLS + policies par role | Q2 |
| D15 | WhatsApp = API WhatsApp Business d'Aurelia (deja en place), credentials a recuperer | Workflow n8n connecte a l'API existante | Q3 |
| D16 | Laurie = role "assistant" (acces Chatbots, Outils, Parcours, Actions — pas de donnees financieres) | Nouvelle valeur dans profiles.role + RLS specifique | Q4 |
| D17 | Parcours et Playbook lies des le depart — FK phase vers process (parcours_phases.playbook_process_id) | Lien cliquable dans l'UI vers le process correspondant | Q5 |
| D18 | Vue admin = selecteur de clients dans le header + modules actives par client (Catherine coche) | Champ enabled_modules (JSONB array) dans profiles | Q6 |
| D19 | KPIs = saisie manuelle pour le MVP (formulaire dans le portail) | Pas d'integration Stripe/Circle automatique | Q8 |
| D20 | Alertes = portail uniquement (badge rouge quand seuil depasse) | Pas d'alertes email/WhatsApp | Q9 |
| D21 | Charte graphique V2 = CS Consulting (#C27A5A terracotta, fond sombre #0f0f0f) — differente du design FSY du Playbook V1 | Coherence avec le portail client V2 existant | Q13 |
| D22 | Fallback chatbot = snapshot auto 1x/jour (n8n exporte FAQ vers JSON local sur VPS) | Resilience si Supabase down | Q15 |

<!-- V2:END -->

## Contraintes

### Non-fonctionnelles

| Contrainte | Valeur | Justification |
|------------|--------|---------------|
| Fichier unique | 1 seul fichier HTML (CSS + JS inline) + CDN Supabase | Simplicite de deploiement GitHub Pages |
| Backend | Supabase (CDN) — instance dcynlifggjiqqihincbp | Partage des donnees entre Aurelia et Laurie |
| Auth | Email + mot de passe (Supabase Auth) | Meme approche que portail client V2 |
| Mobile responsive | Utilisable sur iPhone/Android | Aurelia est mobile-first |
| Performance | Fluide avec 10-15 process, ~400 etapes, < 1s chargement | Usage reel estime |
| Print | Bouton imprimer la vue courante (CSS @media print) | Export papier pour reunions |
| Gantt mobile | Scroll horizontal (meme rendu que desktop, tactile) | Decision validee |
| Compatibilite | Chrome, Safari, Firefox recents | Pas de support IE |
| Code quality | JS lisible, fonctions nommees, pas de minification | Maintenabilite |
| Securite | Auth Supabase, pas de donnees sensibles | Basique |
| Accessibilite | Navigation clavier minimale, contrastes lisibles | Basique |
| Tests | Manuels uniquement pour le MVP | Fichier HTML unique |
| Documentation | Commentaires inline dans le code + section aide dans l'app | Pas de doc externe |

### Techniques

| Composant | Choix |
|-----------|-------|
| Langage | HTML / CSS / JavaScript vanilla |
| Persistance | Supabase (CDN) |
| Auth | Supabase Auth (email + mot de passe) |
| Hebergement | GitHub Pages |
| Fonts | Google Fonts (Playfair Display SC, Montserrat) |
| Design system | Tokens FSY : terracotta #B55B50, creme #FFFBF7, teal #033231 |
| Bundling | Aucun (fichier unique) |
| Dependances | Zero dependance npm — uniquement CDN |

### Priorite de degradation (si depassement 60 Ko)

F1 (Playbook) > F2 (Mes Taches) > F4 (Templates) > F3 (Timeline/Gantt)

<!-- V2:START -->

### Contraintes V2

#### Non-fonctionnelles V2

| Contrainte | Valeur | Justification |
|------------|--------|---------------|
| Architecture | Onglets dans app.html (single-page), pas de fichiers separes | Decision D13 — modules conditionnels par client |
| Performance | Chargement initial <3s sur mobile 4G | Aurelia mobile-first |
| Securite | RLS Supabase sur toutes les nouvelles tables | Isolation des donnees par client |
| Resilience | Chatbots fonctionnels meme si portail down (fallback JSON VPS) | Decision D22 |
| Charte graphique | CS Consulting : terracotta #C27A5A, fond sombre #0f0f0f, font Inter | Coherence portail V2 existant |
| Compatibilite | Chrome, Safari (iOS), Firefox — derniere version | Idem V1 |

#### Techniques V2

| Composant | Choix |
|-----------|-------|
| Frontend | HTML/CSS/JS vanilla (app.html existant), pas de framework |
| Backend | Supabase (dcynlifggjiqqihincbp, eu-north-1) — CDN @supabase/supabase-js |
| Hebergement frontend | GitHub Pages (espace.csbusiness.fr) |
| Hebergement chatbots | VPS OVH (srv921609.hstgr.cloud), workflows n8n |
| WhatsApp | API WhatsApp Business d'Aurelia (credentials a recuperer) |
| Telegram | Bot API existant (8 workflows n8n, migration FAQ vers Supabase) |
| Auth | Supabase Auth (signInWithPassword) |
| Tests | Manuels uniquement pour le MVP |
| Code | Fonctions pures pour la logique metier, separation 4 couches |

<!-- V2:END -->

## Questions en suspens

<!-- V2:START -->

> Voir le detail dans [docs/factory/questions-v2.md](factory/questions-v2.md)

| Statut | Nombre |
|--------|--------|
| Repondues | 11 |
| En attente | 0 |
| Hypotheses acceptees | 4 |
| Bloquantes | 0 |

<!-- V2:END -->

## References

- **Source V1** : [input/requirements.md](../input/requirements.md)
- **Source V2** : [input/requirements-2.md](../input/requirements-2.md)
- **Questions V1** : [docs/factory/questions.md](factory/questions.md)
- **Questions V2** : [docs/factory/questions-v2.md](factory/questions-v2.md)
- **Scope** : [docs/scope.md](scope.md)
- **Acceptance** : [docs/acceptance.md](acceptance.md)

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-31 | Analyst | Creation V1 — Playbook Process FSY |
| 2026-04-06 | Analyst | Extension V2 — Parcours Client + KPIs + Chatbots |

---

*Phase BREAK | Spec-to-Code Factory | V2 2026-04-06*
