import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Minus, Plus } from 'lucide-react';
import { asset } from '@/lib/asset';
import { SEASON } from '@/data/club';
import { CONTACT } from '@/data/contact';
import { partners } from '@/data/partners';
import { categoryFor, dayOf, feeFor, fmtTime, sessionsOf, shortCat } from '@/lib/schedule';
import Court from '@/components/Court';
import WeekBoard from '@/components/WeekBoard';
import Steps from '@/components/Steps';
import CountUp from '@/components/CountUp';
import { CLUB_STATS } from '@/data/sponsoring';
import './Home.css';

const FEE_POINTS: [string, string][] = [
  ['100 à 165 €', 'par saison pour les jeunes'],
  ['−10 %', "dès le deuxième enfant d'une même famille"],
  ['3 fois', 'paiement échelonné sur demande'],
  ['Chèque Sport', 'et interventions des mutualités acceptés'],
];

const MIN_YEAR = 1960;
const MAX_YEAR = 2021;

// « Trouve ton entraînement » : l'année de naissance donne la catégorie, les créneaux et la cotisation
const Finder = () => {
  const [year, setYear] = useState(2012);
  const cat = categoryFor(year);
  const sessions = cat.key === 'seniors' ? [...sessionsOf('seniors'), ...sessionsOf('loisir')] : sessionsOf(cat.key);
  const clamp = (y: number) => Math.min(MAX_YEAR, Math.max(MIN_YEAR, y));

  return (
    <section className="finder" id="trouver" aria-labelledby="finder-title">
      <div className="finder-in">
        <div>
          <h2 id="finder-title">Ton année de naissance</h2>
          <div className="score">
            <button type="button" onClick={() => setYear((y) => clamp(y - 1))} aria-label="Année précédente" disabled={year <= MIN_YEAR}><Minus size={22} /></button>
            <label className="sr-only" htmlFor="year">Année de naissance</label>
            <input
              id="year" type="number" inputMode="numeric" min={MIN_YEAR} max={MAX_YEAR} value={year}
              onChange={(e) => { const v = parseInt(e.target.value, 10); if (!Number.isNaN(v)) setYear(clamp(v)); }}
            />
            <button type="button" onClick={() => setYear((y) => clamp(y + 1))} aria-label="Année suivante" disabled={year >= MAX_YEAR}><Plus size={22} /></button>
          </div>
          <p className="finder-hint">Pour un enfant, indique son année de naissance.</p>
        </div>

        <div className="finder-result" aria-live="polite" key={cat.key}>
          <p className="finder-cat">{cat.label}</p>
          {sessions.length ? (
            <ul className="sessions">
              {sessions.map((s) => (
                <li key={s.category + s.day + s.time}>
                  <span className="d">{dayOf(s.day)}</span>
                  <span className="t">{fmtTime(s.time)}</span>
                  {cat.key === 'seniors' && <span className="c">{shortCat(s.category)}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="finder-none">Le club n'a pas d'équipe pour les enfants nés en 2013 et 2014 cette saison. Écris-nous, on regarde ensemble ce qui est possible.</p>
          )}
          <dl className="finder-facts">
            <div><dt>Cotisation</dt><dd>{feeFor(year)} par saison</dd></div>
            <div><dt>Où</dt><dd><MapPin size={15} aria-hidden="true" /> {CONTACT.venue}, {CONTACT.street.toLowerCase()}</dd></div>
          </dl>
          <Link to="/contact" className="btn primary">Réserver ma séance d'essai</Link>
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <div className="home">
    <section className="home-hero">
      <img className="home-hero-img" src={asset('/uploads/club/hero.webp')} alt="Joueuses, joueurs et familles du HC Mouscron réunis au Hall Max Lessines" {...{ fetchpriority: 'high' }} />
      <div className="home-hero-shade" />
      <Court />
      <div className="home-hero-in">
        <p className="home-season">{SEASON}</p>
        <h1>
          <span className="line" style={{ '--d': 0 } as CSSProperties}>Viens jouer</span>
          <span className="line" style={{ '--d': 1 } as CSSProperties}>au handball</span>
          <span className="line" style={{ '--d': 2 } as CSSProperties}>à Mouscron.</span>
        </h1>
        <p className="home-hero-p">Filles et garçons, débutants ou confirmés. Trois entraînements d'essai offerts, sans engagement.</p>
        <div className="actions">
          <a href="#trouver" className="btn primary">Trouver mon entraînement</a>
          <Link to="/contact" className="btn on-dark">Nous écrire</Link>
        </div>
      </div>
    </section>

    <Finder />

    <section className="section" aria-labelledby="club-title">
      <div className="wrap">
        <div data-reveal>
          <h2 id="club-title" className="h2">Un club de quartier qui monte</h2>
          <p className="lead">L'équipe seniors a fini la saison 2025-2026 invaincue et monte en D1 LFH. Au bord du terrain, ce sont surtout des familles, des bénévoles et beaucoup de bonne humeur.</p>
        </div>
        <div className="home-photos">
          <figure className="big" data-reveal><img src={asset('/uploads/teams/seniors.webp')} alt="L'équipe seniors championne 2025-2026" loading="lazy" /><figcaption>Seniors</figcaption></figure>
          <figure data-reveal style={{ '--d': 1 } as CSSProperties}><img src={asset('/uploads/teams/u16.webp')} alt="L'équipe U16" loading="lazy" /><figcaption>U16</figcaption></figure>
          <figure data-reveal style={{ '--d': 2 } as CSSProperties}><img src={asset('/uploads/teams/mini-handball.webp')} alt="Les mini-handballeurs" loading="lazy" /><figcaption>Mini-handball</figcaption></figure>
        </div>
        <Link to="/equipe" className="link home-more">Toutes les équipes et le staff</Link>
      </div>
    </section>

    {/* Tableau d'affichage : chiffres du club puis semaine au Hall */}
    <section className="dark-band" aria-labelledby="score-title">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <h2 id="score-title" className="h2">Le club en chiffres</h2>
        </div>
        <div className="scoreline">
          {CLUB_STATS.map((s, i) => (
            <div key={s.label} data-reveal style={{ '--d': i } as CSSProperties}>
              <span className="num">{s.to !== undefined ? <CountUp to={s.to} /> : s.value}</span>
              <span className="lbl">{s.label}</span>
              <span className="txt">{s.text}</span>
            </div>
          ))}
        </div>

        <div className="section-head home-week-head" data-reveal>
          <h2 id="week-title" className="h2">La semaine au Hall Max Lessines</h2>
        </div>
        <div data-reveal><WeekBoard /></div>
        <Link to="/infos#horaires" className="link home-more">Horaires détaillés et agendas des matchs</Link>
      </div>
    </section>

    <section className="section" aria-labelledby="fee-title">
      <div className="wrap home-fees">
        <div data-reveal>
          <h2 id="fee-title" className="h2">Un sport qui reste abordable</h2>
          <p className="lead">En tant qu'ASBL, le club veut rendre le handball accessible : cotisation annuelle modérée, aides financières possibles et paiements échelonnés.</p>
        </div>
        <ul className="home-fee-list">
          {FEE_POINTS.map(([big, small], i) => (
            <li key={big} data-reveal style={{ '--d': i } as CSSProperties}><b>{big}</b><span>{small}</span></li>
          ))}
        </ul>
      </div>
    </section>

    <section className="section" aria-labelledby="steps-title">
      <div className="wrap">
        <div className="section-head" data-reveal><h2 id="steps-title" className="h2">S'inscrire en quatre étapes</h2></div>
        <div data-reveal><Steps /></div>
      </div>
    </section>

    <section className="section" aria-labelledby="partners-title">
      <div className="wrap">
        <div className="section-head" data-reveal><h2 id="partners-title" className="h2 small">Merci à nos partenaires</h2></div>
        <ul className="logo-grid">
          {partners.map((p, i) => <li key={p.name} data-reveal style={{ '--d': i % 8 } as CSSProperties}><img src={p.logo} alt={p.name} loading="lazy" /></li>)}
        </ul>
        <Link to="/partenaires" className="link home-more">Devenir partenaire du club</Link>
      </div>
    </section>
  </div>
);

export default Home;
