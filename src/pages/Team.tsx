import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, Flag, RotateCw, Maximize2, X, ChevronLeft, ChevronRight, ArrowRight, Sun, Moon } from 'lucide-react';
import './Team.css';

type Theme = 'dark' | 'light';
type GroupId = 'comite' | 'seniors' | 'jeunes';
type Member = { name: string; role: string; image: string };

// ---------------------------------------------------------------------------
// DONNÉES (tes personnes, tes rôles, tes photos)
// ---------------------------------------------------------------------------
const bureau: Member[] = [
  { name: 'Damien Cockenpot', role: 'Président', image: '/lovable-uploads/ec06dcff-f3e5-41b6-b6bc-eea0263fc2bb.png' },
  { name: 'David Macarez', role: 'Secrétaire', image: '/lovable-uploads/cf412527-37a3-4237-aa2e-56a2ba75f23d.png' },
  { name: 'Joaquim Vercruysse', role: 'Trésorier', image: '/lovable-uploads/6af96ea0-a23d-47cd-b382-99a95c2e1f29.png' },
  { name: 'Gothane Dhondt', role: 'Organisateur événementiel sportif', image: '/lovable-uploads/a354ce54-ad9c-4fbb-b2df-46b56a89e38a.png' },
  { name: 'Jean Philippe Fabbri', role: 'Logistique', image: '/lovable-uploads/559c316a-dff9-4e14-bf45-28f2dee1e526.png' },
  { name: 'Lucas Vincent', role: 'Responsable communication', image: '/lovable-uploads/Lucas.png' },
  { name: 'Benjamin', role: 'Responsable communication', image: '/lovable-uploads/benjamin.png' },
];

const entraineursSeniors: Member[] = [
  { name: 'Laszlo Baan', role: 'Coach T1', image: '/lovable-uploads/440e2391-e038-4985-b7d5-52736d473196.png' },
  { name: 'Thierry Vincent', role: 'Coach T2', image: '/lovable-uploads/93f3a0fb-2b5f-470d-a62f-444b94be5fe3.png' },
];

const entraineursJeunes: Member[] = [
  { name: 'Anthony Delaby', role: 'Coach U18', image: '/lovable-uploads/8215a282-c4df-45c7-b692-b8b2aa829a6a.png' },
  { name: 'Philippe Julien', role: 'Coach U16', image: '/lovable-uploads/5f0533d7-d3c1-4ae8-a153-7e585203bfc6.png' },
  { name: 'Antoine Lampole', role: 'Coach U14', image: '/lovable-uploads/Antoine.png' },
  { name: 'Lucas Vincent', role: 'Coach U14', image: '/lovable-uploads/Lucas.png' },
  { name: 'Dorian Derveaux', role: 'Coach Mini Handball', image: '/lovable-uploads/Dorian.png' },
  { name: 'Nino Mancinone', role: 'Coach Mini Handball', image: '/lovable-uploads/15a18034-95af-45fc-b9f1-9db81e00aeb5.png' },
];

// Description affichée au dos de la carte, selon le rôle (à adapter librement)
const ROLE_DESC: Record<string, string> = {
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
  'Coach U14': 'Entraîne les U14 : consolidation des bases, esprit d\'équipe et plaisir de jouer.',
  'Coach Mini Handball': 'Initie les plus jeunes au handball par le jeu, dans la bonne humeur et le respect.',
};

const GROUPS: { id: GroupId; label: string; title: string; sub: string; color: string; members: Member[] }[] = [
  { id: 'comite', label: 'Comité', title: 'Comité', sub: 'Celles et ceux qui font vivre le club au quotidien', color: 'hsl(var(--hc-orange))', members: bureau },
  { id: 'seniors', label: 'Entraîneurs Seniors', title: 'Entraîneurs Seniors', sub: 'Le staff des équipes seniors', color: 'hsl(var(--hc-green-light))', members: entraineursSeniors },
  { id: 'jeunes', label: 'Jeunes & Mini', title: 'Entraîneurs Jeunes & Mini handball', sub: 'Ils font grandir la relève', color: 'hsl(var(--hc-orange-light))', members: entraineursJeunes },
];

