# Domain Rules — Playbook Process FSY

> **Justification** : docs/specs/domain.md, docs/specs/system.md

## Retro-planning

- Date absolue = dateCible + timing (jours calendaires)
- Jours calendaires uniquement (pas d'ouvres, pas de feries)
- Timing : entier relatif (negatif = avant Jour J, 0 = Jour J, positif = apres)
- Seul le timing relatif est editable (jamais la date absolue)

## Indicateurs visuels

- Vert : etape accomplie (done = true)
- Rouge : en retard (date passee + done = false)
- Gris : a venir (date future + done = false)

## RACI global

- Aurelia = A (decisions strategiques uniquement)
- Laurie = R (lead operationnel)
- Catherine = R (automatisations uniquement, ponctuel)
- VA = R (execution technique ponctuelle)
- Externe = C/R (production de contenu)
- Automatique = R (etapes automatisees, Laurie = A)

## Templates

- 11 templates (T1-T10 + T5a/T5b, hors T5c) figes dans le code
- Utiliser "automatisation" dans les templates (jamais "n8n")
- Process vide toujours disponible en plus des templates
- Date cible obligatoire meme pour un process vide

## Owners

- 6 owners par defaut : Aurelia, Laurie, Catherine, VA, Automatique, Externe
- Ajout libre via "+ Nouvelle personne"
- Pas de suppression d'owner dans le MVP
- Palette de 6-8 couleurs pour le Gantt

## Process

- Process termine = badge "Termine", reste dans la liste
- Duplication : remet a zero, decoche, demande nouvelle date cible
- Changement de date cible = confirmation obligatoire + recalcul

## V2 — Parcours Client

- Templates parcours en JSONB, instances en tables relationnelles
- Progression = nb emails actifs / nb emails total
- Quand un outil passe de "bloque" a "recu", les phases dependantes se mettent a jour
- FK optionnelle parcours_phases.playbook_process_id → lien cliquable vers le process

## V2 — KPIs

- Saisie manuelle via formulaire (MVP — pas d'alimentation auto)
- Donnees horodatees (recorded_at obligatoire)
- Alertes configurables : seuil + operateur (gt/lt) → badge rouge dans le portail
- % automations actives = lie au parcours (nb emails actifs / total)

## V2 — Chatbots

- FAQ lues depuis Supabase (chatbot_faq filtre par chatbot_id)
- Modification FAQ = prise en compte au prochain message chatbot
- Fallback : snapshot JSON quotidien sur VPS via n8n
- Stats en batch quotidien (pas de temps reel)

## V2 — Roles RBAC

- admin (Catherine) : tous les clients, tous les modules, selecteur multi-clients
- client (Aurelia, Fred, Taina) : son profil uniquement, modules actives
- assistant (Laurie) : Chatbots, Outils, Parcours, Actions — pas de donnees financieres
- Onglets conditionnels via enabled_modules (JSONB array dans profiles)
