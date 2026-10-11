import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sun, Moon, ChevronLeft, ChevronRight, Eye, Users, MapPin, Send, Globe, Phone, Mail, Trophy, Flag, HeartHandshake, Tv, Newspaper, Sparkles, PiggyBank, Check, Camera } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, XIcon, TiktokIcon } from '@/components/BrandIcons';
import { Link } from 'react-router-dom';
import './Partners.css';

type Cat = 'finances' | 'sante' | 'technique';
type Partner = {
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

// LISTE COMPLETE DES PARTENAIRES OFFICIELS
// Pour ajouter les réseaux d'un partenaire, ajoute simplement : socials: ['https://www.instagram.com/...', 'https://www.facebook.com/...'], phone: '+32 ...', email: '...'
const partners: Partner[] = [
  { // 2 000 €
    name: 'Sols Concept',
    logo: '/lovable-uploads/solconcept.png',
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
    logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png',
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
    logo: '/lovable-uploads/wapi.png',
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
    logo: '/lovable-uploads/paramed-center-coquinie.jpg',
    website: 'https://www.facebook.com/ParamedCenterCoquinie',
    description: 'Centre paramédical à Mouscron (Kiné, Diététique, Logopédie)',
    tag: 'Kiné & Santé',
    badge: 'Santé',
    color: '#059669',
    cats: ['sante'],
  },
  { // 1 000 €
    name: 'Fred Elec',
    logo: '/lovable-uploads/f847fff1-a2e3-4717-b1d4-85fe3bebe9f7.png',
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
    logo: '/lovable-uploads/avm.jpg',
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
    logo: '/lovable-uploads/logo-jpcarrelage.png',
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
    logo: '/lovable-uploads/logo-vivienbonduel.png',
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
    logo: '/lovable-uploads/gm-group.png',
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
    logo: '/lovable-uploads/TRADECO_Logo_Couleurs_SVG.svg',
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
    logo: '/lovable-uploads/Copaint.png',
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
    logo: '/lovable-uploads/friterie-du-themis.jpg',
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
    logo: '/lovable-uploads/cph-banque.png',
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
    logo: '/lovable-uploads/moirêve.png',
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
    logo: '/lovable-uploads/oce-anniversaire-charlotte.jpg',
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
    logo: '/lovable-uploads/hoption.jpg',
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
    logo: '/lovable-uploads/Elberg.jpg',
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
    logo: '/lovable-uploads/zanutti.png',
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
  { // statut « en cours » (attente RDV), rien versé
    name: 'Crack',
    logo: '/lovable-uploads/d1b8c78d-2adc-4f0c-a684-d108bed1d3c5.png',
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
  // Partners.tsx : à insérer dans `partners`, juste avant l'entrée « Crack »
// ...reste inchangé
  { // montant non renseigné
    name: 'OLinvest',
    logo: '/lovable-uploads/olinvest.png', // à uploader (voir note)
    website: 'https://www.olinvest.be/',
    socials: ['https://www.facebook.com/olinvest.be'],
    description: 'Assurances, Crédits & Placements',
    tag: 'Assurances & Crédits',
    badge: 'Assurance',
    color: '#1d4ed8',
    cats: ['finances'],
  }
];


// ---------- Liens dynamiques : le type (site, Facebook, Instagram...) est détecté depuis l'URL ----------
type Kind = 'website' | 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'x' | 'phone' | 'email';
type PLink = { kind: Kind; href: string; label: string; external: boolean };
const LABEL: Record<Kind, string> = { website: 'Site web', facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn', youtube: 'YouTube', x: 'X', phone: 'Téléphone', email: 'E-mail' };

const detect = (url: string): Kind => {
  const u = url.toLowerCase();
  if (u.startsWith('tel:')) return 'phone';
  if (u.startsWith('mailto:')) return 'email';
  if (/(facebook\.com|fb\.com|fb\.me)/.test(u)) return 'facebook';
  if (/instagram\.com/.test(u)) return 'instagram';
  if (/tiktok\.com/.test(u)) return 'tiktok';
  if (/linkedin\.com/.test(u)) return 'linkedin';
  if (/(youtube\.com|youtu\.be)/.test(u)) return 'youtube';
  if (/(twitter\.com|x\.com)/.test(u)) return 'x';
  return 'website';
};

// Le 1er lien est toujours le lien principal ; les suivants sont affichés en icônes
const getLinks = (p: Partner): PLink[] => {
  const raw = [p.website ?? '', ...(p.socials ?? []), p.phone ? `tel:${p.phone.replace(/\s/g, '')}` : '', p.email ? `mailto:${p.email}` : ''].filter(Boolean) as string[];
  const seen = new Set<string>();
  return raw
      .filter((h) => (seen.has(h) ? false : (seen.add(h), true)))
      .map((href) => { const kind = detect(href); return { kind, href, label: LABEL[kind], external: !/^(tel|mailto):/i.test(href) }; });
};
const mainLabel = (l: PLink) => (l.kind === 'website' ? 'Visiter le site' : l.kind === 'phone' ? 'Appeler' : l.kind === 'email' ? 'Écrire' : `Voir sur ${l.label}`);
const ext = (l: PLink) => (l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

const LinkIcon = ({ kind, size = 18 }: { kind: Kind; size?: number }) => {
  switch (kind) {
    case 'facebook': return <FacebookIcon size={size} />;
    case 'instagram': return <InstagramIcon size={size} />;
    case 'linkedin': return <LinkedinIcon size={size} />;
    case 'youtube': return <YoutubeIcon size={size} />;
    case 'x': return <XIcon size={size} />;
    case 'tiktok': return <TiktokIcon size={size} />;
    case 'phone': return <Phone size={size} />;
    case 'email': return <Mail size={size} />;
    default: return <Globe size={size} />;
  }
};

const Socials = ({ links, className = '' }: { links: PLink[]; className?: string }) =>
    links.length ? (
        <div className={`pw-soc ${className}`}>
          {links.map((l) => (
              <a key={l.href} href={l.href} {...ext(l)} aria-label={l.label} title={l.label}><LinkIcon kind={l.kind} /></a>
          ))}
        </div>
    ) : null;

const FILTERS: { id: 'all' | Cat; label: string }[] = [
  { id: 'all', label: 'Tous les partenaires' },
  { id: 'finances', label: 'Finances & Assurances' },
  { id: 'sante', label: 'Santé & Artisans' },
  { id: 'technique', label: 'Technique & Équipement' },
];

// ---------------------------------------------------------------------------
// CHIFFRES & CONTENU : repris du dossier de sponsoring HC Mouscron 2026-2027 (V19)
// ---------------------------------------------------------------------------
type Stat = { icon: LucideIcon; to?: number; value?: string; label: string; text: string };

const CLUB_STATS: Stat[] = [
  { icon: Trophy, value: '1er', label: 'Promotion Brabant-Hainaut', text: 'Équipe Seniors 2025-2026 : invaincue, meilleure attaque, 2e meilleure défense. Montée en D1 LFH.' },
  { icon: Users, to: 70, label: 'Adhérents', text: 'Un club en évolution constante depuis 5 ans.' },
  { icon: HeartHandshake, to: 15, label: 'Encadrants', text: 'Sportifs et administratifs : les forces vives qui font grandir le club.' },
  { icon: Flag, to: 5, label: 'Équipes inscrites', text: 'En championnats wallons et flamands.' },
];

const REACH_STATS: Stat[] = [
  { icon: Eye, to: 76823, label: 'Vues Facebook', text: 'Sur 30 jours (avril / mai) : 11 900 comptes touchés, +61,84 % d’évolution.' },
  { icon: Camera, to: 29496, label: 'Vues Instagram', text: 'Sur 30 jours (avril / mai) : 4 296 comptes touchés, +243,07 % d’évolution.' },
  { icon: Tv, to: 6, label: 'Reportages TV en 2026', text: 'Les médias traditionnels parlent aussi de nous.' },
  { icon: Newspaper, to: 24, label: 'Reportages en 2025-26', text: 'Une couverture régulière tout au long de la saison.' },
];

const PILLARS = [
  { icon: MapPin, title: 'Opportunités de proximité', words: ['Visibilité', 'Proximité', 'Notoriété'] },
  { icon: Sparkles, title: 'Image positive', words: ['Famille', 'Respect', 'Passion'] },
  { icon: HeartHandshake, title: 'Partage de valeurs', words: ["Esprit d'équipe", 'Solidarité', 'Engagement'] },
  { icon: PiggyBank, title: 'Avantage fiscal *', words: ['Investissement', 'Valorisation', 'Optimisation'] },
];

// Formule « Découverte » : mets SHOW_PRICE à false pour ne pas afficher le prix sur le site
const SHOW_PRICE = true;
const DECOUVERTE = [
  'Logo sur le set de table du repas',
  "Affichage sur l'écran de la cafétéria",
  'Présence sur toutes nos affiches',
  'Affichage sur notre site internet',
  'Affichage sur nos réseaux sociaux',
  'Affichage sur notre panneau partenaires',
];

const DUR = 4600;
type Theme = 'dark' | 'light';
const cv = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra } as React.CSSProperties);

// Logo avec repli (initiale) si l'image est introuvable
const Logo = ({ p }: { p: Partner }) => {
  const [err, setErr] = useState(!p.logo);
  useEffect(() => setErr(!p.logo), [p.logo]);
  return err ? (
      <span className="pw-mono" style={{ color: p.color }}>{p.name.charAt(0)}</span>
  ) : (
      <img src={p.logo} alt={`${p.name} logo`} loading="lazy" onError={() => setErr(true)} />
  );
};


// Compteur animé : s'incrémente quand il apparaît à l'écran
const Count = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v.toLocaleString('fr-FR')}</span>;
};

const StatCard = ({ s, i }: { s: Stat; i: number }) => (
    <div className="pw-stat pw-reveal" style={{ '--i': i } as React.CSSProperties}>
      <s.icon size={30} />
      <b>{s.to !== undefined ? <Count to={s.to} /> : s.value}</b>
      <strong>{s.label}</strong>
      <p>{s.text}</p>
    </div>
);

const Partners = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('hbc-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [cur, setCur] = useState(0);
  const [filter, setFilter] = useState<'all' | Cat>('all');
  const [tax, setTax] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x -> 2x -> 4x
  const cycleSpeed = () => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1));
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const n = partners.length;
  const p = partners[cur];
  const size = p.name.length > 18 ? 'xs' : p.name.length > 10 ? 'sm' : 'lg';
  const links = getLinks(p);
  const main = links[0];
  const extra = links.slice(1);
  const shown = filter === 'all' ? partners : partners.filter((x) => x.cats.includes(filter));

  const toggle = () =>
      setTheme((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('hbc-theme', next); } catch {}
        return next;
      });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setTimeout(() => setCur((c) => (c + 1) % n), DUR / speed);
    return () => clearTimeout(id);
  }, [cur, n, speed]);

  // Centre l'onglet actif dans la barre, sans jamais faire défiler la page
  useEffect(() => {
    const bar = tabs.current;
    const t = bar?.children[cur] as HTMLElement | undefined;
    if (bar && t) bar.scrollTo({ left: t.offsetLeft - (bar.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
  }, [cur]);

  // Apparition au scroll
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.pw-reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, [filter]);

  const onWallMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 16}deg) scale(1.03)`;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };
  const onCardLeave = (e: React.PointerEvent<HTMLDivElement>) => { e.currentTarget.style.transform = ''; };

  const ghost = partners.map((x) => x.name).join(' ✦ ') + ' ✦ ';
  const chips = (list: Partner[]) => list.map((x) => (
      <span key={x.name} className="pw-chip" style={cv(x.color)}><span className="pw-thumb"><Logo p={x} /></span><b>{x.name}</b><i>{x.tag}</i></span>
  ));
  const ticker = chips(partners);

  return (
      <div className="pw" data-theme={theme} ref={root} style={{ '--dur': `${DUR / speed}ms` } as React.CSSProperties}>

        {/* BANDEAU DÉFILANT : tout en haut de la page */}
        <div className="pw-ticker" aria-hidden="true">
          <div className="pw-track">{ticker}{ticker}{ticker}{ticker}</div>
        </div>

        {/* HERO + MUR ANIMÉ */}
        <section className="pw-hero">
          <h1 className="pw-sr">Partenaires officiels : l'énergie d'une ville</h1>

          <div className="pw-wall" style={cv(p.color)} onPointerMove={onWallMove}>
            <div className="pw-spot" />
            <div className="pw-ghosts" aria-hidden="true">
              <div className="pw-ghost" style={{ top: '4%' }}>{ghost + ghost}</div>
              <div className="pw-ghost r2" style={{ top: '52%' }}>{ghost + ghost}</div>
            </div>
            <div className="pw-main">
              <div className="pw-left">
                <div className="pw-count"><b>{String(cur + 1).padStart(2, '0')}</b><i /><span>/ {String(n).padStart(2, '0')} partenaires</span></div>
                <h2 key={`n${cur}`} className={`pw-name pw-in ${size}`}>{p.name}</h2>
                <p key={`t${cur}`} className="pw-wtag pw-in">{p.tag}</p>
                <Socials key={`s${cur}`} links={extra} className="pw-in" />
                <div className="pw-actions">
                  <button className="pw-arrow" aria-label="Partenaire précédent" onClick={() => setCur((cur - 1 + n) % n)}><ChevronLeft size={20} /></button>
                  <button className="pw-arrow" aria-label="Partenaire suivant" onClick={() => setCur((cur + 1) % n)}><ChevronRight size={20} /></button>
                  <button className="pw-arrow pw-speed" aria-label={`Vitesse ${speed}x`} title="Vitesse de défilement" onClick={cycleSpeed}>{speed}x</button>
                  {main && <a className="pw-btn" href={main.href} {...ext(main)}>{mainLabel(main)} <ExternalLink size={16} /></a>}
                </div>
              </div>
              <div className="pw-3d">
                <div className="pw-tilt" onPointerMove={onCardMove} onPointerLeave={onCardLeave}>
                  <div className="pw-rim" />
                  <div className="pw-face">
                    <div key={`c${cur}`} className="pw-face-in">
                      {main ? <a className="pw-logotile" href={main.href} {...ext(main)} title={`${mainLabel(main)} : ${p.name}`}><Logo p={p} /></a> : <div className="pw-logotile"><Logo p={p} /></div>}
                      <div className="pw-fname">{p.name}</div>
                      <div className="pw-ftag">{p.tag}</div>
                      <div className="pw-foot">HBC MOUSCRON × PARTENAIRE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pw-tabs" ref={tabs}>
              {partners.map((x, i) => (
                  <button key={x.name} className={`pw-tab${i === cur ? ' on' : ''}`} style={cv(x.color)} onClick={() => setCur(i)} aria-label={x.name} aria-current={i === cur}>
                    <span className="pw-thumb"><Logo p={x} /></span><span className="pw-tt"><b style={{ color: x.color }}>{x.name}</b><span>{x.tag}</span></span><em />
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* FILTRES + CARTES */}
        <section className="pw-sec">
          <div className="pw-filters" role="tablist">
            <div className="pw-fl">
              {FILTERS.map((f) => (
                  <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>
                    {f.label}{f.id === 'all' ? ` (${n})` : ''}
                  </button>
              ))}
            </div>
          </div>

          <div className="pw-grid" key={filter}>
            {shown.map((x, i) => {
              const xl = getLinks(x);
              return (
                  <article key={x.name} className="pw-card pw-reveal" style={cv(x.color, { '--i': i % 4 })}>
                    {xl[0] ? (
                        <a className="pw-logo" href={xl[0].href} {...ext(xl[0])} title={`${mainLabel(xl[0])} : ${x.name}`}>
                          <Logo p={x} />
                          <span className={`pw-badge${x.badge.startsWith('★') ? ' major' : ''}`}>{x.badge}</span>
                        </a>
                    ) : (
                        <div className="pw-logo">
                          <Logo p={x} />
                          <span className={`pw-badge${x.badge.startsWith('★') ? ' major' : ''}`}>{x.badge}</span>
                        </div>
                    )}
                    <div className="pw-body">
                      <div className="pw-row"><h3>{x.name}</h3><em>{x.tag}</em></div>
                      <p>{x.description}</p>
                      <Socials links={xl.slice(1)} />
                      {xl[0] && <a className="pw-visit" href={xl[0].href} {...ext(xl[0])}>{mainLabel(xl[0])} <ExternalLink size={14} /></a>}
                    </div>
                  </article>
              );
            })}
          </div>
        </section>

        {/* CHIFFRES RÉELS DU CLUB */}
        <section className="pw-sec pw-statsec">
          <div className="pw-sh pw-reveal">
            <span className="pw-kicker">Le club en chiffres</span>
            <h2>Une équipe championne, <em>un club en progression</em></h2>
          </div>
          <div className="pw-sgrid">
            {CLUB_STATS.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
          </div>

          <div className="pw-sh pw-reveal pw-sh2">
            <span className="pw-kicker">Une visibilité qui grandit</span>
            <h2>Un public <em>qui nous suit</em></h2>
          </div>
          <div className="pw-sgrid">
            {REACH_STATS.map((s, i) => <StatCard key={s.label} s={s} i={i} />)}
          </div>
        </section>

        {/* POURQUOI DEVENIR PARTENAIRE */}
        <section className="pw-sec pw-whysec">
          <div className="pw-sh pw-reveal">
            <span className="pw-kicker">Votre entreprise au cœur du terrain</span>
            <h2>Pourquoi devenir <em>partenaire ?</em></h2>
          </div>
          <div className="pw-pillars">
            {PILLARS.map((p, i) => {
              const fiscal = p.title.includes('*');
              return (
                  <article
                      key={p.title}
                      className="pw-pillar pw-reveal"
                      style={{ '--i': i } as React.CSSProperties}
                      {...(fiscal ? {
                        role: 'button',
                        tabIndex: 0,
                        'aria-expanded': tax,
                        onClick: () => setTax((v) => !v),
                        onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTax((v) => !v); } },
                      } : {})}
                  >
                    <i><p.icon size={26} /></i>
                    <h3>{p.title}</h3>
                    <ul>{p.words.map((w) => <li key={w}>{w}</li>)}</ul>
                  </article>
              );
            })}
          </div>
          {tax && <p className="pw-tax" role="note">* Les partenariats avec le HC Mouscron peuvent, selon leur nature et sous réserve des règles fiscales applicables, être considérés comme des frais de publicité déductibles.</p>}
          <div className="pw-offer pw-reveal">
            <div className="pw-offer-l">
              <span className="pw-kicker">Nouvelle formule</span>
              <h3>Formule « Découverte »</h3>
              <p>Sans exclusivité sectorielle : accessible à plusieurs entreprises d'un même secteur d'activité.</p>
              {SHOW_PRICE && <div className="pw-price"><b>250 €</b><span>HTVA</span></div>}
            </div>
            <ul className="pw-offer-r">
              {DECOUVERTE.map((d, i) => (
                  <li key={d}>
                    <i><Check size={16} /></i>
                    <span>{d}</span>
                    {i === DECOUVERTE.length - 1 && <em>New</em>}
                  </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="pw-sec pw-ctasec">
          <div className="pw-cta pw-reveal">
            <i className="pw-orb" />
            <span className="pw-cpill">Partenariats &amp; Sponsoring 2026 - 2027</span>
            <h2>Vous souhaitez devenir partenaire ?</h2>
            <p>Envie de rejoindre l'aventure à nos côtés ? Venez nous rencontrer et échangeons ensemble : associez votre image aux valeurs d'engagement et de dépassement du HC Mouscron.</p>
            <Link to="/contact" className="pw-white"><Send size={16} /> Nous contacter</Link>
          </div>
        </section>

        {/* TOGGLE JOUR / NUIT */}
        <button className="pw-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Jour' : 'Nuit'}</span>
        </button>
      </div>
  );
};


export default Partners;