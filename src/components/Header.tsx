import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Équipe', href: '/equipe' },
    { name: 'Partenaires', href: '/partenaires' },
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
          {navigation.slice(0, 2).map(item => (
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

        {/* Logo centré avec fond blanc fin */}
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
        <div className="hidden lg:flex lg:gap-x-8 lg:flex-1 lg:justify-end lg:items-center">
          <div className="flex gap-x-8">
            {navigation.slice(2).map(item => (
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
          
          {/* Social Links */}
          <div className="flex gap-x-4 ml-6">
            <Button variant="ghost" size="sm" asChild>
              <a 
                href="https://www.facebook.com/HCMouscron" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-white hover:bg-white/20 hover:scale-110 drop-shadow-md p-2 rounded-full transition-all duration-300"
              >
                <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="Facebook" className="h-10 w-10" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a 
                href="https://www.instagram.com/hcmouscron/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:bg-white/20 hover:scale-110 drop-shadow-md p-2 rounded-full transition-all duration-300" 
                aria-label="Instagram"
              >
                <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="Instagram" className="h-10 w-10" />
              </a>
            </Button>
          </div>
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
            {navigation.map(item => (
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
            <div className="flex gap-x-4 px-3 py-2">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.facebook.com/HCMouscron" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:bg-white/20 hover:scale-110 drop-shadow-md p-2 rounded-full transition-all duration-300" 
                  aria-label="Facebook"
                >
                  <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="Facebook" className="h-8 w-8" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.instagram.com/hcmouscron/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:bg-white/20 hover:scale-110 drop-shadow-md p-2 rounded-full transition-all duration-300" 
                  aria-label="Instagram"
                >
                  <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="Instagram" className="h-8 w-8" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;