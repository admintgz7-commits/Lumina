import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "assets/uploads", publicFolder: "public" } },

  schema: {
    collections: [

      // ── HOMEPAGE ─────────────────────────────────────────
      {
        name: "homepage",
        label: "🏠 Page d'accueil",
        path: "content/pages",
        match: { include: "home" },
        format: "json",
        ui: {
          router: () => `/`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "hero_eyebrow", label: "Bandeau eyebrow" },
          { type: "string", name: "hero_title", label: "Titre principal (H1)", ui: { component: "textarea", description: "Utilisez \\n pour un retour à la ligne" } },
          { type: "string", name: "hero_subtitle", label: "Sous-titre", ui: { component: "textarea" } },
          { type: "string", name: "hero_cta_primary", label: "Bouton principal" },
          { type: "string", name: "hero_cta_secondary", label: "Bouton secondaire" },
          { type: "string", name: "transparency_text", label: "Texte transparence", ui: { component: "textarea" } },
          { type: "string", name: "section_outils_title", label: "Titre section outils" },
          { type: "string", name: "section_outils_subtitle", label: "Sous-titre section outils" },
          { type: "string", name: "section_blog_title", label: "Titre section blog" },
          { type: "string", name: "section_blog_subtitle", label: "Sous-titre section blog" },
          { type: "string", name: "newsletter_title", label: "Titre newsletter" },
          { type: "string", name: "newsletter_subtitle", label: "Sous-titre newsletter" },
          { type: "string", name: "newsletter_cta", label: "Bouton newsletter" },
          { type: "boolean", name: "announcement_enabled", label: "Activer le bandeau annonce" },
          { type: "string", name: "announcement_text", label: "Texte de l'annonce", ui: { description: "Ex : 🆕 Nouvel outil : HeyGen v3" } },
          { type: "string", name: "announcement_url", label: "Lien de l'annonce (optionnel)" },
        ],
      },

      // ── PARAMÈTRES GLOBAUX ───────────────────────────────
      {
        name: "settings",
        label: "⚙️ Paramètres du site",
        path: "content/pages",
        match: { include: "settings" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "site_name", label: "Nom du site" },
          { type: "string", name: "site_tagline", label: "Tagline globale" },
          { type: "string", name: "site_url", label: "URL du site (sans slash final)" },
          { type: "string", name: "site_description", label: "Description SEO globale", ui: { component: "textarea" } },
          { type: "image", name: "og_image", label: "Image Open Graph par défaut" },
          { type: "string", name: "footer_tagline", label: "Tagline footer", ui: { component: "textarea" } },
          { type: "string", name: "footer_copyright", label: "Texte copyright" },
          { type: "string", name: "footer_baseline", label: "Baseline footer droite" },
          { type: "string", name: "nav_cta_ghost", label: "Bouton nav ghost (texte)" },
          { type: "string", name: "nav_cta_ghost_href", label: "Bouton nav ghost (lien)" },
          { type: "string", name: "nav_cta_primary", label: "Bouton nav primary (texte)" },
          { type: "string", name: "nav_cta_primary_href", label: "Bouton nav primary (lien)" },
        ],
      },

      // ── FAQ ──────────────────────────────────────────────
      {
        name: "faq",
        label: "❓ FAQ",
        path: "content/pages",
        match: { include: "faq" },
        format: "json",
        ui: {
          router: () => `/faq`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Titre de la page", isTitle: true, required: true },
          { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
          {
            type: "object", name: "faqs", label: "Questions / Réponses",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "Question" }), defaultItem: { question: "", answer: "" } },
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Réponse", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ── ÉQUIPE ───────────────────────────────────────────
      {
        name: "equipe",
        label: "👤 Équipe",
        path: "content/pages",
        match: { include: "equipe" },
        format: "json",
        ui: {
          router: () => `/equipe`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
          { type: "string", name: "subtitle", label: "Sous-titre" },
          { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
          {
            type: "object", name: "members", label: "Membres de l'équipe",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Membre" }) },
            fields: [
              { type: "string", name: "name", label: "Nom" },
              { type: "string", name: "role", label: "Rôle" },
              { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } },
              { type: "image", name: "avatar", label: "Photo" },
            ],
          },
          {
            type: "object", name: "values", label: "Valeurs",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Valeur" }) },
            fields: [
              { type: "string", name: "title", label: "Titre" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ── SÉLECTIONS THÉMATIQUES ───────────────────────────
      {
        name: "selections",
        label: "🎯 Sélections thématiques",
        path: "content/selections",
        format: "json",
        ui: {
          router: ({ document }) => `/selections/${document._sys.filename}`,
          filename: { slugify: (values) => values?.slug || "nouvelle-selection" },
        },
        fields: [
          { type: "string", name: "slug", label: "Slug URL", isTitle: true, required: true, ui: { description: "Ex : top-outils-coachs" } },
          { type: "string", name: "title", label: "Titre de la sélection", required: true },
          { type: "string", name: "description", label: "Description courte", ui: { component: "textarea" } },
          { type: "image", name: "coverPhoto", label: "Image de couverture" },
          { type: "string", name: "coverAlt", label: "Alt text image" },
          { type: "string", name: "metaDescription", label: "Meta description SEO", ui: { component: "textarea" } },
          { type: "string", name: "date", label: "Date", ui: { description: "Ex : Mars 2026" } },
          { type: "string", name: "intro", label: "Intro de la sélection", ui: { component: "textarea" } },
          {
            type: "string", name: "outils", label: "IDs des outils (dans l'ordre)",
            list: true,
            ui: { description: "IDs exacts des fiches outils. Ex : heygen, taplio, ghostwriter-ai" },
          },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },

      // ── GLOSSAIRE ────────────────────────────────────────
      {
        name: "glossaire",
        label: "📖 Glossaire IA",
        path: "content/glossaire",
        match: { include: "glossaire" },
        format: "json",
        ui: {
          router: () => `/glossaire`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object", name: "terms", label: "Termes du glossaire",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.term || "Terme" }), defaultItem: { term: "", definition: "", category: "" } },
            fields: [
              { type: "string", name: "term", label: "Terme" },
              { type: "string", name: "definition", label: "Définition", ui: { component: "textarea" } },
              {
                type: "string", name: "category", label: "Catégorie",
                options: ["Fondamentaux", "Création visuelle", "Vidéo", "Audio", "Marketing", "Tarification", "Technique"],
              },
            ],
          },
        ],
      },

      // ── ARTICLES DE BLOG ─────────────────────────────────
      {
        name: "articles",
        label: "📝 Articles de blog",
        path: "content/articles",
        format: "json",
        ui: {
          router: ({ document }) => `/article/${document._sys.filename}`,
          filename: { slugify: (values) => values?.slug || "nouvel-article" },
        },
        fields: [
          { type: "string", name: "title", label: "Titre (SEO)", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          { type: "string", name: "sectorLabel", label: "Catégorie affichée", ui: { description: "Ex : Guide pratique, Avis outil, Comparatif" } },
          {
            type: "string", name: "sector", label: "Secteur",
            options: [
              { label: "Créer un site web", value: "creation-site" },
              { label: "Rédaction & SEO", value: "redaction-seo" },
              { label: "Réseaux sociaux", value: "reseaux-sociaux" },
              { label: "Image & Design", value: "image-design" },
              { label: "Vidéo & Audio", value: "video-audio" },
              { label: "Business & Marketing", value: "business-marketing" },
            ],
          },
          { type: "string", name: "readTime", label: "Temps de lecture" },
          { type: "string", name: "date", label: "Date", ui: { description: "Ex : Avril 2026" } },
          { type: "image", name: "coverPhoto", label: "Image de couverture" },
          { type: "string", name: "coverAlt", label: "Alt text image (SEO)" },
          { type: "string", name: "metaDescription", label: "Meta description (SEO)", ui: { component: "textarea", description: "155 caractères max" } },
          { type: "string", name: "keywordTarget", label: "Mot-clé cible" },
          { type: "string", name: "intro", label: "Intro (chapeau)", ui: { component: "textarea" } },
          { type: "string", name: "pullQuote", label: "Citation forte" },
          {
            type: "object", name: "sections", label: "Sections de l'article",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Section" }), defaultItem: { title: "", body: "" } },
            fields: [
              { type: "string", name: "title", label: "Titre H2" },
              { type: "rich-text", name: "body", label: "Contenu" },
            ],
          },
          {
            type: "object", name: "faq", label: "FAQ (optionnel)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "Question" }) },
            fields: [
              { type: "string", name: "question", label: "Question" },
              { type: "string", name: "answer", label: "Réponse", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },

      // ── FICHES OUTILS ────────────────────────────────────
      {
        name: "outils",
        label: "🛠 Fiches outils",
        path: "content/outils",
        format: "json",
        ui: {
          router: ({ document }) => `/outil/${document._sys.filename}`,
          filename: { slugify: (values) => values?.identifiant || "nouvel-outil" },
        },
        fields: [
          { type: "string", name: "identifiant", label: "ID unique (slug URL)", isTitle: true, required: true },
          { type: "string", name: "name", label: "Nom de l'outil", required: true },
          { type: "string", name: "tagline", label: "Tagline" },
          {
            type: "string", name: "category", label: "Sous-catégorie",
            options: [
              { label: "Créateur de site", value: "website-builder" },
              { label: "Rédaction SEO", value: "seo-writing" },
              { label: "Réseaux sociaux", value: "social-media" },
              { label: "Branding", value: "branding" },
              { label: "Génération image", value: "image-gen" },
              { label: "Retouche image", value: "image-editing" },
              { label: "Avatar vidéo", value: "video-avatar" },
              { label: "Vidéo IA", value: "video-gen" },
              { label: "Montage vidéo", value: "video-editing" },
              { label: "Audio", value: "audio" },
              { label: "Copywriting", value: "copywriting" },
              { label: "Idées business", value: "business-ideas" },
              { label: "Business plan", value: "business-planning" },
              { label: "3D & Vidéo", value: "3d-video" },
            ],
          },
          {
            type: "string", name: "sector", label: "Secteurs", list: true,
            options: [
              { label: "Créer un site web", value: "creation-site" },
              { label: "Rédaction & SEO", value: "redaction-seo" },
              { label: "Réseaux sociaux", value: "reseaux-sociaux" },
              { label: "Image & Design", value: "image-design" },
              { label: "Vidéo & Audio", value: "video-audio" },
              { label: "Business & Marketing", value: "business-marketing" },
            ],
          },
          { type: "string", name: "priceDetails", label: "Détail du tarif" },
          { type: "string", name: "priceType", label: "Type de tarif", options: ["Gratuit", "Freemium", "Payant", "Sur devis"] },
          {
            type: "string", name: "badge", label: "Badge",
            options: [{ label: "Aucun", value: "" }, { label: "Best value", value: "best" }, { label: "Nouveau", value: "new" }, { label: "API ready", value: "api" }],
          },
          { type: "string", name: "badgeLabel", label: "Label du badge" },
          { type: "boolean", name: "apiReady", label: "API disponible" },
          { type: "boolean", name: "tested", label: "Outil testé par Lumina AI" },
          { type: "number", name: "score", label: "Score (1-5)", ui: { description: "4.7+ = apparaît dans la sélection homepage" } },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "url", label: "Lien affilié" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "features", label: "Fonctionnalités clés", list: true },
          { type: "string", name: "useCases", label: "Pour qui ?", list: true },
        ],
      },

      // ── SECTEURS ─────────────────────────────────────────
      {
        name: "secteurs",
        label: "🗂 Secteurs",
        path: "content/secteurs",
        format: "json",
        ui: {
          router: ({ document }) => `/secteur/${document._sys.filename}`,
        },
        fields: [
          { type: "string", name: "identifiant", label: "ID", isTitle: true, required: true },
          { type: "string", name: "label", label: "Label menu" },
          { type: "string", name: "headline", label: "Titre de la page secteur" },
          { type: "string", name: "sub", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "photo", label: "Photo de couverture" },
        ],
      },

    ],
  },
});
