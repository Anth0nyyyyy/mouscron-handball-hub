import { Trophy, Users, HeartHandshake, Flag, Eye, Camera, Tv, Newspaper, MapPin, Sparkles, PiggyBank, Megaphone, Layers, Shirt } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ---------------------------------------------------------------------------
// CHIFFRES & CONTENU : repris du dossier de sponsoring HC Mouscron 2026-2027 (V19)
// ---------------------------------------------------------------------------
export type Stat = { icon: LucideIcon; to?: number; value?: string; label: string; text: string };

export const CLUB_STATS: Stat[] = [
  { icon: Trophy, value: '1er', label: 'Promotion Brabant-Hainaut', text: 'Équipe Seniors 2025-2026 : invaincue, meilleure attaque, 2e meilleure défense. Montée en D1 LFH.' },
  { icon: Users, to: 70, label: 'Adhérents', text: 'Un club en évolution constante depuis 5 ans.' },
  { icon: HeartHandshake, to: 15, label: 'Encadrants', text: 'Sportifs et administratifs : les forces vives qui font grandir le club.' },
  { icon: Flag, to: 5, label: 'Équipes inscrites', text: 'En championnats wallons et flamands.' },
];

export const REACH_STATS: Stat[] = [
  { icon: Eye, to: 76823, label: 'Vues Facebook', text: 'Sur 30 jours (avril / mai) : 11 900 comptes touchés, +61,84 % d’évolution.' },
  { icon: Camera, to: 29496, label: 'Vues Instagram', text: 'Sur 30 jours (avril / mai) : 4 296 comptes touchés, +243,07 % d’évolution.' },
  { icon: Tv, to: 6, label: 'Reportages TV en 2026', text: 'Les médias traditionnels parlent aussi de nous.' },
  { icon: Newspaper, to: 24, label: 'Reportages en 2025-26', text: 'Une couverture régulière tout au long de la saison.' },
];

export const PILLARS = [
  { icon: MapPin, title: 'Opportunités de proximité', words: ['Visibilité', 'Proximité', 'Notoriété'] },
  { icon: Sparkles, title: 'Image positive', words: ['Famille', 'Respect', 'Passion'] },
  { icon: HeartHandshake, title: 'Partage de valeurs', words: ["Esprit d'équipe", 'Solidarité', 'Engagement'] },
  { icon: PiggyBank, title: 'Avantage fiscal *', words: ['Investissement', 'Valorisation', 'Optimisation'] },
];

// Formule « Découverte » : mets SHOW_PRICE à false pour ne pas afficher le prix sur le site
export const SHOW_PRICE = true;
export const DECOUVERTE = [
  'Logo sur le set de table du repas',
  "Affichage sur l'écran de la cafétéria",
  'Présence sur toutes nos affiches',
  'Affichage sur notre site internet',
  'Affichage sur nos réseaux sociaux',
  'Affichage sur notre panneau partenaires',
];

// Formules affichées dans la pile de cartes (seules les formules encore disponibles)
export type Offer = { icon: LucideIcon; name: string; pitch: string; price: string; unit: string; slots: string; size?: string; color: string; perks: string[] };
export const OFFERS: Offer[] = [
  { icon: Sparkles, name: 'Découverte', color: '#e74506', price: '250 €', unit: 'HTVA', slots: 'Sans exclusivité sectorielle',
    pitch: "Le point d'entrée : tous nos supports de base, accessible à plusieurs entreprises d'un même secteur.", perks: DECOUVERTE },
  { icon: Megaphone, name: 'Pop-up', color: '#0369a1', price: '400 € / 600 €', unit: 'HTVA · single / double spot', slots: '2 emplacements', size: '200 × 90 cm',
    pitch: "Une visibilité au plus près de l'action.",
    perks: ['Au bord du terrain, visible depuis les tribunes', 'Présent durant tous les matchs', 'Utilisable pour vos événements pro', 'Inclut la formule Découverte'] },
  { icon: Layers, name: 'Evo-Wall', color: '#7c3aed', price: '500 € / 700 €', unit: 'HTVA · single / double spot', slots: '10 emplacements', size: '300 × 230 ou 400 × 230 cm',
    pitch: 'Une présence remarquée.',
    perks: ["Près du tableau d'affichage", 'Visible depuis les tribunes, derrière les joueurs', 'Utilisable pour vos événements pro', 'Inclut la formule Découverte'] },
  { icon: Eye, name: 'Filets', color: '#0f766e', price: '1 000 €', unit: 'HTVA · double spot', slots: '2 emplacements', size: '2 displays 300 × 200 cm',
    pitch: 'Une visibilité renforcée.',
    perks: ['Double affichage tout au long des matchs', 'Exclusivité sectorielle', 'Inclut la formule Découverte'] },
  { icon: Shirt, name: 'Maillot-Short', color: '#b45309', price: 'Dès 700 €', unit: "HTVA · jusqu'à 2 000 €", slots: '14 emplacements', size: '18 joueurs + 2 gardiens + 2 coachs',
    pitch: "Votre logo porté par toute l'équipe.",
    perks: ['Bronze 700 € · Argent 1 000 € · Or 1 500 € · Platine 2 000 €', 'Offre spéciale « Effet waouh ! » : double spot bronze 1 000 €', 'Exclusivité sectorielle', 'Inclut la formule Découverte'] },
];
