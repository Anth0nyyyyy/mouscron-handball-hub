import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, MapPin, Euro, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// NOUVEAUX HORAIRES D'ENTRAÎNEMENT MIS À JOUR EN DÉTAIL
const trainingSchedule = [
  {
    category: "Mini-handball (né(e)s en 2015+)",
    day: "Tous les samedis (Dès le 05/09)",
    time: "10:30 - 12:00"
  },
  {
    category: "U16 (né(e)s en 2011 et 2012)",
    day: "Tous les lundis (Dès le 17/08)",
    time: "17:30 - 18:45"
  },
  {
    category: "U16 (né(e)s en 2011 et 2012)",
    day: "Tous les vendredis (Dès le 17/08)",
    time: "17:30 - 19:00"
  },
  {
    category: "U18 (né(e)s en 2008 à 2010)",
    day: "Tous les lundis (Dès le 17/08)",
    time: "18:30 - 20:00"
  },
  {
    category: "U18 (né(e)s en 2008 à 2010)",
    day: "Tous les vendredis (Dès le 17/08)",
    time: "17:30 - 19:00"
  },
  {
    category: "Seniors (Début Août)",
    day: "Mercredis 5 et 12 Août",
    time: "18:30 - 20:00"
  },
  {
    category: "Seniors (Début Août)",
    day: "Vendredis 7 et 14 Août",
    time: "18:30 - 20:00"
  },
  {
    category: "Seniors (Rentrée dès le 19/08)",
    day: "Tous les mercredis",
    time: "19:30 - 21:00"
  },
  {
    category: "Seniors (Rentrée dès le 19/08)",
    day: "Tous les vendredis",
    time: "19:00 - 20:30"
  },
  {
    category: "Équipe Loisir",
    day: "Tous les vendredis (Dès le 21/08)",
    time: "20:30 - 21:45"
  }
];

const registrationSteps = [
  {
    step: 1,
    title: "Contactez-nous",
    description: "Par téléphone, email ou via notre formulaire de contact"
  },
  {
    step: 2,
    title: "Séance d'essai",
    description: "Venez essayer gratuitement pendant 3 entraînements"
  },
  {
    step: 3,
    title: "Inscription",
    description: "Remplissez le formulaire d'inscription et fournissez les documents"
  },
  {
    step: 4,
    title: "Paiement",
    description: "Réglez la cotisation annuelle"
  }
];

// NOUVELLE GRILLE TARIFAIRE DES COTISATIONS POUR LA SAISON
const tarifs = [
  {
    label: "Mini-handball (né(e)s en 2015 et après)",
    price: "100 €"
  },
  {
    label: "Joueurs Loisir",
    price: "100 €"
  },
  {
    label: "Juniors (né(e)s à partir de 2009)",
    price: "165 €"
  },
  {
    label: "Séniors (né(e)s en 2008 et avant)",
    price: "220 €"
  },
  {
    label: "Transfert international (> 16 ans)",
    price: "220 € + 150 € (caution)"
  }
];

// MAPPING DES NOUVEAUX LIENS D'AGENDAS
const calendars = [
  {
    label: "U16",
    url: "https://calendar.google.com/calendar/render?cid=98cb0fbe3bdfc2fd4eb65887b777f3c2adde03decaf3788157877eef0f2d90ff%40group.calendar.google.com"
  },
  {
    label: "U18",
    url: "https://calendar.google.com/calendar/render?cid=02e4b51b6158592872bd32c184e0d05fd75480ee1893fc293ab3cbc5c8f1cc13%40group.calendar.google.com"
  },
  {
    label: "Séniors PBH",
    url: "https://calendar.google.com/calendar/render?cid=769ad348db76a4e8894f0d4a68d95cee19bf16fe8f0106699e38fc325093c59d%40group.calendar.google.com"
  },
  {
    label: "Séniors D1 LFH",
    url: "https://calendar.google.com/calendar/render?cid=fdee024de7152bc6a1cb0223655f4ffdee60ccbed3176e1f519629784de20e4a%40group.calendar.google.com"
  }
];

