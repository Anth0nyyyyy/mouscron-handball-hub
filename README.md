# Site web du HC Mouscron

Site vitrine du club de handball HC Mouscron, développé bénévolement par un étudiant du club.

## Démarrage

Prérequis : [Node.js](https://nodejs.org/) 20 ou plus.

```bash
git clone https://github.com/Anth0nyyyyy/mouscron-handball-hub.git
cd mouscron-handball-hub
npm install
npm run dev        # http://localhost:8080
```

## Scripts

| Commande            | Rôle                                                      |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Serveur de développement avec rechargement automatique    |
| `npm run build`     | Build de production dans `dist/` (servi à la racine `/`)  |
| `npm run preview`   | Sert le contenu de `dist/` en local pour vérification     |
| `npm run typecheck` | Vérification TypeScript                                   |
| `npm run lint`      | ESLint                                                    |
| `npm run images`    | Convertit les nouvelles images de `public/uploads/` en WebP |

## Stack

- **Vite** + **React 18** + **TypeScript**
- **React Router** pour la navigation
- **CSS simple**, sans framework : `src/index.css` contient le système visuel (couleurs, typo, boutons,
  header, footer, composants partagés), chaque page a son propre `.css`
- **lucide-react** pour les icônes
- **EmailJS** pour le formulaire de contact (aucun backend)

### Design « le terrain »

- Couleurs du club en aplats : vert `#1C4827`, orange `#E74506` (variables dans `src/index.css`,
  avec une version nuit sous `[data-theme='dark']`).
- Bebas Neue pour les titres, Montserrat pour le texte.
- Un seul motif graphique : les lignes d'un terrain de handball (`src/components/Court.tsx`),
  animées une seule fois sur la photo de l'accueil.

## Organisation du code

```
src/
├── data/             CONTENU DU SITE, modifiable sans toucher aux pages
│   ├── club.ts       saison, horaires, tarifs, étapes d'inscription, agendas, documents, IBAN
│   ├── contact.ts    téléphone, e-mail, adresse, réseaux sociaux, menu
│   ├── partners.ts   partenaires (page Partenaires + logos de l'accueil)
│   ├── sponsoring.ts chiffres du club, formules et prix de sponsoring
│   └── staff.ts      comité, entraîneurs, descriptions des rôles, photos d'équipes
├── pages/            une page = un fichier .tsx + son .css (Home, Team, Partners, Info, Contact, NotFound)
├── components/       Header, Footer, Layout, PageHero, Court, WeekBoard, Steps, BrandIcons
│   └── contact/      ContactForm (EmailJS)
├── hooks/            use-theme (jour/nuit)
├── lib/              asset() pour les chemins d'images, schedule (horaires, catégories, tarifs)
└── index.css         système visuel commun
scripts/
└── optimize-images.mjs   conversion des images en WebP (npm run images)
public/
├── uploads/
│   ├── club/         logo, photo d'accueil, salle
│   ├── icons/        icônes réseaux sociaux
│   ├── partners/     logos des partenaires   (nom-du-partenaire.webp)
│   ├── staff/        photos du staff          (prenom-nom.webp)
│   └── teams/        photos des équipes       (u14.webp, seniors.webp…)
└── .htaccess         réécriture d'URL pour un hébergement Apache (OVH)
```

### Mettre à jour le contenu

- **Ajouter / retirer un partenaire** → `src/data/partners.ts`
- **Changer un prix ou une formule de sponsoring** → `src/data/sponsoring.ts`
- **Ajouter un coach / membre du comité** → `src/data/staff.ts`
- **Changer un horaire, une cotisation, la date de paiement** → `src/data/club.ts`
  (l'accueil, la page Infos et la page Équipe se mettent à jour ensemble)
- **Changer le téléphone, l'e-mail ou un réseau social** → `src/data/contact.ts`

### Ajouter une image

1. Déposer le fichier (`.png`, `.jpg`) dans le bon dossier de `public/uploads/`, avec un nom
   en minuscules sans espaces ni accents (ex. `public/uploads/staff/jean-dupont.jpg`).
2. Le référencer dans le code ou dans `src/data/` avec `asset()` :
   ```ts
   image: asset('/uploads/staff/jean-dupont.jpg')
   ```
3. Lancer `npm run images` : l'image est convertie en `.webp`, redimensionnée, l'original est
   supprimé et le chemin dans le code passe automatiquement en `.webp`.

`asset()` est indispensable : il ajoute le bon préfixe selon l'hébergement (GitHub Pages ou OVH).

## Déploiement

### Test : GitHub Pages (automatique)

Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui vérifie les types, construit le
site avec `BASE_PATH=/mouscron-handball-hub/` et le publie sur GitHub Pages.

### Production : OVH (plus tard)

Le site est prévu pour être servi à la racine du domaine :

1. `npm run build` (la base `/` est utilisée par défaut)
2. Envoyer **le contenu** de `dist/` (y compris le fichier caché `.htaccess`) à la racine de
   l'hébergement OVH (`www/`) via FTP.

Le `.htaccess` redirige toutes les URL vers `index.html` pour que les liens directs
(`/equipe`, `/contact`…) fonctionnent.

## Formulaire de contact (EmailJS)

Les identifiants EmailJS sont dans `src/components/contact/ContactForm.tsx`. Ils sont publics par
nature ; la protection se règle dans le dashboard EmailJS :

- **Account → Security** : limiter aux domaines autorisés + activer le reCAPTCHA
- **Template** : utiliser `{{message}}` (doubles accolades), jamais `{{{message}}}`

Côté code, le formulaire a un champ piège anti-robots, une limite d'un envoi par minute et des
longueurs maximales par champ.

## Sécurité

Une Content-Security-Policy est injectée au build (voir `vite.config.ts`). Si vous ajoutez un
service externe (script, iframe, API), ajoutez son domaine dans la constante `CSP`.
