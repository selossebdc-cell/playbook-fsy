# Stack Reference - Bill of Materials

> Source de verite pour les versions et configurations des dependances.
> Genere automatiquement par verification web (npm registry + WebSearch/WebFetch) lors de la phase MODEL.
> **NE PAS editer manuellement** -- regenerer via `/factory-spec`.

## Dependencies runtime

| Package | Version | Install command | Source |
|---------|---------|----------------|--------|
| @supabase/supabase-js | 2.101.1 | CDN : `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` | https://www.npmjs.com/package/@supabase/supabase-js |
| Google Fonts (Playfair Display SC) | N/A | `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet">` | https://fonts.google.com |
| Google Fonts (Montserrat) | N/A | `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">` | https://fonts.google.com |

## Dependencies dev

| Package | Version | Install command | Source |
|---------|---------|----------------|--------|
| Aucune | - | - | Zero dependance npm, zero build |

## Configurations de reference

### Supabase JS (CDN)

**Fichier** : `index.html` (inline dans `<script>`)

```html
<!-- Option 1 : Script tag classique -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  const SUPABASE_URL = 'https://dcynlifggjiqqihincbp.supabase.co';
  const SUPABASE_ANON_KEY = '<ANON_KEY>';
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>

<!-- Option 2 : ES Module -->
<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
```

> **Note** : L'instance Supabase `dcynlifggjiqqihincbp` est partagee avec le portail client V2.
> La cle ANON_KEY doit etre recuperee depuis le dashboard Supabase (pas de secret dans le code — la cle anon est publique par design).

### Google Fonts

**Fichier** : `index.html` (dans `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display+SC&display=swap" rel="stylesheet">
```

### Design Tokens FSY

```css
:root {
  --fsy-terracotta: #B55B50;
  --fsy-creme: #FFFBF7;
  --fsy-teal: #033231;
  --font-heading: 'Playfair Display SC', serif;
  --font-body: 'Montserrat', sans-serif;
}
```

<!-- V2:START -->

### Design Tokens V2 — CS Consulting

```css
:root {
  --cs-terracotta: #C27A5A;
  --cs-fond-sombre: #0f0f0f;
  --font-body-v2: 'Inter', sans-serif;
}
```

> **Note V2** : Le Playbook V1 conserve les tokens FSY (terracotta #B55B50, creme #FFFBF7, teal #033231).
> Les modules V2 integres dans app.html utilisent la charte CS Consulting (terracotta #C27A5A, fond sombre #0f0f0f, font Inter).

### Google Fonts V2 (Inter)

**Fichier** : `app.html` (dans `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

<!-- V2:END -->

## Compatibilite

- Supabase JS v2 fonctionne dans tous les navigateurs modernes (Chrome, Safari, Firefox)
- Le CDN jsDelivr sert automatiquement la derniere version mineure de la branche v2 (via `@2`)
- Google Fonts est compatible avec tous les navigateurs cibles
- Aucune dependance npm, donc aucun conflit de versions possible
- L'instance Supabase `dcynlifggjiqqihincbp` est partagee avec le portail client V2 — les tables doivent etre distinctes

## Breaking changes connus

| Lib | Ancien (a eviter) | Nouveau (a utiliser) | Detail |
|-----|-------------------|---------------------|--------|
| Supabase JS | v1 : `supabase.auth.session()` | v2 : `supabase.auth.getSession()` | API auth completement refactoree en v2 |
| Supabase JS | v1 : `supabase.auth.signIn()` | v2 : `supabase.auth.signInWithPassword()` | Methodes d'auth renommees en v2 |
| Supabase JS | v1 : `supabase.from().select()` callbacks | v2 : `const { data, error } = await supabase.from().select()` | Pattern async/await en v2 |