// Équipes (photos) — `match` = mots du rôle des coachs affichés dans la fenêtre agrandie
const categories = [
  { name: 'Mini handball', img: '/lovable-uploads/WhatsApp_Image_2026-04-22_at_21.43.51 copy.jpeg', color: 'hsl(var(--hc-green-light))', match: ['Mini'] },
  { name: 'U14', img: '/lovable-uploads/Capture d’écran 2026-08-12 131716.png', color: 'hsl(var(--hc-green-light))', match: ['U14'] },
  { name: 'U16', img: '/lovable-uploads/WhatsApp_Image_2026-04-27_at_10.58.05b copy.jpeg', color: 'hsl(var(--hc-green))', match: ['U16'] },
  { name: 'U18', img: '/lovable-uploads/WhatsApp_Image_2025-10-01_at_06.45.20 copy.jpeg', color: 'hsl(var(--hc-green-light))', match: ['U18'] },
  { name: 'Seniors', img: '/lovable-uploads/WhatsApp_Image_2026-05-09_at_22.07.47 copy.jpeg', color: 'hsl(var(--hc-green))', match: ['T1', 'T2'] },
  { name: 'Vétérans / Loisir', img: '/lovable-uploads/loisir.jpeg', color: 'hsl(var(--hc-orange))', match: [] as string[] },
];

const allCoaches = [...entraineursSeniors, ...entraineursJeunes];
const coachesOf = (match: string[]) => allCoaches.filter((c) => match.some((m) => c.role.includes(m)));
const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
const cv = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra } as React.CSSProperties);

