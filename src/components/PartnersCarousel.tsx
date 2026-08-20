import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // LISTE DES 4 PARTENAIRES MISES À JOUR AVEC LA BANQUE CPH
  const partners = [
    {
      name: 'Crack',
      logo: '/lovable-uploads/d1b8c78d-2adc-4f0c-a684-d108bed1d3c5.png'
    },
    {
      name: 'Fred Elec',
      logo: '/lovable-uploads/f847fff1-a2e3-4717-b1d4-85fe3bebe9f7.png'
    },
    {
      name: 'Acta Security',
      logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png'
    },
    {
      name: 'Banque CPH',
      logo: '/lovable-uploads/cph-banque.png'
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  const handleClick = () => {
    // Scroll to top will be handled by ScrollToTop component
  };

  return (
      <section className="py-12 bg-white border-t border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nos partenaires de confiance
            </h3>
          </div>

          <Link to="/partenaires" className="block group cursor-pointer" onClick={handleClick}>
            <div className="overflow-hidden bg-gradient-to-r from-gray-50 to-white rounded-2xl border-2 border-gray-100 group-hover:border-hc-green transition-colors p-8 shadow-sm group-hover:shadow-md">

              {/* Desktop - Les 5 partenaires alignés proprement en ligne */}
              <div className="hidden md:flex justify-center items-center space-x-6 lg:space-x-8 animate-fade-in">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 transition-all duration-500 ${
                            index === currentIndex
                                ? 'scale-110 opacity-100'
                                : 'scale-100 opacity-60'
                        }`}
                    >
                      <div className="w-36 h-28 lg:w-40 lg:h-32 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-hc-green transition-colors p-3 shadow-sm">
                        <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            loading="lazy"
                            className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                ))}
              </div>

              {/* Mobile - Grille adaptée pour 5 partenaires */}
              <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-500 ${
                            index === currentIndex
                                ? 'scale-105 opacity-100'
                                : 'scale-100 opacity-80'
                        }`}
                    >
                      <div className="w-full h-24 bg-white rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-hc-green transition-colors p-2 shadow-sm">
                        <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            loading="lazy"
                            className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                ))}
              </div>

              <div className="text-center mt-8">
              <span className="text-sm text-hc-green font-bold group-hover:text-hc-orange transition-colors inline-flex items-center gap-1">
                Cliquez pour découvrir tous nos partenaires →
              </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
  );
};

export default PartnersCarousel;