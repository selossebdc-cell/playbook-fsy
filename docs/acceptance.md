# Criteres d'acceptation — Playbook Process Face Soul Yoga

## Criteres globaux

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CG1 | L'application est un fichier HTML unique (CSS + JS inline) deployable sur GitHub Pages | Verification : 1 seul fichier .html, pas de build |
| CG2 | L'application charge Supabase et Google Fonts via CDN uniquement — zero dependance npm | Verification : aucun package.json, aucun node_modules |
| CG3 | L'application fonctionne sur Chrome, Safari et Firefox recents | Test manuel sur les 3 navigateurs |
| CG4 | L'application est responsive : utilisable sur iPhone, Android et desktop | Test DevTools mobile + device reel |
| CG5 | La navigation utilise des tabs en haut (desktop) et une bottom nav (mobile) | Test visuel sur les 2 formats |
| CG6 | Le design respecte les tokens FSY : terracotta #B55B50, creme #FFFBF7, teal #033231, fonts Playfair Display SC + Montserrat | Verification visuelle |
| CG7 | Le header affiche "Face Soul Yoga — Playbook" en texte (pas de logo) | Verification visuelle |
| CG8 | L'authentification fonctionne via Supabase Auth (email + mot de passe) | Test : login/logout |
| CG9 | Les donnees persistent apres rechargement via Supabase | Test : creer des donnees, recharger, verifier |
| CG10 | Les donnees sont partagees entre utilisateurs (meme donnees visibles par Aurelia et Laurie) | Test : 2 navigateurs/sessions, verifier la coherence |
| CG11 | Les 3 vues (Playbook, Mes Taches, Timeline) sont accessibles et navigables | Test manuel |
| CG12 | L'application est fluide avec 10-15 process et ~400 etapes | Test de performance avec donnees realistes |
| CG13 | Le chargement initial est inferieur a 1 seconde | Test avec DevTools Network |
| CG14 | Le code JS est lisible : fonctions nommees, pas de minification, commentaires inline | Review du code |

## Criteres par fonctionnalite

### F1 — Vue Playbook (gestion des process)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA1 | Creer un process depuis un template avec date cible : les dates se calculent automatiquement en retro-planning | Test : selectionner "Lancer une retraite", date 15/12/2026, verifier J-270 = ~20/03/2026 |
| CA2 | Cocher une etape met a jour la progression globale et par process | Test : cocher 5 etapes sur 30, verifier 17% affiche |
| CA5 | Ajouter une nouvelle personne via "+ Nouvelle personne" et la retrouver dans les dropdowns RACI apres reload | Test : ajouter "Anam", recharger, verifier qu'elle apparait dans tous les dropdowns |
| CA6 | Editer titre, description, RACI et timing d'une etape — les modifications persistent apres reload | Test : modifier chaque champ, recharger, verifier la sauvegarde |
| CA9 | Les etapes en retard (date passee, non cochee) sont en rouge ; les etapes terminees sont en vert ; les etapes futures sont en gris | Test : creer un process avec des dates passees et futures, verifier les couleurs |
| CA11 | Le RACI est affiche en pastilles initiales colorees en lecture, editable en dropdowns au clic | Test : verifier l'affichage pastilles puis passer en edition |
| CA12 | Dupliquer un process : la copie a le statut remis a zero (0%), demande une nouvelle date cible, les etapes sont decochees | Test : dupliquer un process partiellement complete |
| CA13 | Les sections d'etapes (CONCEPTION, PRODUCTION, etc.) sont visibles comme en-tetes dans la vue detaillee | Test : ouvrir un process template, verifier les sections |

**Criteres F1 supplementaires (issus des requirements) :**

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F1a | Le selecteur de template affiche les 11 templates + "Process vide", organises par categorie (Projet, Lancement, Cycle, Cycle continu, Transverse) | Test : ouvrir le selecteur, verifier les 12 options et les categories |
| CA-F1b | Un process vide requiert une date cible obligatoire | Test : tenter de creer un process vide sans date |
| CA-F1c | Ajouter, supprimer et reordonner des etapes (fleches haut/bas) dans un process | Test : CRUD complet sur les etapes |
| CA-F1d | Process termines affichent un badge "Termine" et restent dans la liste | Test : terminer un process (100%), verifier le badge |
| CA-F1e | Confirmation demandee lors du changement de date cible d'un process existant | Test : modifier la date cible, verifier la modale de confirmation |
| CA-F1f | Timing positif (J+7, J+30, etc.) fonctionne correctement | Test : verifier les dates calculees pour des etapes post-Jour J |
| CA-F1g | Pas de suppression d'owner possible (ajout uniquement) | Test : verifier l'absence de bouton supprimer sur les owners |

