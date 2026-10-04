import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Clock, Calendar, Euro, Car, Droplets, Coffee, Copy, Check, Download, Navigation, Plane, Percent, Wallet, Ticket, Building2, Plus, Minus, ArrowRight, ArrowUpRight, Sun, Moon } from 'lucide-react';
import './Info.css';

type Theme = 'dark' | 'light';
const cv = (c: string, extra: Record<string, string | number> = {}) => ({ '--c': c, ...extra } as React.CSSProperties);

// ---------------------------------------------------------------------------
// DONNÉES (saison 2026 - 2027, reprises de ta page)
// ---------------------------------------------------------------------------
const SEASON = 'Saison 2026 - 2027';

const trainingSchedule = [
  { category: 'Mini-handball (né(e)s en 2015+)', day: 'Tous les samedis', time: '10:30 - 12:00' },
  { category: 'U16 (né(e)s en 2011 et 2012)', day: 'Tous les lundis', time: '17:30 - 18:45' },
  { category: 'U16 (né(e)s en 2011 et 2012)', day: 'Tous les vendredis', time: '17:30 - 19:00' },
  { category: 'U18 (né(e)s en 2008 à 2010)', day: 'Tous les lundis', time: '18:30 - 20:00' },
  { category: 'U18 (né(e)s en 2008 à 2010)', day: 'Tous les vendredis', time: '17:30 - 19:00' },
  { category: 'Seniors', day: 'Tous les mercredis', time: '19:30 - 21:00' },
  { category: 'Seniors', day: 'Tous les vendredis', time: '19:00 - 20:30' },
  { category: 'Équipe Loisir', day: 'Tous les vendredis', time: '20:30 - 21:45' },
];

const registrationSteps = [
  { step: 1, title: 'Contactez-nous', description: 'Par téléphone, email ou via notre formulaire de contact' },
  { step: 2, title: "Séance d'essai", description: 'Venez essayer gratuitement pendant 3 entraînements' },
  { step: 3, title: 'Inscription', description: "Remplissez le formulaire d'inscription et fournissez les documents" },
  { step: 4, title: 'Paiement', description: 'Réglez la cotisation annuelle' },
];

const tarifs = [
  { label: 'Mini-handball (né(e)s en 2015 et après)', price: '100 €' },
  { label: 'Joueurs Loisir', price: '100 €' },
  { label: 'Juniors (né(e)s à partir de 2009)', price: '165 €' },
  { label: 'Séniors (né(e)s en 2008 et avant)', price: '220 €' },
  { label: 'Transfert international (> 16 ans)', price: '220 € + 150 € (caution)' },
];

const calendars = [
  { label: 'U16', url: 'https://calendar.google.com/calendar/render?cid=98cb0fbe3bdfc2fd4eb65887b777f3c2adde03decaf3788157877eef0f2d90ff%40group.calendar.google.com' },
  { label: 'U18', url: 'https://calendar.google.com/calendar/render?cid=02e4b51b6158592872bd32c184e0d05fd75480ee1893fc293ab3cbc5c8f1cc13%40group.calendar.google.com' },
  { label: 'Séniors PBH', url: 'https://calendar.google.com/calendar/render?cid=769ad348db76a4e8894f0d4a68d95cee19bf16fe8f0106699e38fc325093c59d%40group.calendar.google.com' },
  { label: 'Séniors D1 LFH', url: 'https://calendar.google.com/calendar/render?cid=fdee024de7152bc6a1cb0223655f4ffdee60ccbed3176e1f519629784de20e4a%40group.calendar.google.com' },
];

const CLUB_CALENDAR = 'https://www.handballbelgium.be/index.php/competition/vhv-competitions/?season_id=5&organization_id=2&start_date=2025-07-21&end_date=2025-07-27&club_id=112&serie_tab=fullCalendar';
const AFFILIATION = 'https://www.handballbelgium.be/wp-content/uploads/2025/07/Affiliation-Demande.pdf';
const TRANSFERT = 'https://www.handballbelgium.be/wp-content/uploads/2025/07/Trasnfert-Formulaire-demande-transfert-international-2025-2026.pdf';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Hall+Max+Lessines,+Rue+des+Prés+84B,+7700+Mouscron,+Belgium';
const IBAN = 'BE07 1261 1084 1566';

