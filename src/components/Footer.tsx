import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { MapPin, Phone, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

const NAV = [
  { name: 'Accueil', href: '/' },
  { name: 'Équipe', href: '/equipe' },
  { name: 'Partenaires', href: '/partenaires' },
  { name: 'Infos pratiques', href: '/infos' },
  { name: 'Contact', href: '/contact' },
];

const TIKTOK =
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z';

const Footer = () => (
    <footer className="hc-f">
      <i className="hc-orb a" /><i className="hc-orb b" />

      <div className="hc-f-in">
        <div className="hc-f-grid">
          {/* Marque */}
          <div className="hc-f-brand">
            <div className="hc-f-id">
              <img src="/lovable-uploads/7f5485a2-eaa0-4a73-8e50-8de5813ec2f3.png" alt="HC Mouscron logo" />
              <span>HC Mouscron</span>
            </div>
            <p>Club de handball passionné basé à Mouscron. Venez partager votre passion du handball dans une ambiance chaleureuse, dynamique et sportive !</p>
            <div className="hc-f-soc">
              <a href="https://www.facebook.com/HCMouscron" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="" /></a>
              <a href="https://www.instagram.com/hcmouscron/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="" /></a>
              <a href="https://www.tiktok.com/@hc.mouscron" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d={TIKTOK} /></svg></a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hc-f-nav" aria-label="Navigation du pied de page">
            <h3>Navigation</h3>
            {NAV.map((n) => (
                <Link key={n.name} to={n.href}>
                  <span>{n.name}</span><ArrowUpRight size={20} />
                </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="hc-f-contact">
            <h3>Contact</h3>
            <a className="hc-tile" href="https://www.google.com/maps/search/?api=1&query=Rue+des+Prés+84B,+7700+Mouscron" target="_blank" rel="noopener noreferrer">
              <i><MapPin size={18} /></i>
              <span><b>Hall Max Lessines</b>Rue des Prés 84B, 7700 Mouscron</span>
            </a>
            <a className="hc-tile" href="tel:+32467328424">
              <i><Phone size={18} /></i>
              <span><b>Téléphone</b>+32 (0)467 32 84 24</span>
            </a>
            <a className="hc-tile" href="mailto:secretariat.handballmouscron@gmail.com">
              <i><Mail size={18} /></i>
              <span><b>E-mail</b><em>secretariat.handballmouscron@gmail.com</em></span>
            </a>
          </div>
        </div>

        <div className="hc-f-mark" aria-hidden="true">HC Mouscron</div>

        <div className="hc-f-bottom">
          <p>© 2025 HC Mouscron. Tous droits réservés.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut de page"><ArrowUp size={18} /></button>
        </div>
      </div>
    </footer>
);


export default Footer;