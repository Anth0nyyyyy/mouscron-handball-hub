import { asset } from '@/lib/asset';

// ===========================================================================
// COMITÉ, ENTRAÎNEURS ET ÉQUIPES
// Utilisé par la page Équipe.
// - Ajouter une personne : copier une ligne { name, role, image } dans la bonne liste.
// - Photo : déposer l'image dans public/uploads/staff/ (ou teams/) puis lancer `npm run images`.
//   Sans photo, les initiales s'affichent automatiquement.
// - Nouveau rôle : ajouter sa description dans ROLE_DESC.
// ===========================================================================

export type GroupId = 'comite' | 'seniors' | 'jeunes';
export type Member = { name: string; role: string; image: string };

export const bureau: Member[] = [
  { name: 'Damien Cockenpot', role: 'Président', image: asset('/uploads/staff/damien-cockenpot.webp') },
  { name: 'David Macarez', role: 'Secrétaire', image: asset('/uploads/staff/david-macarez.webp') },
  { name: 'Joaquim Vercruysse', role: 'Trésorier', image: asset('/uploads/staff/joaquim-vercruysse.webp') },
  { name: 'Gothane Dhondt', role: 'Organisateur événementiel sportif', image: asset('/uploads/staff/gothane-dhondt.webp') },
  { name: 'Jean Philippe Fabbri', role: 'Logistique', image: asset('/uploads/staff/jean-philippe-fabbri.webp') },
  { name: 'Lucas Vincent', role: 'Responsable communication', image: asset('/uploads/staff/lucas-vincent.webp') },
  { name: 'Benjamin', role: 'Responsable communication', image: asset('/uploads/staff/benjamin.webp') },
];

export const entraineursSeniors: Member[] = [
  { name: 'Laszlo Baan', role: 'Coach T1', image: asset('/uploads/staff/laszlo-baan.webp') },
  { name: 'Thierry Vincent', role: 'Coach T2', image: asset('/uploads/staff/thierry-vincent.webp') },
];

export const entraineursJeunes: Member[] = [
  { name: 'Anthony Delaby', role: 'Coach U18', image: asset('/uploads/staff/anthony-delaby.webp') },
  { name: 'Philippe Julien', role: 'Coach U16', image: asset('/uploads/staff/philippe-julien.webp') },
  { name: 'Dorian Derveaux', role: 'Coach Mini Handball', image: asset('/uploads/staff/dorian-derveaux.webp') },
  { name: 'Nino Mancinone', role: 'Coach Mini Handball', image: asset('/uploads/staff/nino-mancinone.webp') },
];

// Description affichée au dos de la carte, selon le rôle (à adapter librement)
export const ROLE_DESC: Record<string, string> = {
  'Président': "Représente le club, pilote le comité et veille à l'esprit sportif et humain du HC Mouscron.",
  'Secrétaire': "Assure l'organisation administrative du club : courriers, inscriptions, comptes rendus et suivi des dossiers.",
  'Trésorier': 'Gère les finances du club : cotisations, budget, paiements et suivi des comptes.',
  'Organisateur événementiel sportif': "Imagine et coordonne les événements du club : rencontres, tournois et moments de convivialité.",
  'Logistique': "Prépare le matériel et la salle pour que les entraînements et les matchs se déroulent dans les meilleures conditions.",
  'Responsable communication': "Fait vivre l'image du club : réseaux sociaux, photos, annonces et information des membres.",
  'Coach T1': "Entraîne l'équipe T1 : préparation, tactique et suivi des joueurs en compétition.",
  'Coach T2': "Entraîne l'équipe T2 et accompagne les joueurs dans leur progression.",
  'Coach U18': "Entraîne les U18 : perfectionnement technique et tactique, et préparation aux compétitions.",
  'Coach U16': 'Entraîne les U16 : développement des joueurs, jeu collectif et esprit de compétition.',
  'Coach Mini Handball': 'Initie les plus jeunes au handball par le jeu, dans la bonne humeur et le respect.',
};

export const GROUPS: { id: GroupId; label: string; title: string; sub: string; color: string; members: Member[] }[] = [
  { id: 'comite', label: 'Comité', title: 'Comité', sub: 'Celles et ceux qui font vivre le club au quotidien', color: 'hsl(var(--hc-orange))', members: bureau },
  { id: 'seniors', label: 'Entraîneurs Seniors', title: 'Entraîneurs Seniors', sub: 'Le staff des équipes seniors', color: 'hsl(var(--hc-green-light))', members: entraineursSeniors },
  { id: 'jeunes', label: 'Jeunes & Mini', title: 'Entraîneurs Jeunes & Mini handball', sub: 'Ils font grandir la relève', color: 'hsl(var(--hc-orange-light))', members: entraineursJeunes },
];

// Équipes (photos) — `match` = mots du rôle des coachs affichés dans la fenêtre agrandie
export const categories = [
  { name: 'Mini handball', img: asset('/uploads/teams/mini-handball.webp'), color: 'hsl(var(--hc-green-light))', match: ['Mini'] },
  { name: 'U16', img: asset('/uploads/teams/u16.webp'), color: 'hsl(var(--hc-green))', match: ['U16'] },
  { name: 'U18', img: asset('/uploads/teams/u18.webp'), color: 'hsl(var(--hc-green-light))', match: ['U18'] },
  { name: 'Seniors', img: asset('/uploads/teams/seniors.webp'), color: 'hsl(var(--hc-green))', match: ['T1', 'T2'] },
  { name: 'Vétérans / Loisir', img: asset('/uploads/teams/loisir.webp'), color: 'hsl(var(--hc-orange))', match: [] as string[] },
];

export const allCoaches = [...entraineursSeniors, ...entraineursJeunes];
