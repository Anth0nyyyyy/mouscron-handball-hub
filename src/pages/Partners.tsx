import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sun, Moon, ChevronLeft, ChevronRight, Eye, Users, MapPin, Send, Globe, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Partners.css';

type Cat = 'majeurs' | 'finances' | 'sante' | 'technique';
type Partner = {
  name: string;
  logo: string;
  website: string;          // lien principal (site web, ou page Facebook si pas de site)
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
  { name: 'Crack', logo: '/lovable-uploads/d1b8c78d-2adc-4f0c-a684-d108bed1d3c5.png', website: 'https://www.crack.be/fr/', description: 'Meubles & Cuisines - Votre partenaire de confiance', tag: 'Habitat & Déco', badge: '★ Majeur', color: '#d01c1f', cats: ['majeurs'] },
  { name: 'Fred Elec', logo: '/lovable-uploads/f847fff1-a2e3-4717-b1d4-85fe3bebe9f7.png', website: 'https://www.fred-electrique.com/fr/accueil', description: 'Solutions électriques professionnelles', tag: 'BTP & Énergie', badge: 'Technique', color: '#d97706', cats: ['technique'] },
  { name: 'Acta Security', logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png', website: 'https://www.acta-security.be/', description: 'Solutions de sécurité innovantes', tag: 'Télésurveillance', badge: 'Sécurité', color: '#e11d48', cats: ['technique'] },
  { name: 'Banque CPH', logo: '/lovable-uploads/cph-banque.png', website: 'https://www.cph.be/', description: 'Banque & Assurances - Partenaire financier de proximité', tag: 'Proximité', badge: 'Banque', color: '#1e7a45', cats: ['majeurs', 'finances'] },
  { name: 'Paramed Center Coquinie', logo: '/lovable-uploads/paramed-center-coquinie.jpg', website: 'https://www.facebook.com/ParamedCenterCoquinie', description: 'Centre paramédical à Mouscron (Kiné, Diététique, Logopédie)', tag: 'Kiné & Santé', badge: 'Santé', color: '#059669', cats: ['sante'] },
  { name: 'Hoption', logo: '/lovable-uploads/hoption.jpg', website: 'https://hoptionmouscron.be/', description: 'Brasserie artisanale mouscronnoise - Bières uniques & authentiques.', tag: 'Terroir', badge: 'Artisan local', color: '#5a8f1e', cats: ['sante'] },
  { name: 'GM Group', logo: '/lovable-uploads/gm-group.png', website: 'https://gm-groupe.be/', description: 'Assurances (DVV), Crédits & Immobilier à Mouscron', tag: 'Assurances & Immo', badge: 'Assurance', color: '#2447c4', cats: ['majeurs', 'finances'] },
  { name: 'Océ Anniversaire', logo: '/lovable-uploads/oce-anniversaire-charlotte.jpg', website: 'https://www.facebook.com/profile.php?id=61586545933715', description: 'Anniversaire spa & beauté 100% girly à Mouscron', tag: 'Spa & Beauté', badge: 'Bien-être', color: '#db2777', cats: ['sante'] },
];


// ---------- Liens dynamiques : le type (site, Facebook, Instagram...) est détecté depuis l'URL ----------
type Kind = 'website' | 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'x' | 'phone' | 'email';
type PLink = { kind: Kind; href: string; label: string; external: boolean };
const LABEL: Record<Kind, string> = { website: 'Site web', facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn', youtube: 'YouTube', x: 'X', phone: 'Téléphone', email: 'E-mail' };
const TIKTOK = 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z';

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
  const raw = [p.website, ...(p.socials ?? []), p.phone ? `tel:${p.phone.replace(/\s/g, '')}` : '', p.email ? `mailto:${p.email}` : ''].filter(Boolean);
  const seen = new Set<string>();
  return raw
      .filter((h) => (seen.has(h) ? false : (seen.add(h), true)))
      .map((href) => { const kind = detect(href); return { kind, href, label: LABEL[kind], external: !/^(tel|mailto):/i.test(href) }; });
};
const mainLabel = (l: PLink) => (l.kind === 'website' ? 'Visiter le site' : l.kind === 'phone' ? 'Appeler' : l.kind === 'email' ? 'Écrire' : `Voir sur ${l.label}`);
const ext = (l: PLink) => (l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

const LinkIcon = ({ kind, size = 18 }: { kind: Kind; size?: number }) => {
  switch (kind) {
    case 'facebook': return <Facebook size={size} />;
    case 'instagram': return <Instagram size={size} />;
    case 'linkedin': return <Linkedin size={size} />;
    case 'youtube': return <Youtube size={size} />;
    case 'x': return <Twitter size={size} />;
    case 'phone': return <Phone size={size} />;
    case 'email': return <Mail size={size} />;
    case 'tiktok': return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={TIKTOK} /></svg>;
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
  { id: 'majeurs', label: 'Partenaires majeurs' },
  { id: 'finances', label: 'Finances & Assurances' },
  { id: 'sante', label: 'Santé & Artisans' },
  { id: 'technique', label: 'Technique & Équipement' },
];

// ⚠ Chiffres d'exemple : remplace-les par les vrais chiffres du club
const STATS = [
  { icon: Eye, value: '1 200 +', label: 'Spectateurs / match', text: 'Salle comble lors des grands chocs de championnat à domicile.' },
  { icon: Users, value: '240', label: 'Joueurs & athlètes', text: "De l'école des jeunes aux seniors élite masculine & féminine." },
  { icon: MapPin, value: '100 %', label: 'Ancrage régional', text: "Réseau d'affaires solidaire à Mouscron et Eurométropole." },
];

const DUR = 4600;
type Theme = 'dark' | 'light';
const cv = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra } as React.CSSProperties);

// Logo avec repli (initiale) si l'image est introuvable
const Logo = ({ p }: { p: Partner }) => {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [p.logo]);
  return err ? (
      <span className="pw-mono" style={{ color: p.color }}>{p.name.charAt(0)}</span>
  ) : (
      <img src={p.logo} alt={`${p.name} logo`} loading="lazy" onError={() => setErr(true)} />
  );
};

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
    const id = setTimeout(() => setCur((c) => (c + 1) % n), DUR);
    return () => clearTimeout(id);
  }, [cur, n]);

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
  const ticker = partners.map((x) => (
      <span key={x.name} className="pw-chip" style={cv(x.color)}><span className="pw-thumb"><Logo p={x} /></span><b>{x.name}</b><i>{x.tag}</i></span>
  ));

  return (
      <div className="pw" data-theme={theme} ref={root} style={{ '--dur': `${DUR}ms` } as React.CSSProperties}>

        {/* HERO + MUR ANIMÉ */}
        <section className="pw-hero">
          <div className="pw-hero-in">
            <span className="pw-eyebrow"><i />Réseau Club Entreprises &amp; Mécènes • 2024-2025</span>
            <h1><span>Partenaires officiels</span><em>L'énergie d'une ville</em></h1>
            <p>Ils propulsent le Handball Club Mouscron vers les sommets. Découvrez les entreprises qui partagent nos valeurs de combativité, de respect et d'excellence sportive.</p>
          </div>

          <div className="pw-wall" style={cv(p.color)} onPointerMove={onWallMove}>
            <div className="pw-spot" />
            <div className="pw-ghosts" aria-hidden="true">
              <div className="pw-ghost" style={{ top: '4%' }}>{ghost + ghost}</div>
              <div className="pw-ghost r2" style={{ top: '52%' }}>{ghost + ghost}</div>
            </div>
            <div className="pw-main">
              <div className="min-w-0">
                <div className="pw-count"><b>{String(cur + 1).padStart(2, '0')}</b><i /><span>/ {String(n).padStart(2, '0')} partenaires</span></div>
                <h2 key={`n${cur}`} className={`pw-name pw-in ${size}`}>{p.name}</h2>
                <p key={`t${cur}`} className="pw-wtag pw-in">{p.tag}</p>
                <Socials key={`s${cur}`} links={extra} className="pw-in" />
                <div className="pw-actions">
                  <a className="pw-btn" href={main.href} {...ext(main)}>{mainLabel(main)} <ExternalLink size={16} /></a>
                  <button className="pw-arrow" aria-label="Partenaire précédent" onClick={() => setCur((cur - 1 + n) % n)}><ChevronLeft size={20} /></button>
                  <button className="pw-arrow" aria-label="Partenaire suivant" onClick={() => setCur((cur + 1) % n)}><ChevronRight size={20} /></button>
                </div>
              </div>
              <div className="pw-3d">
                <div className="pw-tilt" onPointerMove={onCardMove} onPointerLeave={onCardLeave}>
                  <div className="pw-rim" />
                  <div className="pw-face">
                    <div key={`c${cur}`} className="pw-face-in">
                      <a className="pw-logotile" href={main.href} {...ext(main)} title={`${mainLabel(main)} : ${p.name}`}><Logo p={p} /></a>
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

        {/* BANDEAU DÉFILANT */}
        <div className="pw-ticker" aria-hidden="true"><div className="pw-track">{ticker}{ticker}{ticker}{ticker}</div></div>

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
            <span className="pw-accr"><i />Accréditation saison 2024-2025</span>
          </div>

          <div className="pw-grid" key={filter}>
            {shown.map((x, i) => {
              const xl = getLinks(x);
              return (
                  <article key={x.name} className="pw-card pw-reveal" style={cv(x.color, { '--i': i % 4 })}>
                    <a className="pw-logo" href={xl[0].href} {...ext(xl[0])} title={`${mainLabel(xl[0])} : ${x.name}`}>
                      <Logo p={x} />
                      <span className={`pw-badge${x.badge.startsWith('★') ? ' major' : ''}`}>{x.badge}</span>
                    </a>
                    <div className="pw-body">
                      <div className="pw-row"><h3>{x.name}</h3><em>{x.tag}</em></div>
                      <p>{x.description}</p>
                      <Socials links={xl.slice(1)} />
                      <a className="pw-visit" href={xl[0].href} {...ext(xl[0])}>{mainLabel(xl[0])} <ExternalLink size={14} /></a>
                    </div>
                  </article>
              );
            })}
          </div>
        </section>

        {/* CHIFFRES */}
        <section className="pw-sec pw-stats">
          {STATS.map((s, i) => (
              <div key={s.label} className="pw-stat pw-reveal" style={{ '--i': i } as React.CSSProperties}>
                <s.icon size={30} />
                <b>{s.value}</b>
                <strong>{s.label}</strong>
                <p>{s.text}</p>
              </div>
          ))}
        </section>

        {/* CTA */}
        <section className="pw-sec pw-ctasec">
          <div className="pw-cta pw-reveal">
            <i className="pw-orb" />
            <span className="pw-cpill">Partenariats &amp; Sponsoring 2024 - 2025</span>
            <h2>Vous souhaitez devenir partenaire ?</h2>
            <p>Associez votre image aux valeurs d'engagement et de dépassement du HBC Mouscron. Rejoignez nos partenaires et soutenez le handball à Mouscron.</p>
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