/**
 * Construit l'URL d'un fichier du dossier `public/` en tenant compte de la base
 * du site (`/mouscron-handball-hub/` sur GitHub Pages, `/` sur OVH).
 * Exemple : asset('/uploads/logo.png')
 */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