const NAV = [
  { id: 'salle', label: 'La salle' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'agendas', label: 'Agendas' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'telechargements', label: 'Documents' },
];

const FILTERS = [
  { id: 'all', label: 'Tout' }, { id: 'Mini', label: 'Mini-handball' }, { id: 'U16', label: 'U16' },
  { id: 'U18', label: 'U18' }, { id: 'Seniors', label: 'Seniors' }, { id: 'Loisir', label: 'Loisir' },
];

// --- horaires : on repère le jour dans « Tous les lundis » et on sépare « U16 (né(e)s en ...) » ---
const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const dayOf = (d: string) => DAYS.find((x) => d.toLowerCase().includes(x.toLowerCase())) ?? d;
const splitCat = (c: string) => { const i = c.indexOf(' ('); return i < 0 ? { title: c, sub: '' } : { title: c.slice(0, i), sub: c.slice(i + 2).replace(/\)$/, '') }; };
const colorOf = (cat: string) =>
    cat.startsWith('Mini') ? 'hsl(var(--hc-orange-light))' : cat.startsWith('U16') ? 'hsl(var(--hc-green-light))' : cat.startsWith('U18') ? 'hsl(var(--hc-orange))' : cat.startsWith('Senior') ? 'hsl(38 100% 55%)' : 'hsl(var(--hc-green))';
const week = DAYS.map((d) => ({ day: d, items: trainingSchedule.filter((s) => dayOf(s.day) === d).sort((a, b) => a.time.localeCompare(b.time)) })).filter((d) => d.items.length);

// --- simulateur de fratrie : la cotisation la plus élevée est due, les suivantes ont 10 % de remise ---
const feeOf = (start: string) => parseInt(tarifs.find((t) => t.label.startsWith(start))!.price, 10);
const FEES = { senior: feeOf('Séniors'), junior: feeOf('Juniors'), mini: feeOf('Mini'), loisir: feeOf('Joueurs Loisir') };
type FeeKey = keyof typeof FEES;
const FEE_LABEL: Record<FeeKey, string> = { senior: 'Senior', junior: 'Junior', mini: 'Mini-handball', loisir: 'Loisir' };
const eur = (n: number) => { const r = Math.round(n * 100) / 100; return `${Number.isInteger(r) ? r : r.toFixed(2).replace('.', ',')} €`; };

