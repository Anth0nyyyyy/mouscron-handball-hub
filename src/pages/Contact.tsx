import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Navigation, Facebook, Instagram, Sun, Moon } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm'; // ⚠ utilisé TEL QUEL : l'envoi (EmailJS / Supabase) n'est pas modifié
import './Contact.css';

type Theme = 'dark' | 'light';

// ---------------------------------------------------------------------------
// DONNÉES
// ---------------------------------------------------------------------------
const PHONE = '+32 (0)467 32 84 24';
const PHONE_LINK = 'tel:+32467328424';
const EMAIL = 'secretariat.handballmouscron@gmail.com';
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Hall+Max+Lessines,+Rue+des+Prés+84B,+7700+Mouscron,+Belgium';
const MAP_EMBED = 'https://www.google.com/maps?q=Hall+Max+Lessines,+Rue+des+Pr%C3%A9s+84B,+7700+Mouscron&output=embed';
const TIKTOK = 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z';

const contactInfo = [
  { icon: Phone, title: 'Téléphone', lines: [PHONE], href: PHONE_LINK, cta: 'Appeler' },
  { icon: Mail, title: 'Email', lines: [EMAIL, 'Réponse rapide par email'], href: `mailto:${EMAIL}`, cta: 'Écrire' },
  { icon: MapPin, title: 'Adresse', lines: ['Hall Max Lessines', 'Rue des Prés 84B, 7700 Mouscron'], href: MAPS, cta: 'Itinéraire' },
];

// Staff aligné avec la page Équipe (Damien Cockenpot = Président)
const staff = [
  { name: 'Damien Cockenpot', role: 'Président', phone: PHONE, email: EMAIL },
  { name: 'David Macarez', role: 'Secrétaire', phone: PHONE, email: EMAIL },
  { name: 'Joaquim Vercruysse', role: 'Trésorier', phone: PHONE, email: EMAIL },
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/HCMouscron', icon: <Facebook size={20} /> },
  { label: 'Instagram', href: 'https://www.instagram.com/hcmouscron/', icon: <Instagram size={20} /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@hc.mouscron', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d={TIKTOK} /></svg> },
];

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

// ---------------------------------------------------------------------------
const Contact = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const t = localStorage.getItem('hbc-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const root = useRef<HTMLDivElement>(null);

  const toggle = () =>
      setTheme((t) => {
        const next: Theme = t === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('hbc-theme', next); } catch {}
        return next;
      });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll('.ct-reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const ghost = 'Contact ✦ Une question ✦ Rejoignez-nous ✦ ';

  return (
      <div className="ct" data-theme={theme} ref={root}>
        {/* HERO */}
        <section className="ct-hero">
          <div className="ct-ghosts" aria-hidden="true"><div className="ct-ghost">{ghost + ghost}</div><div className="ct-ghost r2">{ghost + ghost}</div></div>
          <i className="ct-orb a" /><i className="ct-orb b" />
          <div className="ct-hero-in">
            <span className="ct-logo"><img src="/lovable-uploads/7f5485a2-eaa0-4a73-8e50-8de5813ec2f3.png" alt="Logo HC Mouscron" /></span>
            <h1><span>Contactez</span> <em>nous</em></h1>
            <p>Une question ? Envie de nous rejoindre ? Notre équipe vous répond rapidement pour tout renseignement sur le club ou le handball à Mouscron !</p>
          </div>
          <div className="ct-tiles">
            {contactInfo.map((c, i) => (
                <a key={c.title} className="ct-tile" style={{ '--i': i } as React.CSSProperties} href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <i><c.icon size={24} /></i>
                  <span><b>{c.title}</b>{c.lines.map((l) => <em key={l}>{l}</em>)}</span>
                  <u>{c.cta}</u>
                </a>
            ))}
          </div>
        </section>

        <div className="ct-wrap">
          <div className="ct-grid">
            {/* FORMULAIRE : ton ContactForm d'origine, habillé uniquement par le CSS */}
            <section className="ct-form ct-reveal">
              <ContactForm />
            </section>

            {/* COLONNE DROITE */}
            <div className="ct-side">
              <section className="ct-card ct-reveal">
                <h3>Le comité</h3>
                <ul className="ct-staff">
                  {staff.map((s) => (
                      <li key={s.name}>
                        <span className="ct-av">{initials(s.name)}</span>
                        <div><b>{s.name}</b><em>{s.role}</em></div>
                        <a href={`tel:${s.phone.replace(/[^\d+]/g, '')}`} aria-label={`Appeler ${s.name}`}><Phone size={16} /></a>
                        <a href={`mailto:${s.email}`} aria-label={`Écrire à ${s.name}`}><Mail size={16} /></a>
                      </li>
                  ))}
                </ul>
              </section>

              <section className="ct-card ct-map ct-reveal">
                <iframe title="Carte : Hall Max Lessines, Mouscron" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <a className="ct-btn p" href={MAPS} target="_blank" rel="noopener noreferrer"><Navigation size={18} /> Itinéraire</a>
              </section>

              <section className="ct-card ct-reveal">
                <h3>Suis-nous</h3>
                <div className="ct-soc">
                  {socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.icon}{s.label}</a>)}
                </div>
              </section>
            </div>
          </div>
        </div>

        <button className="ct-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Jour' : 'Nuit'}</span>
        </button>
      </div>
  );
};

export default Contact;