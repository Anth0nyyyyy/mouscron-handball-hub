import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const leftNavigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Équipe', href: '/equipe' },
    { name: 'Partenaires', href: '/partenaires' }
  ];

  const rightNavigation = [
    { name: 'Infos', href: '/infos' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
      // DÉGRADÉ FIXÉ AVEC LES CODES HEXADÉCIMAUX OFFICIELS (#1D4E34 -> #286B43 -> #D27C24)
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#1D4E34] via-[#286B43] to-[#D27C24] backdrop-blur shadow-xl h-20 lg:h-24 transition-all duration-300">
        <nav className="mx-auto flex h-full max-w-7xl items-center justify-between p-4 lg:px-8 relative">

          {/* 1. Navigation gauche - Desktop */}
          <div className="hidden lg:flex lg:gap-x-6 lg:flex-1 lg:justify-end lg:pr-12 lg:items-center">
            {leftNavigation.map(item => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={`text-white font-bold text-lg hover:text-yellow-200 transition-all drop-shadow-md px-3 py-1.5 rounded relative group ${
                        isActive(item.href) ? 'text-yellow-200' : ''
                    }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-3 right-3 h-[3px] bg-yellow-200 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      isActive(item.href) ? 'scale-x-100' : ''
                  }`} />
                </Link>
            ))}
          </div>

          {/* 2. Logo à cheval au Centre */}
          <div className="flex-shrink-0 z-20 relative h-full flex items-center justify-center">
            <Link to="/" className="relative top-4 sm:top-5 lg:top-5 hover:scale-105 transition-transform duration-200 block">
              <img
                  src="/HCM_Logo_2025_fond_transparent.png"
                  alt="HC Mouscron logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full shadow-2xl bg-white p-1 border-4 border-white"
              />
            </Link>
          </div>

          {/* 3. Navigation droite - Desktop */}
          <div className="hidden lg:flex lg:gap-x-6 lg:flex-1 lg:justify-start lg:pl-12 lg:items-center">
            {rightNavigation.map(item => (
                <Link
                    key={item.name}
                    to={item.href}
                    className={`text-white font-bold text-lg hover:text-yellow-200 transition-all drop-shadow-md px-3 py-1.5 rounded relative group ${
                        isActive(item.href) ? 'text-yellow-200' : ''
                    }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-3 right-3 h-[3px] bg-yellow-200 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 ${
                      isActive(item.href) ? 'scale-x-100' : ''
                  }`} />
                </Link>
            ))}

            {/* Intégration de Facebook, Instagram et TikTok */}
            <div className="flex gap-x-2 items-center ml-4 pl-4 border-l border-white/20 h-6">
              <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-white/10 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <a
                    href="https://www.facebook.com/HCMouscron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white drop-shadow-md"
                >
                  <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="Facebook" className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-white/10 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <a
                    href="https://www.instagram.com/hcmouscron/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white drop-shadow-md"
                >
                  <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="Instagram" className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 hover:bg-white/10 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <a
                    href="https://www.tiktok.com/@hc.mouscron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white drop-shadow-md flex items-center justify-center"
                >
                  <svg className="h-[22px] w-[22px] text-white fill-current drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z"/>
                  </svg>
                </a>
              </Button>
            </div>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="flex lg:hidden">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-yellow-200 hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Navigation Mobile Déroulante */}
        {isMenuOpen && (
            <div className="lg:hidden animate-slide-in">
              <div className="space-y-1 px-4 pb-4 pt-2 bg-gradient-to-r from-[#1D4E34] via-[#286B43] to-[#D27C24] border-t border-white/20">
                {[...leftNavigation, ...rightNavigation].map(item => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-3 py-2 text-base font-bold transition-colors hover:text-yellow-200 drop-shadow-md ${
                            isActive(item.href) ? 'text-yellow-200 bg-white/10 rounded' : 'text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                ))}

                <div className="flex gap-x-4 pt-4 px-3 border-t border-white/10 mt-2 items-center">
                  <a href="https://www.facebook.com/HCMouscron" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/10 rounded-full transition-all">
                    <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="Facebook" className="h-6 w-6" />
                  </a>
                  <a href="https://www.instagram.com/hcmouscron/" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/10 rounded-full transition-all">
                    <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="Instagram" className="h-6 w-6" />
                  </a>
                  <a href="https://www.tiktok.com/@hc.mouscron" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-white/10 rounded-full transition-all flex items-center justify-center">
                    <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
        )}
      </header>
  );
};

export default Header;