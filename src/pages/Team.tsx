import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// MAPPING : COMITÉ
const bureau = [
  {
    name: "Damien Cockenpot",
    role: "Président",
    image: "/lovable-uploads/ec06dcff-f3e5-41b6-b6bc-eea0263fc2bb.png",
  },
  {
    name: "David Macarez",
    role: "Secrétaire",
    image: "/lovable-uploads/cf412527-37a3-4237-aa2e-56a2ba75f23d.png",
  },
  {
    name: "Joaquim Vercruysse",
    role: "Trésorier",
    image: "/lovable-uploads/6af96ea0-a23d-47cd-b382-99a95c2e1f29.png",
  },
  {
    name: "Gothane Dhondt",
    role: "Organisateur événementiel sportif",
    image: "/lovable-uploads/a354ce54-ad9c-4fbb-b2df-46b56a89e38a.png",
  },
  {
    name: "Jean Philippe Fabbri",
    role: "Logistique",
    image: "/lovable-uploads/559c316a-dff9-4e14-bf45-28f2dee1e526.png",
  },
];

const entraineursSeniors = [
  {
    name: "Laszlo Baan",
    role: "Coach T1",
    image: "/lovable-uploads/440e2391-e038-4985-b7d5-52736d473196.png",
  },
  {
    name: "Thierry Vincent",
    role: "Coach T2",
    image: "/lovable-uploads/93f3a0fb-2b5f-470d-a62f-444b94be5fe3.png",
  },
];

const entraineursJeunes = [
  {
    name: "Anthony Delaby",
    role: "Coach U18",
    image: "/lovable-uploads/8215a282-c4df-45c7-b692-b8b2aa829a6a.png",
  },
  {
    name: "Philippe Julien",
    role: "Coach U16",
    image: "/lovable-uploads/5f0533d7-d3c1-4ae8-a153-7e585203bfc6.png",
  },
  {
    name: "Antoine Lampole",
    role: "Coach U14",
    image: "/lovable-uploads/f29993ab-6757-4d56-a558-b6df36eb2feb.png",
  },
  {
    name: "Lucas Vincent",
    role: "Coach U14",
    image: "/lovable-uploads/e37d82cb-a636-45f7-92fb-8daedae0eb97.png",
  },
  {
    name: "Dorian Derveaux",
    role: "Coach Mini Handball",
    image: "/lovable-uploads/ceeb7c54-23f2-4303-a94f-24a9dbe5f87a.png",
  },
  {
    name: "Nino Mancinone",
    role: "Coach Mini Handball",
    image: "/lovable-uploads/15a18034-95af-45fc-b9f1-9db81e00aeb5.png",
  },
];

// MAPPING DES ÉQUIPES (Centralisé pour Mobile et Desktop)
const categories = [
  {
    name: "Mini handball",
    color: "bg-hc-green-light",
    borderColor: "border-hc-green-light",
    img: "/lovable-uploads/WhatsApp_Image_2026-05-09_at_22.07.47 copy.jpeg"
  },
  {
    name: "U14",
    color: "bg-hc-green-light",
    borderColor: "border-hc-green-light",
    img: "/lovable-uploads/WhatsApp_Image_2026-04-27_at_10.58.05b copy.jpeg"
  },
  {
    name: "U16",
    color: "bg-hc-green",
    borderColor: "border-hc-green",
    img: "/lovable-uploads/WhatsApp_Image_2025-11-30_at_14.59.44b copy.jpeg"
  },
  {
    name: "U18",
    color: "bg-hc-green-light",
    borderColor: "border-hc-green-light",
    img: "/lovable-uploads/WhatsApp_Image_2026-04-22_at_21.43.51 copy.jpeg"
  },
  {
    name: "Seniors",
    color: "bg-hc-green",
    borderColor: "border-hc-green",
    img: "/lovable-uploads/WhatsApp_Image_2025-10-01_at_06.45.20 copy.jpeg"
  },
  {
    name: "Vétérans / Loisir",
    color: "bg-hc-orange",
    borderColor: "border-hc-orange",
    img: "/lovable-uploads/3f691e54-6444-4b56-966f-fab9bcea6968.png"
  }
];

const Team = () => {
  return (
      <div className="w-full py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Notre équipe
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez le staff technique et les catégories qui font la force du HC Mouscron,
              unis par la passion du handball et l'esprit d'équipe.
            </p>
          </div>

          {/* Staff Technique - Comité */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-hc-green">Comité</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
              {bureau.map((member, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <Badge className="bg-hc-orange text-white mx-auto">
                        {member.role}
                      </Badge>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          </section>

          {/* Entraîneurs Seniors */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-hc-green">
              Entraîneurs Seniors
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {entraineursSeniors.map((coach, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                        <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-lg">{coach.name}</CardTitle>
                      <Badge className="bg-hc-green text-white mx-auto">
                        {coach.role}
                      </Badge>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          </section>

          {/* Entraîneurs Jeunes et Mini handball */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-hc-green">
              Entraîneurs Jeunes & Mini handball
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {entraineursJeunes.map((coach, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                        <img src={coach.image} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <CardTitle className="text-lg">{coach.name}</CardTitle>
                      <Badge className="bg-hc-green-light text-white mx-auto">
                        {coach.role}
                      </Badge>
                    </CardHeader>
                  </Card>
              ))}
            </div>
          </section>

          {/* Nos équipes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-hc-green">
              Nos équipes
            </h2>

            {/* Layout Desktop 2x3 */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:max-w-6xl lg:mx-auto mb-16">
              {categories.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-4">
                <span className={`px-6 py-3 rounded-full ${c.color} text-white text-lg font-semibold shadow text-shadow`}>
                  {c.name}
                </span>
                    <div className="flex flex-col items-center">
                      <img
                          src={c.img}
                          alt={`Équipe ${c.name} HC Mouscron`}
                          className={`w-full max-w-md rounded-2xl shadow-lg border-4 ${c.borderColor} animate-fade-in`}
                      />
                      <span className="mt-2 text-sm text-muted-foreground italic">
                    {c.name} - Saison 2025-2026
                  </span>
                    </div>
                  </div>
              ))}
            </div>

            {/* Layout Mobile/Tablet */}
            <div className="flex flex-col items-center gap-10 lg:hidden">
              {categories.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 w-full max-w-xl">
                <span className={`px-6 py-3 rounded-full ${c.color} text-white text-lg font-semibold shadow text-shadow`}>
                  {c.name}
                </span>
                    {c.img ? (
                        <div className="flex flex-col items-center mt-2">
                          <img
                              src={c.img}
                              alt={`Équipe ${c.name} HC Mouscron`}
                              className={`w-full max-w-md rounded-2xl shadow-lg border-4 ${c.borderColor} animate-fade-in`}
                          />
                          <span className="mt-2 text-sm text-muted-foreground italic">
                      {c.name} - Saison 2025-2026
                    </span>
                        </div>
                    ) : null}
                  </div>
              ))}
            </div>
          </section>
        </div>
      </div>
  );
};

export default Team;