### F2 — Vue Mes Taches

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA3 | Filtrer les taches par personne (R ou A) dans "Mes taches" | Test : filtre "Laurie", verifier que seules ses taches (R ou A) apparaissent |

**Criteres F2 supplementaires :**

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F2a | Le filtre "Toutes" affiche toutes les taches de tous les process actifs | Test : filtre "Toutes", verifier l'agregation |
| CA-F2b | Les taches sont triees par date | Test : verifier l'ordre chronologique |
| CA-F2c | Les taches en retard sont visibles en rouge | Test : tache avec date passee non cochee = rouge |
| CA-F2d | Clic sur une tache navigue vers le process source | Test : cliquer sur une tache, verifier la navigation |

### F3 — Vue Timeline (Gantt)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA4 | Vue Gantt multi-process avec 2+ process : chaque process = 1 ligne | Test : creer 2 process, verifier 2 lignes dans le Gantt |

**Criteres F3 supplementaires :**

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F3a | Mode "Un seul process" : timeline horizontale classique | Test : selectionner un seul process, verifier le rendu |
| CA-F3b | Marqueurs "Aujourd'hui" (rouge) et "Jour J" (terracotta) visibles | Test : verifier la presence et les couleurs des marqueurs |
| CA-F3c | Mois affiches sur la frise, legende dynamique, tooltips au survol | Test : verifier les mois, la legende, survoler une etape |
| CA-F3d | Dots colores par owner R dans le Gantt multi-process | Test : verifier que les couleurs correspondent aux owners |
| CA-F3e | Scroll horizontal fonctionnel sur mobile (tactile) | Test : DevTools mobile, verifier le swipe |

### F4 — Templates

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F4a | Les 11 templates (T1 a T10, hors T5c) sont disponibles avec toutes leurs etapes, RACI et timings | Test : creer un process depuis chaque template, verifier le nombre d'etapes et les donnees |
| CA-F4b | Le RACI de chaque template respecte les regles globales (section 13 des requirements) | Review : Aurelia = A strategique, Laurie = R operationnel, Catherine = R automatisations uniquement, etc. |
| CA-F4c | Les jalons comm (dans T1, T3, T4, T7) sont identifies comme tels | Test : verifier la presence des jalons comm dans les templates concernes |
| CA-F4d | T6 fonctionne comme template transverse independant | Test : creer un T6, verifier qu'il est autonome |
| CA-F4e | Les templates utilisent "automatisation" (pas "n8n") | Review du code des templates |

### F5 — Persistance et auth

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA7 | Les donnees persistent apres rechargement (Supabase) | Test : creer process, recharger, tout est la |
| CA14 | Partage des donnees entre Aurelia et Laurie via Supabase | Test : 2 navigateurs, meme compte ou comptes differents, memes donnees |

**Criteres F5 supplementaires :**

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F5a | Export JSON : bouton qui telecharge toutes les donnees en JSON | Test : cliquer Export, verifier le fichier JSON |
| CA-F5b | Import JSON : bouton qui restaure les donnees depuis un fichier JSON | Test : importer un JSON exporte, verifier la restauration |
| CA-F5c | Login/logout fonctionnel avec email + mot de passe | Test : se connecter, se deconnecter, se reconnecter |

### Print

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA10 | Imprimer la vue courante proprement (bouton Imprimer) | Test : bouton Imprimer sur chaque vue, apercu correct |

<!-- V2:START -->

