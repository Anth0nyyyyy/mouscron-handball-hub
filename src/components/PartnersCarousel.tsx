import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './PartnersCarousel.css';

// Partenaires affichés dans le bandeau (supprime une ligne pour le retirer)
const partners = [
  { name: 'Crack', logo: '/lovable-uploads/d1b8c78d-2adc-4f0c-a684-d108bed1d3c5.png' },
  { name: 'Fred Elec', logo: '/lovable-uploads/f847fff1-a2e3-4717-b1d4-85fe3bebe9f7.png' },
  { name: 'Acta Security', logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png' },
  { name: 'Banque CPH', logo: '/lovable-uploads/cph-banque.png' },
  { name: 'Paramed Center Coquinie', logo: '/lovable-uploads/paramed-center-coquinie.jpg' },
  { name: 'Hoption', logo: '/lovable-uploads/hoption.jpg' },
  { name: 'GM Group', logo: '/lovable-uploads/gm-group.png' },
  { name: 'Océ Anniversaire', logo: '/lovable-uploads/oce-anniversaire-charlotte.jpg' },
];

type P = { name: string; logo: string };

// Logo avec repli (initiale) si l'image est introuvable
const Tile = ({ p }: { p: P }) => {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [p.logo]);
  return (
      <span className="pc-tile">
      {err ? <b>{p.name.charAt(0)}</b> : <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" onError={() => setErr(true)} />}
    </span>
  );
};

// Une ligne qui défile en boucle : 2 séries identiques, la 2e est masquée aux lecteurs d'écran
const Row = ({ items, reverse = false }: { items: P[]; reverse?: boolean }) => {
  const set = [...items, ...items]; // assez long pour couvrir les grands écrans
  return (
      <div className={`pc-row${reverse ? ' rev' : ''}`}>
        <div className="pc-track">
          {[0, 1].map((k) => (
              <div className={`pc-set${k ? ' dup' : ''}`} key={k} aria-hidden={k ? true : undefined}>
                {set.map((p, i) => <Tile key={`${p.name}-${i}`} p={p} />)}
              </div>
          ))}
        </div>
      </div>
  );
};

const PartnersCarousel = () => (
    <section className="pc">
      <div className="pc-wrap">
        <div className="pc-head">
          <span className="pc-eyebrow">Ils nous font confiance</span>
          <h2>Nos partenaires <em>de confiance</em></h2>
        </div>

        <Link to="/partenaires" className="pc-panel" aria-label="Découvrir tous nos partenaires">
          <Row items={partners} />
          <Row items={[...partners].reverse()} reverse />
          <span className="pc-cta">Découvrir tous nos partenaires <ArrowRight size={18} /></span>
        </Link>
      </div>
    </section>
);

export default PartnersCarousel;