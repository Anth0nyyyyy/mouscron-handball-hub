import { Clock, MapPin, Euro, Calendar, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const trainingSchedule = [
  {
    category: "Mini-handball",
    day: "Samedi",
    time: "10:30 - 12:00"
  },
  {
    category: "U14 / U16",
    day: "Lundi",
    time: "17:30 - 18:45"
  },
  {
    category: "U14 / U16",
    day: "Vendredi",
    time: "17:30 - 19:00"
  },
  {
    category: "U18",
    day: "Lundi",
    time: "18:30 - 20:00"
  },
  {
    category: "U18 / Seniors",
    day: "Mercredi",
    time: "19:30 - 21:00"
  },
  {
    category: "U18 / Seniors",
    day: "Vendredi",
    time: "19:00 - 20:30"
  },
  {
    category: "Équipe Loisir",
    day: "Vendredi (2/mois)",
    time: "20:30 - 21:30"
  }
];
const seasonEvents = [{
  date: "Septembre 2024",
  event: "Début de saison - Inscriptions"
}, {
  date: "Octobre 2024",
  event: "Tournoi de rentrée"
}, {
  date: "Décembre 2024",
  event: "Tournoi de Noël"
}, {
  date: "Février 2025",
  event: "Match de gala"
}, {
  date: "Avril 2025",
  event: "Tournoi de Pâques"
}, {
  date: "Juin 2025",
  event: "Fête du club - Remise des prix"
}];
const registrationSteps = [{
  step: 1,
  title: "Contactez-nous",
  description: "Par téléphone, email ou via notre formulaire de contact"
}, {
  step: 2,
  title: "Séance d'essai",
  description: "Venez essayer gratuitement pendant 3 entraînements"
}, {
  step: 3,
  title: "Inscription",
  description: "Remplissez le formulaire d'inscription et fournissez les documents"
}, {
  step: 4,
  title: "Paiement",
  description: "Réglez la cotisation annuelle"
}];
const tarifs = [{
  label: "Mini-handball (né(e)s en 2014 et après)",
  price: "100 €"
}, {
  label: "Juniors (né(e)s à partir de 2008)",
  price: "150 €"
}, {
  label: "Fratries (à partir du 2ème enfant)",
  price: "90 € ou 135 €"
}, {
  label: "Séniors (né(e)s en 2007 et avant)",
  price: "200 €"
}];
const calendars = [{
  label: "Séniors",
  url: "https://calendar.google.com/calendar/ical/fdee024de7152bc6a1cb0223655f4ffdee60ccbed3176e1f519629784de20e4a%40group.calendar.google.com/public/basic.ics"
}, {
  label: "U18",
  url: "https://calendar.google.com/calendar/ical/02e4b51b6158592872bd32c184e0d05fd75480ee1893fc293ab3cbc5c8f1cc13%40group.calendar.google.com/public/basic.ics"
}, {
  label: "U16",
  url: "https://calendar.google.com/calendar/ical/98cb0fbe3bdfc2fd4eb65887b777f3c2adde03decaf3788157877eef0f2d90ff%40group.calendar.google.com/public/basic.ics"
}, {
  label: "U14",
  url: "https://calendar.google.com/calendar/ical/68104c0ae5dc00fd5e7e924d2dec3e42399be44fd265d1a3468adca34fa1bd33%40group.calendar.google.com/public/basic.ics"
}];
const Info = () => {
  return <div className="w-full py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Informations pratiques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Tout ce que vous devez savoir pour nous rejoindre : horaires, lieu d'entraînement et procédure d'inscription.</p>
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
                {/* Infos salle - à gauche sur desktop */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-4">Hall Max Lessines de Mouscron</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>📍 Rue des Prés 84B, 7700 Mouscron</p>
                    <p>🚗 Parking gratuit sur place</p>
                    <p>🚿 Vestiaires avec douches</p>
                    <p>☕ Cafétéria avec Wifi ouverte les soirs d'entraînement</p>
                  </div>
                </div>
                {/* Image du hall - au centre à droite sur desktop */}
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
          <p className="text-center text-muted-foreground mb-12">Saison 2025 - 2026</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trainingSchedule.map((training, index) => <Card key={index} className="hover:shadow-md transition-shadow">
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
              </Card>)}
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
              className="bg-hc-green text-white px-6 py-3 rounded-lg hover:bg-hc-green/80 transition-colors font-medium inline-block"
            >
              Calendrier du club
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {calendars.map(cal => <div key={cal.label} className="flex flex-col items-center bg-hc-green-light/10 p-6 rounded-lg shadow-sm">
                <div className="text-xl font-semibold text-hc-green mb-4">{cal.label}</div>
                <a href={cal.url} target="_blank" rel="noopener noreferrer" className="bg-hc-orange text-white px-4 py-2 rounded hover:bg-hc-orange/80 transition-colors font-medium mt-auto">
                  Ouvrir l'agenda
                </a>
              </div>)}
          </div>
          <div className="text-center mt-6 text-muted-foreground text-sm">
            Accès direct aux calendriers Google des matchs pour chaque catégorie.
          </div>
        </section>

        {/* Tarifs Section */}
        <section className="mb-16" id="tarifs">
          <h2 className="text-3xl font-bold text-center mb-12 text-hc-orange">Tarifs</h2>
          <div className="max-w-3xl mx-auto text-center p-10 rounded-lg bg-white/90 border shadow space-y-6">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {tarifs.map((t, idx) => <div key={t.label} className="flex flex-col items-center justify-center bg-hc-green-light/10 rounded-lg p-4 shadow-sm">
                  <div className="text-lg font-semibold text-hc-green mb-1">{t.label}</div>
                  <div className="text-2xl font-bold text-hc-orange mb-1">{t.price}</div>
                </div>)}
            </div>
            <div className="bg-hc-green/10 p-4 rounded-lg shadow mb-4">
              <div className="font-medium mb-1">
                <Euro className="inline-block mr-2" /> Règlement par virement bancaire :
              </div>
              <div className="font-mono text-md text-hc-green font-semibold">
                BE07 1261 1084 1566
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Merci d'indiquer le nom et prénom du joueur en communication.<br />
                Paiement avant le <span className="font-semibold text-hc-orange">30/09/26</span>
              </div>
            </div>
            <div className="bg-hc-orange/10 p-4 rounded-lg shadow mb-4">
              <div className="font-medium mb-1 text-hc-orange">
                Transfert international
              </div>
              <div className="text-sm text-muted-foreground">
                Pour les joueurs qui ont plus de 16 ans et qui ont été affiliés dans<br />
                un club d'une fédération hors de la Belgique dans les 2 années qui précèdent.<br />
                <span className="font-semibold text-hc-orange">Contacter le comité</span>
              </div>
            </div>
            <div className="italic text-muted-foreground text-sm">
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
              {registrationSteps.map((step, index) => <Card key={index} className="hover:shadow-md transition-shadow">
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
                </Card>)}
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-r from-hc-green to-hc-orange rounded-lg text-center text-white">
              <h3 className="text-xl font-bold mb-4">Documents nécessaires pour l'inscription</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>✓ Certificat médical de non contre-indication</p>
                  <p>✓ Copie de la carte d'identité</p>
                  <p>✓ Photo d'identité récente</p>
                </div>
                <div>
                  <p>✓ Attestation d'assurance responsabilité civile</p>
                  <p>✓ Autorisation parentale (pour les mineurs)</p>
                  <p>✓ Formulaire d'inscription complété</p>
                </div>
              </div>
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
    </div>;
};
export default Info;