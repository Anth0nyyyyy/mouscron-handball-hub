import { useState } from 'react';
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
    { name: 'Contact', href: '/contact' },
    { name: 'Coachs', href: '/espace-coachs' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-green-800 via-green-600 to-amber-600 backdrop-blur shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Navigation gauche - Desktop */}
        <div className="hidden lg:flex lg:gap-x-8 lg:flex-1 lg:justify-start">
          {leftNavigation.map(item => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`text-white font-bold text-lg hover:text-yellow-200 transition-colors drop-shadow-md px-2 py-1 rounded ${
                isActive(item.href) ? 'text-yellow-200 bg-white/10' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logo centré */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img 
              src="/HCM_Logo_2025_fond_transparent.png" 
              alt="HC Mouscron logo" 
              className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full shadow-xl bg-white p-0.5" 
            />
          </Link>
        </div>

        {/* Navigation droite - Desktop */}
        <div className="hidden lg:flex lg:gap-x-8 lg:flex-1 lg:justify-end">
          {rightNavigation.map(item => (
            <Link 
              key={item.name} 
              to={item.href} 
              className={`text-white font-bold text-lg hover:text-yellow-200 transition-colors drop-shadow-md px-2 py-1 rounded ${
                isActive(item.href) ? 'text-yellow-200 bg-white/10' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden animate-slide-in">
          <div className="space-y-1 px-4 pb-4 pt-2 bg-gradient-to-r from-green-800 via-green-600 to-amber-600 border-t border-white/20">
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;