import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import StaffContacts from "@/components/contact/StaffContacts";
import MapSection from "@/components/contact/MapSection";
import SocialMediaLinks from "@/components/contact/SocialMediaLinks";

const Contact = () => {

  // Coordonnées à jour : synchronisées avec le secrétariat
  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+32 (0)467 32 84 24"],
      color: "text-hc-green"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["secretariat.handballmouscron@gmail.com", "Réponse rapide par email"],
      color: "text-hc-orange"
    },
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Hall Max Lessines", "Rue des Prés 84B, 7700 Mouscron"],
      color: "text-hc-green"
    }
  ];

  // Staff aligné avec la page Équipe, avec la boîte mail du secrétariat du club
  const staff = [
    {
      name: "David Macarez",
      role: "Secrétaire",
      phone: "+32 (0)467 32 84 24",
      email: "secretariat.handballmouscron@gmail.com"
    },
    {
      name: "Damien Cockenpot",
      role: "Trésorier",
      phone: "+32 (0)467 32 84 24",
      email: "secretariat.handballmouscron@gmail.com"
    },
    {
      name: "Joaquim Vercruysse",
      role: "Trésorier",
      phone: "+32 (0)467 32 84 24",
      email: "secretariat.handballmouscron@gmail.com"
    },
  ];

  return (
      <div className="w-full py-8 bg-gradient-to-br from-hc-green/80 via-white to-hc-orange/70">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section - LOGO SUPPRIMÉ POUR ÉVITER LE DOUBLON */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-hc-green sm:text-5xl mb-6 drop-shadow">
              Contactez-nous
            </h1>
            <p className="text-xl text-hc-orange max-w-3xl mx-auto">
              Une question ? Envie de nous rejoindre ? Notre équipe vous répond rapidement pour tout renseignement sur le club ou le handball à Mouscron !
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <section>
              <ContactForm />
            </section>

            {/* Contact Info, Staff, Map, Social, tout dans l'ordre */}
            <section className="space-y-8">
              <ContactInfoCards />
              <StaffContacts />
              <MapSection />
              <SocialMediaLinks />
            </section>
          </div>
        </div>
      </div>
  );
};

export default Contact;