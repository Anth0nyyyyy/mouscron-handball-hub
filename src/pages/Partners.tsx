import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, TiktokIcon, XIcon, YoutubeIcon } from '@/components/BrandIcons';
import { partners, type Cat, type Partner } from '@/data/partners';
import { CLUB_STATS, OFFERS, PILLARS, REACH_STATS, SHOW_PRICE, type Stat } from '@/data/sponsoring';
import { CONTACT } from '@/data/contact';
import PageHero from '@/components/PageHero';
import CountUp from '@/components/CountUp';
import './Partners.css';

// ---------- Liens : le type (site, Facebook, Instagram…) est détecté depuis l'URL ----------
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

// Le 1er lien est le lien principal ; les suivants sont affichés en icônes
const getLinks = (p: Partner): PLink[] => {
  const raw = [p.website ?? '', ...(p.socials ?? []), p.phone ? `tel:${p.phone.replace(/\s/g, '')}` : '', p.email ? `mailto:${p.email}` : ''].filter(Boolean);
  return [...new Set(raw)].map((href) => {
    const kind = detect(href);
    return { kind, href, label: LABEL[kind], external: !/^(tel|mailto):/i.test(href) };
  });
};
const mainLabel = (l: PLink) => (l.kind === 'website' ? 'Visiter le site' : l.kind === 'phone' ? 'Appeler' : l.kind === 'email' ? 'Écrire' : `Voir sur ${l.label}`);
const ext = (l: PLink) => (l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

const LinkIcon = ({ kind }: { kind: Kind }) => {
  const size = 18;
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

const FILTERS: { id: 'all' | Cat; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'finances', label: 'Finances et assurances' },
  { id: 'sante', label: 'Santé et artisans' },
  { id: 'technique', label: 'Technique et équipement' },
];

// Logo avec repli sur l'initiale si l'image manque
const Logo = ({ p }: { p: Partner }) => {
  const [err, setErr] = useState(!p.logo);
  return err ? <span className="partner-initial">{p.name.charAt(0)}</span> : <img src={p.logo} alt={`Logo ${p.name}`} loading="lazy" onError={() => setErr(true)} />;
};

const Scoreline = ({ stats }: { stats: Stat[] }) => (
  <div className="scoreline">
    {stats.map((s, i) => (
      <div key={s.label} data-reveal style={{ '--d': i } as CSSProperties}>
        <span className="num">{s.to !== undefined ? <CountUp to={s.to} /> : s.value}</span>
        <span className="lbl">{s.label}</span>
        <span className="txt">{s.text}</span>
      </div>
    ))}
  </div>
);

const Partners = () => {
  const [filter, setFilter] = useState<'all' | Cat>('all');
  const shown = filter === 'all' ? partners : partners.filter((p) => p.cats.includes(filter));

  return (
    <>
      <PageHero
        title="Nos partenaires"
        intro={`${partners.length} entreprises de la région soutiennent le HC Mouscron. Grâce à elles, le handball reste accessible aux familles.`}
      >
        <div className="actions"><a href="#devenir" className="btn primary">Devenir partenaire</a></div>
      </PageHero>

      <section className="section" aria-labelledby="list-title">
        <div className="wrap">
          <h2 id="list-title" className="sr-only">Liste des partenaires</h2>
          <div className="chips" role="group" aria-label="Filtrer par secteur">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <ul className="partner-grid">
            {shown.map((p, i) => {
              const links = getLinks(p);
              const [main, ...extra] = links;
              return (
                <li key={p.name} className="partner" data-reveal style={{ '--d': i % 4 } as CSSProperties}>
                  <div className="partner-logo"><Logo p={p} /></div>
                  <h3>{p.name}</h3>
                  <p className="partner-tag">{p.tag}</p>
                  {p.description !== p.tag && <p className="partner-desc">{p.description}</p>}
                  <div className="partner-links">
                    {main && <a className="link" href={main.href} {...ext(main)}>{mainLabel(main)}</a>}
                    {extra.length > 0 && (
                      <span className="partner-icons">
                        {extra.map((l) => (
                          <a key={l.href} href={l.href} {...ext(l)} aria-label={`${p.name} sur ${l.label}`} title={l.label}><LinkIcon kind={l.kind} /></a>
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="dark-band" id="devenir" aria-labelledby="become-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="become-title" className="h2">Associez votre entreprise au club</h2>
            <p className="lead">Associez votre image aux valeurs d'engagement et de dépassement d'un club en pleine progression.</p>
          </div>
          <h3 className="h3 sub-title">Le club en chiffres</h3>
          <Scoreline stats={CLUB_STATS} />
          <h3 className="h3 sub-title">Notre audience</h3>
          <Scoreline stats={REACH_STATS} />
        </div>
      </section>

      <section className="section" aria-labelledby="gain-title">
        <div className="wrap">
          <h2 id="gain-title" className="h2 small" data-reveal>Ce que vous y gagnez</h2>
          <ul className="pillars">
            {PILLARS.map((p) => (
              <li key={p.title}>
                <b>{p.title}</b>
                <span>{p.words.join(', ')}</span>
              </li>
            ))}
          </ul>
          <p className="note">* Selon leur nature et les règles fiscales en vigueur, les partenariats avec le HC Mouscron peuvent être considérés comme des frais de publicité déductibles.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="offers-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <h2 id="offers-title" className="h2">Les formules</h2>
            <p className="lead">Chaque formule inclut la formule Découverte. Les emplacements sont limités.</p>
          </div>
          <div className="offers">
            {OFFERS.map((o, i) => (
              <article key={o.name} className="offer" data-reveal style={{ '--d': i % 3 } as CSSProperties}>
                <h3>{o.name}</h3>
                <p className="offer-pitch">{o.pitch}</p>
                {SHOW_PRICE && <p className="offer-price"><b>{o.price}</b> <span>{o.unit}</span></p>}
                <p className="offer-meta">{o.slots}{o.size ? `, ${o.size}` : ''}</p>
                <ul>{o.perks.map((perk) => <li key={perk}>{perk}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="note">Prix hors TVA.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="partner-cta">
            <h2 className="h2 small">Parlons de votre visibilité</h2>
            <p>Venez nous rencontrer : on vous présente le dossier de sponsoring 2026-2027 et on choisit ensemble la formule qui vous correspond.</p>
            <div className="actions">
              <Link to="/contact" className="btn primary">Nous contacter</Link>
              <a href={CONTACT.phoneHref} className="btn on-dark">{CONTACT.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
