# Lumina AI — Migration Next.js + TinaCMS Visual Editing

## Ce qui a changé (et ce qui n'a pas changé)

| | Avant | Après |
|---|---|---|
| Framework | HTML statique + JS vanilla | Next.js 14 (App Router) |
| CMS | TinaCMS (formulaire classique) | TinaCMS **avec visual editing** |
| Contenu JSON | `/content/` | `/content/` **identique, rien n'a bougé** |
| CSS / Design | `main.css` | `styles/globals.css` **pixel pour pixel** |
| SEO | Balises mises à jour en JS au runtime | **Metadata générée au build (SSG)** → bien meilleur pour Google |
| Sitemap | Généré par `build.js` | Généré automatiquement par Next.js |
| Hébergement | Cloudflare Pages (statique) | Cloudflare Pages (statique SSG) |

---

## Structure du projet

```
lumina-ai/
├── app/
│   ├── layout.tsx              # Layout global (Nav + fonts)
│   ├── page.tsx                # Accueil (SSG)
│   ├── not-found.tsx           # 404
│   ├── outils/
│   │   ├── page.tsx            # Listing outils (SSG)
│   │   └── OutilsClient.tsx    # Filtres interactifs (client)
│   ├── outil/[id]/
│   │   └── page.tsx            # Fiche outil (SSG — 50 pages)
│   ├── blog/
│   │   ├── page.tsx            # Listing blog (SSG)
│   │   └── BlogClient.tsx      # Filtres blog (client)
│   ├── article/[slug]/
│   │   └── page.tsx            # Article (SSG — 15 pages)
│   ├── contact/
│   │   ├── page.tsx
│   │   └── ContactForm.tsx
│   ├── soumettre/
│   │   ├── page.tsx
│   │   └── SoumettreForm.tsx
│   ├── newsletter/page.tsx
│   ├── cgv/page.tsx
│   ├── confidentialite/page.tsx
│   └── qui-sommes-nous/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ToolCard.tsx
│   └── BlogCard.tsx
├── lib/
│   └── content.ts              # Remplace data-loader.js (lecture JSON au build)
├── styles/
│   └── globals.css             # Ton CSS original, inchangé
├── tina/
│   └── config.ts               # Config TinaCMS avec visual editing
├── content/                    # TES FICHIERS JSON — inchangés
│   ├── articles/
│   ├── outils/
│   └── secteurs/
├── public/                     # Assets statiques
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Installation

### Prérequis
- Node.js >= 18
- Un compte GitHub (déjà existant)
- Un compte Cloudflare (déjà existant)
- Un compte TinaCMS sur [app.tina.io](https://app.tina.io) (gratuit)

### 1. Copier tes fichiers JSON

```bash
# Dans le nouveau projet, copier ton contenu existant
cp -r /ancien-projet/content ./content
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Tester en local

```bash
npm run dev
```

Ouvre `http://localhost:3000` — ton site s'affiche avec le même design.

L'admin Tina est accessible sur `http://localhost:3000/admin` avec **visual editing** : tu vois le site à droite et le formulaire d'édition à gauche. Clique sur n'importe quel élément pour l'éditer directement.

---

## Activer le Visual Editing Tina Cloud

### Étape 1 — Créer un projet sur app.tina.io

