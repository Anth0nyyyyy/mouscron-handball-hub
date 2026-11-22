import { asset } from '@/lib/asset';

// ===========================================================================
// PARTENAIRES DU CLUB
// Utilisé par la page Partenaires et le bandeau défilant de l'accueil.
// - Ajouter un partenaire : copier un bloc { ... } et adapter les valeurs.
// - Retirer un partenaire : supprimer son bloc.
// - Logo : déposer l'image dans public/uploads/partners/ puis lancer `npm run images`.
// ===========================================================================

export type Cat = 'finances' | 'sante' | 'technique';
export type Partner = {
  name: string;
  logo: string;
  website?: string;         // lien principal (site web, ou page Facebook). Facultatif : sans lien, le bouton est simplement masqué
  socials?: string[];       // autres liens donnés par le partenaire : Facebook, Instagram, TikTok, LinkedIn, YouTube, X...
  phone?: string;           // ex. '+32 56 12 34 56'
  email?: string;           // ex. 'contact@partenaire.be'
  description: string;
  tag: string;
  badge: string;
  color: string;
  cats: Cat[];
};

// LISTE COMPLETE DES PARTENAIRES OFFICIELS (classés du plus gros au plus petit montant)
// Pour ajouter les réseaux d'un partenaire, ajoute simplement : socials: ['https://www.instagram.com/...', 'https://www.facebook.com/...'], phone: '+32 ...', email: '...'
export const partners: Partner[] = [
  { // 2 000 €
    name: 'Sols Concept',
    logo: asset('/uploads/partners/sols-concept.webp'),
    website: 'https://www.solsconcepts.com',
    socials: [
      'https://www.facebook.com/solsconcepts/',
      'https://www.instagram.com/solsconcepts/',
      'https://www.youtube.com/@SolsConceptsMouscron',
      'https://www.linkedin.com/company/sols-concepts/?viewAsMember=true',
    ],
    description: 'Revêtements de sols',
    tag: 'Revêtements de sols',
    badge: 'Technique',
    color: '#8a5a2b',
    cats: ['technique'],
  },
  { // 2 000 €
    name: 'Acta Security',
    logo: asset('/uploads/partners/acta-security.webp'),
    website: 'https://www.acta-security.be/',
    socials: ['https://www.facebook.com/p/ACTA-Group-100063653186401/'],
    description: 'Solutions de sécurité innovantes',
    tag: 'Télésurveillance',
    badge: 'Sécurité',
    color: '#e11d48',
    cats: ['technique'],
  },
  { // 1 800 €
    name: 'WAPI Ambulance',
    logo: asset('/uploads/partners/wapi-ambulance.webp'),
    website: 'https://www.wapiambulance.be/',
    socials: ['https://www.facebook.com/wapi.ambulance/'],
    description: 'Ambulance et transport médical',
    tag: 'Transport médical',
    badge: 'Santé',
    color: '#c2410c',
    cats: ['sante'],
  },
  { // 1 200 €
    name: 'Paramed Center Coquinie',
    logo: asset('/uploads/partners/paramed-center-coquinie.webp'),
    website: 'https://www.facebook.com/ParamedCenterCoquinie',
    description: 'Centre paramédical à Mouscron (Kiné, Diététique, Logopédie)',
    tag: 'Kiné & Santé',
    badge: 'Santé',
    color: '#059669',
    cats: ['sante'],
  },
  { // 1 000 €
    name: 'Fred Elec',
    logo: asset('/uploads/partners/fred-elec.webp'),
    website: 'https://www.fred-electrique.com/fr/accueil',
    socials: ['https://www.facebook.com/fredelectrique1/'],
    description: 'Solutions électriques professionnelles',
    tag: 'BTP & Énergie',
    badge: 'Technique',
    color: '#d97706',
    cats: ['technique'],
  },
  { // 1 000 €
    name: 'AVM Construct',
    logo: asset('/uploads/partners/avm-construct.webp'),
    website: 'https://www.avmconstruct.com',
    socials: ['https://www.facebook.com/avmconstruct/'],
    description: 'Tout pour l’aménagement et la construction',
    tag: 'Construction',
    badge: 'Technique',
    color: '#0f766e',
    cats: ['technique'],
  },
  { // 1 000 €
    name: 'Ets JP Carrelage',
    logo: asset('/uploads/partners/jp-carrelage.webp'),
    website: 'https://www.jpcarrelage.be/',
    socials: ['https://www.facebook.com/jpcarrelage12/'],
    description: 'Carrelage',
    tag: 'Carrelage',
    badge: 'Technique',
    color: '#7c3aed',
    cats: ['technique'],
  },
  { // 1 000 €
    name: 'Vivien Bonduel Chauffage',
    logo: asset('/uploads/partners/vivien-bonduel-chauffage.webp'),
    website: 'https://www.vivienbonduel.com',
    socials: ['https://www.facebook.com/VivienBonduelChauffage/'],
    description: 'Chauffage',
    tag: 'Chauffage',
    badge: 'Technique',
    color: '#0369a1',
    cats: ['technique'],
  },
  { // 900 €
    name: 'GM Group',
    logo: asset('/uploads/partners/gm-group.webp'),
    website: 'https://gm-groupe.be/',
    socials: [
      'https://www.facebook.com/gmgroupesa/',
      'https://www.instagram.com/gmgroupesa/',
    ],
    description: 'Assurances (DVV), Crédits & Immobilier à Mouscron',
    tag: 'Assurances & Immo',
    badge: 'Assurance',
    color: '#2447c4',
    cats: ['finances'],
  },
  { // 700 €
    name: 'Tradeco',
    logo: asset('/uploads/partners/tradeco.svg'),
    website: 'https://www.tradeco.be/',
    socials: [
      'https://www.facebook.com/TradecoBelgium/',
      'https://www.instagram.com/tradeco_belgium/',
      'https://www.linkedin.com/company/tradeco-belgium-s-a/',
    ],
    description: 'Partenaire officiel du HC Mouscron',
    tag: 'Partenaire officiel',
    badge: 'Partenaire',
    color: '#b91c1c',
    cats: [],
  },
  { // 500 €
    name: 'Copaint',
    logo: asset('/uploads/partners/copaint.webp'),
    website: 'https://www.copaint.be/fr/home-fr/',
    socials: ['https://www.facebook.com/people/Copaint/100057213199100/'],
    description: 'Peinture',
    tag: 'Peinture',
    badge: 'Technique',
    color: '#0891b2',
    cats: ['technique'],
  },
  { // 400 €
    name: 'Themis',
    logo: asset('/uploads/partners/themis.webp'),
    website: 'https://themis-mouscron.be/friterie/',
    socials: [
      'https://www.facebook.com/FriterieThemis/',
      'https://www.instagram.com/FriterieThemis/',
    ],
    description: 'Partenaire officiel du HC Mouscron',
    tag: 'Partenaire officiel',
    badge: 'Partenaire',
    color: '#4338ca',
    cats: [],
  },
  { // 250 €
    name: 'Banque CPH',
    logo: asset('/uploads/partners/banque-cph.webp'),
    website: 'https://www.cph.be/',
    socials: [
      'https://www.facebook.com/cphbanque',
      'https://www.linkedin.com/company/banque-cph-scrl/',
      'https://www.youtube.com/channel/UCtaBfbPZat3mdSRLc4V0Idw',
    ],
    description: 'Banque & Assurances - Partenaire financier de proximité',
    tag: 'Proximité',
    badge: 'Banque',
    color: '#1e7a45',
    cats: ['finances'],
  },
  { // 250 €
    name: 'Mobireve',
    logo: asset('/uploads/partners/mobireve.webp'),
    website: 'https://www.mobireve.biz/',
    socials: ['https://www.facebook.com/mobireveliterie'],
    description: 'Partenaire officiel du HC Mouscron',
    tag: 'Partenaire officiel',
    badge: 'Partenaire',
    color: '#be185d',
    cats: [],
  },
  { // 250 €
    name: 'Océ Anniversaire',
    logo: asset('/uploads/partners/oce-anniversaire.webp'),
    website: 'https://www.facebook.com/profile.php?id=61586545933715',
    socials: ['https://www.instagram.com/oce_anniversaire/'],
    description: 'Anniversaire spa & beauté 100% girly à Mouscron',
    tag: 'Spa & Beauté',
    badge: 'Bien-être',
    color: '#db2777',
    cats: ['sante'],
  },
  { // 150 € + caisses de bière
    name: 'Hoption',
    logo: asset('/uploads/partners/hoption.webp'),
    website: 'https://hoptionmouscron.be/',
    socials: [
      'https://www.facebook.com/hoptionmouscron',
      'https://www.instagram.com/hoptionmouscron',
    ],
    description: 'Brasserie artisanale mouscronnoise - Bières uniques & authentiques.',
    tag: 'Terroir',
    badge: 'Artisan local',
    color: '#5a8f1e',
    cats: ['sante'],
  },
  { // gagné, montant non renseigné (même contact que Sols Concept)
    name: 'Espace Arthur',
    logo: asset('/uploads/partners/espace-arthur.webp'),
    website: 'https://www.elberg.be/espacearthur',
    socials: [
      'https://www.facebook.com/Elberg.Mouscron/',
      'https://www.instagram.com/elbergmouscron/',
      'https://www.youtube.com/@hotelelbergmouscron-espace5763',
    ],
    description: 'Partenaire officiel du HC Mouscron',
    tag: 'Partenaire officiel',
    badge: 'Partenaire',
    color: '#a16207',
    cats: [],
  },
  { // gagné, montant non renseigné (même contact que Sols Concept)
    name: 'Zanutti',
    logo: asset('/uploads/partners/zanutti.webp'),
    website: 'https://www.zanutti.com/',
    socials: [
      'https://www.facebook.com/zanuttisrl/',
      'https://www.instagram.com/zanuttisrl/',
      'https://www.linkedin.com/company/zanutti/',
      'https://www.youtube.com/@Zanuttisrl',
    ],
    description: 'Partenaire officiel du HC Mouscron',
    tag: 'Partenaire officiel',
    badge: 'Partenaire',
    color: '#15803d',
    cats: [],
  },
  { // montant non renseigné
    name: 'OLinvest',
    logo: asset('/uploads/partners/olinvest.webp'), // à uploader
    website: 'https://www.olinvest.be/',
    socials: ['https://www.facebook.com/olinvest.be'],
    description: 'Assurances, Crédits & Placements',
    tag: 'Assurances & Crédits',
    badge: 'Assurance',
    color: '#1d4ed8',
    cats: ['finances'],
  },
  { // statut « en cours » (attente RDV), rien versé
    name: 'Crack',
    logo: asset('/uploads/partners/crack.webp'),
    website: 'https://www.crack.be/fr/',
    socials: [
      'https://www.facebook.com/meubelencrack',
      'https://www.pinterest.com/meublescuisinescrack/',
    ],
    description: 'Meubles & Cuisines - Votre partenaire de confiance',
    tag: 'Habitat & Déco',
    badge: 'Habitat',
    color: '#d01c1f',
    cats: ['technique'],
  },
];