// ---------------------------------------------------------------------------
const Info = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('hbc-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState('salle');
  const [copied, setCopied] = useState(false);
  const [counts, setCounts] = useState<Record<FeeKey, number>>({ senior: 0, junior: 0, mini: 0, loisir: 0 });
  const root = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  const toggle = () =>
      setTheme((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('hbc-theme', next); } catch {}
        return next;
      });

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Défilement automatique vers l'ancre active (#tarifs)
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => go(hash.replace('#', '')), 250);
    return () => clearTimeout(t);
  }, [hash]);

  // Apparition au scroll + section active dans la barre
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.if-reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
    const spy = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
    NAV.forEach((n) => { const s = document.getElementById(n.id); if (s) spy.observe(s); });
    return () => { io.disconnect(); spy.disconnect(); };
  }, []);

  const copyIban = async () => {
    try { await navigator.clipboard.writeText(IBAN.replace(/\s/g, '')); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };
  const bump = (k: FeeKey, d: number) => setCounts((c) => ({ ...c, [k]: Math.max(0, Math.min(6, c[k] + d)) }));

  const todayIdx = (new Date().getDay() + 6) % 7;
  const today = DAYS[todayIdx];

  // Calcul de la fratrie
  const fees = (Object.keys(FEES) as FeeKey[]).flatMap((k) => Array(counts[k]).fill(FEES[k]) as number[]).sort((a, b) => b - a);
  const paid = fees.map((f, i) => (i === 0 ? f : f * 0.9));
  const total = paid.reduce((a, b) => a + b, 0);
  const saving = fees.reduce((a, b) => a + b, 0) - total;
  const ghost = 'Informations pratiques ✦ Horaires ✦ Tarifs ✦ Inscription ✦ ';

  return (
      <div className="if" data-theme={theme} ref={root}>
        {/* HERO */}
        <section className="if-hero">
          <div className="if-ghosts" aria-hidden="true"><div className="if-ghost">{ghost + ghost}</div><div className="if-ghost r2">{ghost + ghost}</div></div>
          <i className="if-orb a" /><i className="if-orb b" />
          <div className="if-hero-in">
            <span className="if-eyebrow">Rejoindre le HC Mouscron</span>
            <h1><span>Informations</span> <em>pratiques</em></h1>
            <p>Tout ce que vous devez savoir pour nous rejoindre : horaires, lieu d'entraînement et procédure d'inscription.</p>
          </div>
        </section>

        {/* NAVIGATION PAR SECTION */}
        <nav className="if-nav" aria-label="Sections de la page">
          <div>
            {NAV.map((n) => (
                <button key={n.id} className={active === n.id ? 'on' : ''} onClick={() => go(n.id)}>{n.label}</button>
            ))}
          </div>
        </nav>

        <div className="if-wrap">
          {/* SALLE */}
          <section id="salle" className="if-sec">
            <div className="if-gh if-reveal"><span className="if-eyebrow">Où s'entraîner</span><h2>Notre salle <em>d'entraînement</em></h2></div>
            <div className="if-venue if-reveal">
              <div className="if-venue-txt">
                <h3>Hall Max Lessines de Mouscron</h3>
                <ul>
                  <li><i><MapPin size={20} /></i>Rue des Prés 84B, 7700 Mouscron</li>
                  <li><i><Car size={20} /></i>Parking gratuit sur place</li>
                  <li><i><Droplets size={20} /></i>Vestiaires avec douches</li>
                  <li><i><Coffee size={20} /></i>Cafétéria avec Wifi ouverte les soirs d'entraînement</li>
                </ul>
                <a className="if-btn p" href={MAPS} target="_blank" rel="noopener noreferrer"><Navigation size={18} /> Itinéraire</a>
              </div>
              <figure className="if-venue-img">
                <img src="/lovable-uploads/4842a4f3-cca0-44aa-bd40-458e7b9d1cf7.png" alt="Hall Max Lessines - Salle omnisports de Mouscron" loading="lazy" decoding="async" />
              </figure>
            </div>
          </section>

          {/* HORAIRES */}
          <section id="horaires" className="if-sec">
            <div className="if-gh center if-reveal"><span className="if-eyebrow">{SEASON}</span><h2>Horaires <em>d'entraînement</em></h2></div>
            <div className="if-chips if-reveal" role="tablist" aria-label="Filtrer par catégorie">
              {FILTERS.map((f) => <button key={f.id} role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>)}
            </div>
            <div className="if-week">
              {week.map((d, i) => (
                  <div key={d.day} className={`if-day if-reveal${d.day === today ? ' today' : ''}`} style={{ '--i': i } as React.CSSProperties}>
                    <div className="if-dayh"><Calendar size={16} /><b>{d.day}</b>{d.day === today && <span>Aujourd'hui</span>}</div>
                    {d.items.map((s) => {
                      const { title, sub } = splitCat(s.category);
                      const match = filter === 'all' || s.category.includes(filter);
                      return (
                          <div key={s.category + s.time} className={`if-slot${match ? '' : ' dim'}`} style={cv(colorOf(s.category))}>
                            <span className="if-time"><Clock size={16} />{s.time}</span>
                            <span className="if-cat">{title}</span>
                            {sub && <span className="if-note">{sub}</span>}
                          </div>
                      );
                    })}
                  </div>
              ))}
            </div>
          </section>

          {/* AGENDAS */}
          <section id="agendas" className="if-sec">
            <div className="if-gh center if-reveal"><span className="if-eyebrow">Matchs &amp; compétitions</span><h2><em>Agendas</em></h2></div>
            <div className="if-center if-reveal">
              <a className="if-btn p" href={CLUB_CALENDAR} target="_blank" rel="noopener noreferrer"><Calendar size={18} /> Calendrier du club</a>
            </div>
            <div className="if-cals">
              {calendars.map((c, i) => (
                  <a key={c.label} className="if-cal if-reveal" style={{ '--i': i } as React.CSSProperties} href={c.url} target="_blank" rel="noopener noreferrer">
                    <i><Calendar size={24} /></i>
                    <b>{c.label}</b>
                    <span>Ouvrir l'agenda <ArrowUpRight size={16} /></span>
                  </a>
              ))}
            </div>
            <p className="if-small if-reveal">Accès direct aux calendriers Google des matchs pour chaque catégorie.</p>
          </section>

          {/* TARIFS */}
          <section id="tarifs" className="if-sec">
            <div className="if-gh center if-reveal"><span className="if-eyebrow">Cotisation annuelle</span><h2>Tarifs &amp; <em>cotisations</em></h2></div>
            <div className="if-prices">
              {tarifs.map((t, i) => {
                const { title, sub } = splitCat(t.label);
                return (
                    <div key={t.label} className="if-price if-reveal" style={{ '--i': i % 3 } as React.CSSProperties}>
                      <h3>{title}</h3>
                      <span className="if-sub">{sub}</span>
                      <b className={t.price.length > 8 ? 'long' : ''}>{t.price}</b>
                    </div>
                );
              })}
            </div>

            {/* COUPS DE POUCE FINANCIERS & AIDES */}
            <div className="if-gh center if-reveal if-aidh"><span className="if-eyebrow">Coups de pouce financiers</span><h3 className="if-h3">Aides &amp; facilités</h3></div>
            <div className="if-aides">
              <article className="if-aide wide if-reveal">
                <i><Percent size={24} /></i>
                <h4>10 % de ristourne pour les fratries</h4>
                <p>La cotisation la plus élevée est due normalement, les suivantes bénéficient d’une remise de 10 %.</p>
                <div className="if-sim" aria-label="Simulateur de cotisation pour une fratrie">
                  <span className="if-sim-t">Simule ta famille</span>
                  <ul>
                    {(Object.keys(FEES) as FeeKey[]).map((k) => (
                        <li key={k}>
                          <span>{FEE_LABEL[k]} <em>{eur(FEES[k])}</em></span>
                          <div>
                            <button onClick={() => bump(k, -1)} aria-label={`Retirer un ${FEE_LABEL[k]}`} disabled={!counts[k]}><Minus size={16} /></button>
                            <b>{counts[k]}</b>
                            <button onClick={() => bump(k, 1)} aria-label={`Ajouter un ${FEE_LABEL[k]}`}><Plus size={16} /></button>
                          </div>
                        </li>
                    ))}
                  </ul>
                  <div className="if-sim-r" aria-live="polite">
                    {fees.length === 0 ? (
                        <p>Ajoute les membres de la famille pour voir le total.</p>
                    ) : (
                        <>
                          <p>{paid.map((p, i) => eur(p) + (i ? ' (−10 %)' : '')).join('  +  ')}</p>
                          <strong>{eur(total)}</strong>
                          {saving > 0 && <span>Tu économises {eur(saving)}</span>}
                        </>
                    )}
                  </div>
                </div>
                <div className="if-ex">
                  <b>Exemples :</b>
                  <p>• 1 Senior (220 €) + 1 Junior (165 € − 10 % ⇒ <strong>148,50 €</strong>)</p>
                  <p>• 1 Junior (165 €) + 1 Junior (165 € − 10 % ⇒ <strong>148,50 €</strong>) + 1 Mini-handball (100 € − 10 % ⇒ <strong>90 €</strong>)</p>
                </div>
              </article>

              <article className="if-aide if-reveal" style={{ '--i': 1 } as React.CSSProperties}>
                <i><Wallet size={24} /></i>
                <h4>Paiement échelonné en 3 fois</h4>
                <p>Pour ceux qui le souhaiteraient, il est tout à fait possible de régler la cotisation en 3 fois. Il suffit d’en faire la demande auprès du comité afin de planifier au mieux les virements.</p>
              </article>
              <article className="if-aide if-reveal" style={{ '--i': 2 } as React.CSSProperties}>
                <i><Ticket size={24} /></i>
                <h4>Chèque Sport</h4>
                <p>Le Chèque Sport, aide de la Ville de Mouscron, soumise à conditions, est également disponible.</p>
                <a href="https://www.mouscron.be/" target="_blank" rel="noopener noreferrer">Site de la Ville de Mouscron <ArrowUpRight size={16} /></a>
              </article>
              <article className="if-aide if-reveal" style={{ '--i': 3 } as React.CSSProperties}>
                <i><Building2 size={24} /></i>
                <h4>Mutualités &amp; employeurs</h4>
                <p>N’oubliez pas également les avantages offerts par les mutualités ou vos employeurs pour la pratique d’un sport !</p>
              </article>
            </div>

            {/* PAIEMENT + TRANSFERT INTERNATIONAL */}
            <div className="if-pay if-reveal">
              <div className="if-pay-main">
                <span className="if-pay-t"><Euro size={20} /> Règlement par virement bancaire</span>
                <button className={`if-iban${copied ? ' ok' : ''}`} onClick={copyIban} aria-label="Copier l'IBAN">
                  <code>{IBAN}</code>
                  <span>{copied ? <><Check size={16} /> Copié !</> : <><Copy size={16} /> Copier</>}</span>
                </button>
                <p>Merci d'indiquer le nom et prénom du joueur en communication.<br />Paiement avant le <strong>30/09/26</strong></p>
              </div>
              <div className="if-pay-int">
                <span className="if-pay-t"><Plane size={20} /> Transfert international (+16 ans)</span>
                <p>Un joueur est soumis à la procédure de transfert international lorsqu'il a été affilié, au cours des deux années précédentes, à un club relevant d'une fédération étrangère (hors Belgique), qu'il est âgé de plus de 16 ans et qu'il ne réside pas en Belgique en qualité d'élève ou d'étudiant.</p>
                <p>Compte tenu des frais engendrés pour le club par cette procédure, un <strong>chèque de caution de 150 €</strong> (en plus de la cotisation de 220 €) est demandé au nouveau membre afin de garantir son engagement pour l'ensemble de la saison. Ce chèque lui sera entièrement restitué à l'issue de celle-ci.</p>
              </div>
            </div>
            <p className="if-small if-reveal"><em>Les montants des cotisations peuvent être revus à la baisse en cas d'arrivée tardive en cours de saison, sur décision du comité du club.</em></p>
          </section>

          {/* INSCRIPTION */}
          <section id="inscription" className="if-sec">
            <div className="if-gh center if-reveal"><span className="if-eyebrow">4 étapes simples</span><h2>Procédure <em>d'inscription</em></h2></div>
            <ol className="if-steps">
              {registrationSteps.map((s, i) => (
                  <li key={s.step} className="if-step if-reveal" style={{ '--i': i } as React.CSSProperties}>
                    <span className="if-stepn">{s.step}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </li>
              ))}
            </ol>
          </section>

          {/* TÉLÉCHARGEMENTS */}
          <section id="telechargements" className="if-sec">
            <div className="if-gh center if-reveal"><span className="if-eyebrow">PDF officiels</span><h2>Téléchargements <em>utiles</em></h2></div>
            <div className="if-dl if-reveal">
              <a href={AFFILIATION} target="_blank" rel="noopener noreferrer" className="if-btn p"><Download size={18} /> Télécharger la fiche d'affiliation (PDF)</a>
              <a href={TRANSFERT} target="_blank" rel="noopener noreferrer" className="if-btn d"><Download size={18} /> Télécharger le formulaire de transfert international (PDF)</a>
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="if-join">
          <i className="if-orb a" />
          <div className="if-wrap if-reveal">
            <h2>Une question ?</h2>
            <p>Notre équipe vous répond rapidement pour tout renseignement sur le club.</p>
            <Link to="/contact" className="if-btn w">Nous contacter <ArrowRight size={18} /></Link>
          </div>
        </section>

        <button className="if-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Jour' : 'Nuit'}</span>
        </button>
      </div>
  );
};

export default Info;