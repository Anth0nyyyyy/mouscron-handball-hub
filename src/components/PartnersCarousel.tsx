import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
      name: 'Hollebeke', 
      logo: '/lovable-uploads/3e0d607f-5f42-442c-927b-96d9671ee3cf.png'
    },
    { 
      name: 'Acta Security', 
      logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png'
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
          <div className="overflow-hidden bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-100 group-hover:border-green-600 transition-colors p-8">
            {/* Desktop - 4 partenaires en ligne */}
            <div className="hidden md:flex justify-center items-center space-x-12 animate-fade-in">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    index === currentIndex 
                      ? 'scale-110 opacity-100' 
                      : 'scale-100 opacity-60'
                  }`}
                >
                  <div className="w-40 h-32 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-green-600 transition-colors p-2">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile - 2x2 grid */}
            <div className="md:hidden grid grid-cols-2 gap-6 animate-fade-in">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentIndex 
                      ? 'scale-105 opacity-100' 
                      : 'scale-100 opacity-80'
                  }`}
                >
                  <div className="w-full h-24 bg-white rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-green-600 transition-colors p-2">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <span className="text-sm text-green-600 font-medium group-hover:text-amber-600 transition-colors">
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