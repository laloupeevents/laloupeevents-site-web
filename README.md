# La Loupe — site vitrine

Site vitrine de **La Loupe**, experte en protocole étatique et événementiel (Dakar, Sénégal).

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 — charte : vert `#043927`, crème `#F8ECC4`, typographie Metropolis (auto-hébergée, licence OFL)
- Animations : `motion` (Framer Motion) et `lenis` (défilement doux)

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # version de production
```

Avant la mise en ligne, définir l'adresse publique du site (utilisée pour les aperçus de partage) :

```bash
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_SITE_URL
```

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Textes, coordonnées, modules de formation, chiffres | `src/lib/content.ts` |
| Photos | `src/assets/images/` + `src/lib/images.ts` (sources dans `IMAGES.md`) |
| Logos | `src/assets/brand/` (fichiers officiels fournis) |
| Couleurs et polices | `src/app/globals.css` (`@theme`) et `src/app/layout.tsx` |
| Titre, description SEO | `src/app/layout.tsx` (`metadata`) |
| Icône et image de partage | `src/app/icon.png`, `apple-icon.png`, `opengraph-image.jpg` |

## Sections

Accueil (effet loupe) · La Maison · Expertises · Sommets & Conférences · Méthode · Académie du Protocole
(7 modules) · Chiffres · Galerie · Pourquoi nous choisir · Mot de la fondatrice · Contact.

## Formulaire de contact

Le formulaire ne dépend d'aucun serveur : il ouvre la messagerie du visiteur avec la demande pré-remplie
(vers `laloupeevents@gmail.com`), ou WhatsApp. Un envoi direct (service d'e-mail) pourra être branché plus tard.

## Accessibilité et performance

- Les animations respectent le réglage « réduire les animations » du système.
- L'intro n'est jouée qu'une fois par session.
- Le curseur personnalisé et la loupe interactive ne s'activent qu'à la souris ; sur mobile, la loupe se déplace seule.
- Page entièrement statique, images optimisées par `next/image`.
