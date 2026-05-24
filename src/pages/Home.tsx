import { Calendar, MapPin, Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import PartnersCarousel from '@/components/PartnersCarousel';

const Home = () => {
  const handleLinkClick = () => {
    // Scroll to top will be handled by ScrollToTop component
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-green-800 via-green-600 to-amber-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('/image.png')"
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/60 via-green-600/50 to-amber-600/60"></div>
        
        <div className="relative flex h-full items-center justify-center px-6">
          <div className="text-center text-white max-w-4xl animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-white drop-shadow-lg">
              HC Mouscron
            </h1>
            <p className="text-xl sm:text-2xl mb-8 font-medium text-white drop-shadow-md">
              Esprit d'équipe • Respect • Convivialité
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-white drop-shadow-md">
              Rejoignez le club de sport le plus accueillant de Mouscron. 
              Découvrez l'esprit d'équipe et la passion du handball dans une ambiance conviviale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" onClick={handleLinkClick}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg w-full sm:w-auto border-2 border-white/20">
                  Nous rejoindre
                </Button>
              </Link>
              <Link to="/equipe" onClick={handleLinkClick}>
                <Button size="lg" variant="outline" className="bg-white text-green-800 hover:bg-green-800 hover:text-white border-2 border-green-800 shadow-lg font-semibold w-full sm:w-auto transition-colors">
                  Découvrir l'équipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <PartnersCarousel />

      {/* Section Terrain de Handball - ULTRA SPECTACULAIRE REFAITE DE A À Z */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-amber-900">
        {/* Terrain de handball en arrière-plan - HORIZONTAL PARFAIT */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/lovable-uploads/Terrain_de_hand_vert.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "rotate(90deg) scale(1.2)"
          }}
        ></div>
        
        {/* Overlays spectaculaires */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-transparent to-amber-900/80"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-green-800/20 to-green-900/60"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 min-h-screen flex flex-col justify-center">
          
          {/* TITRE CENTRAL SPECTACULAIRE */}
          <div className="text-center mb-16 relative z-20">
            <div className="inline-block relative">
              {/* Cercles décoratifs animés */}
              <div className="absolute -inset-8 animate-spin-slow opacity-30">
                <div className="w-32 h-32 border-4 border-dashed border-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute -inset-12 animate-spin-reverse opacity-20">
                <div className="w-40 h-40 border-2 border-dotted border-orange-500 rounded-full"></div>
              </div>
              
              <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 drop-shadow-2xl relative z-10">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  LE HANDBALL
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                  AU HC MOUSCRON
                </span>
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mx-auto max-w-4xl border-2 border-white/20 shadow-2xl">
              <p className="text-2xl sm:text-3xl text-yellow-100 font-bold drop-shadow-lg leading-relaxed">
                🏐 Plus qu'un sport, une passion partagée !
              </p>
              <p className="text-lg text-white/90 mt-4 drop-shadow-md">
                Découvrez pourquoi le handball au HC Mouscron est une expérience unique
              </p>
            </div>
          </div>

          {/* GRILLE SPECTACULAIRE 2x2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 relative z-10">
            
            {/* CARTE 1 - Sport dynamique */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border-4 border-white/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-2xl font-black text-gray-800">
                    Un sport dynamique et spectaculaire
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Le handball est un sport rythmé et captivant, tant pour les joueurs que pour les spectateurs. 
                  Il repose sur des enchaînements rapides et une participation active de tous les joueurs en attaque comme en défense, 
                  dans un esprit de respect et de fair-play.
                </p>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-orange-200 group-hover:border-orange-400 transition-colors">
                  <img
                    src="/lovable-uploads/33033b5b-5d7a-464e-9eb2-7894f00e2b26.png"
                    alt="Mini handball en action"
                    className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Mini Handball
                  </div>
                </div>
              </div>
            </div>

            {/* CARTE 2 - Esprit d'équipe */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border-4 border-white/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-2xl font-black text-gray-800">
                    Un esprit d'équipe fort et soudé
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Chaque joueur a un rôle essentiel, sans poste "mineur". 
                  Les rotations fréquentes renforcent la coopération et valorisent tous les profils physiques. 
                  La réussite repose sur le collectif.
                </p>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-green-200 group-hover:border-green-400 transition-colors">
                  <img
                    src="/lovable-uploads/a4551830-cf39-4d58-bf31-7325e3117da5.png"
                    alt="Équipe seniors unie"
                    className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Équipe Seniors
                  </div>
                </div>
              </div>
            </div>

            {/* CARTE 3 - Convivialité */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border-4 border-white/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-2xl font-black text-gray-800">
                    Convivialité et respect
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Le HC Mouscron accueille filles et garçons dans une ambiance familiale. 
                  Débutants ou confirmés s'y entraînent sans pression, dans un climat de respect et de convivialité.
                </p>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-amber-200 group-hover:border-amber-400 transition-colors">
                  <img
                    src="/lovable-uploads/faeb26b4-5b82-49e1-8fb0-69a10700de49.png"
                    alt="U16 conviviale"
                    className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Équipe U16
                  </div>
                </div>
              </div>
            </div>

            {/* CARTE 4 - Sport accessible */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border-4 border-white/50 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-2xl font-black text-gray-800">
                    En été comme en hiver...
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Le handball se pratique toute l'année, quelle que soit la météo. 
                  Les entraînements ont lieu en intérieur au Hall Max Lessines, 
                  équipé d'une cafétéria conviviale avec wifi pour les parents.
                </p>
                <div className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-blue-200 group-hover:border-blue-400 transition-colors">
                  <img
                    src="/lovable-uploads/2c5565cf-f45d-4d43-b901-68086906cbad.png"
                    alt="U18 unie"
                    className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Équipe U18
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION SPORT ACCESSIBLE */}
          <div className="text-center mb-12 relative z-10">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mx-auto max-w-4xl border-2 border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-amber-400 rounded-full mr-3 animate-pulse"></div>
                <h3 className="text-3xl font-black text-white">
                  Un sport accessible à tous
                </h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                Le club, en tant qu'ASBL, vise à rendre le handball abordable : 
                cotisation annuelle modérée (max. 150 € pour les jeunes), 
                aides financières possibles (Chèque Sport, mutualités, employeurs), 
                et paiements échelonnés jusqu'à trois mois.
              </p>
            </div>
          </div>

          {/* CALL TO ACTION SPECTACULAIRE */}
          <div className="text-center relative z-20">
            <div className="relative inline-block">
              {/* Effets de particules */}
              <div className="absolute -top-8 -left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-12 -right-6 w-3 h-3 bg-orange-500 rounded-full animate-ping delay-500"></div>
              <div className="absolute -bottom-8 -left-6 w-5 h-5 bg-green-400 rounded-full animate-ping delay-1000"></div>
              <div className="absolute -bottom-12 -right-8 w-3 h-3 bg-amber-400 rounded-full animate-ping delay-1500"></div>
              
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 p-3 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="bg-white/98 backdrop-blur-xl p-10 rounded-3xl text-center border-4 border-white/50">
                  <h2 className="text-4xl font-black mb-4">
                    <span className="bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                      Pratiquer le handball au HC Mouscron,
                    </span>
                    <br />
                    <span className="text-gray-800">
                      c'est plus qu'un sport !
                    </span>
                  </h2>
                  <p className="text-xl italic text-gray-700 mb-8 font-bold">
                    ✨ Possibilité de faire plusieurs séances d'essai sans engagement ✨
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
                      <p className="font-black text-xl">🏟️ HALL MAX LESSINES</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Hall+Max+Lessines,+Rue+des+Prés+84B,+7700+Mouscron,+Belgium"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-100 text-lg hover:text-yellow-200 transition-colors cursor-pointer"
                      >
                        RUE DES PRÉS 84B, MOUSCRON
                      </a>
                    </div>
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
                      <p className="font-black text-xl">
                        <a 
                          href="mailto:handballmouscron@gmail.com"
                          className="hover:text-yellow-200 transition-colors"
                        >
                          📧 HANDBALLMOUSCRON
                        </a>
                      </p>
                      <p className="text-orange-100 text-lg">@GMAIL.COM</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/contact" onClick={handleLinkClick}>
                      <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white shadow-2xl border-4 border-white/50 px-10 py-4 rounded-2xl text-xl font-black transform hover:scale-110 transition-all">
                        🏐 Nous rejoindre
                      </Button>
                    </Link>
                    <Link to="/infos" onClick={handleLinkClick}>
                      <Button size="lg" variant="outline" className="bg-white border-4 border-amber-500 text-amber-700 hover:bg-amber-600 hover:text-white shadow-2xl px-10 py-4 rounded-2xl text-xl font-black transform hover:scale-110 transition-all">
                        📋 Nos tarifs
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Photos Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-amber-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
            Nos équipes en action
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="relative group">
              <img src="/lovable-uploads/33033b5b-5d7a-464e-9eb2-7894f00e2b26.png" alt="Mini handball HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group">
              <img src="/lovable-uploads/1ea96fdc-8535-4f8b-a3f9-b4f3755f6633.png" alt="U14 HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group">
              <img src="/lovable-uploads/faeb26b4-5b82-49e1-8fb0-69a10700de49.png" alt="U16 HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group">
              <img src="/lovable-uploads/2c5565cf-f45d-4d43-b901-68086906cbad.png" alt="U18 HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group">
              <img src="/lovable-uploads/a4551830-cf39-4d58-bf31-7325e3117da5.png" alt="Seniors HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group">
              <img src="/lovable-uploads/3f691e54-6444-4b56-966f-fab9bcea6968.png" alt="Vétérans HC Mouscron" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <div className="absolute inset-0 bg-green-800/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="relative group flex items-center justify-center bg-gradient-to-br from-green-100 to-amber-100 rounded-lg shadow-lg">
              <Link to="/equipe" className="text-center p-6" onClick={handleLinkClick}>
                <Button size="lg" className="bg-green-800 hover:bg-amber-600 text-white shadow-lg border-2 border-white/20">
                  Découvrir l'équipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-r from-green-800 via-green-600 to-amber-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-white drop-shadow-lg">
              Rejoignez-nous !
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white drop-shadow-md">
              Que vous soyez débutant ou expérimenté, jeune ou adulte, 
              il y a une place pour vous au HC Mouscron.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/infos" onClick={handleLinkClick}>
                <Button size="lg" variant="secondary" className="bg-white text-green-800 hover:bg-green-800 hover:text-white shadow-lg font-semibold w-full sm:w-auto border-2 border-green-800 transition-colors">
                  Découvrir nos tarifs
                </Button>
              </Link>
              <Link to="/contact" onClick={handleLinkClick}>
                <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white hover:text-green-800 shadow-lg font-semibold w-full sm:w-auto border-2 border-white">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;