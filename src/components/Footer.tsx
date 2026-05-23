import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-600 via-amber-500 to-green-800 border-t shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/7f5485a2-eaa0-4a73-8e50-8de5813ec2f3.png" 
                alt="HC Mouscron logo" 
                className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full bg-white p-1 shadow-lg" 
              />
              <span className="text-xl lg:text-2xl font-bold text-white drop-shadow-lg">HC Mouscron</span>
            </div>
            <p className="text-white max-w-md drop-shadow-md text-base">
              Club de handball passionné basé à Mouscron. Venez partager votre passion du handball dans une ambiance chaleureuse, dynamique et sportive !
            </p>
            <div className="flex gap-x-4 mt-6">
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.facebook.com/HCMouscron" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:bg-white/10 drop-shadow-md p-2 rounded-full"
                >
                  <img src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png" alt="Facebook" className="h-7 w-7" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://www.instagram.com/hcmouscron/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:bg-white/10 drop-shadow-md p-2 rounded-full"
                >
                  <img src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png" alt="Instagram" className="h-7 w-7" />
                </a>
              </Button>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 drop-shadow-md">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/equipe" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Équipe
                </a>
              </li>
              <li>
                <a href="/partenaires" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Partenaires
                </a>
              </li>
              <li>
                <a href="/infos" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Infos pratiques
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-yellow-200 transition-colors drop-shadow-md">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 drop-shadow-md">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-white">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <div className="text-sm drop-shadow-md">
                  <div className="font-medium">Hall Max Lessines</div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Rue+des+Prés+84B,+7700+Mouscron"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-200 transition-colors cursor-pointer"
                  >
                    Rue des Prés 84B, 7700 Mouscron
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-2 text-white">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm drop-shadow-md">+32 (0)467 32 84 24</span>
              </li>
              <li className="flex items-center space-x-2 text-white">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a 
                  href="mailto:handballmouscron@gmail.com"
                  className="text-sm drop-shadow-md hover:text-yellow-200 transition-colors"
                >
                  handballmouscron@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/30">
          <p className="text-center text-sm text-white drop-shadow-md">
            © 2025 HC Mouscron. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;