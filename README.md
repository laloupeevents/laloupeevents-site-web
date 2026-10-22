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

L'adresse publique du site (aperçus de partage) est définie dans `.env.production`.

## Mise en ligne (Cloudflare Workers)

Le site est hébergé sur Cloudflare Workers via l'adaptateur [OpenNext](https://opennext.js.org/cloudflare) :
**https://laloupe-site.laloupeevents.workers.dev**

```bash
# Le jeton La Loupe est stocké hors du projet ; le charger écrase le jeton Cloudflare par défaut du shell.
source ~/.cloudflare/laloupe.env
npm run deploy     # build OpenNext + déploiement
npm run preview    # tester localement dans l'environnement Workers
```

- Configuration : `wrangler.jsonc` (Worker `laloupe-site`) et `open-next.config.ts`.
- Images optimisées par Cloudflare Images (binding `IMAGES`, offre gratuite : 5 000 transformations/mois).
- Adresse publique : `.env.production` (à mettre à jour le jour où un nom de domaine est branché).

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