// ---------------------------------------------------------------------------
// PETITS COMPOSANTS
// ---------------------------------------------------------------------------
const Photo = ({ src, alt, name }: { src: string; alt: string; name: string }) => {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [src]);
  return err ? <span className="tm-ph" aria-label={alt}>{initials(name)}</span> : <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setErr(true)} />;
};

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
        const k = Math.min(1, (t - t0) / 1300);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}</span>;
};

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
const Team = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('hbc-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [filter, setFilter] = useState<'all' | GroupId>('all');
  const [flipped, setFlipped] = useState<string | null>(null);
  const [box, setBox] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const toggle = () =>
      setTheme((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('hbc-theme', next); } catch {}
        return next;
      });

  const shown = filter === 'all' ? GROUPS : GROUPS.filter((g) => g.id === filter);
  const nCat = categories.length;

  // Apparition au scroll
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.tm-reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  // Fenêtre agrandie : clavier + blocage du scroll
  useEffect(() => {
    if (box === null) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBox(null);
      if (e.key === 'ArrowRight') setBox((b) => (b === null ? b : (b + 1) % nCat));
      if (e.key === 'ArrowLeft') setBox((b) => (b === null ? b : (b - 1 + nCat) % nCat));
    };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key); };
  }, [box, nCat]);

  // Echap referme une carte retournée
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setFlipped(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  const cat = box !== null ? categories[box] : null;
  const ghost = 'HC Mouscron ✦ Esprit d\'équipe ✦ Respect ✦ Convivialité ✦ ';

  return (
      <div className="tm" data-theme={theme} ref={root}>
        {/* HERO */}
        <section className="tm-hero">
          <div className="tm-ghosts" aria-hidden="true">
            <div className="tm-ghost">{ghost + ghost}</div>
            <div className="tm-ghost r2">{ghost + ghost}</div>
          </div>
          <i className="tm-orb a" /><i className="tm-orb b" />
          <div className="tm-hero-in">
            <span className="tm-eyebrow">Staff &amp; catégories</span>
            <h1><span>Notre</span> <em>équipe</em></h1>
            <p>Découvrez le staff technique et les catégories qui font la force du HC Mouscron, unis par la passion du handball et l'esprit d'équipe.</p>
            <div className="tm-stats">
              <div><Users size={22} /><b><Count to={bureau.length} /></b><span>Membres du comité</span></div>
              <div><Trophy size={22} /><b><Count to={allCoaches.length} /></b><span>Entraîneurs</span></div>
              <div><Flag size={22} /><b><Count to={nCat} /></b><span>Équipes</span></div>
            </div>
          </div>
        </section>

        {/* FILTRES */}
        <div className="tm-filterbar">
          <div className="tm-filters" role="tablist" aria-label="Filtrer le staff">
            {[{ id: 'all' as const, label: 'Tout le staff' }, ...GROUPS.map((g) => ({ id: g.id, label: g.label }))].map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'on' : ''} onClick={() => { setFilter(f.id); setFlipped(null); }}>
                  {f.label}
                </button>
            ))}
          </div>
          <p className="tm-hint"><RotateCw size={14} /> Clique sur une carte pour découvrir le rôle</p>
        </div>

        {/* STAFF : CARTES QUI SE RETOURNENT */}
        <div key={filter} className="tm-wrap">
          {shown.map((g) => (
              <section key={g.id} className="tm-group" style={cv(g.color)}>
                <div className="tm-gh">
                  <h2>{g.title}</h2>
                  <p>{g.sub}</p>
                </div>
                <div className="tm-grid">
                  {g.members.map((m, i) => {
                    const id = `${g.id}-${m.name}-${m.role}`;
                    const on = flipped === id;
                    return (
                        <button key={id} type="button" className={`tm-card${on ? ' flip' : ''}`} style={{ '--i': i } as React.CSSProperties} onClick={() => setFlipped(on ? null : id)} aria-pressed={on} aria-label={`${m.name}, ${m.role}. ${on ? 'Masquer' : 'Afficher'} la description du rôle`}>
                    <span className="tm-inner">
                      <span className="tm-face tm-front">
                        <Photo src={m.image} alt={m.name} name={m.name} />
                        <span className="tm-shade" />
                        <span className="tm-flip-ic"><RotateCw size={16} /></span>
                        <span className="tm-info">
                          <span className="tm-name">{m.name}</span>
                          <span className="tm-role">{m.role}</span>
                        </span>
                      </span>
                      <span className="tm-face tm-back">
                        <span className="tm-bgroup">{g.label}</span>
                        <span className="tm-btitle">{m.role}</span>
                        <span className="tm-bdesc">{ROLE_DESC[m.role] ?? ''}</span>
                        <span className="tm-bname">{m.name}</span>
                      </span>
                    </span>
                        </button>
                    );
                  })}
                </div>
              </section>
          ))}
        </div>

        {/* NOS ÉQUIPES */}
        <section className="tm-teams-sec">
          <div className="tm-wrap">
            <div className="tm-gh center tm-reveal">
              <span className="tm-eyebrow">Saison 2025-2026</span>
              <h2 className="big">Nos <em>équipes</em></h2>
            </div>
            <div className="tm-teams">
              {categories.map((c, i) => (
                  <button key={c.name} type="button" className="tm-team tm-reveal" style={cv(c.color, { '--i': i % 3 })} onClick={() => setBox(i)} aria-label={`Agrandir la photo de l'équipe ${c.name}`}>
                    <img src={c.img} alt={`Équipe ${c.name} HC Mouscron`} loading="lazy" decoding="async" />
                    <span className="tm-team-label">{c.name}</span>
                    <span className="tm-team-zoom"><Maximize2 size={18} /></span>
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="tm-join">
          <i className="tm-orb a" />
          <div className="tm-wrap tm-reveal">
            <h2>Envie de nous rejoindre ?</h2>
            <p>Que vous soyez débutant ou expérimenté, jeune ou adulte, il y a une place pour vous au HC Mouscron.</p>
            <div className="tm-cta">
              <Link to="/contact" className="tm-btn w">Nous contacter <ArrowRight size={18} /></Link>
              <Link to="/infos#tarifs" className="tm-btn g">Nos tarifs</Link>
            </div>
          </div>
        </section>

        {/* FENÊTRE AGRANDIE */}
        {cat && box !== null && (
            <div className="tm-lb" role="dialog" aria-modal="true" aria-label={`Équipe ${cat.name}`} onClick={() => setBox(null)}>
              <div className="tm-lb-in" onClick={(e) => e.stopPropagation()} style={cv(cat.color)}>
                <button ref={closeBtn} className="tm-lb-x" onClick={() => setBox(null)} aria-label="Fermer"><X size={20} /></button>
                <figure key={box}>
                  <img src={cat.img} alt={`Équipe ${cat.name} HC Mouscron`} />
                  <figcaption>
                    <span className="tm-lb-tag">{cat.name}</span>
                    <span className="tm-lb-sub">Saison 2025-2026</span>
                    {coachesOf(cat.match).length > 0 && (
                        <span className="tm-lb-coach">Entraîneur{coachesOf(cat.match).length > 1 ? 's' : ''} : {coachesOf(cat.match).map((c) => c.name).join(' • ')}</span>
                    )}
                  </figcaption>
                </figure>
                <button className="tm-lb-nav l" onClick={() => setBox((box - 1 + nCat) % nCat)} aria-label="Équipe précédente"><ChevronLeft size={24} /></button>
                <button className="tm-lb-nav r" onClick={() => setBox((box + 1) % nCat)} aria-label="Équipe suivante"><ChevronRight size={24} /></button>
              </div>
            </div>
        )}

        {/* TOGGLE JOUR / NUIT */}
        <button className="tm-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Jour' : 'Nuit'}</span>
        </button>
      </div>
  );
};

export default Team;