import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, Wallet, Gift, Mail, ArrowRight, Sun, Moon } from 'lucide-react';
import PartnersCarousel from '@/components/PartnersCarousel';
import './Home.css';

type Theme = 'dark' | 'light';
const cv = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra } as React.CSSProperties);

const STORY = [
  {
    n: '01',
    title: 'Un sport dynamique et spectaculaire',
    text: "Le handball est un sport rythmé et captivant, tant pour les joueurs que pour les spectateurs. Il repose sur des enchaînements rapides et une participation active de tous les joueurs en attaque comme en défense, dans un esprit de respect et de fair-play.",
    img: '/lovable-uploads/WhatsApp_Image_2026-05-09_at_22.07.47 copy.jpeg',
    alt: 'Mini handball en action',
    badge: 'Équipe Seniors',
    color: 'hsl(var(--hc-orange))',
  },
  {
    n: '02',
    title: "Un esprit d'équipe fort et soudé",
    text: 'Chaque joueur a un rôle essentiel, sans poste "mineur". Les rotations fréquentes renforcent la coopération et valorisent tous les profils physiques. La réussite repose sur le collectif.',
    img: '/lovable-uploads/WhatsApp_Image_2025-10-01_at_06.45.20 copy.jpeg',
    alt: 'Équipe seniors unie',
    badge: 'Équipe u18',
    color: 'hsl(var(--hc-green-light))',
  },
  {
    n: '03',
    title: 'Convivialité et respect',
    text: "Le HC Mouscron accueille filles et garçons dans une ambiance familiale. Débutants ou confirmés s'y entraînent sans pression, dans un climat de respect et de convivialité.",
    img: '/lovable-uploads/Capture d’écran 2026-08-12 131716.png',
    alt: 'U16 conviviale',
    badge: 'Équipe U14',
    color: 'hsl(var(--hc-orange-light))',
  },
  {
    n: '04',
    title: 'En été comme en hiver...',
    text: "Le handball se pratique toute l'année, quelle que soit la météo. Les entraînements ont lieu en intérieur au Hall Max Lessines, équipé d'une cafétéria conviviale avec wifi pour les parents.",
    img: '/lovable-uploads/WhatsApp_Image_2026-04-22_at_21.43.51 copy.jpeg',
    alt: 'U18 unie',
    badge: 'Mini Handball',
    color: 'hsl(var(--hc-green))',
  },
];

const TEAMS = [
  { src: '/lovable-uploads/WhatsApp_Image_2026-05-09_at_22.07.47 copy.jpeg', alt: 'Seniors HC Mouscron', label: 'Seniors' },
  { src: '/lovable-uploads/WhatsApp_Image_2026-04-27_at_10.58.05b copy.jpeg', alt: 'U14 HC Mouscron', label: 'U16' },
  { src: '/lovable-uploads/Capture d’écran 2026-08-12 131716.png', alt: 'U16 HC Mouscron', label: 'U14' },
  { src: '/lovable-uploads/WhatsApp_Image_2026-04-22_at_21.43.51 copy.jpeg', alt: 'Mini Hand Mouscron', label: 'Mini Hand' },
  { src: '/lovable-uploads/WhatsApp_Image_2025-10-01_at_06.45.20 copy.jpeg', alt: 'U18 HC Mouscron', label: 'U18' },
  { src: '/lovable-uploads/3f691e54-6444-4b56-966f-fab9bcea6968.png', alt: 'Vétérans HC Mouscron', label: 'Vétérans' },
];

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Hall+Max+Lessines,+Rue+des+Prés+84B,+7700+Mouscron,+Belgium';
const MOTTO = ["Esprit d'équipe", 'Respect', 'Convivialité'];

