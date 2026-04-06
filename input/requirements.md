# Requirements — Playbook Process Face Soul Yoga

## 1. Contexte & Problème

Catherine Selosse (CS Consulting Stratégique) accompagne Aurélia, fondatrice de Face Soul Yoga, dans sa transformation digitale. Face Soul Yoga est en pleine restructuration : séparation en 3 entités (FSY Studio B2C, Master The Method B2B, Aurélia Del Sol Premium), migration de plateforme (Uscreen/Kajabi → Circle), et mise en place de process opérationnels.

L'équipe au quotidien : Aurélia (fondatrice), Laurie (assistante opérationnelle), et ponctuellement des VA (Virtual Assistants) recrutées sur Upwork.

**Le problème** : aucun process n'est documenté, les tâches sont dispersées, la vision calendaire est absente ("une retraite, il faut l'avoir 9 mois avant"), et Aurélia passe 80% de son temps en opérationnel au lieu de piloter. Aurélia et Laurie n'ont aucun outil pour suivre les process complexes, savoir qui fait quoi, visualiser les échéances, réutiliser les process existants, ou communiquer sur l'avancement.

## 2. Objectifs métier

1. **Structurer les opérations** : documenter et suivre chaque process métier (migration, lancement, onboarding, rétention) avec des étapes claires, des responsables RACI et des deadlines
2. **Gagner en autonomie** : Laurie et Aurélia gèrent leurs process sans avoir besoin de Catherine au quotidien
3. **Anticiper** : vision calendaire long terme (rétro-planning jusqu'à 9 mois) pour ne plus subir les échéances
4. **Réutiliser** : chaque process documenté devient un template réutilisable (ex: lancer une formation 2x/an avec le même playbook)
5. **Réduire le temps opérationnel d'Aurélia** : de 80% à moins de 30% en 6 mois grâce à des process délégables et suivis
6. **Piloter la croissance** : process de rétention, upsell et animation communauté pour maximiser la LTV des membres

## 3. Utilisateurs / Personas

| Persona | Profil | Fréquence d'usage | Device principal |
|---------|--------|-------------------|-----------------|
| **Aurélia** (fondatrice) | 35 ans, tech-friendly (Claude, Canva), mobile-first. Donne les inputs stratégiques et créatifs, valide (A). Fait elle-même uniquement : décisions stratégiques, tournage vidéos, lives, stories perso, accueil retraites | Quotidien | iPhone |
| **Laurie** (assistante) | Structurée, lead opérationnel, gère tout le technique et l'exécution. Responsable (R) de la majorité des étapes. Informe Aurélia | Quotidien | Desktop + mobile |
| **Catherine** (consultante) | Uniquement les automatisations/liaisons inter-outils (webhooks, connexions API). Jamais le contenu, les tunnels, les séquences emails, les pages de vente, ni le setup des outils. Intervient une seule fois au setup initial, puis autonomie totale | Ponctuel | Desktop |
| **VA** (ponctuel) | Virtual assistant Upwork, tâches spécifiques (migration vidéos, upload) | Ponctuel | Desktop |
| **Externe** (ponctuel) | Vidéaste, graphiste, monteur — production de contenu | Ponctuel | — |

## 4. Parcours utilisateurs

### Parcours 1 : Créer et suivre un nouveau process
1. L'utilisateur ouvre le Playbook → sélectionne un template (ex: "Lancer une formation")
2. Entre un nom et une date cible (Jour J) → toutes les dates se calculent automatiquement en rétro-planning
3. Le process apparaît dans la liste avec sa barre d'avancement (0%)
4. L'utilisateur clique sur le process → voit toutes les étapes avec RACI, dates, statuts
5. Coche les étapes au fur et à mesure → la barre progresse
6. Les étapes en retard passent en rouge automatiquement

### Parcours 2 : Consulter ses tâches personnelles
1. L'utilisateur va dans "Mes tâches" → filtre par son nom (ex: "Laurie")
2. Voit toutes ses tâches (R ou A) de tous les process, triées par date
3. Les retards sont visibles en rouge immédiatement
4. Clic sur une tâche → accède au process source pour plus de contexte

### Parcours 3 : Voir la vision globale (Timeline)
1. L'utilisateur ouvre la Timeline → voit tous les process en mode Gantt
2. Chaque process = 1 ligne avec ses étapes positionnées dans le temps
3. Marqueurs "Aujourd'hui" et "Jour J" pour se repérer
4. Peut filtrer sur un seul process pour zoomer

### Parcours 4 : Adapter un process en cours
1. L'utilisateur ouvre un process → ajoute une nouvelle étape
2. Modifie le titre, la description, le RACI et le timing d'une étape existante
3. Supprime une étape devenue inutile
4. Réordonne les étapes avec les flèches haut/bas

## 5. Fonctionnalités attendues

### F1 — Vue Playbook (gestion des process)
- Sélecteur de template (11 templates pré-remplis + "Process vide")
- Catégories de templates : Projet, Lancement, Cycle, Cycle continu, Transverse
- Champ nom + date cible (Jour J) → calcul automatique des dates
- Liste des process actifs avec barre d'avancement globale (%)
- Vue détaillée : étapes avec checkbox, titre/description éditables, RACI (4 dropdowns), timing relatif (J-90, Jour J, J+7...), date absolue calculée, indicateurs visuels (vert/rouge/gris)
- Sections dans les étapes (en-têtes de regroupement : CONCEPTION, PRODUCTION, etc.)
- CRUD étapes : ajouter, supprimer, réordonner (flèches haut/bas)
- Bouton "+ Nouvelle personne" dans les dropdowns RACI
- Bouton Dupliquer un process (copie, remet à zéro, demande nouvelle date cible)
- Process terminés restent en liste avec badge "Terminé"

### F2 — Vue Mes Tâches (filtrée par personne)
- Filtres par personne (R ou A) + "Toutes"
- Agrégation des tâches de tous les process actifs
- Tri par date, indicateur de retard en rouge
- Navigation vers le process source au clic

### F3 — Vue Timeline (Gantt multi-process)
- Mode "Tous les process" : Gantt multi-lignes (1 ligne par process, dots colorés par owner R, barre d'avancement)
- Mode "Un seul process" : timeline horizontale classique
- Marqueurs "Aujourd'hui" (rouge) et "Jour J" (terracotta)
- Mois sur la frise, légende dynamique, tooltips au survol

### F4 — Templates de process pré-remplis (11 templates)

#### Projets
- **T1** : Créer un espace Circle (30 étapes, J-21 → Jour J)
- **T2** : Migrer un contenu existant vers Circle (35 étapes, J-90 → J+30)

#### Lancements
- **T3** : Lancer une formation en ligne (42 étapes, J-120 → J+120)
- **T4** : Lancer un challenge recrutement (29 étapes, J-60 → J+15)
- **T7** : Lancer une retraite (50 étapes, J-270 → J+30)

#### Cycles (déclenchés par événement)
- **T5a** : Onboarder un nouveau membre Studio B2C (18 étapes, Jour J → J+30)
- **T5b** : Onboarder une certifiée MTM B2B (30 étapes, Jour J → J+120)
- **T5c** : Onboarder Aurélia Del Sol Premium (à définir — en attente)
- **T8** : Gérer une licence annuelle (28 étapes, cycle J → J+375)

#### Cycles continus (récurrents)
- **T9** : Animer et retenir les abonnées Studio B2C (17 étapes, cycle mensuel)
- **T10** : Animer la communauté certifiées MTM (16 étapes, cycle trimestriel)

#### Transverse
- **T6** : Plan de communication lancement (33 étapes, J-30 → Jour J) — déclenché depuis les jalons comm des autres templates, partage le même Jour J

### F5 — Persistance
- Supabase dès le MVP (même instance que portail client V2 : dcynlifggjiqqihincbp)
- Auth email + mot de passe
- Export/Import JSON en complément (backup)

## 6. Données manipulées

### Process
- id (string unique)
- name (string)
- dateCible (date ISO)
- template (string — nom du template source)
- category (string — Projet | Lancement | Cycle | Cycle continu | Transverse)
- steps (array of Step)
- createdAt (datetime)
- status (string — actif | terminé)

### Step (Étape)
- id (string unique)
- title (string, éditable)
- desc (string, éditable, optionnel)
- section (string, optionnel — en-tête de regroupement : "CONCEPTION", "PRODUCTION", etc.)
- raci (object RACI)
  - r (string — Responsible, qui fait)
  - a (string — Accountable, qui valide/décide)
  - c (string, optionnel — Consulted, qui donne son avis)
  - i (string, optionnel — Informed, qui est tenu au courant)
- timing (integer — décalage en jours par rapport à Jour J, ex: -90, 0, +7)
- recurrence (string, optionnel — "mensuel", "trimestriel", "annuel" pour les cycles continus)
- done (boolean)
- order (integer — position dans la liste)

### Owners (personnes)
- Liste dynamique : ['Aurélia', 'Laurie', 'Catherine', 'VA', 'Automatique', 'Externe'] + ajout libre
- Persistée en Supabase
- Affichage : initiales colorées en lecture (pastilles), dropdowns en édition

## 7. Contraintes non-fonctionnelles

| Contrainte | Valeur | Justification |
|------------|--------|---------------|
| Fichier unique | 1 seul fichier HTML (CSS + JS inline) + CDN Supabase | Simplicité de déploiement GitHub Pages |
| Backend | Supabase (CDN) | Partage des données entre Aurélia et Laurie |
| Auth | Email + mot de passe | Même approche que portail client V2 |
| Mobile responsive | Utilisable sur iPhone/Android | Aurélia est mobile-first |
| Performance | Fluide avec 10-15 process, ~400 étapes | Usage réel estimé (11 templates, cycles continus) |
| Print | Bouton imprimer la vue courante | Export papier pour réunions |
| Gantt mobile | Scroll horizontal (même rendu que desktop, tactile) | Décision validée |

## 8. Hors-scope explicite

- Notifications email ou push (V2 : rappels automatiques aux personnes en retard)
- Commentaires sur les étapes
- Pièces jointes / upload de fichiers
- Synchronisation temps réel entre utilisateurs
- Historique des modifications (audit trail)
- Validation par le A (Accountable) avec traçage (qui a validé, quand) — workflow 2 étapes : R coche → A confirme
- Intégration calendrier (Google Calendar, Fantastical)
- Mode sombre
- Multi-langue (français uniquement)
- Drag & drop pour le réordonnancement (flèches haut/bas suffisent)
- Vue admin séparée pour Catherine (même accès pour tous)
- T5c Onboarding Aurélia Del Sol Premium (à définir ultérieurement)

## 9. Critères d'acceptation

| # | Critère | Méthode de validation |
|---|---------|----------------------|
| CA1 | Créer un process depuis un template avec date cible → les dates se calculent automatiquement | Test manuel : sélectionner "Lancer une retraite", date 15/12/2026 → vérifier J-270 = ~20/03/2026 |
| CA2 | Cocher une étape met à jour la progression globale et par process | Test manuel : cocher 5 étapes sur 30 → vérifier 17% affiché |
| CA3 | Filtrer les tâches par personne (R ou A) dans "Mes tâches" | Test manuel : filtre "Laurie" → seules ses tâches apparaissent |
| CA4 | Vue Gantt multi-process avec 2+ process | Test manuel : créer 2 process → vérifier 2 lignes dans le Gantt |
| CA5 | Ajouter une nouvelle personne et la retrouver dans les dropdowns RACI | Test manuel : "+ Nouvelle personne" → "Anam" → vérifier persistance après reload |
| CA6 | Éditer titre, description, RACI et timing d'une étape | Test manuel : modifier → reload → vérifier sauvegarde |
| CA7 | Les données persistent après rechargement (Supabase) | Test manuel : créer process → reload → tout est là |
| CA8 | Responsive mobile : 3 vues navigables sur iPhone | Test manuel sur device ou DevTools mobile |
| CA9 | Étapes en retard en rouge, étapes terminées en vert | Test manuel : date passée non cochée → bordure rouge |
| CA10 | Imprimer la vue courante proprement | Test manuel : bouton Imprimer → aperçu correct |
| CA11 | RACI affiché en pastilles initiales colorées, éditable en dropdowns | Test manuel : vérifier affichage + édition RACI |
| CA12 | Dupliquer un process → copie avec statut remis à zéro, nouvelle date cible demandée | Test manuel |
| CA13 | Sections d'étapes (en-têtes) visibles dans la vue détaillée | Test manuel : ouvrir un process → vérifier les sections |
| CA14 | Partage des données entre Aurélia et Laurie via Supabase | Test : 2 navigateurs, même compte ou comptes différents → mêmes données |

## 10. Intégrations externes

| Service | Usage | Type |
|---------|-------|------|
| Google Fonts | Playfair Display SC + Montserrat | CDN (lecture seule) |
| GitHub Pages | Hébergement statique | Déploiement |
| Supabase | Persistance + auth | CDN (même instance portail V2) |

Aucune autre API tierce, aucune dépendance npm.

## 11. Stack / Préférences techniques

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Langage | HTML / CSS / JavaScript vanilla | Pas de framework, fichier unique, zéro dépendance |
| Persistance | Supabase (CDN) | Partage des données entre utilisateurs |
| Auth | Supabase Auth (email + mot de passe) | Même instance que portail V2 |
| Hébergement | GitHub Pages | Gratuit, custom domain, SSL |
| Fonts | Google Fonts (Playfair Display SC, Montserrat) | Identité FSY |
| Design system | Tokens FSY (terracotta #B55B50, crème #FFFBF7, teal #033231) | Cohérence avec facesoulyoga.com |
| Bundling | Aucun (fichier unique) | Simplicité maximale |

## 12. Qualité attendue

| Dimension | Niveau | Détail |
|-----------|--------|--------|
| Tests | Manuel | Pas de tests automatisés pour le MVP (fichier HTML unique) |
| Performance | < 1s de chargement | Fichier unique + CDN, pas de requêtes réseau lourdes |
| Accessibilité | Basique | Navigation clavier minimale, contrastes lisibles |
| Compatibilité | Chrome, Safari, Firefox récents | Pas de support IE |
| Code quality | JS lisible | Fonctions nommées, pas de minification |
| Sécurité | Basique | Auth Supabase, pas de données sensibles |
| Documentation | Inline | Commentaires dans le code + section aide dans l'app |

## 13. Règles RACI globales

Ces règles s'appliquent à TOUS les templates :

1. **Aurélia** = Accountable (A) sur les décisions stratégiques et créatives. Responsible (R) uniquement sur ce qu'elle seule peut faire (tourner ses vidéos, ses lives, ses stories, accueillir en retraite, décisions pricing/concept)
2. **Laurie** = Responsible (R) sur tout le reste (technique, opérationnel, rédaction, setup outils, séquences email, tunnels, visuels). Elle informe Aurélia
3. **Catherine** = Responsible (R) uniquement sur les automatisations/liaisons inter-outils (webhooks, connexions API type Circle↔Brevo). Jamais le contenu, les tunnels, les séquences, les pages de vente. Intervient une seule fois au setup initial pour créer les automatisations, puis autonomie totale
4. **VA** = Responsible (R) sur les tâches d'exécution technique (upload vidéos, migration contenu)
5. **Externe** = Consulted (C) ou Responsible (R) sur la production (montage vidéo, graphisme)
6. **Automatique** = Responsible (R) sur les étapes déclenchées automatiquement (emails Brevo, webhooks Stripe). Laurie est Accountable (A)
7. Les champs C et I du RACI sont optionnels
8. Le terme "automatisation" est utilisé dans les templates (pas "n8n" ni autre outil spécifique) — Catherine choisit l'outil au moment de l'implémentation

## 14. Communication — approche hybride

La communication de lancement suit une approche hybride :

1. **Jalons comm dans chaque process** : 2-3 étapes clés (valider le plan comm, lancement teasing, annonce officielle) intégrées dans les templates de lancement (T3, T4, T7)
2. **T6 dédié "Plan de communication lancement"** : template transverse déclenché manuellement depuis un jalon comm, qui détaille toutes les micro-étapes (calendrier éditorial, posts, emails, stories, countdowns)
3. **Emails spécifiques à un process** (ex: emails de transition migration T2) restent dans le process concerné car ils sont spécifiques et non réutilisables

## 15. Templates détaillés

### T1 — Créer un espace Circle (30 étapes, J-21 → Jour J)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **CONCEPTION** | | | | | |
| 1 | Définir l'offre et le positionnement (nom, prix, description, public cible) | Aurélia | Aurélia | | Laurie | J-21 |
| 2 | Lister le contenu prévu (types, quantité, format vidéo/texte/audio) | Aurélia | Aurélia | | Laurie | J-21 |
| | **SETUP CIRCLE** | | | | | |
| 3 | Créer le compte Circle Business (ou ajouter un espace si existant) | Laurie | Aurélia | | | J-20 |
| 4 | Configurer l'espace (nom, description, branding, logo, couleurs) | Laurie | Aurélia | | | J-19 |
| 5 | Créer les visuels : bannière, cover, icônes des sections | Laurie | Aurélia | | | J-19 |
| 6 | Configurer le domaine custom (si applicable) | Laurie | Laurie | | | J-18 |
| 7 | Connecter Stripe au checkout (prix, devise, période d'essai) | Laurie | Laurie | | Aurélia | J-18 |
| 8 | Créer les catégories/collections de contenu | Laurie | Aurélia | | | J-17 |
| 9 | Rédiger les descriptions de chaque section/collection | Laurie | Aurélia | | | J-17 |
| 10 | Configurer les niveaux d'accès (gratuit vs payant, visibilité) | Laurie | Aurélia | | | J-15 |
| 11 | Configurer les tags/labels membres | Laurie | Laurie | | | J-15 |
| | **CONTENU** | | | | | |
| 12 | Ajouter le contenu initial (minimum 5-10 éléments) | Laurie | Aurélia | | | J-14 |
| 13 | Configurer le drip content si applicable (déblocage progressif) | Laurie | Aurélia | | | J-13 |
| | **COMMUNAUTÉ** | | | | | |
| 14 | Configurer la communauté (règles, canaux, modération) | Laurie | Aurélia | | | J-12 |
| 15 | Configurer les notifications Circle (fréquence, types) | Laurie | Laurie | | | J-12 |
| 16 | Configurer le calendrier d'événements (si applicable) | Laurie | Aurélia | | | J-10 |
| 17 | Configurer l'email de bienvenue automatique dans Circle | Laurie | Aurélia | | | J-10 |
| 18 | Rédiger le guide "Premiers pas" pour les nouveaux membres | Laurie | Aurélia | | | J-9 |
| | **AUTOMATISATION** | | | | | |
| 19 | Connecter Circle ↔ Brevo (webhook/automatisation) | Catherine | Catherine | | Laurie | J-8 |
| | **TEST** | | | | | |
| 20 | Créer la page d'inscription / lien de partage | Laurie | Laurie | | | J-7 |
| 21 | Vérifier le rendu mobile (navigation, contenu, checkout) | Laurie | Laurie | | | J-7 |
| 22 | Test complet : inscription → paiement → accès → navigation → contenu | Aurélia | Aurélia | Laurie | | J-7 |
| 23 | Corriger les problèmes identifiés lors du test | Laurie | Laurie | | | J-5 |
| 24 | Préparer la FAQ (questions anticipées des membres) | Laurie | Aurélia | | | J-4 |
| | **COMMUNICATION** | | | | | |
| 25 | **JALON COMM** — Valider le plan comm (déclencher T6) | Aurélia | Aurélia | | Laurie | J-14 |
| 26 | **JALON COMM** — Lancement communication (teasing) | Aurélia | Aurélia | | Laurie | J-12 |
| | **BÊTA & LANCEMENT** | | | | | |
| 27 | Inviter 3-5 bêta-testeuses | Aurélia | Aurélia | | Laurie | J-3 |
| 28 | Intégrer les retours bêta et ajustements finaux | Laurie | Laurie | | Aurélia | J-1 |
| 29 | **JALON COMM** — Annonce officielle | Aurélia | Aurélia | | Laurie | Jour J |
| 30 | Ouverture officielle | Aurélia | Aurélia | | Laurie | Jour J |

### T2 — Migrer un contenu existant vers Circle (35 étapes, J-90 → J+30)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **PRÉPARATION** | | | | | |
| 1 | Inventaire complet du contenu à migrer (nombre, format, taille, catégories) | Laurie | Aurélia | | | J-90 |
| 2 | Décision : quels contenus garder, archiver, supprimer | Aurélia | Aurélia | | Laurie | J-85 |
| 3 | Mapping URLs anciennes → nouvelles (pour redirections) | Laurie | Laurie | | | J-83 |
| 4 | Recruter/briefer la VA pour la migration technique | Laurie | Laurie | | Aurélia | J-80 |
| 5 | Clause NDA dans le contrat de la VA | Laurie | Aurélia | | | J-80 |
| 6 | Sauvegarder/archiver l'intégralité de l'ancienne plateforme | Laurie | Laurie | | | J-78 |
| | **INFRASTRUCTURE TECHNIQUE** | | | | | |
| 7 | Configurer Bunny.net comme CDN vidéo (si vidéos) | Laurie | Laurie | VA | | J-75 |
| 8 | Export complet depuis la plateforme source | VA | Laurie | | | J-70 |
| 9 | Upload vers Bunny.net (par batch) | VA | Laurie | | | J-65 |
| 10 | Tester chaque vidéo Bunny.net après upload (lecture, qualité, sous-titres) | VA | Laurie | | | J-60 |
| | **CONSTRUCTION CIRCLE** | | | | | |
| 11 | Créer la structure dans Circle (espaces, collections, catégories) | Laurie | Aurélia | | | J-60 |
| 12 | Import du contenu dans Circle (intégrer vidéos Bunny.net, textes, fichiers) | VA | Laurie | | | J-55 |
| 13 | Organiser et ordonner le contenu (ordre des modules, progression logique) | Laurie | Aurélia | | | J-50 |
| 14 | Vérifier CHAQUE contenu migré (lien fonctionne, vidéo se lance, texte OK) | Laurie | Laurie | VA | | J-45 |
| 15 | Configurer le checkout et les accès (Stripe, niveaux, période d'essai) | Laurie | Laurie | | Aurélia | J-40 |
| 16 | Migrer les données membres (emails, historique d'achat, accès) | Laurie | Laurie | | | J-38 |
| 17 | Configurer les automatisations Brevo pour le nouvel espace (liaisons Circle ↔ Brevo) | Catherine | Catherine | | Laurie | J-36 |
| 18 | Test parcours complet : inscription → paiement → accès → navigation → chaque contenu | Aurélia | Aurélia | Laurie | | J-35 |
| | **COMMUNICATION MIGRATION** | | | | | |
| 19 | Préparer le plan de communication aux membres existants | Laurie | Aurélia | | | J-30 |
| 20 | Email 1 : "Votre expérience évolue !" (annonce positive) | Laurie | Aurélia | | | J-30 |
| 21 | Identifier les abonnés Apple/Google In-App (ne migrent PAS automatiquement) | Laurie | Laurie | | Aurélia | J-21 |
| 22 | Email dédié aux abonnés Apple/Google avec procédure de migration | Laurie | Aurélia | | | J-21 |
| 23 | Prévenir les partenaires/affiliés si applicable | Aurélia | Aurélia | | Laurie | J-21 |
| 24 | Email 2 : "Comment ça va se passer" + FAQ + guide visuel | Laurie | Aurélia | | | J-14 |
| 25 | Inviter un groupe bêta (10 membres motivés) sur Circle | Laurie | Aurélia | | | J-7 |
| 26 | Email 3 : "C'est pour bientôt !" + lien pré-inscription | Laurie | Aurélia | | | J-7 |
| 27 | Intégrer retours bêta, ajustements | Laurie | Laurie | | Aurélia | J-3 |
| | **JOUR J & POST-MIGRATION** | | | | | |
| 28 | Email 4 : "Bienvenue sur votre nouvel espace !" + lien direct | Laurie | Aurélia | | | Jour J |
| 29 | Activer les redirections depuis l'ancienne plateforme | Laurie | Laurie | | | Jour J |
| 30 | Mettre à jour les liens partout (site web, bio Instagram, emails auto, signatures) | Laurie | Laurie | | Aurélia | Jour J |
| 31 | Email 5 : "Tout se passe bien ?" + relance non-connectés | Laurie | Aurélia | | | J+7 |
| 32 | Suivi post-migration (taux de reconnexion, tickets support) | Laurie | Laurie | | Aurélia | J+14 |
| 33 | Période de coexistence (ancien + nouveau accessibles) | Laurie | Aurélia | | | J+14 |
| 34 | Fermeture définitive ancienne plateforme | Laurie | Aurélia | | | J+30 |
| 35 | Suppression des apps custom des stores si applicable | Laurie | Laurie | | Aurélia | J+30 |

### T3 — Lancer une formation en ligne (42 étapes, J-120 → J+120)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **CONCEPTION** | | | | | |
| 1 | Définir le concept (thème, public cible, transformation promise, durée) | Aurélia | Aurélia | | Laurie | J-120 |
| 2 | Structurer le programme (modules, leçons, progression, livrables par module) | Laurie | Aurélia | | | J-110 |
| 3 | Valider le pricing (prix plein, early bird, modalités de paiement) | Aurélia | Aurélia | | Laurie | J-105 |
| 4 | Définir le contenu juridique (CGV, mentions légales, droit de rétractation) | Laurie | Aurélia | | | J-100 |
| | **PRODUCTION** | | | | | |
| 5 | Planifier le calendrier de tournage/production | Laurie | Aurélia | | | J-100 |
| 6 | Tourner les vidéos (par batch de modules) | Aurélia | Aurélia | | | J-95 |
| 7 | Envoyer les rushes au monteur externe | Laurie | Laurie | | Aurélia | J-90 |
| 8 | Créer les supports PDF/workbooks/exercices | Laurie | Aurélia | | | J-85 |
| 9 | Réceptionner et valider les vidéos montées | Aurélia | Aurélia | Laurie | | J-75 |
| 10 | Créer le quiz de certification | Laurie | Aurélia | | | J-70 |
| 11 | Relecture/validation finale de tous les contenus | Aurélia | Aurélia | Laurie | | J-65 |
| | **SETUP TECHNIQUE** | | | | | |
| 12 | Configurer l'espace Circle (structure, modules, accès, checkout Stripe) | Laurie | Laurie | | Aurélia | J-60 |
| 13 | Configurer le paiement en plusieurs fois (si applicable) | Laurie | Laurie | | Aurélia | J-58 |
| 14 | Importer le contenu finalisé dans Circle | Laurie | Laurie | | | J-55 |
| 15 | Configurer le drip content (déblocage progressif des modules) | Laurie | Laurie | | Aurélia | J-50 |
| 16 | Écrire la page de vente (hook, pain points, transformation, FAQ, CTA) | Laurie | Aurélia | | | J-50 |
| 17 | Créer/commander les visuels page de vente (photos, mockups) | Laurie | Aurélia | Externe | | J-48 |
| 18 | Préparer les réponses aux objections / FAQ vente | Laurie | Aurélia | | | J-45 |
| 19 | Automatiser le contrat e-signature (automatisation : achat → envoi contrat → signature → accès) | Catherine | Catherine | | Laurie | J-45 |
| 20 | Créer le lead magnet associé (guide, webinar gratuit, mini-cours) | Laurie | Aurélia | | | J-40 |
| 21 | Préparer la séquence email de lancement (7-8 emails, nurturing + urgence douce) | Laurie | Laurie | | Aurélia | J-40 |
| 22 | Configurer le tunnel : lead magnet → séquence nurturing → page de vente | Laurie | Laurie | | | J-35 |
| 23 | Configurer la relance panier abandonné | Laurie | Laurie | | | J-35 |
| 24 | Configurer l'email post-achat (facture + accès + bienvenue) | Laurie | Laurie | | | J-33 |
| 25 | Test complet : inscription → paiement → contrat → accès → formation → quiz → certification | Aurélia | Aurélia | Laurie | | J-30 |
| 26 | Corriger les problèmes identifiés | Laurie | Laurie | | Aurélia | J-28 |
| 27 | Former Laurie sur la gestion des inscriptions/SAV | Laurie | Laurie | | | J-25 |
| | **PRÉ-LANCEMENT** | | | | | |
| 28 | **JALON COMM** — Valider le plan comm (déclencher T6) | Aurélia | Aurélia | | Laurie | J-30 |
| 29 | Pré-lancement : teasing sur Instagram/email, liste d'attente early bird | Aurélia | Aurélia | | Laurie | J-21 |
| 30 | Ouvrir les inscriptions early bird (prix réduit, durée limitée) | Aurélia | Aurélia | | Laurie | J-14 |
| 31 | **JALON COMM** — Lancement communication intensive | Aurélia | Aurélia | | Laurie | J-14 |
| 32 | Lancer la séquence email de lancement (email 1/8) | Automatique | Laurie | | | J-14 |
| 33 | Intensifier la communication (stories, posts, emails) | Aurélia | Aurélia | | Laurie | J-7 |
| 34 | Email "Dernier jour early bird" | Automatique | Laurie | | | J-7 |
| 35 | Email "Plus que 3 jours" | Automatique | Laurie | | | J-3 |
| | **LANCEMENT** | | | | | |
| 36 | **JALON COMM** — Lancement officiel au prix plein | Aurélia | Aurélia | | Laurie | Jour J |
| 37 | Email de bienvenue + accès + planning formation | Automatique | Laurie | | | J+1 |
| | **POST-LANCEMENT** | | | | | |
| 38 | Email "Comment se passe votre première semaine ?" | Automatique | Laurie | | | J+7 |
| 39 | Point d'étape mi-formation (email encouragement + stats progression) | Automatique | Laurie | | Aurélia | J+30 |
| 40 | Fin de formation → quiz certification → kit communication "Certifiée" | Automatique | Laurie | | Aurélia | J+90 |
| 41 | Proposer la licence annuelle (→ déclencher T8) | Automatique | Aurélia | | Laurie | J+90 |
| 42 | Débrief lancement : inscrits, CA, taux complétion, retours → ajuster | Aurélia | Aurélia | Laurie | | J+120 |

### T4 — Lancer un challenge recrutement (29 étapes, J-60 → J+15)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **CONCEPTION** | | | | | |
| 1 | Définir le thème du challenge (aligné avec une douleur du public cible) | Aurélia | Aurélia | | Laurie | J-60 |
| 2 | Structurer le challenge (durée, nombre de jours, contenu quotidien, objectif) | Laurie | Aurélia | | | J-55 |
| 3 | Définir les règles (engagement demandé, ce qu'on gagne, conditions) | Laurie | Aurélia | | | J-55 |
| 4 | Définir l'offre de fin de challenge (réduction FSY Studio, durée limitée) | Aurélia | Aurélia | | Laurie | J-50 |
| | **PRODUCTION** | | | | | |
| 5 | Produire le contenu du challenge (vidéos courtes, exercices, messages quotidiens) | Aurélia | Aurélia | | Laurie | J-50 |
| 6 | Rédiger le contenu de chaque email quotidien | Laurie | Aurélia | | | J-45 |
| 7 | Créer la landing page d'inscription (formulaire email → Brevo) | Laurie | Laurie | | Aurélia | J-45 |
| 8 | Préparer la séquence email challenge (1 email/jour + email final avec offre) | Laurie | Laurie | | | J-40 |
| 9 | Préparer les visuels de promotion (Instagram, stories, reels) | Laurie | Aurélia | | | J-35 |
| | **SETUP TECHNIQUE** | | | | | |
| 10 | Configurer le groupe/espace temporaire (Circle ou Telegram, au choix) | Laurie | Laurie | | Aurélia | J-30 |
| 11 | Préparer le groupe (message d'accueil, règles, épinglés) | Laurie | Laurie | | | J-28 |
| 12 | Connecter le formulaire inscription → Brevo → accès groupe (automatisation) | Catherine | Catherine | | Laurie | J-25 |
| 13 | Tester le parcours complet : inscription → email confirmation → accès groupe → email J1 | Laurie | Laurie | | Aurélia | J-20 |
| 14 | Corriger les problèmes identifiés | Laurie | Laurie | | | J-18 |
| 15 | Définir qui modère le groupe au quotidien pendant le challenge *(à clarifier avec Aurélia)* | Aurélia | Aurélia | | Laurie | J-15 |
| | **PROMOTION** | | | | | |
| 16 | **JALON COMM** — Valider le plan comm (déclencher T6) | Aurélia | Aurélia | | Laurie | J-21 |
| 17 | Lancer la promotion : posts Instagram, stories, collab certifiées MTM | Aurélia | Aurélia | | Laurie | J-21 |
| 18 | Intensifier la promotion + relance email liste existante | Aurélia | Aurélia | | Laurie | J-14 |
| 19 | Email "Plus qu'une semaine pour s'inscrire !" | Automatique | Laurie | | | J-7 |
| 20 | Clôture des inscriptions (ou maintenir ouvert, au choix) | Aurélia | Aurélia | | Laurie | J-3 |
| | **CHALLENGE EN COURS** | | | | | |
| 21 | Lancement du challenge — email jour 1 + contenu | Automatique | Laurie | | Aurélia | Jour J |
| 22 | Emails quotidiens automatiques (contenu + motivation + communauté) | Automatique | Laurie | | | J+1 → J+X |
| 23 | Modération quotidienne du groupe (réponses, encouragements) | *(à définir)* | *(à définir)* | | | J → J+X |
| 24 | Suivi engagement pendant le challenge (qui participe, qui décroche) | Laurie | Laurie | | Aurélia | J → J+X |
| | **CONVERSION & CLÔTURE** | | | | | |
| 25 | Email final avec offre spéciale abonnement FSY Studio (réduction limitée) | Automatique | Laurie | | Aurélia | J+X (dernier jour) |
| 26 | Email relance non-converties | Automatique | Laurie | | | J+X+3 |
| 27 | Récolter les témoignages des participantes | Laurie | Laurie | | Aurélia | J+X+5 |
| 28 | Supprimer/archiver le groupe temporaire | Laurie | Laurie | | | J+X+7 |
| 29 | Bilan challenge : inscrits, engagement, conversions, learnings | Laurie | Aurélia | | | J+X+10 |

### T5a — Onboarder un nouveau membre Studio B2C (18 étapes, Jour J → J+30)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **JOUR J — INSCRIPTION** | | | | | |
| 1 | Paiement Stripe reçu → vérifier que la transaction est OK | Automatique | Laurie | | | Jour J |
| 2 | Accès Circle activé automatiquement (Stripe webhook) | Automatique | Laurie | | | Jour J |
| 3 | Ajouter le membre dans Brevo avec le bon tag (studio_b2c, date, source) | Automatique | Laurie | | | Jour J |
| 4 | Envoyer la facture automatiquement | Automatique | Laurie | | | Jour J |
| 5 | Email de bienvenue : "Bienvenue chez Face Soul Yoga !" + guide premiers pas (PDF) + lien Circle | Automatique | Laurie | | | Jour J |
| 6 | Check technique : le membre a bien accès à tout ce qu'il a acheté | Laurie | Laurie | | | Jour J |
| | **PREMIÈRE SEMAINE** | | | | | |
| 7 | Email J+1 : "Par où commencer ?" — 3 vidéos recommandées pour débutants | Automatique | Laurie | | | J+1 |
| 8 | Email J+3 : "As-tu découvert la communauté ?" — incitation à se présenter dans le forum | Automatique | Laurie | | | J+3 |
| 9 | Email J+7 : "Ta première semaine !" — encouragement + suggestion de routine hebdo | Automatique | Laurie | | | J+7 |
| | **SUIVI** | | | | | |
| 10 | Vérifier si le membre s'est connecté au moins 2 fois | Laurie | Laurie | | | J+14 |
| 11 | Si jamais connecté → email de réengagement "On ne t'a pas vue !" | Automatique | Laurie | | | J+14 |
| 12 | Si connecté 1 seule fois → relance douce "Tu as vu les nouveautés ?" | Automatique | Laurie | | | J+14 |
| 13 | Email J+21 : "Découvre les collections avancées" — suggestions personnalisées | Automatique | Laurie | | | J+21 |
| | **BILAN PREMIER MOIS** | | | | | |
| 14 | Email bilan : "Ton premier mois !" — stats, progrès, invitation à laisser un témoignage | Automatique | Laurie | | | J+30 |
| 15 | Demander un avis / review (email dédié ou dans le bilan) | Automatique | Laurie | | | J+30 |
| 16 | Si engagement faible → flag pour attention personnelle | Laurie | Laurie | | Aurélia | J+30 |
| | **PRÉ-REQUIS** | | | | | |
| 17 | Rédiger le guide premiers pas (PDF : comment utiliser Circle, premiers exercices, communauté) | Laurie | Aurélia | | | Pré-requis |
| 18 | Configurer toutes les automatisations de la séquence (liaisons Stripe → Circle → Brevo) | Catherine | Catherine | | Laurie | Pré-requis |

### T5b — Onboarder une certifiée MTM B2B (30 étapes, Jour J → J+120)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **JOUR J — INSCRIPTION** | | | | | |
| 1 | Paiement Stripe reçu → vérifier la transaction | Automatique | Laurie | | | Jour J |
| 2 | Envoyer le contrat e-signature automatiquement | Automatique | Laurie | | | Jour J |
| 3 | Réception contrat signé → activer accès Circle | Automatique | Laurie | | | Jour J |
| 4 | Envoyer la facture | Automatique | Laurie | | | Jour J |
| 5 | Ajouter dans Brevo avec tag (mtm_b2b, date, cohorte) | Automatique | Laurie | | | Jour J |
| 6 | Email de bienvenue MTM : accès Circle + guide premiers pas + planning formation complet | Automatique | Laurie | | | Jour J |
| 7 | Check technique : accès Circle, espace certifiées, modules visibles | Laurie | Laurie | | | Jour J |
| | **PREMIÈRE SEMAINE** | | | | | |
| 8 | Email J+1 : "Bienvenue dans le parcours MTM" — présentation de la progression, premiers pas | Automatique | Laurie | | | J+1 |
| 9 | Inviter dans la communauté des certifiées (espace Circle dédié) | Laurie | Laurie | | | J+2 |
| 10 | Email J+3 : "Rejoins la communauté des certifiées" — incitation à se présenter | Automatique | Laurie | | | J+3 |
| 11 | Email J+7 : "Ta première semaine" — encouragement + rappel planning | Automatique | Laurie | | | J+7 |
| | **SUIVI FORMATION** | | | | | |
| 12 | Vérifier la progression module 1 | Laurie | Laurie | | Aurélia | J+14 |
| 13 | Si pas connectée → relance personnelle | Laurie | Laurie | | | J+14 |
| 14 | Email J+21 : point d'étape + encouragement | Automatique | Laurie | | | J+21 |
| 15 | Vérifier la progression mi-parcours | Laurie | Laurie | | Aurélia | J+45 |
| 16 | Email mi-parcours : stats progression + motivation | Automatique | Laurie | | | J+45 |
| 17 | Si retard significatif → contact personnel Laurie | Laurie | Laurie | | Aurélia | J+45 |
| | **CERTIFICATION** | | | | | |
| 18 | Rappel : "Le quiz de certification est disponible" | Automatique | Laurie | | | J+80 |
| 19 | Quiz de certification passé → vérifier le résultat | Laurie | Laurie | | Aurélia | J+90 |
| 20 | Si réussi → envoyer le kit "Certifiée MTM" (badge, visuel, attestation) | Laurie | Laurie | | Aurélia | J+90 |
| 21 | Si échoué → proposer un 2ème passage + soutien | Laurie | Laurie | | Aurélia | J+90 |
| 22 | Ajouter dans la liste des certifiées (ambassadrices, commission 10-15%) | Laurie | Aurélia | | | J+90 |
| | **POST-CERTIFICATION** | | | | | |
| 23 | Email : "Et maintenant ?" — présenter le programme ambassadrice, commissions, collabs | Automatique | Laurie | | Aurélia | J+95 |
| 24 | Proposer la licence annuelle (accès continu + communauté) → déclencher T8 | Automatique | Aurélia | | Laurie | J+95 |
| 25 | Demander un témoignage / review | Laurie | Laurie | | | J+100 |
| 26 | Récolter les retours sur le parcours (questionnaire satisfaction) | Laurie | Laurie | | Aurélia | J+100 |
| 27 | Bilan : progression, durée réelle, taux complétion, retours | Laurie | Aurélia | | | J+120 |
| | **PRÉ-REQUIS** | | | | | |
| 28 | Rédiger le guide premiers pas MTM (PDF spécifique) | Laurie | Aurélia | | | Pré-requis |
| 29 | Préparer le kit certifiée (badge, attestation, visuels réseaux sociaux) | Laurie | Aurélia | | | Pré-requis |
| 30 | Configurer toutes les automatisations (liaisons Stripe → contrat → Circle → Brevo) | Catherine | Catherine | | Laurie | Pré-requis |

### T6 — Plan de communication lancement (33 étapes, J-30 → Jour J)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **STRATÉGIE** | | | | | |
| 1 | Définir l'objectif comm (inscrire, teaser, convertir, informer) | Aurélia | Aurélia | | Laurie | J-30 |
| 2 | Définir l'audience cible (liste email, followers Instagram, certifiées MTM, autre) | Aurélia | Aurélia | | Laurie | J-30 |
| 3 | Définir les messages clés (transformation promise, urgence, preuve sociale) | Aurélia | Aurélia | | Laurie | J-28 |
| 4 | Choisir les canaux (Instagram, email Brevo, Circle, Telegram, collab certifiées) | Aurélia | Aurélia | | Laurie | J-28 |
| | **PRÉPARATION CONTENU** | | | | | |
| 5 | Rédiger le calendrier éditorial (quel contenu, quel canal, quel jour) | Laurie | Aurélia | | | J-25 |
| 6 | Rédiger les emails de la séquence (teasing → annonce → urgence → dernier jour) | Laurie | Aurélia | | | J-22 |
| 7 | Créer les visuels Instagram (posts, carrousels, stories) | Laurie | Aurélia | | | J-22 |
| 8 | Préparer les scripts reels/vidéos courtes si applicable | Laurie | Aurélia | | | J-20 |
| 9 | Tourner/enregistrer les reels/vidéos | Aurélia | Aurélia | | | J-18 |
| 10 | Préparer les stories (templates, countdowns, sondages, Q&A) | Laurie | Aurélia | | | J-18 |
| 11 | Rédiger les textes de collab pour les certifiées MTM (si applicable) | Laurie | Aurélia | | | J-18 |
| 12 | Collecter/préparer les témoignages et preuves sociales | Laurie | Aurélia | | | J-16 |
| | **SETUP TECHNIQUE** | | | | | |
| 13 | Programmer les emails dans Brevo | Laurie | Laurie | | | J-15 |
| 14 | Planifier les posts Instagram (outil de scheduling ou manuellement) | Laurie | Laurie | | | J-15 |
| 15 | Vérifier les liens dans tous les contenus (landing page, checkout, inscription) | Laurie | Laurie | | | J-14 |
| 16 | Tester l'envoi du premier email (rendu, liens, désinscription) | Laurie | Laurie | | | J-14 |
| | **PHASE TEASING (J-12 → J-7)** | | | | | |
| 17 | Email teasing : "Quelque chose arrive…" | Automatique | Laurie | | | J-12 |
| 18 | Stories teasing (mystère, coulisses, indice) | Aurélia | Aurélia | | | J-12 |
| 19 | Post Instagram teasing | Aurélia | Aurélia | | Laurie | J-10 |
| 20 | Envoyer les textes de collab aux certifiées MTM | Laurie | Laurie | | Aurélia | J-10 |
| | **PHASE ANNONCE (J-7 → J-3)** | | | | | |
| 21 | Email annonce officielle : "C'est ouvert !" + lien inscription | Automatique | Laurie | | | J-7 |
| 22 | Post Instagram annonce (carousel ou reel) | Aurélia | Aurélia | | Laurie | J-7 |
| 23 | Stories quotidiennes (FAQ, témoignages, coulisses, countdown) | Aurélia | Aurélia | | | J-7 → J-3 |
| 24 | Collabs certifiées MTM publiées | Certifiées | Aurélia | | Laurie | J-7 → J-3 |
| 25 | Email relance : "Tu as vu ?" (à ceux qui n'ont pas ouvert) | Automatique | Laurie | | | J-5 |
| | **PHASE URGENCE (J-3 → Jour J)** | | | | | |
| 26 | Email "Plus que 3 jours" | Automatique | Laurie | | | J-3 |
| 27 | Stories countdown quotidien | Aurélia | Aurélia | | | J-3 → J-1 |
| 28 | Post Instagram "Dernier jour" | Aurélia | Aurélia | | Laurie | J-1 |
| 29 | Email "Dernier jour / Dernières heures" | Automatique | Laurie | | | J-1 |
| 30 | Story live ou Q&A "Pose tes questions avant de t'inscrire" | Aurélia | Aurélia | | Laurie | J-1 |
| | **JOUR J** | | | | | |
| 31 | Email "C'est maintenant !" | Automatique | Laurie | | | Jour J |
| 32 | Post Instagram Jour J | Aurélia | Aurélia | | Laurie | Jour J |
| 33 | Bilan comm : taux d'ouverture emails, engagement Instagram, inscriptions, sources | Laurie | Aurélia | | | Jour J |

### T7 — Lancer une retraite (50 étapes, J-270 → J+30)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **CONCEPTION (9 mois avant)** | | | | | |
| 1 | Définir le concept (thème, transformation promise, durée, nombre de places) | Aurélia | Aurélia | | Laurie | J-270 |
| 2 | Définir le public cible et les pré-requis (certifiées MTM ? ouvert à tous ?) | Aurélia | Aurélia | | Laurie | J-270 |
| 3 | Définir le budget prévisionnel (lieu, intervenants, repas, déplacements, marge) | Laurie | Aurélia | | | J-260 |
| 4 | Valider le pricing (prix plein, early bird, ce qui est inclus/exclus) | Aurélia | Aurélia | | Laurie | J-260 |
| | **LIEU & LOGISTIQUE (8-7 mois avant)** | | | | | |
| 5 | Rechercher et shortlister les lieux (capacité, ambiance, accès, hébergement) | Laurie | Aurélia | | | J-250 |
| 6 | Visiter / vérifier les lieux (photos, dispo, conditions) | Aurélia | Aurélia | | Laurie | J-240 |
| 7 | Réserver le lieu (acompte, contrat, conditions d'annulation) | Laurie | Aurélia | | | J-230 |
| 8 | Identifier et contacter les intervenants externes (si applicable) | Laurie | Aurélia | | | J-230 |
| 9 | Confirmer les intervenants (contrat, cachet, déplacements, hébergement) | Laurie | Aurélia | | | J-220 |
| 10 | Organiser la logistique repas/traiteur (régimes alimentaires, devis) | Laurie | Aurélia | | | J-210 |
| | **PROGRAMME & CONTENU (6-5 mois avant)** | | | | | |
| 11 | Structurer le programme détaillé (jour par jour, heure par heure) | Laurie | Aurélia | | | J-200 |
| 12 | Préparer les supports de la retraite (workbooks, exercices, méditations) | Laurie | Aurélia | | | J-180 |
| 13 | Créer les visuels (photos du lieu, ambiance, mockups programme) | Laurie | Aurélia | Externe | | J-180 |
| 14 | Écrire la page de vente (expérience promise, programme, lieu, témoignages, FAQ, CTA) | Laurie | Aurélia | | | J-170 |
| 15 | Préparer les réponses aux objections / FAQ vente (prix, déplacement, niveau) | Laurie | Aurélia | | | J-165 |
| | **SETUP TECHNIQUE (5-4 mois avant)** | | | | | |
| 16 | Configurer le checkout Stripe (prix, acompte, paiement en plusieurs fois) | Laurie | Laurie | | Aurélia | J-160 |
| 17 | Configurer le contrat e-signature automatique (automatisation) | Catherine | Catherine | | Laurie | J-155 |
| 18 | Créer le lead magnet associé (guide, vidéo teaser, mini-expérience gratuite) | Laurie | Aurélia | | | J-150 |
| 19 | Préparer la séquence email de lancement | Laurie | Laurie | | Aurélia | J-145 |
| 20 | Configurer le tunnel : lead magnet → nurturing → page de vente | Laurie | Laurie | | | J-140 |
| 21 | Configurer la relance panier abandonné | Laurie | Laurie | | | J-140 |
| 22 | Configurer l'email post-achat (confirmation, facture, infos pratiques) | Laurie | Laurie | | | J-135 |
| 23 | Test complet : inscription → paiement → contrat → confirmation → email | Laurie | Laurie | | Aurélia | J-130 |
| | **PRÉ-LANCEMENT (4-3 mois avant)** | | | | | |
| 24 | **JALON COMM** — Valider le plan comm (déclencher T6) | Aurélia | Aurélia | | Laurie | J-120 |
| 25 | Ouvrir la liste d'attente / pré-inscription early bird | Laurie | Aurélia | | | J-120 |
| 26 | **JALON COMM** — Lancement communication teasing | Aurélia | Aurélia | | Laurie | J-100 |
| 27 | Ouvrir les inscriptions early bird (prix réduit, nombre limité) | Laurie | Aurélia | | | J-90 |
| | **LANCEMENT (2-1 mois avant)** | | | | | |
| 28 | **JALON COMM** — Communication intensive | Aurélia | Aurélia | | Laurie | J-60 |
| 29 | Lancer la séquence email de lancement | Automatique | Laurie | | | J-60 |
| 30 | Suivi des inscriptions (combien de places restantes, ajuster la comm) | Laurie | Aurélia | | | J-45 |
| 31 | Email "Plus que X places" (si applicable) | Automatique | Laurie | | | J-30 |
| 32 | Clôturer les inscriptions (ou dernière chance) | Aurélia | Aurélia | | Laurie | J-14 |
| | **PRÉPARATION FINALE (2 semaines avant)** | | | | | |
| 33 | Confirmer le nombre final au lieu / traiteur | Laurie | Laurie | | Aurélia | J-14 |
| 34 | Envoyer les infos pratiques aux participantes (accès, horaires, quoi apporter, transport) | Laurie | Laurie | | Aurélia | J-10 |
| 35 | Préparer le matériel (impressions workbooks, tapis, sono, déco) | Laurie | Laurie | | | J-7 |
| 36 | Récolter les régimes alimentaires / besoins spécifiques | Laurie | Laurie | | | J-7 |
| 37 | Confirmer les horaires avec les intervenants | Laurie | Laurie | | Aurélia | J-5 |
| 38 | Préparer les goodies / kits participants (si applicable) | Laurie | Aurélia | | | J-3 |
| 39 | Email "On y est presque !" — rappel dernières infos + enthousiasme | Automatique | Laurie | | | J-2 |
| | **JOUR J & RETRAITE** | | | | | |
| 40 | Installer le lieu (signalétique, déco, matériel, accueil) | Laurie | Laurie | | | Jour J |
| 41 | Accueillir les participantes | Aurélia | Aurélia | Laurie | | Jour J |
| 42 | Documenter la retraite (photos, vidéos, stories) | Laurie | Aurélia | | | Jour J → fin |
| 43 | Gérer la logistique quotidienne (repas, timing, besoins) | Laurie | Laurie | | Aurélia | Jour J → fin |
| | **POST-RETRAITE** | | | | | |
| 44 | Email J+1 : "Merci !" + photos souvenir + lien groupe alumni | Laurie | Aurélia | | | J+1 |
| 45 | Partager les photos/vidéos sur Instagram (avec accord des participantes) | Aurélia | Aurélia | Laurie | | J+3 |
| 46 | Email questionnaire satisfaction | Automatique | Laurie | | Aurélia | J+5 |
| 47 | Récolter les témoignages (vidéo ou écrit) | Laurie | Laurie | | Aurélia | J+7 |
| 48 | Envoyer les factures finales / attestations | Laurie | Laurie | | | J+7 |
| 49 | Régler les prestataires (lieu, intervenants, traiteur) | Laurie | Aurélia | | | J+14 |
| 50 | Bilan retraite : inscrits, CA, coûts, marge, satisfaction, learnings | Laurie | Aurélia | | | J+30 |

### T8 — Gérer une licence annuelle (28 étapes, cycle J → J+375)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **ACTIVATION** | | | | | |
| 1 | Paiement licence reçu (100€/an) → vérifier la transaction Stripe | Automatique | Laurie | | | Jour J |
| 2 | Activer/maintenir l'accès Circle (espace licenciées) | Automatique | Laurie | | | Jour J |
| 3 | Ajouter le tag "licenciée" dans Brevo (date début, date expiration) | Automatique | Laurie | | | Jour J |
| 4 | Email de bienvenue licence : "Ton accès est actif !" + ce qui est inclus + nouveautés | Automatique | Laurie | | | Jour J |
| | **FAIRE VIVRE LA LICENCE (trimestre par trimestre)** | | | | | |
| 5 | Ajouter du nouveau contenu dans l'espace licenciées (minimum 1x/mois) | Laurie | Aurélia | | | J+30 (récurrent) |
| 6 | Email mensuel : "Les nouveautés du mois" — nouveaux contenus, replays, événements | Automatique | Laurie | | | J+30 (récurrent) |
| 7 | Organiser un live/Q&A réservé aux licenciées (minimum 1x/trimestre) | Laurie | Aurélia | | | J+90 (récurrent) |
| 8 | Animer la communauté licenciées dans Circle (discussions, défis, partages) | Laurie | Laurie | | Aurélia | Continu |
| 9 | Vérifier l'engagement des licenciées (connexions, participation) | Laurie | Laurie | | Aurélia | J+90 (récurrent) |
| 10 | Si engagement faible → email de réengagement personnalisé | Laurie | Laurie | | | J+90 (récurrent) |
| | **CHECK MI-PARCOURS (6 mois)** | | | | | |
| 11 | Email bilan 6 mois : "Voilà ce que tu as accompli" + stats + valeur reçue | Automatique | Laurie | | | J+180 |
| 12 | Questionnaire satisfaction mi-parcours | Automatique | Laurie | | Aurélia | J+180 |
| 13 | Analyser les retours et ajuster le contenu si nécessaire | Laurie | Aurélia | | | J+190 |
| | **PRÉ-RENOUVELLEMENT (3 mois avant expiration)** | | | | | |
| 14 | Email "Ta licence expire dans 3 mois" — rappel de la valeur, nouveautés à venir | Automatique | Laurie | | | J+275 |
| 15 | Préparer les arguments de renouvellement (nouveaux contenus prévus, événements, témoignages) | Laurie | Laurie | | Aurélia | J+280 |
| | **RENOUVELLEMENT (1 mois avant expiration)** | | | | | |
| 16 | Email "Plus qu'un mois" — récap valeur reçue + offre early renewal si applicable | Automatique | Laurie | | | J+335 |
| 17 | Email "Plus que 2 semaines" — témoignages d'autres licenciées | Automatique | Laurie | | | J+350 |
| 18 | Email "Dernière semaine" — urgence douce + ce qu'elle perd si elle ne renouvelle pas | Automatique | Laurie | | | J+358 |
| 19 | Si renouvellement Stripe automatique → vérifier la transaction | Automatique | Laurie | | | J+365 |
| 20 | Si renouvellement OK → email "C'est reparti !" + nouveautés de la nouvelle année | Automatique | Laurie | | | J+365 |
| 21 | Si non-renouvellement → désactiver l'accès Circle | Automatique | Laurie | | | J+365 |
| | **RELANCE NON-RENOUVELLEMENT** | | | | | |
| 22 | Email J+3 après expiration : "Tu nous manques" — offre de dernière chance (7 jours) | Automatique | Laurie | | | J+368 |
| 23 | Email J+7 : dernier rappel | Automatique | Laurie | | | J+372 |
| 24 | Si toujours non → retirer le tag licenciée, archiver | Laurie | Laurie | | Aurélia | J+375 |
| 25 | Bilan annuel licences : taux de renouvellement, churn, raisons, CA récurrent | Laurie | Aurélia | | | J+375 |
| | **PRÉ-REQUIS** | | | | | |
| 26 | Définir ce qui est inclus dans la licence (accès quoi, communauté, lives, nouveaux contenus) | Aurélia | Aurélia | | Laurie | Pré-requis |
| 27 | Configurer le renouvellement automatique Stripe (récurrent annuel) | Laurie | Laurie | | | Pré-requis |
| 28 | Configurer toutes les automatisations de la séquence (liaisons Stripe → Circle → Brevo) | Catherine | Catherine | | Laurie | Pré-requis |

### T9 — Animer et retenir les abonnées Studio B2C (17 étapes, cycle mensuel)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **ANIMATION MENSUELLE** | | | | | |
| 1 | Planifier le calendrier de contenu du mois (nouveaux cours, replays, thèmes) | Laurie | Aurélia | | | M-5j |
| 2 | Publier les nouveaux contenus dans Circle | Laurie | Laurie | | | M (récurrent) |
| 3 | Email mensuel : "Les nouveautés du mois" | Automatique | Laurie | | | M+1 |
| 4 | Animer la communauté Circle (discussions, défis hebdo, partages) | Laurie | Laurie | | Aurélia | Continu |
| 5 | Organiser un live/Q&A (minimum 1x/mois) | Laurie | Aurélia | | | M+15 |
| | **SUIVI ENGAGEMENT** | | | | | |
| 6 | Analyser les stats d'engagement (connexions, vidéos vues, participation) | Laurie | Laurie | | Aurélia | M+25 |
| 7 | Identifier les membres à risque (pas connectées depuis 2+ semaines) | Laurie | Laurie | | | M+25 |
| 8 | Email de réengagement ciblé aux membres à risque | Automatique | Laurie | | | M+25 |
| 9 | Si pas de réaction → relance personnelle | Laurie | Laurie | | Aurélia | M+30 |
| | **UPSELL** | | | | | |
| 10 | Identifier les membres engagées (top 20% d'activité) | Laurie | Laurie | | Aurélia | Trimestriel |
| 11 | Email ciblé aux membres engagées : présenter MTM B2B (formation pro 2 900€) | Automatique | Laurie | | Aurélia | Trimestriel |
| 12 | Proposer les retraites en avant-première aux membres actives | Laurie | Aurélia | | | Quand dispo |
| 13 | Proposer les formations ponctuelles en avant-première | Laurie | Aurélia | | | Quand dispo |
| 14 | Offre parrainage : "Invite une amie, gagne 1 mois offert" | Automatique | Laurie | | Aurélia | Trimestriel |
| | **BILAN** | | | | | |
| 15 | Bilan mensuel : nouveaux membres, churn, MRR, engagement, upsells convertis | Laurie | Aurélia | | | M+28 |
| | **PRÉ-REQUIS** | | | | | |
| 16 | Définir la stratégie d'upsell (quoi proposer, à qui, quand, comment) | Aurélia | Aurélia | | Laurie | Pré-requis |
| 17 | Configurer les automatisations (segments Brevo, emails ciblés, triggers engagement) | Catherine | Catherine | | Laurie | Pré-requis |

### T10 — Animer et développer la communauté certifiées MTM (16 étapes, cycle trimestriel)

| # | Étape | R | A | C | I | Timing |
|---|-------|---|---|---|---|--------|
| | **ANIMATION TRIMESTRIELLE** | | | | | |
| 1 | Planifier le programme du trimestre (masterclass, intervenant, thème avancé) | Laurie | Aurélia | | | Q-15j |
| 2 | Organiser une masterclass exclusive certifiées (1x/trimestre minimum) | Laurie | Aurélia | | | Q+30 |
| 3 | Animer l'espace Circle certifiées (partages de pratique, cas clients, entraide) | Laurie | Laurie | | Aurélia | Continu |
| 4 | Publier les nouveaux contenus avancés réservés aux certifiées | Laurie | Aurélia | | | Q (récurrent) |
| | **PROGRAMME AMBASSADRICE** | | | | | |
| 5 | Envoyer les assets promo du trimestre aux certifiées (visuels, textes, liens affiliés) | Laurie | Laurie | | Aurélia | Q+5 |
| 6 | Suivre les ventes générées par les certifiées (commissions 10-15%) | Laurie | Laurie | | Aurélia | Mensuel |
| 7 | Verser les commissions | Laurie | Aurélia | | | Mensuel |
| 8 | Mettre en avant les meilleures ambassadrices (stories, témoignages, collabs) | Laurie | Aurélia | | | Trimestriel |
| | **UPSELL CERTIFIÉES** | | | | | |
| 9 | Proposer les retraites en avant-première (tarif certifiée) | Laurie | Aurélia | | | Quand dispo |
| 10 | Proposer les formations avancées / spécialisations | Laurie | Aurélia | | | Quand dispo |
| 11 | Proposer le renouvellement de certification (si applicable) | Laurie | Aurélia | | | Annuel |
| | **SUIVI** | | | | | |
| 12 | Vérifier l'engagement des certifiées (participation, ventes, renouvellement licence) | Laurie | Laurie | | Aurélia | Trimestriel |
| 13 | Contacter les certifiées inactives (pas de vente, pas de connexion) | Laurie | Laurie | | Aurélia | Trimestriel |
| 14 | Bilan trimestriel : certifiées actives, ventes générées, commissions, licences, churn | Laurie | Aurélia | | | Q+85 |
| | **PRÉ-REQUIS** | | | | | |
| 15 | Définir les conditions du programme ambassadrice (commission, conditions, assets) | Aurélia | Aurélia | | Laurie | Pré-requis |
| 16 | Configurer le suivi des liens affiliés et le calcul des commissions (automatisation) | Catherine | Catherine | | Laurie | Pré-requis |

## 16. Points à clarifier en séance avec Aurélia

| # | Sujet | Template | Priorité |
|---|-------|----------|----------|
| 1 | Modération quotidienne du groupe pendant un challenge : qui ? | T4 | Haute |
| 2 | Guide premiers pas : aussi dans Circle (page wiki) ou uniquement email ? | T5a, T5b | Moyenne |
| 3 | Quiz certification MTM : combien de tentatives ? Score minimum ? | T5b | Moyenne |
| 4 | Kit certifiée : qui crée les visuels (Laurie ou graphiste externe) ? | T5b | Basse |
| 5 | Programme ambassadrice : détails (commission, conditions) déjà documentés ? | T10 | Moyenne |
| 6 | Onboarding Aurélia Del Sol Premium : contrat e-signature ou checkbox CGV ? | T5c | Basse (V2) |
