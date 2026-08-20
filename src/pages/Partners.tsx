import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Partners = () => {
  // LISTE DES 4 PARTENAIRES ACTUELS
  const partners = [
    {
      name: 'Crack',
      logo: '/lovable-uploads/d1b8c78d-2adc-4f0c-a684-d108bed1d3c5.png',
      website: 'https://www.crack.be/fr/',
      description: 'Meubles & Cuisines - Votre partenaire de confiance'
    },
    {
      name: 'Fred Elec',
      logo: '/lovable-uploads/f847fff1-a2e3-4717-b1d4-85fe3bebe9f7.png',
      website: 'https://www.fred-electrique.com/fr/accueil',
      description: 'Solutions électriques professionnelles'
    },
    {
      name: 'Acta Security',
      logo: '/lovable-uploads/919c9f3d-5770-47d1-8dcf-445e17bb9d18.png',
      website: 'https://www.acta-security.be/',
      description: 'Solutions de sécurité innovantes'
    },
    {
      name: 'Banque CPH',
      logo: '/lovable-uploads/cph-banque.png',
      website: 'https://www.cph.be/',
      description: 'Banque & Assurances - Partenaire financier de proximité'
    }
  ];

  const handleLinkClick = () => {
    // Scroll to top will be handled by ScrollToTop component
  };

  return (
      <div className="w-full min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
        {/* Hero Section avec les Couleurs Officielles (#1D4E34 -> #286B43 -> #D27C24) */}
        <section className="py-20 bg-gradient-to-r from-[#1D4E34] via-[#286B43] to-[#D27C24] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D4E34]/30 to-[#D27C24]/30"></div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 drop-shadow-2xl text-shadow-lg">
              <span className="block text-yellow-200 text-shadow-lg">NOS</span>
              <span className="block text-shadow-lg text-slate-50">PARTENAIRES</span>
            </h1>
            <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 mx-auto max-w-4xl border border-white/30 shadow-2xl">
              <p className="text-2xl sm:text-3xl text-yellow-100 font-bold drop-shadow-lg leading-relaxed">
                🤝 Ils nous font confiance et participent à la réussite du club !
              </p>
              <p className="text-lg text-yellow-100 mt-4 drop-shadow-md">
                Partenariats solides • Confiance mutuelle • Soutien précieux
              </p>
            </div>
          </div>
        </section>

        {/* Partners Grid (4 Colonnes complètes pour remplir tout l'espace proprement) */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm mb-12">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
                  {partners.map((partner, index) => (
                      <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-2 hover:border-hc-green flex flex-col justify-between">
                        <CardContent className="p-6 text-center flex flex-col justify-between h-full">
                          <div>
                            <div className="mb-6 flex justify-center">
                              <div className="w-full h-36 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200 group-hover:border-hc-green transition-colors p-3">
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    loading="lazy"
                                    className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {partner.name}
                            </h3>
                            <p className="text-gray-600 mb-6 text-xs sm:text-sm leading-relaxed">
                              {partner.description}
                            </p>
                          </div>
                          <Button asChild className="bg-hc-green hover:bg-hc-orange text-white w-full group-hover:scale-105 transition-transform font-semibold mt-auto">
                            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              Visiter le site
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action avec Dégradé Officiel (#D27C24 -> #E58C33 -> #1D4E34) */}
        <section className="py-16 bg-gradient-to-r from-[#D27C24] via-[#E58C33] to-[#1D4E34]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
              Vous souhaitez devenir partenaire ?
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
              Rejoignez nos partenaires et soutenez le handball à Mouscron.
              Contactez-nous pour découvrir nos offres de partenariat.
            </p>
            <Button asChild size="lg" className="bg-white text-hc-green hover:bg-gray-100 font-semibold shadow-lg">
              <Link to="/contact" onClick={handleLinkClick}>
                Nous contacter
              </Link>
            </Button>
          </div>
        </section>
      </div>
  );
};

export default Partners;