const Info = () => {
  const { hash } = useLocation();

  // Défilement automatique vers l'ancre active (#tarifs)
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [hash]);

  return (
      <div className="w-full py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
              Informations pratiques
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tout ce que vous devez savoir pour nous rejoindre : horaires, lieu d'entraînement et procédure d'inscription.
            </p>
          </div>

          {/* Location & Venue */}
          <section className="mb-16">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-hc-green text-2xl">
                  <MapPin className="h-6 w-6" />
                  Notre salle d'entraînement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
                  {/* Infos salle */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-4">Hall Max Lessines de Mouscron</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>📍 Rue des Prés 84B, 7700 Mouscron</p>
                      <p>🚗 Parking gratuit sur place</p>
                      <p>🚿 Vestiaires avec douches</p>
                      <p>☕ Cafétéria avec Wifi ouverte les soirs d'entraînement</p>
                    </div>
                  </div>
                  {/* Image du hall */}
                  <div className="flex-1 flex items-center justify-center">
                    <img src="/lovable-uploads/4842a4f3-cca0-44aa-bd40-458e7b9d1cf7.png" alt="Hall Max Lessines - Salle omnisports de Mouscron" className="h-64 w-full object-cover rounded-lg shadow-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Training Schedule */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-hc-green">
              Horaires d'entraînement
            </h2>
            <p className="text-center text-muted-foreground mb-12">Saison 2026 - 2027</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trainingSchedule.map((training, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge className="bg-hc-orange text-white mb-2">
                            {training.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {training.day}
                          </div>
                          <div className="flex items-center gap-2 text-lg font-semibold">
                            <Clock className="h-4 w-4" />
                            {training.time}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </section>

          {/* Agendas Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-hc-orange">Agendas</h2>
            <div className="text-center mb-8">
              <a
                  href="https://www.handballbelgium.be/index.php/competition/vhv-competitions/?season_id=5&organization_id=2&start_date=2025-07-21&end_date=2025-07-27&club_id=112&serie_tab=fullCalendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-hc-green text-white px-6 py-3 rounded-lg hover:bg-hc-green/80 transition-colors font-medium inline-block shadow-md"
              >
                Calendrier du club 📅
              </a>
            </div>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {calendars.map(cal => (
                  <div key={cal.label} className="flex flex-col items-center bg-hc-green-light/10 p-6 rounded-lg shadow-sm">
                    <div className="text-xl font-semibold text-hc-green mb-4 text-center">{cal.label}</div>
                    <a href={cal.url} target="_blank" rel="noopener noreferrer" className="bg-hc-orange text-white px-4 py-2 rounded hover:bg-hc-orange/80 transition-colors font-medium mt-auto shadow-sm">
                      Ouvrir l'agenda
                    </a>
                  </div>
              ))}
            </div>
            <div className="text-center mt-6 text-muted-foreground text-sm">
              Accès direct aux calendriers Google des matchs pour chaque catégorie.
            </div>
          </section>

          {/* SECTION TARIFS & COUPS DE POUCES FINANCIERS */}
          <section className="mb-16" id="tarifs">
            <h2 className="text-3xl font-bold text-center mb-12 text-hc-green">
              Tarifs & Cotisations
            </h2>
            <div className="max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-2xl bg-white/90 border shadow-lg space-y-6">

              {/* Grille des tarifs */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {tarifs.map((t, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center bg-hc-green-light/10 rounded-xl p-4 shadow-sm border border-hc-green-light/10">
                      <div className="text-sm font-semibold text-hc-green mb-1 text-center">{t.label}</div>
                      <div className="text-2xl font-bold text-hc-orange mb-1">{t.price}</div>
                    </div>
                ))}
              </div>

              {/* ENCADRÉ COUPS DE POUCES FINANCIERS & AIDES */}
              <div className="bg-hc-orange/10 p-6 rounded-xl shadow-sm border border-hc-orange/20 text-left space-y-4">
                <h3 className="text-lg font-bold text-hc-orange flex items-center gap-2">
                  🎁 Coups de pouces financiers & Aides
                </h3>

                {/* 1. Ristourne Fratries */}
                <div className="space-y-1">
                  <p className="text-gray-800 font-bold text-sm">
                    ➔ 10 % de ristourne accordée par le club pour les fratries :
                  </p>
                  <p className="text-xs text-muted-foreground">
                    La cotisation la plus élevée est due normalement, les suivantes bénéficient d’une remise de 10 %.
                  </p>
                  <div className="bg-white/80 p-3 rounded-lg space-y-1 border border-white text-xs text-gray-700 mt-2">
                    <p className="font-semibold text-gray-900">Exemples :</p>
                    <p>• 1 Senior (220 €) + 1 Junior (165 € - 10% =&gt; <strong>148,50 €</strong>)</p>
                    <p>• 1 Junior (165 €) + 1 Junior (165 € - 10% =&gt; <strong>148,50 €</strong>) + 1 Mini-handball (100 € - 10% =&gt; <strong>90 €</strong>)</p>
                  </div>
                </div>

                {/* 2. Paiement en 3 fois */}
                <div className="pt-3 border-t border-hc-orange/15">
                  <p className="text-gray-800 font-bold text-sm">
                    ➔ Paiement échelonné en 3 fois :
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pour ceux qui le souhaiteraient, il est tout à fait possible de régler la cotisation en 3 fois. Il suffit d’en faire la demande auprès du comité afin de planifier au mieux les virements.
                  </p>
                </div>

                {/* 3. Chèque Sport Ville de Mouscron */}
                <div className="pt-3 border-t border-hc-orange/15">
                  <p className="text-gray-800 font-bold text-sm">
                    ➔ Chèque Sport (Aide de la Ville de Mouscron) :
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Le Chèque Sport, aide de la Ville de Mouscron, soumise à conditions, est également disponible :
                    {" "}
                    <a
                        href="https://www.mouscron.be/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hc-green font-bold hover:underline"
                    >
                      👉 Lien vers le site de la Ville de Mouscron
                    </a>
                  </p>
                </div>

                {/* 4. Mutualités & Employeurs */}
                <div className="pt-3 border-t border-hc-orange/15">
                  <p className="text-gray-800 font-bold text-sm">
                    ➔ Mutualités & Employeurs :
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    N’oubliez pas également les avantages offerts par les mutualités ou vos employeurs pour la pratique d’un sport !
                  </p>
                </div>
              </div>

              {/* Encadré Virement Bancaire */}
              <div className="bg-hc-green/10 p-4 rounded-xl shadow-sm border border-hc-green/20 text-center">
                <div className="font-medium mb-1">
                  <Euro className="inline-block mr-2 h-5 w-5 text-hc-green" /> Règlement par virement bancaire :
                </div>
                <div className="font-mono text-lg text-hc-green font-semibold">
                  BE07 1261 1084 1566
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Merci d'indiquer le nom et prénom du joueur en communication.<br />
                  Paiement avant le <span className="font-semibold text-hc-orange">30/09/26</span>
                </div>
              </div>

              {/* Encadré Transfert International */}
              <div className="bg-amber-500/10 p-6 rounded-xl shadow-sm border border-amber-500/20 text-left space-y-2">
                <h3 className="text-sm font-bold text-amber-800">
                  ⚠️ Procédure de Transfert International (Joueurs de +16 ans) **
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Un joueur est soumis à la procédure de transfert international lorsqu'il a été affilié, au cours des deux années précédentes, à un club relevant d'une fédération étrangère (hors Belgique), qu'il est âgé de plus de 16 ans et qu'il ne réside pas en Belgique en qualité d'élève ou d'étudiant.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Compte tenu des frais engendrés pour le club par cette procédure, un <strong>chèque de caution de 150 €</strong> (en plus de la cotisation de 220 €) est demandé au nouveau membre afin de garantir son engagement pour l'ensemble de la saison. Ce chèque lui sera entièrement restitué à l'issue de celle-ci.
                </p>
              </div>

              <div className="italic text-muted-foreground text-xs text-center pt-2">
                Les montants des cotisations peuvent être revus à la baisse en cas d'arrivée tardive en cours de saison,
                sur décision du comité du club.
              </div>
            </div>
          </section>

          {/* Registration Process */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-hc-green">
              Procédure d'inscription
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {registrationSteps.map((step, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-hc-green rounded-full flex items-center justify-center text-white font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Téléchargements utiles */}
          <section className="mt-8 mb-24">
            <h2 className="text-3xl font-bold text-center mb-8 text-hc-orange">
              Téléchargements utiles
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-4">
              <a href="https://www.handballbelgium.be/wp-content/uploads/2025/07/Affiliation-Demande.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                <button className="bg-hc-orange hover:bg-hc-orange/80 text-white font-medium px-6 py-3 rounded-lg shadow transition-all w-full md:w-auto">
                  Télécharger la fiche d'affiliation (PDF)
                </button>
              </a>
              <a href="https://www.handballbelgium.be/wp-content/uploads/2025/07/Trasnfert-Formulaire-demande-transfert-international-2025-2026.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                <button className="bg-hc-green hover:bg-hc-green/80 text-white font-medium px-6 py-3 rounded-lg shadow transition-all w-full md:w-auto">
                  Télécharger le formulaire de transfert international (PDF)
                </button>
              </a>
            </div>
          </section>
        </div>
      </div>
  );
};

export default Info;