## Criteres V2 — Module Parcours Client (F6)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F6a | Catherine peut creer un parcours template (ex: "FSY Studio B2C") avec phases, emails et outils associes en moins de 5 minutes | Test : creation template complet, chronometrage |
| CA-F6b | Catherine peut assigner un parcours template a un client (dropdown profil) | Test : assigner "FSY Studio" a Aurelia |
| CA-F6c | Chaque phase affiche ses emails/actions avec statut (a_creer / cree / actif / desactive) | Test : verifier les 4 statuts et les couleurs associees |
| CA-F6d | Chaque phase affiche ses outils avec statut d'acces (recu / bloque / non_requis) | Test : changer un statut outil, verifier la mise a jour |
| CA-F6e | La progression se recalcule automatiquement quand un email passe en "actif" | Test : passer 3 emails sur 10 en "actif", verifier 30% |
| CA-F6f | Quand un outil passe de "bloque" a "recu", les phases dependantes passent de "bloque" a "pret" | Test : changer statut Brevo, verifier les phases liees |
| CA-F6g | Une phase peut avoir un lien FK vers un process du playbook — lien cliquable dans l'UI | Test : associer une phase a un process existant, cliquer le lien |
| CA-F6h | Le client voit uniquement son parcours (RLS) | Test : connecter en tant qu'Aurelia, verifier absence des donnees Fred |

## Criteres V2 — Module KPIs (F7)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F7a | Formulaire de saisie manuelle des KPIs (MRR, churn, abonnes, conversions, % automations) | Test : saisir des valeurs, verifier l'enregistrement |
| CA-F7b | Les KPIs sont horodates (recorded_at) pour l'historique | Test : saisir des valeurs a des dates differentes, verifier l'historique |
| CA-F7c | Le % automations actives est lie au parcours (nb emails actifs / total) | Test : verifier la coherence avec les statuts emails du parcours |
| CA-F7d | Alertes configurables : seuil + operateur (gt/lt) — badge rouge quand depasse | Test : configurer churn >8%, saisir 10%, verifier le badge |
| CA-F7e | Aurelia voit ses KPIs a jour sur son iPhone (responsive) | Test : DevTools mobile, verifier le rendu |
| CA-F7f | Laurie (role assistant) n'a pas acces aux KPIs financiers | Test : connecter en tant que Laurie, verifier l'absence de l'onglet KPIs |

## Criteres V2 — Module Gestion Chatbots (F8)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F8a | CRUD FAQ : ajouter, modifier, supprimer, reordonner une entree FAQ | Test : creer une FAQ, la modifier, la deplacer, la supprimer |
| CA-F8b | Chaque FAQ a : question, reponse, categorie, ordre, actif/inactif | Test : verifier tous les champs dans le formulaire |
| CA-F8c | Message de bienvenue editable par chatbot | Test : modifier le message, verifier l'enregistrement |
| CA-F8d | Regles de comportement editables (mode mention-only, escalade, horaires) | Test : modifier une regle, verifier le JSONB |
| CA-F8e | Stats chatbot en lecture seule (messages, escalades, sans reponse) | Test : verifier l'affichage des stats |
| CA-F8f | Laurie peut modifier les FAQ du chatbot FSY mais pas les chatbots des autres clients | Test : connecter en tant que Laurie, editer une FAQ FSY, verifier l'absence des chatbots d'autres clients |

## Criteres V2 — Chatbot WhatsApp FSY (F9)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F9a | Le chatbot WhatsApp repond aux FAQ depuis Supabase (table chatbot_faq) | Test : poser une question referencee, verifier la reponse |
| CA-F9b | Laurie peut modifier une FAQ et le chatbot utilise la nouvelle reponse au prochain message | Test : modifier une FAQ dans le portail, envoyer la question sur WhatsApp |
| CA-F9c | Escalade vers Laurie si question non trouvee | Test : poser une question non referencee, verifier la notification a Laurie |
| CA-F9d | Fallback fonctionne si Supabase est down (JSON local VPS) | Test : simuler Supabase inaccessible, verifier la reponse depuis le JSON |

## Criteres V2 — Chatbot Telegram MTM (F10)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F10a | Le chatbot Telegram lit les FAQ depuis Supabase (chatbot_faq filtre par chatbot_id) | Test : verifier la lecture des FAQ Supabase |
| CA-F10b | Les fonctionnalites existantes (slash commands, anti-spam) restent operationnelles | Test : utiliser les slash commands existants, verifier le fonctionnement |
| CA-F10c | Le chatbot continue de fonctionner apres migration des FAQ vers Supabase | Test : comparer le comportement avant/apres migration |

