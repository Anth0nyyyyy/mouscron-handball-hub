import { trainingSchedule, tarifs } from '@/data/club';

// Outils autour des horaires et des tarifs (utilisés par l'accueil, Infos et Équipe)

export const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export type CatKey = 'mini' | 'u16' | 'u18' | 'seniors' | 'loisir' | 'none';

/** « Tous les lundis » → « lundi » */
export const dayOf = (d: string) => DAYS.find((x) => d.toLowerCase().includes(x)) ?? d;

/** « U16 (né(e)s en 2011 et 2012) » → « U16 » ; « Équipe Loisir » → « Loisir » */
export const shortCat = (c: string) => c.replace(/\s*\(.*\)$/, '').replace('Équipe ', '');

/** Détail entre parenthèses : « né(e)s en 2011 et 2012 » */
export const catDetail = (c: string) => c.match(/\((.*)\)$/)?.[1] ?? '';

export const catKeyOf = (c: string): CatKey =>
  c.startsWith('Mini') ? 'mini'
    : c.startsWith('U16') ? 'u16'
    : c.startsWith('U18') ? 'u18'
    : c.includes('Loisir') ? 'loisir'
    : 'seniors';

export const fmtTime = (t: string) => t.replace(' - ', '–');

/** Créneaux d'une catégorie */
export const sessionsOf = (key: CatKey) => trainingSchedule.filter((s) => catKeyOf(s.category) === key);

/** Semaine type : seulement les jours avec entraînement */
export const week = () =>
  DAYS.map((day) => ({
    day,
    items: trainingSchedule.filter((s) => dayOf(s.day) === day).sort((a, b) => a.time.localeCompare(b.time)),
  })).filter((d) => d.items.length);

/** Catégorie d'âge selon l'année de naissance (saison 2026-2027) */
export const categoryFor = (year: number): { key: CatKey; label: string } => {
  if (year >= 2015) return { key: 'mini', label: 'Mini-handball' };
  if (year >= 2013) return { key: 'none', label: "Pas d'équipe" }; // pas d'équipe U14 cette saison
  if (year >= 2011) return { key: 'u16', label: 'U16' };
  if (year >= 2008) return { key: 'u18', label: 'U18' };
  return { key: 'seniors', label: 'Seniors' };
};

const price = (prefix: string) => tarifs.find((t) => t.label.startsWith(prefix))?.price ?? '';

/** Cotisation selon l'année : Mini (2015+), Juniors (2009+), Séniors (2008 et avant) */
export const feeFor = (year: number) => (year >= 2015 ? price('Mini') : year >= 2009 ? price('Juniors') : price('Séniors'));