1. Va sur [app.tina.io](https://app.tina.io)
2. Clique "New Project" → connecte ton repo GitHub `guineztom/Lumina2`
3. Récupère ton **Client ID** et ton **Token**

### Étape 2 — Variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
TINA_CLIENT_ID=ton-client-id-ici
TINA_TOKEN=ton-token-ici
GITHUB_BRANCH=main
```

> ⚠️ Ne commite jamais `.env.local` — il est déjà dans `.gitignore`

### Étape 3 — Variables sur Cloudflare Pages

Dans ton dashboard Cloudflare Pages → ton projet → **Settings > Environment variables** :

```
TINA_CLIENT_ID = ton-client-id
TINA_TOKEN = ton-token
GITHUB_BRANCH = main
```

---

## Déploiement sur Cloudflare Pages

### Configuration du build dans Cloudflare Pages

| Paramètre | Valeur |
|---|---|
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `18` |

### Commandes de build

```bash
# Build complet (Tina + Next.js)
npm run build

# Le dossier /out contient le site statique prêt à déployer
```

---

## Ajouter un article ou un outil

### Via l'interface Tina (recommandé — visual editing)

1. Lance `npm run dev`
2. Va sur `http://localhost:3000/admin`
3. Clique sur "📝 Articles de blog" ou "🛠 Fiches outils"
4. Clique "New" pour créer, ou clique sur un existant pour éditer
5. **L'aperçu live s'affiche à droite** — tu vois les changements en temps réel
6. Clique "Save" → le fichier JSON est créé/modifié dans `/content/`
7. Commit + push → Cloudflare Pages rebuild automatiquement

### Via l'admin Tina Cloud (en production)

1. Va sur `https://lumina-ai.fr/admin`
2. Même interface, mais les modifications sont commitées directement sur GitHub
3. Cloudflare Pages détecte le commit et rebuild en ~2 minutes

---

## Pourquoi ce sera mieux pour Google

| | Avant | Après |
|---|---|---|
| Contenu indexable | ❌ JS rendu côté client (Googlebot doit exécuter le JS) | ✅ HTML statique pré-généré |
| Balises `<title>` et `<meta>` | ❌ Injectées en JS après le chargement | ✅ Dans le HTML au chargement |
| URL des articles | ❌ `/#article/mon-article` (hash non indexé) | ✅ `/article/mon-article/` (URL réelle) |
| URL des outils | ❌ `/#tool/heygen` | ✅ `/outil/heygen/` |
| Sitemap | ✅ Généré | ✅ Auto-généré par Next.js |
| Core Web Vitals | Variable (JS lourd à charger) | ✅ HTML statique = LCP rapide |
| Open Graph (partage réseaux) | ❌ Balises génériques | ✅ Balises spécifiques par page |

---

## Résolution de problèmes fréquents

### "Cannot find module '@/lib/content'"
Vérifie que `tsconfig.json` contient `"paths": { "@/*": ["./*"] }`. ✓ Déjà configuré.

### "Error: ENOENT: no such file or directory, scandir 'content/outils'"
Les dossiers `content/` sont vides. Copie tes fichiers JSON depuis l'ancien projet.

### Le visual editing ne s'affiche pas
- Vérifie que `TINA_CLIENT_ID` et `TINA_TOKEN` sont correctement renseignés dans `.env.local`
- Assure-toi d'avoir créé le projet sur `app.tina.io` et connecté ton repo GitHub

### Build Cloudflare échoue
- Vérifie que les variables d'environnement Tina sont bien ajoutées dans Cloudflare Pages
- Vérifie que le "Build output directory" est bien `out` (pas `.next`)

### Les images ne s'affichent pas
- `next.config.js` a `images: { unoptimized: true }` — les `<img>` standards fonctionnent
- Pour utiliser `<Image>` de Next.js, les URLs doivent être dans `remotePatterns`

---

## Commandes utiles

```bash
npm run dev          # Dev local avec Tina (visual editing sur /admin)
npm run build        # Build production
npm run start        # Serveur local production (après build)
```

---

## Prochaines étapes recommandées

1. **Connecter la newsletter** — Remplacer le bouton factice par Mailchimp ou ConvertKit
2. **Analytics** — Ajouter Cloudflare Web Analytics (gratuit, RGPD-friendly, 1 ligne de code)
3. **Sitemap automatique** — Ajouter `next-sitemap` pour générer `sitemap.xml` et `robots.txt`
4. **Images** — Migrer les images vers Cloudflare Images ou un CDN pour accélérer le LCP