## Criteres V2 — Vue admin multi-clients (F11)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F11a | Catherine voit un selecteur de clients dans le header (dropdown) | Test : connecter en tant que Catherine, verifier le selecteur |
| CA-F11b | Catherine peut basculer entre les profils clients sans se reconnecter | Test : basculer Aurelia → Fred → Taina, verifier les donnees |
| CA-F11c | Catherine peut activer/desactiver des modules par client (checkbox) | Test : desactiver KPIs pour Fred, verifier la disparition de l'onglet |
| CA-F11d | Le selecteur est invisible pour les roles client et assistant | Test : connecter en tant qu'Aurelia et Laurie, verifier l'absence |

## Criteres V2 — Role assistant (F12)

| # | Critere | Methode de validation |
|---|---------|----------------------|
| CA-F12a | Laurie a acces aux onglets : Chatbots, Outils, Parcours, Actions | Test : connecter en tant que Laurie, verifier les 4 onglets |
| CA-F12b | Laurie n'a pas acces aux onglets : Contrats, KPIs financiers | Test : verifier l'absence de ces onglets |
| CA-F12c | Laurie ne voit que les donnees du client auquel elle est associee | Test : verifier l'absence des donnees des autres clients |

## Scenarios de validation V2

### Scenario V2-1 — Laurie edite une FAQ chatbot

**Contexte** : Laurie veut modifier la reponse a une question frequente sur WhatsApp FSY

```gherkin
Feature: Edition FAQ chatbot

  Scenario: Laurie modifie une FAQ WhatsApp
    Given Laurie est connectee au portail avec le role "assistant"
      And le chatbot WhatsApp FSY a une FAQ "Comment acceder aux videos ?"
    When Laurie navigue vers l'onglet Chatbots
      And elle modifie la reponse de cette FAQ
      And elle clique "Enregistrer"
    Then la FAQ est mise a jour dans Supabase (chatbot_faq)
      And le chatbot WhatsApp utilise la nouvelle reponse au prochain message
```

### Scenario V2-2 — Catherine configure un parcours

**Contexte** : Catherine cree un parcours template pour un nouveau client

```gherkin
Feature: Configuration parcours template

  Scenario: Catherine cree et assigne un parcours
    Given Catherine est connectee en tant qu'admin
    When elle cree un template "FSY Studio B2C" avec 9 phases
      And elle assigne ce template a Aurelia
    Then Aurelia voit son parcours dans l'onglet Parcours
      And la progression demarre a 0%
      And les phases avec outils bloques sont marquees "bloque"
```

### Scenario V2-3 — Alerte KPI

**Contexte** : Un KPI depasse le seuil configure

```gherkin
Feature: Alertes KPI

  Scenario: Le churn depasse le seuil
    Given Catherine a configure une alerte churn >8% pour Aurelia
      And le churn actuel est a 5%
    When Catherine saisit un nouveau KPI churn a 10%
    Then un badge rouge apparait a cote du KPI churn dans le portail
      And le badge est visible par Aurelia et Catherine
```

### Scenario V2-4 — Fallback chatbot

**Contexte** : Supabase est inaccessible

```gherkin
Feature: Resilience chatbot

  Scenario: Supabase down, fallback JSON
    Given le chatbot WhatsApp FSY est actif
      And un snapshot JSON des FAQ a ete genere ce matin par n8n
    When un membre pose une question sur WhatsApp
      And Supabase est inaccessible
    Then le chatbot repond depuis le JSON local du VPS
```

## Edge cases V2

| # | Cas limite | Entree | Comportement attendu |
|---|------------|--------|---------------------|
| E5 | Aucun parcours assigne | Client sans parcours | Message "Aucun parcours configure" |
| E6 | FAQ vide | Chatbot sans FAQ | Message de bienvenue uniquement + escalade systematique |
| E7 | KPI sans historique | Premiere saisie | Affiche la valeur seule, pas de graphique d'evolution |
| E8 | Module desactive pour le client | Client accede a un onglet non autorise | Onglet masque dans la navigation |
| E9 | Supabase down + snapshot JSON absent | Chatbot sans fallback | Message d'erreur generique + escalade vers Laurie |
| E10 | Assistant accede a URL directe d'un module interdit | Laurie tape l'URL du KPI | Redirection vers onglet autorise |

