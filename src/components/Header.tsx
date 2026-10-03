import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const NAV = [
    { name: 'Accueil', href: '/' },
    { name: 'Équipe', href: '/equipe' },
    { name: 'Partenaires', href: '/partenaires' },
    { name: 'Infos', href: '/infos' },
    { name: 'Contact', href: '/contact' },
];

const TIKTOK =
    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z';

const Socials = () => (
    <div className="hc-soc">
        <a href="https://www.facebook.com/HCMouscron" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="" />
        </a>
        <a href="https://www.instagram.com/hcmouscron/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="" />
        </a>
        <a href="https://www.tiktok.com/@hc.mouscron" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d={TIKTOK} /></svg>
        </a>
    </div>
);

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const isActive = (href: string) => pathname === href;

    useEffect(() => {
        const on = () => setScrolled(window.scrollY > 12);
        on();
        window.addEventListener('scroll', on, { passive: true });
        return () => window.removeEventListener('scroll', on);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', esc);
        return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
    }, [open]);

    return (
        <header className={`hc-h${scrolled ? ' sc' : ''}${open ? ' open' : ''}`}>

            {/* Menu mobile plein écran */}
            <div className="hc-sheet" aria-hidden={!open}>
                <nav>
                    {NAV.map((item, i) => (
                        <Link key={item.name} to={item.href} tabIndex={open ? 0 : -1} className={isActive(item.href) ? 'on' : ''} style={{ '--i': i } as React.CSSProperties} onClick={() => setOpen(false)}>
                            <small>{String(i + 1).padStart(2, '0')}</small>{item.name}
                        </Link>
                    ))}
                </nav>
                <Socials />
            </div>

            {/* Capsule flottante */}
            <div className="hc-bar">
                <Link to="/" className="hc-brand" aria-label="HC Mouscron - Accueil">
                    <img src="/HCM_Logo_2025_fond_transparent.png" alt="HC Mouscron logo" />
                    <span>HC<br />Mouscron</span>
                </Link>

                <nav className="hc-links" aria-label="Navigation principale">
                    {NAV.map((item) => (
                        <Link key={item.name} to={item.href} className={isActive(item.href) ? 'on' : ''} aria-current={isActive(item.href) ? 'page' : undefined}>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hc-right">
                    <Socials />
                    <button className="hc-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </header>
    );
};


export default Header;