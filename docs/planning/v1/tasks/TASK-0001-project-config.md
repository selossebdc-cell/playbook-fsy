# TASK-0001 — Setup projet et configuration

> **Principe BMAD** : Cette task est 100% auto-suffisante.
> Tout le contexte necessaire est inclus ci-dessous.

---

## Metadata

| Champ | Valeur |
|-------|--------|
| **ID** | TASK-0001 |
| **US Parent** | US-0001 |
| **EPIC** | EPIC-001 |
| **Priorite** | P1 |
| **Estimation** | 1-2h |
| **Statut** | pending |

---

## Objectif technique

Creer le fichier `index.html` avec la structure HTML de base, les CDN, les design tokens FSY, la navigation responsive et les 4 sections commentees (Domain, Application, Infrastructure, UI).

### Ce qui est attendu
- [ ] Fichier index.html avec doctype, head, body
- [ ] CDN Supabase JS v2 charge via jsDelivr
- [ ] Google Fonts (Playfair Display SC, Montserrat) chargees
- [ ] Design tokens FSY en CSS custom properties
- [ ] Navigation tabs en haut (desktop), bottom nav (mobile)
- [ ] 3 sections de contenu vides (Playbook, Mes Taches, Timeline)
- [ ] Header "Face Soul Yoga -- Playbook"
- [ ] 4 sections commentees dans le script : Domain, Application, Infrastructure, UI
- [ ] CSS responsive basique (media queries)
- [ ] CSS @media print basique

### Ce qui n'est PAS attendu (hors scope)
- Logique metier (fonctions Domain, Application)
- Authentification (task suivante)
- Contenu des vues

---

## Contexte complet

### Regles metier applicables

| Regle | Contrainte |
|-------|-----------|
| Fichier unique | Zero dependance npm, zero build, tout inline |
| ADR-0001 | Supabase JS CDN + Google Fonts + fichier HTML unique |
| Design tokens | Terracotta #B55B50, creme #FFFBF7, teal #033231 |
| Fonts | Playfair Display SC (headings), Montserrat (body) |
| Navigation | Tabs en haut desktop, bottom nav mobile |
| Header | Texte "Face Soul Yoga -- Playbook", pas de logo |

### ADR applicables

| ADR | Decision | Impact sur cette task |
|-----|----------|----------------------|
| `ADR-0001` | Fichier HTML unique + Supabase CDN | Structure du fichier, chargement CDN |

### Code existant pertinent

Aucun code existant (premiere task).

### Packages npm requis

Aucun nouveau package requis (zero npm).

### Dependances entre tasks

| Type | Element | Statut |
|------|---------|--------|
| Task prerequise | Aucune | - |
| CDN externe | jsDelivr (Supabase JS) | disponible |
| CDN externe | Google Fonts | disponible |

---

## Fichiers concernes

### Fichiers a creer
- `index.html` (fichier unique de l'application)

### Fichiers a modifier
- Aucun

### Alignment architectural

| Fichier | Layer | Concept | Justification |
|---------|-------|---------|---------------|
| `index.html` | Toutes | Structure | Fichier unique contenant toutes les couches |

---

## Plan d'implementation

1. **Structure HTML de base** : Creer index.html avec doctype, head, meta charset/viewport
   - Fichier: `index.html`
   - Action: creer

2. **CDN** : Ajouter les liens Google Fonts et le script Supabase JS
   - Fichier: `index.html` (head)
   - Action: ajouter les link et script CDN

3. **CSS inline** : Ajouter les design tokens FSY, le layout responsive, la navigation
   - Fichier: `index.html` (style dans head)
   - Action: creer le CSS avec custom properties, media queries, @media print

4. **HTML body** : Creer le header, la navigation, les 3 sections de contenu vides
   - Fichier: `index.html` (body)
   - Action: creer les elements HTML

5. **Script squelette** : Ajouter les 4 sections commentees vides
   - Fichier: `index.html` (script en bas de body)
   - Action: creer les sections commentees

6. **Navigation JS** : Logique basique de changement d'onglet
   - Fichier: `index.html` (section UI du script)
   - Action: ajouter la logique de navigation

---

## Definition of Done

- [ ] Le fichier index.html se charge sans erreur dans Chrome, Safari, Firefox
- [ ] La console du navigateur ne montre aucune erreur
- [ ] Les design tokens FSY sont appliques visuellement
- [ ] La navigation entre les 3 onglets fonctionne
- [ ] Le responsive fonctionne (desktop > 768px, mobile < 768px)
- [ ] Les 4 sections commentees sont presentes dans le script
- [ ] Supabase JS est charge (objet `supabase` disponible dans la console - sans initialisation)
- [ ] Les Google Fonts sont chargees et visibles

---

## Tests attendus

### Tests manuels
- [ ] Test: Ouvrir index.html dans Chrome — pas d'erreur console
- [ ] Test: Cliquer sur chaque onglet — le contenu change
- [ ] Test: Redimensionner < 768px — la bottom nav apparait
- [ ] Test: Verifier les polices (Playfair Display SC pour les titres)
- [ ] Test: Imprimer (Ctrl+P) — le contenu est lisible

---

## Criteres de validation automatique

| Critere | Seuil | Obligatoire |
|---------|-------|-------------|
| Fichier index.html existe | Oui | Oui |
| CDN Supabase present | script tag jsDelivr | Oui |
| Google Fonts present | link tag fonts.googleapis | Oui |
| Design tokens CSS | --fsy-terracotta, --fsy-creme, --fsy-teal | Oui |
| Sections commentees | 4 sections | Oui |

---

## Notes d'implementation

### Attention
- La cle Supabase ANON_KEY ne doit PAS etre incluse dans cette task (sera ajoutee dans TASK-0002)
- Ne pas inclure de donnees personnelles reelles (emails, noms)

### Patterns a suivre
- Utiliser des CSS custom properties pour tous les tokens de design
- Commenter chaque section du script avec `// === SECTION: [NOM] ===`
- Navigation avec display none/block et classes active

### A eviter
- Ne pas utiliser de framework CSS (Bootstrap, Tailwind)
- Ne pas utiliser de modules ES6 (pas de import/export)
- Ne pas creer d'autres fichiers

### Reference stack

```html
<!-- Supabase JS CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display+SC&display=swap" rel="stylesheet">
```

```css
:root {
  --fsy-terracotta: #B55B50;
  --fsy-creme: #FFFBF7;
  --fsy-teal: #033231;
  --font-heading: 'Playfair Display SC', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

---

## Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2026-03-18 | Scrum Master | Creation |
