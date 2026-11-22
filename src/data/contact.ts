import { FacebookIcon, InstagramIcon, TiktokIcon } from '@/components/BrandIcons';

// ===========================================================================
// COORDONNÉES DU CLUB : utilisées par le footer, la page Contact, l'accueil et Infos
// ===========================================================================

export const CONTACT = {
  phone: '+32 (0)467 32 84 24',
  phoneHref: 'tel:+32467328424',
  email: 'secretariat.handballmouscron@gmail.com',
  venue: 'Hall Max Lessines',
  street: 'Rue des Prés 84B',
  city: '7700 Mouscron',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hall+Max+Lessines,+Rue+des+Prés+84B,+7700+Mouscron,+Belgium',
  mapEmbed: 'https://www.google.com/maps?q=Hall+Max+Lessines,+Rue+des+Pr%C3%A9s+84B,+7700+Mouscron&output=embed',
};

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/HCMouscron', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/hcmouscron/', Icon: InstagramIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@hc.mouscron', Icon: TiktokIcon },
];

export const NAV = [
  { name: 'Accueil', href: '/' },
  { name: 'Équipe', href: '/equipe' },
  { name: 'Partenaires', href: '/partenaires' },
  { name: 'Infos', href: '/infos' },
  { name: 'Contact', href: '/contact' },
];