## Criteres de non-regression V2

| # | Comportement a preserver | Test de validation |
|---|-------------------------|-------------------|
| NR3 | Le Playbook V1 (F1-F5) fonctionne identiquement apres ajout des modules V2 | Test : toutes les fonctionnalites Playbook inchangees |
| NR4 | Les onglets existants du portail V2 (Actions, Brain Dump, Mes outils, Sessions, Tutos, Mon projet, Automatisations, Mon contrat) restent operationnels | Test : navigation complete des 9 onglets existants |
| NR5 | Les badges "nouveau" automatiques continuent de fonctionner | Test : creer un element, verifier le badge |
| NR6 | L'auth Supabase existante n'est pas cassee | Test : login/logout avec comptes existants |

<!-- V2:END -->

## Points a clarifier en seance avec Aurelia

Ces points sont issus de la section 16 des requirements et restent ouverts :

| # | Sujet | Template | Priorite |
|---|-------|----------|----------|
| 1 | Moderation quotidienne du groupe pendant un challenge : qui ? | T4 | Haute |
| 2 | Guide premiers pas : aussi dans Circle (page wiki) ou uniquement email ? | T5a, T5b | Moyenne |
| 3 | Quiz certification MTM : combien de tentatives ? Score minimum ? | T5b | Moyenne |
| 4 | Kit certifiee : qui cree les visuels (Laurie ou graphiste externe) ? | T5b | Basse |
| 5 | Programme ambassadrice : details (commission, conditions) deja documentes ? | T10 | Moyenne |
| 6 | Onboarding Aurelia Del Sol Premium : contrat e-signature ou checkbox CGV ? | T5c | Basse (V2) |
| 7 | Repo GitHub exact et URL custom pour le deploiement | Infra | A definir |

<!-- V2:START -->

| 8 | Credentials WhatsApp Business API (token, phone number ID) | F9 | Bloquante |
| 9 | FAQ Telegram : format actuel (en dur dans n8n ou externe ?) | F10 | Haute |
| 10 | WhatsApp groupes/Communities necessaires ou 1:1 suffit ? | F9 | Moyenne |

<!-- V2:END -->

<!-- V2:START -->

## Checklist de validation finale V2

### Fonctionnel V2
- [ ] Module Parcours Client operationnel (creation template, assignation, progression auto)
- [ ] Module KPIs operationnel (saisie manuelle, historique, alertes badge rouge)
- [ ] Module Gestion Chatbots operationnel (CRUD FAQ, messages bienvenue, regles)
- [ ] Chatbot WhatsApp FSY lit FAQ depuis Supabase
- [ ] Chatbot Telegram MTM migre vers Supabase FAQ
- [ ] Vue admin multi-clients fonctionnelle (selecteur, modules actives)
- [ ] Role assistant Laurie correctement restreint
- [ ] Fallback chatbot JSON fonctionne
- [ ] Tous les scenarios V2 passent
- [ ] Tous les edge cases V2 geres

### Non-regression V2
- [ ] Playbook V1 (F1-F5) fonctionne identiquement
- [ ] 9 onglets existants du portail operationnels
- [ ] Auth existante non cassee
- [ ] Badges "nouveau" fonctionnels

### Technique V2
- [ ] RLS actif sur toutes les nouvelles tables
- [ ] Pas de secrets dans le code
- [ ] Responsive mobile-first valide
- [ ] Chargement <3s sur mobile 4G

<!-- V2:END -->

## References

- **Brief** : [docs/brief.md](brief.md)
- **Scope** : [docs/scope.md](scope.md)
- **Requirements V1** : [input/requirements.md](../input/requirements.md)
- **Requirements V2** : [input/requirements-2.md](../input/requirements-2.md)

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-31 | Analyst | Creation V1 — Criteres Playbook Process FSY (F1-F5) |
| 2026-04-06 | Analyst | Extension V2 — Criteres Parcours (F6), KPIs (F7), Chatbots (F8-F10), Admin (F11), Role assistant (F12) |

---

*Phase BREAK | Spec-to-Code Factory | V2 2026-04-06*