const Home = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('hbc-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);

  const toggle = () =>
      setTheme((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('hbc-theme', next); } catch {}
        return next;
      });

  // Apparition au scroll
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.hm-reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  // Parallaxe douce de la photo du hero
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.scrollY < window.innerHeight * 1.2) bg.current?.style.setProperty('--py', String(window.scrollY * 0.18));
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  const motto = MOTTO.map((m) => <span key={m}>{m}<i>✦</i></span>);

  return (
      <div className="hm" data-theme={theme} ref={root}>
        {/* HERO */}
        <section className="hm-hero">
          <div className="hm-hero-bg" ref={bg} style={{ backgroundImage: "url('/image.png')" }} />
          <div className="hm-hero-shade" />
          <i className="hm-orb a" /><i className="hm-orb b" />
          <div className="hm-hero-in">
            <span className="hm-eyebrow">Handball Club • Mouscron</span>
            <h1><span className="a">HC</span><span className="b">Mouscron</span></h1>
            <div className="hm-pills">{MOTTO.map((m) => <span key={m}>{m}</span>)}</div>
            <p>Rejoignez le club de sport le plus accueillant de Mouscron. Découvrez l'esprit d'équipe et la passion du handball dans une ambiance conviviale.</p>
            <div className="hm-cta">
              <Link to="/contact" className="hm-btn p">Nous rejoindre <ArrowRight size={18} /></Link>
              <Link to="/equipe" className="hm-btn g">Découvrir l'équipe</Link>
            </div>
          </div>
          <div className="hm-facts">
            <div className="hm-fact"><i><Users size={22} /></i><div><b>Filles &amp; garçons</b><span>Débutants ou confirmés</span></div></div>
            <div className="hm-fact"><i><MapPin size={22} /></i><div><b>Hall Max Lessines</b><span>Rue des Prés 84B, Mouscron</span></div></div>
            <div className="hm-fact"><i><Calendar size={22} /></i><div><b>Séances d'essai</b><span>Plusieurs, sans engagement</span></div></div>
          </div>
          <span className="hm-cue" aria-hidden="true" />
        </section>

        {/* BANDEAU */}
        <div className="hm-band" aria-hidden="true"><div className="hm-track">{motto}{motto}{motto}{motto}{motto}{motto}{motto}{motto}</div></div>

        {/* PARTENAIRES */}
        <div className="hm-partners"><PartnersCarousel /></div>

        {/* LE HANDBALL AU HC MOUSCRON */}
        <section className="hm-sec">
          <div className="hm-wrap">
            <div className="hm-head hm-reveal">
              <span className="hm-eyebrow">Plus qu'un sport, une passion partagée !</span>
              <h2 className="hm-h2">Le handball <em>au HC Mouscron</em></h2>
              <p className="hm-lead">Découvrez pourquoi le handball au HC Mouscron est une expérience unique</p>
            </div>

            <div className="hm-rows">
              {STORY.map((s, i) => (
                  <article key={s.n} className={`hm-row hm-reveal${i % 2 ? ' rev' : ''}`} style={cv(s.color)}>
                    <figure className="hm-fig">
                      <img src={s.img} alt={s.alt} loading="lazy" decoding="async" />
                      <figcaption className="hm-badge">{s.badge}</figcaption>
                    </figure>
                    <div className="hm-txt">
                      <span className="hm-num" aria-hidden="true">{s.n}</span>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </article>
              ))}
            </div>

            {/* Un sport accessible à tous */}
            <div className="hm-acc hm-reveal">
              <div className="hm-head">
                <span className="hm-eyebrow">Un sport accessible à tous</span>
                <p className="hm-lead">Le club, en tant qu'ASBL, vise à rendre le handball abordable : cotisation annuelle modérée, aides financières possibles et paiements échelonnés.</p>
              </div>
              <div className="hm-tiles">
                <div className="hm-tile"><Wallet size={28} /><b>150 € max.</b><span>Cotisation annuelle modérée pour les jeunes</span></div>
                <div className="hm-tile"><Gift size={28} /><b>Aides possibles</b><span>Chèque Sport, mutualités, employeurs</span></div>
                <div className="hm-tile"><Calendar size={28} /><b>3 mois</b><span>Paiements échelonnés jusqu'à trois mois</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ESSAI + CONTACT */}
        <section className="hm-sec">
          <div className="hm-wrap">
            <div className="hm-try hm-reveal">
              <i className="hm-orb a" />
              <h2>Pratiquer le handball au HC Mouscron, <em>c'est plus qu'un sport !</em></h2>
              <p className="sub">Possibilité de faire plusieurs séances d'essai sans engagement</p>
              <div className="hm-info">
                <a href={MAPS} target="_blank" rel="noopener noreferrer">
                  <i><MapPin size={22} /></i>
                  <div><b>Hall Max Lessines</b><span>Rue des Prés 84B, Mouscron</span></div>
                </a>
                <a href="mailto:handballmouscron@gmail.com">
                  <i><Mail size={22} /></i>
                  <div><b>Handballmouscron</b><span>handballmouscron@gmail.com</span></div>
                </a>
              </div>
              <div className="hm-cta" style={{ marginTop: 32 }}>
                <Link to="/contact" className="hm-btn p">Nous rejoindre <ArrowRight size={18} /></Link>
                <Link to="/infos#tarifs" className="hm-btn g">Nos tarifs</Link>
              </div>
            </div>
          </div>
        </section>

        {/* NOS ÉQUIPES EN ACTION */}
        <section className="hm-sec">
          <div className="hm-wrap">
            <div className="hm-head hm-reveal">
              <span className="hm-eyebrow">Galerie</span>
              <h2 className="hm-h2">Nos équipes <em>en action</em></h2>
            </div>
            <div className="hm-gal">
              {TEAMS.map((t, i) => (
                  <figure key={t.label} className={`hm-ph hm-reveal${i === 0 ? ' big' : ''}`} style={{ '--i': i % 4 } as React.CSSProperties}>
                    <img src={t.src} alt={t.alt} loading="lazy" decoding="async" />
                    <figcaption>{t.label}</figcaption>
                  </figure>
              ))}
              <div className="hm-ph hm-more hm-reveal">
                <Link to="/equipe" className="hm-btn p">Découvrir l'équipe <ArrowRight size={18} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* REJOIGNEZ-NOUS */}
        <section className="hm-join">
          <i className="hm-orb a" />
          <div className="hm-wrap hm-reveal">
            <h2>Rejoignez-nous !</h2>
            <p>Que vous soyez débutant ou expérimenté, jeune ou adulte, il y a une place pour vous au HC Mouscron.</p>
            <div className="hm-cta" style={{ marginTop: 32 }}>
              <Link to="/infos#tarifs" className="hm-btn w">Découvrir nos tarifs</Link>
              <Link to="/contact" className="hm-btn g">Nous contacter</Link>
            </div>
          </div>
        </section>

        {/* TOGGLE JOUR / NUIT */}
        <button className="hm-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Jour' : 'Nuit'}</span>
        </button>
      </div>
  );
};

export default Home;