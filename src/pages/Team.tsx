import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Attribution images :
const images = [
  "/lovable-uploads/41bb9730-94a9-4c03-9d26-41eec3e20d2a.png", // 1. Gothane
  "/lovable-uploads/c65c089e-74e7-498b-bb79-bfbb16be852f.png",   // 2. JP Fabbri
  "/lovable-uploads/56312c99-84e1-456e-b1a1-0c57fa1fe4d5.png",   // 3. Joaquim
  "/lovable-uploads/fbc8d64b-b67d-4b11-b658-189c6b6cf531.png",   // 4. Laszlo (NEW IMAGE)
  "/lovable-uploads/b44b811f-37de-47a2-ac2a-d4ba2d5b0030.png",   // 5. Lucas
  "/lovable-uploads/365e0e89-3729-4a6f-b74f-c945d205cd46.png",   // 6. Nino
  "/lovable-uploads/f1b2cda2-2794-414e-8253-3598892a0a4b.png",   // 7. Stijn
  "/lovable-uploads/41bb9730-94a9-4c03-9d26-41eec3e20d2a.png",   // 8. Thierry (corriger si besoin)
];

// MAPPING : COMITÉ (ordre modifié)
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

// Remplacement des images pour Laszlo et Thierry :
const entraineursSeniors = [
  {
    name: "Laszlo Baan",
    role: "Coach T1",
    image: "/lovable-uploads/440e2391-e038-4985-b7d5-52736d473196.png", // Nouvelle image uploadée pour Laszlo
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
    image: "/lovable-uploads/8215a282-c4df-45c7-b692-b8b2aa829a6a.png", // 1ère image (Anthony)
  },
  {
    name: "Philippe Julien",
    role: "Coach U16",
    image: "/lovable-uploads/5f0533d7-d3c1-4ae8-a153-7e585203bfc6.png", // 6ème image (Philippe)
  },
  {
    name: "Antoine Lampole",
    role: "Coach U14",
    image: "/lovable-uploads/f29993ab-6757-4d56-a558-b6df36eb2feb.png", // 2ème image (Antoine)
  },
  {
    name: "Lucas Vincent",
    role: "Coach U14",
    image: "/lovable-uploads/e37d82cb-a636-45f7-92fb-8daedae0eb97.png", // 4ème image (Lucas)
  },
  {
    name: "Dorian Derveaux",
    role: "Coach Mini Handball",
    image: "/lovable-uploads/ceeb7c54-23f2-4303-a94f-24a9dbe5f87a.png", // 3ème image (Dorian)
  },
  {
    name: "Nino Mancinone",
    role: "Coach Mini Handball",
    image: "/lovable-uploads/15a18034-95af-45fc-b9f1-9db81e00aeb5.png", // 5ème image (Nino)
  },
];

const categories = [
  { name: "Mini handball", color: "bg-hc-green-light", img: "/lovable-uploads/33033b5b-5d7a-464e-9eb2-7894f00e2b26.png" },
  { name: "U14", color: "bg-hc-green-light", img: "/image.png" },
  { name: "U16", color: "bg-hc-green", img: "/lovable-uploads/faeb26b4-5b82-49e1-8fb0-69a10700de49.png" },
  { name: "U18", color: "bg-hc-green-light", img: "/lovable-uploads/2c5565cf-f45d-4d43-b901-68086906cbad.png" },
  { name: "Seniors", color: "bg-hc-green", img: "/lovable-uploads/a4551830-cf39-4d58-bf31-7325e3117da5.png" },
  { name: "Vétérans / Loisir", color: "bg-hc-orange", img: "/lovable-uploads/3f691e54-6444-4b56-966f-fab9bcea6968.png" }
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
            {/* Ligne 1 */}
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-green-light text-white text-lg font-semibold shadow text-shadow">
                Mini handball
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/lovable-uploads/33033b5b-5d7a-464e-9eb2-7894f00e2b26.png"
                  alt="Équipe Mini handball HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-green-light animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  Mini handball - Saison 2025-2026
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-green-light text-white text-lg font-semibold shadow text-shadow">
                U14
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/image.png"
                  alt="Équipe U14 HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-green-light animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  U14 - Saison 2025-2026
                </span>
              </div>
            </div>

            {/* Ligne 2 */}
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-green text-white text-lg font-semibold shadow text-shadow">
                U16
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/lovable-uploads/faeb26b4-5b82-49e1-8fb0-69a10700de49.png"
                  alt="Équipe U16 HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-green animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  U16 - Saison 2025-2026
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-green-light text-white text-lg font-semibold shadow text-shadow">
                U18
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/lovable-uploads/2c5565cf-f45d-4d43-b901-68086906cbad.png"
                  alt="Équipe U18 HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-green-light animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  U18 - Saison 2025-2026
                </span>
              </div>
            </div>

            {/* Ligne 3 */}
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-green text-white text-lg font-semibold shadow text-shadow">
                Seniors
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/lovable-uploads/a4551830-cf39-4d58-bf31-7325e3117da5.png"
                  alt="Équipe Seniors HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-green animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  Seniors - Saison 2025-2026
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <span className="px-6 py-3 rounded-full bg-hc-orange text-white text-lg font-semibold shadow text-shadow">
                Vétérans / Loisir
              </span>
              <div className="flex flex-col items-center">
                <img
                  src="/lovable-uploads/3f691e54-6444-4b56-966f-fab9bcea6968.png"
                  alt="Équipe Vétérans HC Mouscron"
                  className="w-full max-w-md rounded-2xl shadow-lg border-4 border-hc-orange animate-fade-in"
                />
                <span className="mt-2 text-sm text-muted-foreground italic">
                  Vétérans / Loisir - Saison 2025-2026
                </span>
              </div>
            </div>
          </div>

          {/* Layout Mobile/Tablet - Version originale */}
          <div className="flex flex-col items-center gap-10 lg:hidden">
            {categories.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2 w-full max-w-xl">
                <span
                  className={`px-6 py-3 rounded-full ${c.color} text-white text-lg font-semibold shadow text-shadow`}
                >
                  {c.name}
                </span>
                {"img" in c && c.img ? (
                  <div className="flex flex-col items-center mt-2">
                    <img
                      src={c.img}
                      alt={`Équipe ${c.name} HC Mouscron`}
                      className={`w-full max-w-md rounded-2xl shadow-lg border-4 ${
                        c.name === "Vétérans / Loisir"
                          ? "border-hc-orange"
                          : c.name === "Seniors"
                          ? "border-hc-green"
                          : c.name === "U18"
                          ? "border-hc-green-light"
                          : c.name === "U16"
                          ? "border-hc-green"
                          : c.name === "U14"
                          ? "border-hc-green-light"
                          : c.name === "Mini handball"
                          ? "border-hc-green-light"
                          : "border-gray-300"
                      } animate-fade-in`}
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
        {/* Section Palmarès supprimée */}
      </div>
    </div>
  );
};

export default Team;