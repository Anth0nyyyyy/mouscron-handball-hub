import { useEffect, useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { asset } from '@/lib/asset';
import { NAV } from '@/data/contact';
import { useTheme } from '@/hooks/use-theme';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  // Ferme le menu mobile à chaque changement de page et avec Échap
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  // Header plus compact dès qu'on a quitté le haut de page (l'état ne change qu'au passage du seuil)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const current = (href: string) => (pathname === href ? ('page' as const) : undefined);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="bar">
        <Link to="/" className="brand" aria-label="HC Mouscron, accueil">
          <img src={asset('/uploads/club/logo-hcm.webp')} alt="" width={48} height={48} />
          <span>HC Mouscron</span>
        </Link>

        <nav className="site-nav" aria-label="Navigation principale">
          {NAV.map((n) => (
            <Link key={n.href} to={n.href} aria-current={current(n.href)}>{n.name}</Link>
          ))}
        </nav>

        <button className="icon-btn" onClick={toggle} aria-label={dark ? 'Passer en mode jour' : 'Passer en mode nuit'}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <Link to="/contact" className="btn primary header-cta">Essayer gratuitement</Link>
        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navigation principale">
          {NAV.map((n, i) => (
            <Link key={n.href} to={n.href} aria-current={current(n.href)} style={{ '--d': i } as CSSProperties}>{n.name}</Link>
          ))}
          <Link to="/contact" className="btn primary" style={{ '--d': NAV.length } as CSSProperties}>Essayer gratuitement</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
