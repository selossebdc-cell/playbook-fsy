# Questions — Playbook Process Face Soul Yoga

> Phase BREAK — Analyse des requirements v1
> Date : 2026-03-17

| # | Categorie | Question | Priorite | Hypothese | Statut | Reponse |
|---|-----------|----------|----------|-----------|--------|---------|
| Q1 | Templates (F4) | Les 5 templates detailles sont dans le code existant. On les reprend ou on les retravaille ? | BLOQUANTE | Reprendre l'existant | REPONDU | Non, on les challenge et retravaille un par un avec Catherine |
| Q2 | Architecture | Fichier unique < 60 Ko avec Supabase CDN + templates + Gantt. Realiste ? | BLOQUANTE | Tenable si bien structure | HYPOTHESE | Avec Supabase CDN, la contrainte 60 Ko est assouplie car la lib est chargee en CDN externe. Fichier unique maintenu. |
| Q3 | Retro-planning | Gestion des week-ends/feries dans le calcul des dates ? | OPTIONNELLE | Jours calendaires (pas de jours ouvres) | REPONDU | Oui, jours calendaires. Pas de gestion des jours ouvres. |
| Q4 | Multi-process | Peut-on creer plusieurs instances du meme template ? | OPTIONNELLE | Oui | HYPOTHESE | Oui, chaque instance est independante. |
| Q5 | Owners | Signification de "Autre" et gestion des ajouts ? | OPTIONNELLE | Autre = generique permanent, ajouts en complement | HYPOTHESE | Confirme par le code existant. |
| Q6 | Owners | Peut-on supprimer un owner ajoute par erreur ? | OPTIONNELLE | Pas de suppression dans le MVP | HYPOTHESE | Confirme. |
| Q7 | Donnees | Limite localStorage et export/import ? | OPTIONNELLE | localStorage suffit, export/import utile | REPONDU | CHANGE : on passe a Supabase des le MVP pour le partage. Export JSON en complement. |
| Q8 | UX — Timeline | Lisibilite du Gantt avec beaucoup d'owners ? | OPTIONNELLE | Palette 6-8 couleurs max | HYPOTHESE | OK |
| Q9 | UX — Mobile | Gantt sur mobile : quelle strategie ? | BLOQUANTE | Vue liste verticale sur mobile | REPONDU | Scroll horizontal sur mobile (meme rendu que desktop mais tactile). |
| Q10 | UX — Navigation | Navigation principale : tabs, sidebar, bottom nav ? | OPTIONNELLE | Tabs en haut desktop, bottom nav mobile | HYPOTHESE | OK |
| Q11 | Print | Les 3 vues sont-elles toutes imprimables ? | OPTIONNELLE | Oui, CSS @media print | HYPOTHESE | OK |
| Q12 | Process vide | Date cible obligatoire pour un process vide ? | OPTIONNELLE | Oui, toujours obligatoire | HYPOTHESE | OK |
| Q13 | Hebergement | Quel repo GitHub et URL ? | BLOQUANTE | Repo dedie playbook-fsy | REPONDU | A definir — repo GitHub Pages, URL custom possible |
| Q14 | Branding | Logo ou texte dans le header ? | OPTIONNELLE | Texte "Face Soul Yoga — Playbook", pas de logo | HYPOTHESE | OK |
| Q15 | Donnees — Etapes | Timing positif (post-Jour J) autorise ? | OPTIONNELLE | Oui | HYPOTHESE | OK, deja implemente dans le code existant |
| Q16 | Archivage | Process termines : que se passe-t-il ? | BLOQUANTE | Badge Termine + reste dans la liste | REPONDU | Restent dans la liste avec badge. Pas d'archivage pour le MVP. |
| Q17 | Partage | Aurelia et Laurie partagent-elles les donnees ? | BLOQUANTE | Pas de partage (localStorage) | REPONDU | CHANGE : oui, partage via Supabase des le MVP. Email + mot de passe. |
| Q18 | UX — Process detail | Modifier la date absolue directement ? | OPTIONNELLE | Non, seul le timing relatif est editable | HYPOTHESE | OK |
| Q19 | UX — Process detail | Confirmation lors du changement de date cible ? | OPTIONNELLE | Oui, confirmation | HYPOTHESE | OK |
| Q20 | Conflit | Priorite si depassement 60 Ko ? | BLOQUANTE | F1 > F2 > F4 > F3 | REPONDU | Accepte. Gantt simplifie en premier si necessaire. |
| Q21 | Export | Bouton Export/Import JSON ? | OPTIONNELLE | Oui | REPONDU | Oui en complement de Supabase (backup) |
| Q22 | Templates | Templates modifiables par l'utilisateur ? | OPTIONNELLE | Non, figes dans le code pour le MVP | HYPOTHESE | OK |
| Q23 | Accessibilite | Scope navigation clavier ? | OPTIONNELLE | Boutons, checkboxes, inputs, dropdowns | HYPOTHESE | OK |
| Q24 | Backend | Partage des donnees : quelle solution ? | BLOQUANTE (ajoutee) | Supabase | REPONDU | Supabase (meme instance que portail client V2 dcynlifggjiqqihincbp) |
| Q25 | Auth | Methode de connexion ? | BLOQUANTE (ajoutee) | Email + mot de passe | REPONDU | Email + mot de passe (comme portail client V2) |
| Q26 | Architecture | Fichier unique ou multi-fichiers avec Supabase ? | BLOQUANTE (ajoutee) | Fichier unique + CDN Supabase | REPONDU | Fichier unique toujours (CDN Supabase comme portail V2) |
| Q27 | UX | Bouton Dupliquer un process termine ? | OPTIONNELLE (ajoutee) | Oui | REPONDU | Oui — copie le process, remet a zero, demande nouvelle date cible |
| Q28 | Roles | Vue admin separee pour Catherine ? | OPTIONNELLE (ajoutee) | Non | REPONDU | Meme acces pour tous (pas de multi-tenant pour le MVP) |
